# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('timeslot', '0003_auto_20160504_0118'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='program',
            options={'ordering': ['start']},
        ),
    ]
