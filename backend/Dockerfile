FROM python:3.8-slim-buster

ENV PYTHONUNBUFFERED 1

WORKDIR /backend

COPY ./requirements.txt . 

COPY . .

RUN python3 -m pip install --upgrade pip && \
    pip install -r requirements.txt

CMD ./startup.sh
