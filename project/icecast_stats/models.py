from django.db import models

class IcecastLog(models.Model):
    datetime_start = models.DateTimeField(blank=True, null=True)
    datetime_end   = models.DateTimeField(blank=True, null=True)
    ip             = models.CharField(max_length=20)
    country_code   = models.CharField(max_length=4, blank=True, null=True)
    mount          = models.CharField(max_length=90)
    status_code    = models.IntegerField(blank=True, null=True)
    duration       = models.IntegerField(blank=True, null=True)
    sent_bytes     = models.IntegerField(blank=True, null=True)
    agent          = models.CharField(max_length=200, blank=True, null=True)
    referer        = models.CharField(max_length=400, blank=True, null=True)
    server         = models.CharField(max_length=50, blank=True, null=True)
    auth_user      = models.CharField(max_length=20, blank=True, null=True)
    auth_pass      = models.CharField(max_length=20, blank=True, null=True)

    def __unicode__(self):
        return self.mount

