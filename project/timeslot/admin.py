from django.contrib import admin
from django.contrib.auth.models import User

from timeslot.models import Program, Day, Config
from image_cropping import ImageCroppingMixin

class ProgramAdmin(ImageCroppingMixin, admin.ModelAdmin):
    list_display    = ('name', 'user', 'moderator', 'start', 'end',)
    search_fields    = ('name',)
    list_filter    = ('user',)

class ConfigAdmin(admin.ModelAdmin):
    list_display    = ('station', 'user', 'streamurl', 'facebook', 'twitter', 'web', 'email')

admin.site.register(Program, ProgramAdmin)
admin.site.register(Day)
admin.site.register(Config, ConfigAdmin)
