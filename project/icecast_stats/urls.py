from django.conf.urls import patterns, include, url
from django.conf import settings

from rest_framework import routers, serializers, viewsets

from django.contrib.auth.models import User
import icecast_stats.views
from icecast_stats.views import IcecastLogViewSet
from icecast_stats.models import IcecastLog

urlpatterns = patterns('',
    url(r'^$','icecast_stats.views.index'),
    url(r'^api/logs/$', IcecastLogViewSet.as_view()),
    #url(r'^api/', include(router.urls)),
)

#if settings.DEBUG:
#    urlpatterns += patterns('',
#        (r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT, 'show_indexes':True}),
#)
