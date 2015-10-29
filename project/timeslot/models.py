from django.conf import settings
from django.db import models
from django.utils.timezone import utc
from image_cropping import ImageRatioField
from django.contrib.auth.models import User
from django.contrib.sites.models import Site
from django.db.models.signals import post_save

from utils import get_fb_profile_url, parse_tw_url

import datetime
import os
from urllib import urlopen
import json

from constants import *

class Day(models.Model):
    def __unicode__(self):
        return self.name

    name = models.CharField(max_length=10)

class Program(models.Model):
    def __unicode__(self):
        return self.name

    name        = models.CharField(max_length=256, blank=True, null=True)
    description = models.TextField(max_length=1024, blank=True, null=True)
    moderator   = models.CharField(max_length=1024, blank=True, null=True)
    show_labels = models.BooleanField(default=True)
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

    streamurl     = models.CharField(max_length=512, blank=True, null=True)
    facebook      = models.URLField(max_length=512, blank=True, null=True)
    twitter       = models.CharField(max_length=512, blank=True, null=True)
    web           = models.URLField(max_length=512, blank=True, null=True)
    email         = models.EmailField(max_length=256, null=True, blank=True)
    image         = models.ImageField(blank=True, null=True, upload_to='uploaded_images/')
    cropping      = ImageRatioField('image', '320x480')
    logo          = models.ImageField(blank=True, null=True, upload_to='uploaded_images/')
    logo_cropping = ImageRatioField('logo', '320x480')
    user          = models.OneToOneField(User)

    @property
    def image_url(self):
        if self.image:
            domain = Site.objects.get_current().domain
            return "http://%s%s"% (domain, self.image.url)
        return ""

    @property
    def get_web(self):
        if not self.web or self.web == "":
            return ""
        return self.web

    @property
    def get_email(self):
        if not self.email or self.email == "":
            return ""
        return self.email

    @property
    def get_logo_url(self):
        if not self.logo or self.logo == "":
            return ""
        domain = Site.objects.get_current().domain
        return "http://%s%s"% (domain, self.logo.url)

    @property
    def image_path(self):
        return self.image.url.replace('/media/', '')

    def image_tag(self):
        return u'<img src="%s" />' % self.image.url
    image_tag.short_description = 'Image'
    image_tag.allow_tags = True

    @property
    def get_fb_url(self):
        if not self.facebook or self.facebook == "":
            return ""
        return get_fb_profile_url(self.facebook)

    @property
    def get_tw_url(self):
        if not self.twitter or self.twitter == "":
            return ""
        #return parse_tw_url(self.twitter)
        return self.twitter


def create_user_config(sender, instance, created, **kwargs):
    if created:
       profile, created = Config.objects.get_or_create(user=instance)

post_save.connect(create_user_config, sender=User)
