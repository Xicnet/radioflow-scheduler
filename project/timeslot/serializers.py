from rest_framework import serializers
from timeslot.models import Program

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model   = Program
        exclude = ('user', 'created', 'show_labels', 'cropping')

