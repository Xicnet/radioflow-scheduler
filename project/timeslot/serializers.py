from rest_framework import serializers
from timeslot.models import Program
import datetime

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model   = Program
        exclude = ('user', 'created', 'show_labels', 'cropping', 'days',)

class DaySerializer(serializers.Serializer):
    day      = serializers.CharField(max_length=200)
    programs = ProgramSerializer(many=True, read_only=True)
