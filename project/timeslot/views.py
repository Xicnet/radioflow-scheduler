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

from timeslot.models import Program, Day
from timeslot.forms import ProgramForm

from constants import *


@login_required
def index(request):
    programs = []
    days = Day.objects.all()
    for day in days:
        programs.append( { day: Program.objects.filter(days__in=[day], user=request.user).order_by('start') } )

    return render_to_response(
            'timeslots/index.html',
            {
             'programs': programs,
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
        print "REQUEST IS POST"
        print request.POST
        if program_form.is_valid():
            image = request.FILES.get('image', None)
            #image =  program_form.cleaned_data['image']
            print "IMAGE: ", image
            if True:
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
        else:
            print program_form.errors
            program_form = ProgramForm(request.POST)
        return redirect('root')
    else:
        if program_id:
            print "EDIT"
            program_form = ProgramForm(data=model_to_dict(program))

    return render_to_response(
            'timeslots/program_add.html',
            {
             'program': program,
             'program_form': program_form,
            },
            context_instance=RequestContext(request)
        )

def now_playing(request):
    out_json = ''
    weekday = datetime.datetime.now().weekday() +1
    programs = Program.objects.filter(days__in=[weekday])
    for program in programs:
        now = datetime.datetime.now().time()
        if program.comienzo < now < program.fin:
            out_json += '{\n'
            out_json += '    "name": %s,\n' % json.dumps(program.name)
            out_json += '    "moderator": %s,\n' % json.dumps(program.conductor)
            out_json += '    "image": %s\n' % json.dumps(program.image.url)
            out_json += '}\n'

    return HttpResponse(out_json, mimetype="application/json")

def logout_view(request):
    print logout(request)
    return redirect('root')
