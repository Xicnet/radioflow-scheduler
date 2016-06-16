# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import timeslot.models


class Migration(migrations.Migration):

    dependencies = [
        ('timeslot', '0005_auto_20160615_1743'),
    ]

    operations = [
        migrations.AddField(
            model_name='config',
            name='app_name',
            field=models.CharField(max_length=30, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='config',
            name='image',
            field=models.ImageField(null=True, upload_to=timeslot.models.uploaded_image_path, blank=True),
        ),
        migrations.AlterField(
            model_name='config',
            name='logo',
            field=models.ImageField(null=True, upload_to=timeslot.models.uploaded_image_path, blank=True),
        ),
    ]
