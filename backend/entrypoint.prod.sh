#!/bin/sh

python manage.py makemigrations --no-input;
python manage.py migrate --no-input;

gunicorn backend.wsgi:application -c gunicorn.conf.py