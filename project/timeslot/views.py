import datetime
import json

from django.template import RequestContext
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response, redirect, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.utils.timezone import utc
from django.core.mail import send_mail
from django.contrib.sites.models import Site
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.forms.models import model_to_dict
from django.core import serializers

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from timeslot.serializers import ProgramSerializer, DaySerializer

from timeslot.models import Program, Day, Config
from timeslot.forms import ProgramForm, ConfigForm

from constants import *


@login_required
def index(request, program_id=None):
    #if request.user.is_superuser == True:
    #    return HttpResponseRedirect(reverse('admin:index'))

    #    ***********************
    #    AGREGADO POR MARCE 

    if program_id:
        program = Program.objects.get(id=program_id)
        edit    = True
    else:
        program = None

    is_new = not program
    program_form = ProgramForm()
    if request.method == 'POST':
        program_form = ProgramForm(request.POST)
        if program_form.is_valid():
            image = request.FILES.get('image', None)
            if not program:
                program = Program.objects.create(user=request.user)
            program.name         = program_form.cleaned_data['name']
            program.moderator    = program_form.cleaned_data['moderator']
            program.description  = program_form.cleaned_data['description']
            program.show_labels  = program_form.cleaned_data['show_labels']
            program.start        = program_form.cleaned_data['start']
            program.end          = program_form.cleaned_data['end']
            program.days         = program_form.cleaned_data['days']
            if image:
                program.image    = image
            program.save()
            redirect_target = '/program/'
            if is_new: 
                redirect_target += str(program.id)
            return redirect(redirect_target)
        else:
            program_form = ProgramForm(request.POST)
    else:
        if program_id:
            program_form = ProgramForm(data=model_to_dict(program))
    
    field_groups = {
        "publicos"    : [ program_form['name'], program_form['moderator'], program_form['show_labels'], program_form['image'] ],
        "internos"  : [ program_form['days'],  program_form['start'],  program_form['end'],  program_form['description'] ],
    }

    #    END AGREGADO POR MARCE 
    #    ***********************

    return render_to_response(
            'timeslots/program.html',
            {
             'program': program,
             'program_form': program_form,
             'field_groups': field_groups,
             'weekly_programs': Program.get_weekly(request),
            },
            context_instance=RequestContext(request)
    )

@login_required
def program(request, program_id=None):
    if program_id:
        program = Program.objects.get(id=program_id)
        edit    = True
    else:
        program = None

    program_form = ProgramForm()
    if request.method == 'POST':
        program_form = ProgramForm(request.POST)
        if program_form.is_valid():
            image = request.FILES.get('image', None)
            if not program:
                program = Program.objects.create(user=request.user)
            program.name         = program_form.cleaned_data['name']
            program.moderator    = program_form.cleaned_data['moderator']
            program.description  = program_form.cleaned_data['description']
            program.show_labels  = program_form.cleaned_data['show_labels']
            program.start        = program_form.cleaned_data['start']
            program.end          = program_form.cleaned_data['end']
            program.days         = program_form.cleaned_data['days']
            if image:
                program.image    = image
            program.save()
            return redirect('root')
        else:
            program_form = ProgramForm(request.POST)
    else:
        if program_id:
            program_form = ProgramForm(data=model_to_dict(program))

    return render_to_response(
            'timeslots/program_add.html',
            {
             'program': program,
             'program_form': program_form,
            },
            context_instance=RequestContext(request)
        )

def now_playing(request, station="nacionalrock"):
    out_json = ''
    weekday = datetime.datetime.now().weekday() +1
    programs = Program.objects.filter(days__in=[weekday], user__username=station)
    for program in programs:
        now = datetime.datetime.now().time()
        if program.start < now < program.end:
            out_json += '{\n'
            out_json += '    "name": %s,\n' % json.dumps(program.name)
            out_json += '    "moderator": %s,\n' % json.dumps(program.moderator)
            out_json += '    "presenter": %s,\n' % json.dumps(program.moderator)
            out_json += '    "show_labels": %s,\n' % json.dumps(program.show_labels)
            if program.has_image:
                out_json += '    "image": %s,\n' % json.dumps(program.image.url)
                out_json += '    "image_url": %s\n' % json.dumps(program.image_url)
            else:
                out_json += '    "image": %s,\n' % json.dumps("")
                out_json += '    "image_url": %s\n' % json.dumps("")
            out_json += '}\n'

    return HttpResponse(out_json, content_type="application/json")

def logout_view(request):
    logout(request)
    return redirect('root')

@login_required
def program_delete(request, program_id=None):
    if program_id:
        program = Program.objects.get(id=program_id)
        program.delete()
        return redirect("root")
    else:
        return redirect("root")

@login_required
def __config_show(request, station="nacionalrock"):
    config = Config.objects.filter(user=request.user)

    return render_to_response(
            'timeslots/config.html',
            {
             'config': config,
            },
            context_instance=RequestContext(request)
        )

