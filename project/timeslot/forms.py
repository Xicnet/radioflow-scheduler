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

    name        = forms.CharField(label="Nombre", max_length=256, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (256 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input form-control', 'placeholder':'Nombre'}))
    moderator   = forms.CharField(label="Conduce", max_length=1024, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (1024 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input form-control', 'placeholder':'Conduce (Opcional)'}), help_text="")
    show_labels = forms.BooleanField(label="Mostrar etiquetas", required=False, initial=True)
    image       = forms.ImageField(label="Imagen", required=False, help_text="Imagen | JPG/PNG | 320x125 o 640x250")
    description = TextAreaField(label="Detalle", max_length=1024, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (1024 max)'}, widget=forms.Textarea(attrs={'class':'suscription-textarea form-control', 'placeholder':'Descripción', 'style':'width: 100%; height: 125px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px; resize: vertical;'}), help_text="1024 caracteres (Opcional)")
    days        = forms.ModelMultipleChoiceField(label="Dias", queryset=Day.objects.all(), widget=forms.CheckboxSelectMultiple())
    start       = forms.TimeField(label="Comienzo", required=True, help_text="", widget=forms.TextInput(attrs={'class':'form-control datetimepicker','placeholder':'Formato HH:MM. Ej: 12:30 o 00:30','required':'required'}))
    end         = forms.TimeField(label="Fin", required=True, help_text="", widget=forms.TextInput(attrs={'class':'form-control datetimepicker','placeholder':'Formato HH:MM. Ej: 12:30 o 00:30','required':'required'}))


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

    station           = forms.CharField(label="Nombre de la radio", max_length=512, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (512 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input form-control'}), help_text=u"Se utiliza en el gestor de programación (Radioflow Scheduler).")
    streamurl         = forms.CharField(label="URL Stream*", max_length=512, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (512 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input form-control'}), help_text="URL del stream para conectar desde la app.")
    facebook          = forms.CharField(label="Facebook*", max_length=512, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (512 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input form-control'}), help_text="Se utiliza en la pantalla principal de la app.")
    twitter           = forms.CharField(label="Twitter*", max_length=512, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (512 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input form-control'}), help_text="Se utiliza en la pantalla principal de la app.")
    web               = forms.CharField(label="Web*", max_length=512, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (512 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input form-control'}), help_text="Se utiliza en la pantalla principal de la app.")
    email             = forms.CharField(label="E-mail*", max_length=512, min_length=1, required=False, error_messages={'max_length': 'Por favor, ingrese menos caracteres (512 max)'}, widget=forms.TextInput(attrs={'class':'suscription-input form-control'}), help_text="Se utiliza en la pantalla principal de la app.")
    image             = forms.ImageField(label="Fondo", required=False, help_text="Se utiliza en la pantalla principal de la app.")
    image_del         = forms.BooleanField(label="Eliminar fondo", required=False, help_text="")
    logo              = forms.ImageField(label="Logo sin alpha*", required=False, help_text="2048x2048 PNG 32-bit SIN alpha. Se utiliza en las tiendas de apps y en el ícono de la app.")
    logo_del          = forms.BooleanField(label="Eliminar logo sin alpha", required=False, help_text="")
    logo_alpha        = forms.ImageField(label="Logo con alpha*", required=False, help_text="2048x2048 PNG 32-bit CON alpha. Se utiliza en las tiendas de apps y en el ícono de la la app.")
    logo_alpha_del    = forms.BooleanField(label="Eliminar logo con alpha", required=False, help_text="")
    logo_home         = forms.ImageField(label="Logo Home con alpha*", required=False, help_text="280x90 PNG 32-bit CON alpha. Se utiliza en la pantalla principal de la app.")
    logo_home_del     = forms.BooleanField(label="Eliminar logo home con alpha", required=False, help_text="")
    feature_graphic   = forms.ImageField(label="Feature Graphic*", required=False, help_text=u"1024x500 JPG ó PNG 24-bit sin alpha. Se utiliza en la Play Store en caso de que ellos decidan promocionar tu app.")
    app_name          = forms.CharField(label=u"Nombre de la app* (max. 30 caracteres)", max_length=30, min_length=1, required=False, widget=forms.TextInput(attrs={'class':'form-control'}), help_text="Se utiliza en las tiendas de apps.")
    short_description = forms.CharField(label=u"Descripcion corta* (max. 80 caracteres)", max_length=80, min_length=1, required=False, widget=forms.TextInput(attrs={'class':'form-control'}), help_text="Se utiliza en la Play Store.")
    description       = forms.CharField(label=u"Descripcion larga* (max. 4000 caracteres)", max_length=4000, min_length=1, required=False, widget=forms.Textarea(attrs={'class':'form-control'}), help_text="Se utiliza en las tiendas de apps.")
    keywords          = forms.CharField(label="Keywords*", max_length=256, min_length=1, required=False, widget=forms.TextInput(attrs={'class':'form-control'}), help_text="Se utiliza en la App Store.")

