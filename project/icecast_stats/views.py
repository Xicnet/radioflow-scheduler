import os.path

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from django.shortcuts import render_to_response, redirect, get_object_or_404
from django.template import RequestContext

from rest_framework import generics
from rest_framework import serializers

from icecast_stats.models import IcecastLog

@login_required
def index(request):
    logs = IcecastLog.objects.all()[:50]

    return render_to_response(
            'icecast_stats/index.html',
            {
             'logs': logs,
            },
            context_instance=RequestContext(request)
        )


# Serializers define the API representation.
class IcecastLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = IcecastLog


class IcecastLogViewSet( generics.ListAPIView):
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(IcecastLogViewSet, self).dispatch(*args, **kwargs)

    serializer_class = IcecastLogSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the mount portion of the URL.
        """
        mount  = self.request.query_params.get('mount', None)
        start  = self.request.query_params.get('start', None)
        end    = self.request.query_params.get('end', None)
        limit  = self.request.query_params.get('limit', None)

        if self.request.user.is_superuser:
            logs = IcecastLog.objects.all()
        else:
            mount = os.path.basename(User.objects.get(username=self.request.user.username).config.streamurl)
            logs = IcecastLog.objects.filter(mount=mount)

        if mount:
            logs = logs.filter(mount=mount)
        if start and end:
            logs = logs.filter(datetime_start__gte=start, datetime_end__lte=end)

        return logs[:limit]


