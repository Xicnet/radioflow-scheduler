import datetime
from django.core.management.base import BaseCommand, CommandError
from django.db import models
from django.contrib.sites.models import Site
from django.conf import settings
from django.contrib.auth.models import User
from django.db.models import Q

from timeslot.models import Config, Day, Program
from icecast_stats.models import IcecastLog


class Command(BaseCommand):
    help = "Test matching programs to log entries"

    def handle(self, **options):
        mount  = "radioapp.mp3"
        logs   = IcecastLog.objects.filter(mount=mount, duration__gt=10)
        programs  = User.objects.get(config__streamurl__icontains=mount).program_set.all()

        for log in logs:
            start = log.datetime_start.time()
            end   = log.datetime_end.time()
            #listened = programs.filter(start__lte=start, end__gte=end)
            listened = programs.filter(
             Q(start__lte=start, end__gte=start) |
             Q(start__lt=end, end__gte=end)
            )
            print log.datetime_start, log.datetime_end, log.ip, log.country_code, [(x.name, x.start, x.end) for x in listened]
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
