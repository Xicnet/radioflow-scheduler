from django.conf import settings
import facebook

from urlparse import urlparse


def get_fb_profile_url(url):
    name = urlparse(url).path.strip("/")
    graph = facebook.GraphAPI(access_token=settings.FB_ACCESS_TOKEN)
    return "fb://page/%s" % graph.get_object(name)['id']

def parse_tw_url(url):
    return urlparse(url).path.strip("/")

