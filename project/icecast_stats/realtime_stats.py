__version__ = "0.1"
__author__ = "radiocicletta <radiocicletta@gmail.com>"

# borrowed from: https://github.com/radiocicletta/morganfreeman

import threading
from SocketServer import ThreadingTCPServer
import logging
import urllib2
from urllib import unquote
import re
import mimetypes
import os
import sys 
import json
from StringIO import StringIO
from geo import GeoIP

logger = logging.getLogger('icecast.daemon')

ICECAST_V_2_3 = '2.3.'
ICECAST_V_2_4 = '2.4.'
ICECAST_V_KH = '-kh'


class StatsCollector():

    def __init__(self, host, user, pw, realm, mount):
        self.host = host
        self.user = user
        self.pw = pw
        self.realm = realm
        self.mount = mount
        self.geo = GeoIP()

    def run(self):
        logger.debug("launched StatsCollector Instance")
        try:
            result = urllib2.urlopen(self.host + "/server_version.xsl")
        except Exception as e:
            print e
            logger.error("Failed update: %s", e)
            result = None
        resultstr = result.read()
        server_info = dict(
            re.findall(
                '<tr[^>]*>[\r\s]*<td[^>]*>([^\r<>]*?)</td>[\s\r]*'
                '<td[^>]*>([^\r<>]*?)</td>',
                resultstr)
            )   
        self.server_version = re.match("Icecast (.*)", server_info['Version']).groups()[0]

        if True:
            auth_handler = urllib2.HTTPBasicAuthHandler()
            auth_handler.add_password(
                realm=self.realm,
                uri=self.host + "/admin/",
                user=self.user,
                passwd=self.pw)
            auth_handler_mounts = urllib2.HTTPBasicAuthHandler()
            auth_handler_mounts.add_password(
                realm=self.realm,
                uri=self.host + "/admin/listmounts.xsl",
                user=self.user,
                passwd=self.pw)
            opener_mounts = urllib2.build_opener(auth_handler_mounts)
            urllib2.install_opener(opener_mounts)
            # 1. retrieve all the current mount points
            # 2. for each mount point
            #   gather information about listeners
            #   store in database
            try:
                result = urllib2.urlopen(self.host + "/admin/listmounts.xsl")
            except Exception as e:
                logger.error("Failed update: %s", e)
                result = None

            if not result:
                return

            mountpoints = re.findall(
                "listclients\.xsl\?mount=/([^\"]*)", result.read())
            #for mount in mountpoints:
            if self.mount in mountpoints:
                h_m = urllib2.HTTPBasicAuthHandler()
                h_m.add_password(
                    realm=self.realm,
                    uri=self.host + "/admin/listclients.xsl?mount=/" + self.mount,
                    user=self.user,
                    passwd=self.pw)
                o_m = urllib2.build_opener(h_m)
                urllib2.install_opener(o_m)
                try:
                    result = urllib2.urlopen(
                        self.host + "/admin/listclients.xsl?mount=/" + self.mount)
                except:
                    logger.error("skipping %s", self.mount)
                    #continue

                resultstr = result.read()
                try:
                    # the latest (fourth in vanilla, third in -kh) table
                    # on listclients.xls is the relevant one
                    table = re.findall(
                        "<table[^>]*>([^\r]*?)</table>", resultstr)[-1]
                except:
                    # 2.4.0
                    _table = re.findall(
                        '<table[^>]*class="colortable"[^>]*>([^\r]*?)</table>', resultstr)
                    if not _table:
                        #continue
                        pass
                    table = _table[0]
                listeners = re.findall("<tr[^>]*>([^\r]*?)</tr>", table)

                if ICECAST_V_KH in self.server_version:
                    rowskip = 0 
                else:
                    rowskip = 1 
                # in icecast vanilla, first row is the
                # table header. in -kh, the header is enclosed in <thead>
                # without use of <tr>
                logger.debug("registering %d entries", len(listeners) - rowskip)
                listener_details = []
                for listener in listeners[rowskip:]:
                    fields = re.findall("<td[^>]*>([^\r]*?)</td>", listener)
                    if not ICECAST_V_KH in self.server_version: # vanilla
                        # fields[0]: IP
                        # fields[1]: Seconds since connection
                        # fields[2]: user-agent
                        # fields[3]: action
                        #print self.mount, fields[0], int(fields[1]), fields[2], self.geo.geoip(fields[0])
                        listener_details.append({'mount': self.mount, 'ip': fields[0], 'duration': int(fields[1]), 'user_agent': fields[2], 'country': self.geo.geoip(fields[0])})
                    else:
                        # fields[0]: IP
                        # fields[1]: Seconds since connection
                        # fields[2]: lag
                        # fields[3]: user-agent
                        # fields[4]: action
                        #print self.mount, fields[0], int(fields[1]), fields[3], self.geo.geoip(fields[0])
                        listener_details.append({'mount': self.mount, 'ip': fields[0], 'duration': int(fields[1]), 'user_agent': fields[3], 'country': self.geo.geoip(fields[0])})
                return listener_details
