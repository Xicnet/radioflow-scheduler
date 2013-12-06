from django import forms
from timeslot.fields import TextAreaField, SelectField
from django.forms import widgets
from timeslot.models import Program, Day

from ajax_upload.widgets import AjaxClearableFileInput

class ProgramForm(forms.Form):
    def clean_name(self):
        data = self.cleaned_data['name']
        #streamer = Streamer.objects.filter(name=data)
        #if streamer.count() > 0:
        #    raise forms.ValidationError("You can only register one time!")
        return data

    def clean_image(self):
        image = self.cleaned_data['image']
        return image

    def clean_days(self):
        days = self.cleaned_data['days']
        return days

    days = Day.objects.all()

    name      = forms.CharField(label="Nombre", max_length=256, min_length=1, required=True, error_messages={'max_length': 'Por favor, ingrese menos caracteres (256 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    description = TextAreaField(label="Detalle", max_length=1024, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (1024 max)'}, widget=forms.Textarea(attrs={'class':'suscription-textarea'}), help_text="1024 caracteres")
    moderator = forms.CharField(label="Conduce", max_length=1024, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (1024 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    #facebook  = forms.URLField(max_length=512, min_length=1, required=False, error_messages={'max_length': 'Please enter less characters'}, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    #twitter   = forms.URLField(max_length=512, min_length=1, required=False, error_messages={'max_length': 'Please enter less characters'}, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    #web       = forms.URLField(max_length=512, min_length=1, required=False, error_messages={'max_length': 'Please enter less characters'}, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    #email     = forms.EmailField(required=True, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    #days      = forms.SelectMultiple(choices=('1980', '1981', '1982'))
    days      = forms.ModelMultipleChoiceField(label="Dias", queryset=Day.objects.all(), widget=forms.CheckboxSelectMultiple)
    image     = forms.ImageField(label="Imagen", required=False)
    start     = forms.TimeField(label="Comienzo", required=False)
    end       = forms.TimeField(label="Fin", required=False)


