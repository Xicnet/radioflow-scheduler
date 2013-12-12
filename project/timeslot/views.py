import datetime
import json

from django.template import RequestContext
from django.http import HttpResponse
from django.shortcuts import render_to_response, redirect, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.utils import simplejson
from django.utils.timezone import utc
from django.core.mail import send_mail
from django.contrib.sites.models import Site
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.forms.models import model_to_dict

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
            if program.has_image:
                out_json += '    "image": %s\n' % json.dumps(program.image.url)
            else:
                out_json += '    "image": %s\n' % json.dumps("")
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
            image = request.FILES.get('image', None)
            config.streamurl = config_form.cleaned_data['streamurl']
            if image:
                config.image    = image
            config.save()
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

