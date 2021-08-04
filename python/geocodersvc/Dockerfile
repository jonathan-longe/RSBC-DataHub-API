FROM python:3.7.3-stretch
RUN [ "pwd" ]
RUN [ "ls", "-R" ]

COPY src/ ${APP_ROOT}/src/
RUN [ "echo" , "repo source files copied" ]

RUN source /opt/app-root/etc/scl_enable && \
    set -x && \
    pip install -U pip setuptools wheel && \
    sha256sum "${APP_ROOT}/src/geocoder/requirements.txt" > ${APP_ROOT}/requirements.sha256  && \
    cd ${APP_ROOT}/src/geocoder && pip install -r requirements.txt

RUN [ "echo" , "requirements installed" ]
WORKDIR ${APP_ROOT}
RUN [ "pwd" ]
RUN [ "ls", "-R" ]

RUN ["python", "-m", "pytest", "src/tests"]

#TODO - Add worker processes to gunicorn below
CMD [ "gunicorn", "--error-logfile", "-", "--bind", "0.0.0.0:5000", "--pythonpath", "src/geocoder", "wsgi" ]

