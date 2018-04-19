from datetime import timedelta

from django.db import models
from django.db.models import Q
from django.contrib.auth.models import User
from django.db.models import Sum, Avg

from timeslot.models import Program

class IcecastLog(models.Model):
    datetime_start = models.DateTimeField(blank=True, null=True)
    datetime_end   = models.DateTimeField(blank=True, null=True)
    ip             = models.CharField(max_length=20)
    country_code   = models.CharField(max_length=4, blank=True, null=True)
    mount          = models.CharField(max_length=90)
    status_code    = models.IntegerField(blank=True, null=True)
    duration       = models.IntegerField(blank=True, null=True)
    sent_bytes     = models.IntegerField(blank=True, null=True)
    agent          = models.CharField(max_length=400, blank=True, null=True)
    referer        = models.CharField(max_length=400, blank=True, null=True)
    server         = models.CharField(max_length=50, blank=True, null=True)
    auth_user      = models.CharField(max_length=20, blank=True, null=True)
    auth_pass      = models.CharField(max_length=20, blank=True, null=True)

    def __unicode__(self):
        return self.mount

    @property
    def programs(self):
        return User.objects.get(config__streamurl__icontains=self.mount).program_set.all()

    def listened(self):
        weekday = self.datetime_start.weekday() + 1
        listened = self.programs.filter(days=weekday).filter(
          Q(start__lte=self.datetime_start.time(), end__gte=self.datetime_start.time()) |
          Q(start__lt=self.datetime_end.time(), end__gte=self.datetime_end.time())
        )
        programs = []
        for l in listened:
            programs.append([l.name, l.time_listened(self.datetime_end.time()).seconds/60])

        return programs

class ProgramStat(models.Model):
    log_entry      = models.ForeignKey(IcecastLog)
    program_name   = models.CharField(max_length=256)
    duration       = models.IntegerField()

    def __unicode__(self):
        return u"%s: %s" % (self.program_name, self.duration)


    @staticmethod
    def duration_total(start, end, program_name=None):
        duration = ProgramStat.objects.filter(log_entry__datetime_start__gte=start, log_entry__datetime_end__lte=end)
        if program_name:
            duration = duration.filter(program_name=program_name)
        return duration.aggregate(total=Sum('duration'))['total']

    @staticmethod
    def duration_average(start, end, program_name=None):
        duration = ProgramStat.objects.filter(log_entry__datetime_start__gte=start, log_entry__datetime_end__lte=end)
        if program_name:
            duration = duration.filter(program_name=program_name)
        return duration.aggregate(average=Avg('duration'))['average']
