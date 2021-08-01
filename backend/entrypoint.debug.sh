#!/bin/sh

pip install debugpy -t /tmp;
pip install django-debug-toolbar;

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

python /tmp/debugpy --wait-for-client --listen 0.0.0.0:5678 manage.py runserver 0.0.0.0:8000 --nothreading --noreload
