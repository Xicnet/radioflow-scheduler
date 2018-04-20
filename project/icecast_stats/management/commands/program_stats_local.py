import datetime
from django.core.management.base import BaseCommand, CommandError
from django.db import models
from django.contrib.sites.models import Site
from django.conf import settings
from django.contrib.auth.models import User
from django.db.models import Q

from django.utils import timezone

from timeslot.models import Config, Day, Program
from icecast_stats.models import IcecastLog


class Command(BaseCommand):
    help = "Test matching programs to log entries"

    def handle(self, **options):
        mount  = "radioapp.mp3"
        logs   = IcecastLog.objects.filter(mount=mount, duration__gt=10)
        programs  = User.objects.get(config__streamurl__icontains=mount).program_set.all()

        for log in logs:
            _start = log.datetime_start.time()
            _end   = log.datetime_end.time()
            if  log.datetime_start.day != log.datetime_end.day:
                print "Log entry goes to next day: ", log
                continue
            #listened = programs.filter(start__lte=start, end__gte=end)
            weekday = log.datetime_start.weekday()
            listened = programs.filter(
             Q(start__lte=_start, end__gte=_start) |
             Q(start__lt=_end, end__gte=_end)
            ).filter(days=weekday+1)
            print "="*77
            print "Weekday:", weekday
            print "* Icecast access.log entry:", log.datetime_start, log.datetime_end, log.ip, log.country_code
            #print [(x.name, x.start, x.end) for x in listened]

            for l in listened:
                show_start = datetime.datetime(log.datetime_start.year, log.datetime_start.month, log.datetime_start.day, l.start.hour, l.start.minute, tzinfo=timezone.utc)
                show_end = datetime.datetime(log.datetime_start.year, log.datetime_start.month, log.datetime_start.day, l.end.hour, l.end.minute, 59, tzinfo=timezone.utc)
                show_duration = (show_end - show_start).total_seconds()
                day_end = datetime.datetime(log.datetime_start.year, log.datetime_start.month, log.datetime_start.day, 23, 59, tzinfo=timezone.utc)
                print "* Show INFO:", l.name, l.start, l.end, ".. show duration:", show_duration, " | log start: ", log.datetime_start, " | log end: ", log.datetime_end
                #print log.datetime_end - show_start, "(", log.datetime_end, show_start, ")"
                time_listening = (min(show_end, log.datetime_end) - max(show_start, log.datetime_start))
                time_listening_s = time_listening.total_seconds()
                percent_listened = time_listening_s / show_duration * 100
                print "Connection details: ", time_listening, time_listening_s, percent_listened

"""
        n = 0

        LIMIT = 99999
        for log in logs[:LIMIT]:
            program = programs[n]
            log_weekday = log.datetime_start.weekday()


            if program.days.get(id=log_weekday+1):
                print log_weekday
                log_start = log.datetime_start.time()
                log_end   = log.datetime_end.time()
                print program.name, program.start, program.end, "| loginfo:", log.mount, log.datetime_start.time(), log.datetime_end.time()
                if program.start <= log_start and log_start <= program.end:
                    print "A: ", program.name, program.start, program.end
                    print "B: ", log.mount, log.datetime_start.time(), log.datetime_end.time()

"""