def config_json(request, station="nacionalrock"):
    out_json = ''
    config = Config.objects.filter(user__username=station)
    for c in config:
        out_json += '{\n'
        out_json += '    "streamurl": %s,\n' % json.dumps(c.streamurl)
        out_json += '    "logourl": %s,\n' % json.dumps(c.get_logo_url)
        out_json += '    "facebook": %s,\n' % json.dumps(c.get_fb_url)
        out_json += '    "twitter": %s,\n' % json.dumps(c.get_tw_url)
        out_json += '    "web": %s,\n' % json.dumps(c.get_web)
        out_json += '    "email": %s,\n' % json.dumps(c.get_email)
        out_json += '    "image": %s\n' % json.dumps(c.image_url)
        out_json += '}\n'

    return HttpResponse(out_json, content_type="application/json")

@login_required
def config_show(request, station="nacionalrock"):
    config = Config.objects.get_or_create(user=request.user)[0]

    config_form = ConfigForm()
    if request.method == 'POST':
        config_form = ConfigForm(request.POST)
        if config_form.is_valid():
            logo             = request.FILES.get('logo', None)
            logo_del         = request.POST.get('logo_del', None)
            logo_alpha       = request.FILES.get('logo_alpha', None)
            logo_alpha_del   = request.POST.get('logo_alpha_del', None)
            logo_home        = request.FILES.get('logo_home', None)
            logo_home_del    = request.POST.get('logo_home_del', None)
            image            = request.FILES.get('image', None)
            image_del        = request.POST.get('image_del', None)
            feature_graphic  = request.FILES.get('feature_graphic', None)

            config.station   = config_form.cleaned_data['station']
            config.streamurl = config_form.cleaned_data['streamurl']
            config.facebook  = config_form.cleaned_data['facebook']
            config.twitter   = config_form.cleaned_data['twitter']
            config.web       = config_form.cleaned_data['web']
            config.email     = config_form.cleaned_data['email']

            if image:
                config.image = image
            if image_del:
                config.image = None
            if logo:
                config.logo  = logo
            if logo_del:
                config.logo = None
            if logo_alpha:
                config.logo_alpha  = logo_alpha
            if logo_alpha_del:
                config.logo_alpha = None
            if logo_home:
                config.logo_home  = logo_home
            if logo_home_del:
                config.logo_home = None
                print "HERE"*77
            if feature_graphic:
                config.feature_graphic = feature_graphic

            config.app_name          = config_form.cleaned_data['app_name']
            config.short_description = config_form.cleaned_data['short_description']
            config.description       = config_form.cleaned_data['description']
            config.keywords          = config_form.cleaned_data['keywords']
            print request.FILES
            print "POST: ", request.POST
            config.save()
            return redirect('config_show')
        else:
            config_form = ConfigForm(request.POST)
        return redirect('root')
    else:
        config_form = ConfigForm(data=model_to_dict(config))

    field_groups = {
        "radio"    : [ config_form['station'], config_form['streamurl'] ],
        "contact"  : [ config_form['email'], config_form['facebook'], config_form['twitter'], config_form['web'] ],
        "store"    : [ config_form['app_name'], config_form['short_description'], config_form['description'], config_form['keywords'] ],
    }

    image_groups = {
        "images" : { 'image': config_form['image'], 'logo': config_form['logo'], 'logo_alpha': config_form['logo_alpha'], 'logo_home': config_form['logo_home'], 'feature_graphic': config_form['feature_graphic'] },
        "del" : { 'image_del': config_form['image_del'], 'logo_del': config_form['logo_del'], 'logo_alpha_del': config_form['logo_alpha_del'], 'logo_home_del': config_form['logo_home_del'] }
    }

    return render_to_response(
            'timeslots/config.html',
            {
             'config': config,
             'config_form': config_form,
             'image_groups': image_groups,
             'field_groups': field_groups,
            },
            context_instance=RequestContext(request)
        )

class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

@csrf_exempt
def program_list(request):
    """
    List all code programs, or create a new program.
    """
    if request.method == 'GET':
        programs = Program.objects.all()
        serializer = ProgramSerializer(programs, many=True)
        return JSONResponse(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ProgramSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        return JSONResponse(serializer.errors, status=400)

@csrf_exempt
def program_detail(request, pk):
    """
    Retrieve, update or delete a code program.
    """
    try:
        program = Program.objects.get(pk=pk).__dict__
    except Program.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = ProgramSerializer(program)
        return JSONResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ProgramSerializer(program, data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data)
        return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        program.delete()
        return HttpResponse(status=204)

@csrf_exempt
def station_programs(request, station):
    """
    Retrieve, update or delete a code program.
    """
    try:
        """
        program = Program.objects.filter(user__username=station).values()
        days = Day.objects.all()
        a = {}
        for day in days:
            a[day.name] = Program.objects.filter(user__username=station).values()
        print a
        program = a
        """

        program = []
        days = Day.objects.all()
        for day in days:
            program.append({'day': day, 'programs':
                day.program_set.filter(user__username=station)})


    except Program.DoesNotExist:
        return HttpResponse(status=401)

    if request.method == 'GET':
        serializer = DaySerializer(program, many=True)
        return JSONResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ProgramSerializer(program, data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data)
        return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        program.delete()
        return HttpResponse(status=204)
