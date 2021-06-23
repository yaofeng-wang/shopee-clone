FROM node

WORKDIR /nodebuild

ADD frontend /nodebuild

RUN npm install && npm run build

FROM python:3.8-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /backend

COPY ./requirements.txt . 

RUN python3 -m pip install --upgrade pip && \
    pip install -r requirements.txt

COPY . /backend

COPY --from=0 /nodebuild/build /backend/frontend/
