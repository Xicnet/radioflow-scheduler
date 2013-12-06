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

from timeslot.models import Program, Day
from timeslot.forms import SuscriptionForm

from constants import *


@login_required
def index(request):
    suscription_form = SuscriptionForm()
    if request.method == 'POST':
        suscription_form = SuscriptionForm(request.POST)
        if suscription_form.is_valid():
            # do something.
            new_streamer = Program.objects.create(
                program        = suscription_form.cleaned_data['program'],
                presenter = suscription_form.cleaned_data['presenter'],
                description         = suscription_form.cleaned_data['description'],
                facebook         = suscription_form.cleaned_data['facebook'],
                twitter         = suscription_form.cleaned_data['twitter'],
                web         = suscription_form.cleaned_data['web'],
                email         = suscription_form.cleaned_data['email'],
                starts         = suscription_form.cleaned_data['starts'],
                ends         = suscription_form.cleaned_data['ends'],
            )
            new_streamer.save()

            new_slot = Timeslot.objects.create(
                streamer = new_streamer,
                #slot     = suscription_form.cleaned_data['slot']
                slot     = datetime.datetime.now()
            )
    else:
        suscription_form = SuscriptionForm(request.POST)

    programs = []
    days = Day.objects.all()
    for day in days:
        programs.append( { day: Program.objects.filter(days__in=[day]).order_by('start') } )

    return render_to_response(
            'timeslots/index.html',
            {
             'programs': programs,
             'suscription_form': SuscriptionForm(),
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
            out_json += '    "presenter": %s,\n' % json.dumps(program.conductor)
            out_json += '    "image": %s\n' % json.dumps(program.image.url)
            out_json += '}\n'

    return HttpResponse(out_json, mimetype="application/json")

def verify_email():
    pass

@csrf_exempt
def xhr_suscription_form(request):
    if request.is_ajax():
            suscription_form = SuscriptionForm(request.POST)
	    return render_to_response(
        	    'timeslots/suscription_form.html',
	            {
	             'hour': request.GET['hour'],
	             'day': request.GET['day'],
	             'suscription_form': SuscriptionForm(),
	            },
	            context_instance=RequestContext(request)
	        )
    else:
        message = "Hello"
    return HttpResponse(message)



def suscription_save(request):
    if request.method == 'POST':
        suscription_form = SuscriptionForm(request.POST)
        if suscription_form.is_valid():
            return do_suscription_save(request)
        else:
            data = simplejson.dumps({'errors': dict([(k, [unicode(e) for e in v]) for k,v in suscription_form.errors.items()])})
            return HttpResponse(data, mimetype='application/json')

def do_suscription_save(request):
    name        = request.POST['name']
    city        = request.POST['city']
    country     = request.POST['country']
    description = request.POST['description']
    web         = request.POST['web']
    email       = request.POST['email']
    stream      = request.POST['stream']
    image       = request.POST['image']
    day         = int(request.POST['day'])
    hour        = int(request.POST['hour'])

    slot = DAYS[day] + datetime.timedelta(hours=hour, minutes=0, seconds=0)
    slot = slot.replace(tzinfo=utc)
    taken = Timeslot.objects.filter(slot=slot)

    if taken.count() > 0:
        taken       = taken[0]
        taken_time  = taken.created
        now         = datetime.datetime.now().replace(tzinfo=utc)
        taken_delta = (now - taken_time).seconds

        to_json = {
            "name": taken.streamer.name,
            "streamer_id": taken.streamer.id,
            "taken_delta": taken_delta,
        }
        return HttpResponse(simplejson.dumps(to_json), mimetype='application/json')


    streamer = Program(
                name=name,
                city=city,
                country=country,
                description=description,
                web=web,
                email=email,
                stream=stream,
                image=image
               )

    streamer.save()

    timeslot = Timeslot(
                streamer=streamer,
                slot=slot,
               )
    timeslot.save()

    send_confirmation_email(name, email, slot, streamer.code)

    to_json = {
        "name": name,
        "streamer_id": streamer.id,
    }
    return HttpResponse(simplejson.dumps(to_json), mimetype='application/json')

@csrf_exempt
def xhr_details(request):
    if request.is_ajax():
            _id = int(request.GET['id'])
            timeslot = Timeslot.objects.get(id=_id)
	    return render_to_response(
        	    'timeslots/details.html',
	            {
	             'timeslot': timeslot,
	            },
	            context_instance=RequestContext(request)
	        )
    else:
        message = "Hello"
    return HttpResponse(message)


def logout_view(request):
    print logout(request)
    return redirect('root')
