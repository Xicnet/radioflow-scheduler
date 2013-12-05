from django import forms
from django.core import validators
from django.utils.encoding import smart_unicode, smart_str

class TextAreaField(forms.CharField):
    """
        This new field will replace any incomming \r\n with an \n
    """
    def to_python(self, value):
        "Returns a Unicode object."
        if value in validators.EMPTY_VALUES:
            return u''
        else:
            new_value = value.replace('\r\n', '\n')
        return smart_unicode(new_value)

class SelectField(forms.IntegerField):
    """
        This new field will replace any incomming \r\n with an \n
    """
    def to_python(self, value):
        "Returns a Unicode object."
        if value in validators.EMPTY_VALUES:
            return None
        else:
            return int(value)
