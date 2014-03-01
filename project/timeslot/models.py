from django.conf import settings
from django.db import models
from django.utils.timezone import utc
from image_cropping import ImageRatioField
from django.contrib.auth.models import User
from django.contrib.sites.models import Site

import datetime
import os

from constants import *

class Day(models.Model):
    def __unicode__(self):
        return self.name

    name = models.CharField(max_length=10)

class Program(models.Model):
    def __unicode__(self):
        return self.name

    name        = models.CharField(max_length=256)
    description = models.TextField(max_length=1024, null=True)
    moderator   = models.CharField(max_length=1024, null=True)
    #facebook   = models.URLField(max_length=512, null=True)
    #twitter    = models.URLField(max_length=512, null=True)
    #web        = models.URLField(max_length=512, null=True)
    #email      = models.EmailField(max_length=256, null=True)
    image       = models.ImageField(blank=True, null=True, upload_to='uploaded_images/')
    cropping    = ImageRatioField('image', '320x480')
    days        = models.ManyToManyField(Day)
    start       = models.TimeField(null=True)
    end         = models.TimeField(null=True)
    user        = models.ForeignKey(User)
    created     = models.DateTimeField(default=datetime.datetime.now().replace(tzinfo=utc))

    def save(self, *args, **kwargs):
        return super(Program, self).save(*args, **kwargs)

    @property
    def has_image(self):
        if self.image.name == '':
            return False
        return True

    @property
    def image_url(self):
        domain = Site.objects.get_current().domain
        return "http://%s%s"% (domain, self.image.url)

    @property
    def image_path(self):
        return self.image.url.replace('/media/', '')

    def image_tag(self):
        return u'<img src="%s" />' % self.image.url
    image_tag.short_description = 'Image'
    image_tag.allow_tags = True

class Config(models.Model):
    def __unicode__(self):
        return "%s config" % self.user

    streamurl = models.CharField(max_length=512, blank=True, null=True)
    image     = models.ImageField(blank=True, null=True, upload_to='uploaded_images/')
    cropping  = ImageRatioField('image', '320x480')
    user      = models.ForeignKey(User)

    @property
    def image_url(self):
        domain = Site.objects.get_current().domain
        return "http://%s%s"% (domain, self.image.url)

    @property
    def image_path(self):
        return self.image.url.replace('/media/', '')

    def image_tag(self):
        return u'<img src="%s" />' % self.image.url
    image_tag.short_description = 'Image'
    image_tag.allow_tags = True
