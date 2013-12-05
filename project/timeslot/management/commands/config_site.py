import socket

from django.core.management.base import BaseCommand, CommandError
from django.db import models
from django.contrib.sites.models import Site

class Command(BaseCommand):
    help = "Deletes thumbnails that no longer have an original file."

    def handle(self, **options):
        hostname = socket.gethostname()

        if hostname == 'banx':
            domain = 'localhost:8000'
        else:
            domain = 'babel.xicnet.com'

        print 'Setting site domain to:', domain

        site = Site.objects.get()
        site.domain = domain
        site.save()
