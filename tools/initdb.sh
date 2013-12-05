bin/django syncdb --noinput
bin/django loaddata fixture/auth.user.json
bin/django loaddata fixture/timeslot.program.json
