from django import forms
from timeslot.fields import TextAreaField, SelectField
from django.forms import widgets
from timeslot.models import Program

from ajax_upload.widgets import AjaxClearableFileInput

class SuscriptionForm(forms.Form):
    def clean_name(self):
        data = self.cleaned_data['name']
        streamer = Streamer.objects.filter(name=data)
        if streamer.count() > 0:
            raise forms.ValidationError("You can only register one time!")
        return data

    def clean_web(self):
        data = self.cleaned_data['web']
        if data == "":
            return data
        streamer = Streamer.objects.filter(web=data)
        if streamer.count() > 0:
            raise forms.ValidationError("You can only register one time!")
        return data

    def clean_email(self):
        data = self.cleaned_data['email']
        streamer = Streamer.objects.filter(email=data)
        if streamer.count() > 0:
            raise forms.ValidationError("You can only register one time!")
        return data

    def clean_stream(self):
        data = self.cleaned_data['stream']
        streamer = Streamer.objects.filter(stream=data)
        if streamer.count() > 0:
            raise forms.ValidationError("You can only register one time!")
        return data

    name      = forms.CharField(max_length=256, min_length=1, required=True, error_messages={'max_length': 'Please enter less characters'}, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    description = TextAreaField(max_length=1024, min_length=1, required=False, error_messages={'max_length': 'Please enter less than 1024 characters'}, widget=forms.Textarea(attrs={'class':'suscription-textarea'}), help_text="1024 characters")
    presenter = forms.CharField(max_length=256, min_length=1, required=True, error_messages={'max_length': 'Please enter less characters'}, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    facebook  = forms.URLField(max_length=512, min_length=1, required=False, error_messages={'max_length': 'Please enter less characters'}, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    twitter   = forms.URLField(max_length=512, min_length=1, required=False, error_messages={'max_length': 'Please enter less characters'}, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    web       = forms.URLField(max_length=512, min_length=1, required=False, error_messages={'max_length': 'Please enter less characters'}, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    email     = forms.EmailField(required=True, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    image     = forms.ImageField(widget=AjaxClearableFileInput(), required=False)


