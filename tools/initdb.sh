bin/django syncdb --noinput
bin/django syncdb --migrate
bin/django loaddata fixture/auth.user.json
bin/django loaddata fixture/timeslot.day.json
bin/django loaddata fixture/timeslot.program.json
