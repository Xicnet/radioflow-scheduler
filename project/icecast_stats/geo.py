import os
import time
import maxminddb
import sys

# borrowed from: https://github.com/radiocicletta/morganfreeman
class GeoIP(object):
    #def __init__(self, ip="37.223.104.29"):
    def __init__(self):
        self.geodb = maxminddb.Reader('GeoLite2-City.mmdb')
        """
        iso, country = self.geoip(ip)
        print "iso, country, ip[0]"
        print iso, country
        """

    def geoip(self, ip):

        geo = self.geodb.get(ip)
        try:
            country = geo['country']['names']['en']
        except:
            country = ''
        try:
            iso = geo['country']['iso_code']
        except:
            iso = ''
        return iso, country

    def __ua_type(self, agent, agentlist):
        for exp in agentlist:
            if exp.search(agent):
                return True
        return False

