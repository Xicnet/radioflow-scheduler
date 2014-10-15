bin/django syncdb --noinput
bin/django syncdb --migrate
bin/django loaddata fixture/auth.user.admin.json
bin/django loaddata fixture/timeslot.day.json
#bin/django loaddata fixture/timeslot.program.json
#bin/django loaddata fixture/timeslot.config.json
if [ "`hostname`" == "xere" ]
then
	bin/django loaddata fixture/sites.xere.json
fi
