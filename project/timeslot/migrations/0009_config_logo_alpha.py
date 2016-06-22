# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import timeslot.models


class Migration(migrations.Migration):

    dependencies = [
        ('timeslot', '0008_auto_20160622_0937'),
    ]

    operations = [
        migrations.AddField(
            model_name='config',
            name='logo_alpha',
            field=models.ImageField(null=True, upload_to=timeslot.models.uploaded_image_path, blank=True),
        ),
    ]
