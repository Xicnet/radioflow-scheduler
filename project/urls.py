from django.conf.urls import patterns, include, url
from django.conf import settings

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    #url(r'^$', 'app.views.home', name='home'),
    # url(r'^babel/', include('babel.foo.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'timeslot.views.index', name='root'),
    url(r'^(?P<station>(.*))/now_playing.json$', 'timeslot.views.now_playing', name='now_playing'),
    url(r'^now_playing.json$', 'timeslot.views.now_playing', name='now_playing'),
    url(r'^program/(?P<program_id>\d+)/$','timeslot.views.program'),
    url(r'^program/(?P<program_id>\d+)/delete/$','timeslot.views.program_delete'),
    url(r'^program/$','timeslot.views.program'),

    url(r'^accounts/login/$', 'django.contrib.auth.views.login'),
    url(r'^accounts/logout/$', 'timeslot.views.logout_view'),
    url(r'^accounts/password_change/$', 'django.contrib.auth.views.password_change'),

    url(r'^accounts/', include('registration.backends.default.urls')),

    url(r'^config/$', 'timeslot.views.config_show', name='config_show'),
    url(r'^(?P<station>(.*))/config.json$', 'timeslot.views.config_json', name='getconfig'),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),


    url(r'^ajax-upload', include('ajax_upload.urls')),

)

if settings.DEBUG:
    urlpatterns += patterns('',
        (r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT, 'show_indexes':True}),
)
