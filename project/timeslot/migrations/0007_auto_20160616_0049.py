# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import timeslot.models


class Migration(migrations.Migration):

    dependencies = [
        ('timeslot', '0006_auto_20160616_0017'),
    ]

    operations = [
        migrations.AlterField(
            model_name='config',
            name='feature_graphic',
            field=models.ImageField(upload_to=timeslot.models.uploaded_image_path, null=True, verbose_name=b'Feature Graphic (1024x500)', blank=True),
        ),
    ]
