# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='IcecastLog',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('datetime_start', models.DateTimeField(null=True, blank=True)),
                ('datetime_end', models.DateTimeField(null=True, blank=True)),
                ('ip', models.CharField(max_length=20)),
                ('country_code', models.CharField(max_length=4, null=True, blank=True)),
                ('mount', models.CharField(max_length=90)),
                ('status_code', models.IntegerField(null=True, blank=True)),
                ('duration', models.IntegerField(null=True, blank=True)),
                ('sent_bytes', models.IntegerField(null=True, blank=True)),
                ('agent', models.CharField(max_length=400, null=True, blank=True)),
                ('referer', models.CharField(max_length=400, null=True, blank=True)),
                ('server', models.CharField(max_length=50, null=True, blank=True)),
                ('auth_user', models.CharField(max_length=20, null=True, blank=True)),
                ('auth_pass', models.CharField(max_length=20, null=True, blank=True)),
            ],
        ),
    ]
