# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('icecast_stats', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProgramStat',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('program_name', models.CharField(max_length=256)),
                ('duration', models.IntegerField()),
                ('log_entry', models.ForeignKey(to='icecast_stats.IcecastLog')),
            ],
        ),
    ]
