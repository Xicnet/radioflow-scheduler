# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import timeslot.models
from django.conf import settings
import image_cropping.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Config',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('streamurl', models.CharField(max_length=512, null=True, blank=True)),
                ('facebook', models.URLField(max_length=512, null=True, blank=True)),
                ('twitter', models.CharField(max_length=512, null=True, blank=True)),
                ('web', models.URLField(max_length=512, null=True, blank=True)),
                ('email', models.EmailField(max_length=256, null=True, blank=True)),
                ('image', models.ImageField(null=True, upload_to=b'uploaded_images/', blank=True)),
                (b'cropping', image_cropping.fields.ImageRatioField(b'image', '320x480', hide_image_field=False, size_warning=False, allow_fullsize=False, free_crop=False, adapt_rotation=False, help_text=None, verbose_name='cropping')),
                ('logo', models.ImageField(null=True, upload_to=b'uploaded_images/', blank=True)),
                (b'logo_cropping', image_cropping.fields.ImageRatioField(b'logo', '320x480', hide_image_field=False, size_warning=False, allow_fullsize=False, free_crop=False, adapt_rotation=False, help_text=None, verbose_name='logo cropping')),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Day',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=10)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Program',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=256, null=True, blank=True)),
                ('description', models.TextField(max_length=1024, null=True, blank=True)),
                ('moderator', models.CharField(max_length=1024, null=True, blank=True)),
                ('show_labels', models.BooleanField(default=True)),
                ('image', models.ImageField(null=True, upload_to=b'uploaded_images/', blank=True)),
                (b'cropping', image_cropping.fields.ImageRatioField(b'image', '320x480', hide_image_field=False, size_warning=False, allow_fullsize=False, free_crop=False, adapt_rotation=False, help_text=None, verbose_name='cropping')),
                ('start', models.TimeField(null=True)),
                ('end', models.TimeField(null=True)),
                ('created', models.DateTimeField(default=timeslot.models.get_inf_time)),
                ('days', models.ManyToManyField(to='timeslot.Day')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
