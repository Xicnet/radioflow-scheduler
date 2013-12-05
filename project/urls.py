from django.conf.urls import patterns, include, url
from django.conf import settings

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    #url(r'^$', 'app.views.home', name='home'),
    # url(r'^babel/', include('babel.foo.urls')),
    url(r'^$', 'timeslot.views.index', name='root'),
    url(r'^now_playing.json$', 'timeslot.views.now_playing', name='now_playing'),
    url(r'^xhr_suscription_form$','timeslot.views.xhr_suscription_form'),
    url(r'^xhr_details$','timeslot.views.xhr_details'),
    url(r'^suscription_save/$','timeslot.views.suscription_save'),
    url(r'^verify_email/(?P<code>[a-z0-9_\-]+)', 'timeslot.views.verify_email', name='verify_email'),


    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    url(r'^admin/', include(admin.site.urls)),

    url(r'^ajax-upload', include('ajax_upload.urls')),

)

if settings.DEBUG:
    urlpatterns += patterns('',
        (r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT, 'show_indexes':True}),
)
