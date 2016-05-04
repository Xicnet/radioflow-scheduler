# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('timeslot', '0002_auto_20160429_1207'),
    ]

    operations = [
        migrations.AddField(
            model_name='config',
            name='station',
            field=models.CharField(max_length=512, null=True),
        ),
        migrations.AlterField(
            model_name='program',
            name='days',
            field=models.ManyToManyField(to='timeslot.Day'),
        ),
    ]
