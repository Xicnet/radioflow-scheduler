# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('timeslot', '0007_auto_20160616_0049'),
    ]

    operations = [
        migrations.AlterField(
            model_name='config',
            name='description',
            field=models.TextField(max_length=4000, null=True, blank=True),
        ),
    ]
