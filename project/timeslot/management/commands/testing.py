from datetime import datetime

from django.core.management.base import BaseCommand, CommandError
from django.db import models
from django.contrib.sites.models import Site

from timeslot.models import Programa


class Command(BaseCommand):
    help = "Deletes thumbnails that no longer have an original file."

    def handle(self, **options):
        weekday = datetime.now().weekday() +1
        print weekday
        programs = Programa.objects.filter(dias__in=[weekday])
        now = datetime.now().time()
        print now
        print programs
        for i in programs:
            print i.nombre, i.comienzo, i.fin
            if i.comienzo < now < i.fin:
                print "NOW : ", i.nombre, i.comienzo, i.fin

