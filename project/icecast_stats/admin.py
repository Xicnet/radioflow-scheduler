from django.contrib import admin
from django.contrib.auth.models import User

from icecast_stats.models import IcecastLog

class IcecastLogAdmin(admin.ModelAdmin):
    list_display    = ('mount', 'ip', 'country_code', 'duration', 'agent')

admin.site.register(IcecastLog, IcecastLogAdmin)
