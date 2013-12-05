#!/bin/bash
/etc/init.d/postfix stop
python -m smtpd -n -c DebuggingServer localhost:25
