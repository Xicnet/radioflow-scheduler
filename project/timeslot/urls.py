from django.conf.urls import patterns, include, url
from django.conf import settings

from django.contrib.auth.models import User
from timeslot.models import Day
import timeslot.views
from rest_framework import routers, serializers, viewsets

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Day
        #fields = ('url', 'username', 'email', 'is_staff')
        fields = ('name',)

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = Day.objects.all()
    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = patterns('',
    url(r'^$','timeslot.views.program'),
    url(r'^(?P<station>(.*))/now_playing.json$', 'timeslot.views.now_playing', name='now_playing'),
    url(r'^now_playing.json$', 'timeslot.views.now_playing', name='now_playing'),
    url(r'^(?P<program_id>\d+)/$','timeslot.views.program'),
    url(r'^(?P<program_id>\d+)/delete/$','timeslot.views.program_delete'),
    url(r'^api/', include(router.urls)),

    # Wire up our API using automatic URL routing.
    # Additionally, we include login URLs for the browsable API.
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/program/$', timeslot.views.program_list),
    url(r'^api/program/(?P<pk>[0-9]+)/$', timeslot.views.program_detail),
    url(r'^api/station/(?P<station>[a-z0-9]+)/programs/$', timeslot.views.station_programs),
)

#if settings.DEBUG:
#    urlpatterns += patterns('',
#        (r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT, 'show_indexes':True}),
#)
