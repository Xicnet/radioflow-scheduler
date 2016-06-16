# -*- coding: UTF-8 -*-

from django import forms
from timeslot.fields import TextAreaField, SelectField
from django.forms import widgets
from timeslot.models import Program, Day, Config

from ajax_upload.widgets import AjaxClearableFileInput

class ProgramForm(forms.Form):
    def clean_name(self):
        data = self.cleaned_data['name']
        return data

    def clean_show_labels(self):
        data = self.cleaned_data['show_labels']
        return data

    def clean_image(self):
        image = self.cleaned_data['image']
        return image

    def clean_days(self):
        days = self.cleaned_data['days']
        return days

    days = Day.objects.all()

    name        = forms.CharField(label="Nombre", max_length=256, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (256 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input'}))
    moderator   = forms.CharField(label="Conduce", max_length=1024, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (1024 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input'}), help_text="(Opcional)")
    show_labels = forms.BooleanField(label="Mostrar etiquetas", required=False, initial=True)
    image       = forms.ImageField(label="Imagen", required=False, help_text="JPG/PNG a 320x125 o 640x250")
    description = TextAreaField(label="Detalle", max_length=1024, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (1024 max)'}, widget=forms.Textarea(attrs={'class':'suscription-textarea'}), help_text="1024 caracteres (Opcional)")
    days        = forms.ModelMultipleChoiceField(label="Dias", queryset=Day.objects.all(), widget=forms.CheckboxSelectMultiple)
    start       = forms.TimeField(label="Comienzo", required=True, help_text="Formato HH:MM. Ej: 12:30 o 00:30")
    end         = forms.TimeField(label="Fin", required=True, help_text="Formato HH:MM. Ej: 12:30 o 00:30")


class ConfigForm(forms.Form):
    def clean_station(self):
        data = self.cleaned_data['station']
        return data

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

    def clean_short_description(self):
        short_description = self.cleaned_data['short_description']
        return short_description

    def clean_description(self):
        description = self.cleaned_data['description']
        return description

    def clean_keywords(self):
        keywords = self.cleaned_data['keywords']
        return keywords

    station    = forms.CharField(label="Nombre de la radio", max_length=512, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (512 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input'}), help_text=u"Se utiliza en el gestor de programación (Radioflow Scheduler).")
    streamurl  = forms.CharField(label="URL Stream*", max_length=512, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (512 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input'}), help_text="URL del stream para conectar desde la app.")
    facebook   = forms.CharField(label="Facebook*", max_length=512, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (512 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input'}), help_text="Se utiliza en la pantalla principal de la app.")
    twitter    = forms.CharField(label="Twitter*", max_length=512, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (512 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input'}), help_text="Se utiliza en la pantalla principal de la app.")
    web        = forms.CharField(label="Web*", max_length=512, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (512 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input'}), help_text="Se utiliza en la pantalla principal de la app.")
    email      = forms.CharField(label="E-mail*", max_length=512, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (512 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input'}), help_text="Se utiliza en la pantalla principal de la app.")
    image      = forms.ImageField(label="Fondo", required=False, help_text="Se utiliza en la pantalla principal de la app.")
    image_del  = forms.BooleanField(label="Eliminar fondo", required=False, help_text="")
    logo       = forms.ImageField(label="Logo* (2048x2048)", required=False, help_text="Se utiliza en las tiendas de apps y en la pantalla principal de la app.")
    feature_graphic = forms.ImageField(label="Feature Graphic* (1024x500)", required=False, help_text="Se utiliza en la Play Store en caso de que ellos decidan promocionar tu app.")
    app_name   = forms.CharField(label=u"Nombre de la app* (max. 30 caracteres)", max_length=30, min_length=1, required=False, help_text="Se utiliza en las tiendas de apps.")
    short_description = forms.CharField(label=u"Descripcion corta* (max. 80 caracteres)", max_length=80, min_length=1, required=False, help_text="Se utiliza en la Play Store.")
    description       = forms.CharField(label=u"Descripcion larga* (max. 4000 caracteres)", max_length=4000, min_length=1, required=False, widget=forms.Textarea(), help_text="Se utiliza en las tiendas de apps.")
    keywords          = forms.CharField(label="Keywords*", max_length=512, min_length=1, required=False, help_text="Se utiliza en la App Store.")


