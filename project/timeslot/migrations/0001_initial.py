# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Day'
        db.create_table('timeslot_day', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=10)),
        ))
        db.send_create_signal('timeslot', ['Day'])

        # Adding model 'Program'
        db.create_table('timeslot_program', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=256)),
            ('description', self.gf('django.db.models.fields.TextField')(max_length=1024, null=True)),
            ('moderator', self.gf('django.db.models.fields.CharField')(max_length=256, null=True)),
            ('image', self.gf('django.db.models.fields.files.ImageField')(max_length=100, null=True, blank=True)),
            ('cropping', self.gf(u'django.db.models.fields.CharField')(max_length=255, blank=True)),
            ('start', self.gf('django.db.models.fields.TimeField')(null=True)),
            ('end', self.gf('django.db.models.fields.TimeField')(null=True)),
            ('created', self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime(2013, 12, 5, 0, 0))),
        ))
        db.send_create_signal('timeslot', ['Program'])

        # Adding M2M table for field days on 'Program'
        m2m_table_name = db.shorten_name('timeslot_program_days')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('program', models.ForeignKey(orm['timeslot.program'], null=False)),
            ('day', models.ForeignKey(orm['timeslot.day'], null=False))
        ))
        db.create_unique(m2m_table_name, ['program_id', 'day_id'])


    def backwards(self, orm):
        # Deleting model 'Day'
        db.delete_table('timeslot_day')

        # Deleting model 'Program'
        db.delete_table('timeslot_program')

        # Removing M2M table for field days on 'Program'
        db.delete_table(db.shorten_name('timeslot_program_days'))


    models = {
        'timeslot.day': {
            'Meta': {'object_name': 'Day'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '10'})
        },
        'timeslot.program': {
            'Meta': {'object_name': 'Program'},
            'created': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime(2013, 12, 5, 0, 0)'}),
            'cropping': (u'django.db.models.fields.CharField', [], {'max_length': '255', 'blank': 'True'}),
            'days': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['timeslot.Day']", 'symmetrical': 'False'}),
            'description': ('django.db.models.fields.TextField', [], {'max_length': '1024', 'null': 'True'}),
            'end': ('django.db.models.fields.TimeField', [], {'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'image': ('django.db.models.fields.files.ImageField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            'moderator': ('django.db.models.fields.CharField', [], {'max_length': '256', 'null': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '256'}),
            'start': ('django.db.models.fields.TimeField', [], {'null': 'True'})
        }
    }

    complete_apps = ['timeslot']