# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('timeslot', '0004_auto_20160505_1536'),
    ]

    operations = [
        migrations.AddField(
            model_name='config',
            name='description',
            field=models.CharField(max_length=4000, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='config',
            name='feature_graphic',
            field=models.ImageField(upload_to=b'uploaded_images/', null=True, verbose_name=b'Feature Graphic (1024x500)', blank=True),
        ),
        migrations.AddField(
            model_name='config',
            name='keywords',
            field=models.CharField(max_length=256, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='config',
            name='short_description',
            field=models.CharField(max_length=80, null=True, blank=True),
        ),
    ]
