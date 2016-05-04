# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('timeslot', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='program',
            name='days',
            field=models.ManyToManyField(related_name='day', to='timeslot.Day'),
        ),
    ]
