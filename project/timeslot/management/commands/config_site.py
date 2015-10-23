from django.core.management.base import BaseCommand, CommandError
from django.db import models
from django.contrib.sites.models import Site
from django.conf import settings

class Command(BaseCommand):
    help = "Deletes thumbnails that no longer have an original file."

    def handle(self, **options):
        print 'Setting site domain to:', settings.SITE_DOMAIN

        site = Site.objects.get(id=1)
        site.domain = settings.SITE_DOMAIN
        site.save()
