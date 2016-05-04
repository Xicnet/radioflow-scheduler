import datetime
import json

from django.template import RequestContext
from django.http import HttpResponse
from django.shortcuts import render_to_response, redirect, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.utils.timezone import utc
from django.core.mail import send_mail
from django.contrib.sites.models import Site
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.forms.models import model_to_dict

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from timeslot.serializers import ProgramSerializer, DaySerializer

from timeslot.models import Program, Day, Config
from timeslot.forms import ProgramForm, ConfigForm

from constants import *


@login_required
def index(request):
    weekly_programs = []
    days = Day.objects.all()
    for day in days:
        programs_for = Program.objects.filter(days__in=[day], user=request.user).order_by('start')
        if programs_for:
            weekly_programs.append( { day: programs_for } )

    return render_to_response(
            'timeslots/index.html',
            {
             'weekly_programs': weekly_programs,
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

    return HttpResponse(out_json, mimetype="application/json")

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

    return HttpResponse(out_json, mimetype="application/json")

@login_required
def config_show(request, station="nacionalrock"):
    config = Config.objects.get_or_create(user=request.user)[0]

    config_form = ConfigForm()
    if request.method == 'POST':
        config_form = ConfigForm(request.POST)
        if config_form.is_valid():
            logo      = request.FILES.get('logo', None)
            image     = request.FILES.get('image', None)
            image_del = request.POST.get('image_del', None)
            config.station   = config_form.cleaned_data['station']
            config.streamurl = config_form.cleaned_data['streamurl']
            config.facebook  = config_form.cleaned_data['facebook']
            config.twitter   = config_form.cleaned_data['twitter']
            config.web       = config_form.cleaned_data['web']
            config.email     = config_form.cleaned_data['email']
            if image:
                config.image    = image
            if logo:
                config.logo     = logo
            if image_del:
                config.image    = None
            print request.FILES
            config.save()
            return redirect('config_show')
        else:
            config_form = ConfigForm(request.POST)
        return redirect('root')
    else:
        config_form = ConfigForm(data=model_to_dict(config))

    return render_to_response(
            'timeslots/config.html',
            {
             'config': config,
             'config_form': config_form,
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
            program.append({'day': day, 'programs': day.program_set.all()})

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
