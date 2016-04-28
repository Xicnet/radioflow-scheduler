from django.conf.urls import patterns, url, include


urlpatterns = patterns('ajax_upload.views',
    url(r'^$', 'upload', name='ajax-upload'),
)
