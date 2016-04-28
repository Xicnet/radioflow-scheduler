from django.conf.urls import patterns, include, url
from django.conf import settings

urlpatterns = patterns('',
    url(r'^$','timeslot.views.program'),
    url(r'^(?P<station>(.*))/now_playing.json$', 'timeslot.views.now_playing', name='now_playing'),
    url(r'^now_playing.json$', 'timeslot.views.now_playing', name='now_playing'),
    url(r'^(?P<program_id>\d+)/$','timeslot.views.program'),
    url(r'^(?P<program_id>\d+)/delete/$','timeslot.views.program_delete'),
)

#if settings.DEBUG:
#    urlpatterns += patterns('',
#        (r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT, 'show_indexes':True}),
#)
