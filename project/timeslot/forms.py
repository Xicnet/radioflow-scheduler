from django import forms
from timeslot.fields import TextAreaField, SelectField
from django.forms import widgets
from timeslot.models import Program, Day, Config

from ajax_upload.widgets import AjaxClearableFileInput

class ProgramForm(forms.Form):
    def clean_name(self):
        data = self.cleaned_data['name']
        return data

    def clean_image(self):
        image = self.cleaned_data['image']
        return image

    def clean_days(self):
        days = self.cleaned_data['days']
        return days

    days = Day.objects.all()

    name      = forms.CharField(label="Nombre", max_length=256, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (256 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    moderator = forms.CharField(label="Conduce", max_length=1024, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (1024 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input'}), help_text="(Opcional)")
    image     = forms.ImageField(label="Imagen", required=False, help_text="JPG/PNG a 320x125 o 640x250")
    description = TextAreaField(label="Detalle", max_length=1024, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (1024 max)'}, widget=forms.Textarea(attrs={'class':'suscription-textarea'}), help_text="1024 caracteres (Opcional)")
    days      = forms.ModelMultipleChoiceField(label="Dias", queryset=Day.objects.all(), widget=forms.CheckboxSelectMultiple)
    start     = forms.TimeField(label="Comienzo", required=True, help_text="Formato HH:MM. Ej: 12:30 o 00:30")
    end       = forms.TimeField(label="Fin", required=True, help_text="Formato HH:MM. Ej: 12:30 o 00:30")


class ConfigForm(forms.Form):
    def clean_streamurl(self):
        data = self.cleaned_data['streamurl']
        return data

    def clean_image(self):
        image = self.cleaned_data['image']
        return image

    def clean_logo(self):
        logo = self.cleaned_data['logo']
        return logo

    def clean_facebook(self):
        facebook = self.cleaned_data['facebook']
        return facebook

    def clean_twitter(self):
        twitter = self.cleaned_data['twitter']
        return twitter

    def clean_web(self):
        web = self.cleaned_data['web']
        return web

    def clean_email(self):
        email = self.cleaned_data['email']
        return email

    streamurl  = forms.CharField(label="URL Stream", max_length=512, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (512 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    facebook   = forms.CharField(label="Facebook", max_length=512, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (512 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    twitter    = forms.CharField(label="Twitter", max_length=512, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (512 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    web        = forms.CharField(label="Web", max_length=512, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (512 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    email      = forms.CharField(label="E-mail", max_length=512, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (512 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    image      = forms.ImageField(label="Fondo", required=False, help_text="")
    logo       = forms.ImageField(label="Logo", required=False, help_text="")
    image_del  = forms.BooleanField(label="Eliminar fondo", required=False, help_text="")


