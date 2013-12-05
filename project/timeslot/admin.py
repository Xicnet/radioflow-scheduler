from timeslot.models import Program, Day
from django.contrib import admin
from image_cropping import ImageCroppingMixin

class ProgramAdmin(ImageCroppingMixin, admin.ModelAdmin):
    list_display    = ('name', 'moderator', 'start', 'end')

admin.site.register(Program, ProgramAdmin)
admin.site.register(Day)
