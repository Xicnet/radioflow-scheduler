import os.path
import datetime
import pytz

from django.conf import settings
from django.db.models import F
from datetime import timedelta

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from django.shortcuts import render_to_response, redirect, get_object_or_404
from django.template import RequestContext

from rest_framework import generics
from rest_framework import serializers

from timeslot.models import Program, Day, Config

from icecast_stats.models import IcecastLog, ProgramStat

from realtime_stats import StatsCollector

@login_required
def index(request):
    logs = IcecastLog.objects.all()[:50]

    return render_to_response(
            'icecast_stats/dashboard.html',
            {
             'logs': logs,
             'weekly_programs': Program.get_weekly(request),
            },
            context_instance=RequestContext(request)
        )

@login_required
def programacion(request):

    return redirect('/program/')

@login_required
def realtime(request):
    print settings.ICECAST_URL
    stats = StatsCollector(
            settings.ICECAST_URL,
            settings.ICECAST_USER,
            settings.ICECAST_PASS,
            settings.ICECAST_REALM,
            settings.ICECAST_MOUNT
            )
    stats_data = stats.run()

    return render_to_response(
            'icecast_stats/realtime.html',
            {
             'listeners': stats_data,
            },
            context_instance=RequestContext(request)
        )

@login_required
def chat(request):

    return render_to_response(
            'icecast_stats/chat.html',
            {
             'weekly_programs': Program.get_weekly(request),
            },
            context_instance=RequestContext(request)
        )


# Serializers define the API representation.
class IcecastLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = IcecastLog


class IcecastLogViewSet( generics.ListAPIView):
    #@method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(IcecastLogViewSet, self).dispatch(*args, **kwargs)

    serializer_class = IcecastLogSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the mount portion of the URL.
        """
        mount  = self.request.query_params.get('mount', None)
        start  = "%s 00:00:00" % self.request.query_params.get('start', None)
        end  = "%s 00:00:00" % self.request.query_params.get('end', None)
        #end    = datetime.date("%s 00:00:00" % self.request.query_params.get('end', None), tzinfo=pytz.UTC)
        limit  = self.request.query_params.get('limit', None)

        if self.request.user.is_superuser:
            #logs = IcecastLog.objects.all()
            logs = IcecastLog.objects.filter(mount=mount)
        else:
            #mount = os.path.basename(User.objects.get(username=self.request.user.username).config.streamurl)
            logs = IcecastLog.objects.filter(mount=mount)

        if mount:
            logs = logs.filter(mount=mount)
        if start and end:
            logs = logs.filter(datetime_start__gte=start, datetime_end__lte=end, datetime_end__gt=F('datetime_start') + timedelta(seconds=5) )

        return logs[:limit]

class ProgramStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramStat


class ProgramStatViewSet( generics.ListAPIView):
    #@method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(ProgramStatViewSet, self).dispatch(*args, **kwargs)

    serializer_class = ProgramStatSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the mount portion of the URL.
        """
        mount  = self.request.query_params.get('mount', None)
        start  = "%s 00:00:00" % self.request.query_params.get('start', None)
        end    = "%s 00:00:00" % self.request.query_params.get('end', None)
        limit  = self.request.query_params.get('limit', None)

        if self.request.user.is_superuser:
            #program_stat = ProgramStat.objects.all()
            program_stat = ProgramStat.objects.filter(log_entry__mount=mount)
        else:
            program_stat = ProgramStat.objects.filter(log_entry__mount=mount)

        if mount:
            program_stat = program_stat.filter(log_entry__mount=mount)
        if start and end:
            program_stat = program_stat.filter(log_entry__datetime_start__gte=start, log_entry__datetime_end__lte=end)

        return program_stat[:limit]


