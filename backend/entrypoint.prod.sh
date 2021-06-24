#!/bin/sh

python manage.py makemigrations --no-input;
python manage.py migrate --no-input;
python manage.py collectstatic --no-input;

if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ]
then
    python manage.py createsuperuser \
        --noinput \
        --username $DJANGO_SUPERUSER_USERNAME \
        --email $DJANGO_SUPERUSER_EMAIL;
fi

gunicorn backend.wsgi:application -c gunicorn.conf.py
