import logging
import json
import datetime
import pytz
from flask import jsonify, make_response
from python.prohibition_web_service.models import db, Form


def validate_update(**kwargs) -> tuple:
    return True, kwargs


def log_payload_to_splunk(**kwargs) -> tuple:
    request = kwargs.get('request')
    # TODO - remove before flight - not authorized to log form data yet
    logging.info("payload: | {}".format(request.get_data()))
    return True, kwargs


def lease_a_form_id(**kwargs) -> tuple:
    logging.debug('inside lease_a_form_id()')
    form_type = kwargs.get('form_type')
    username = kwargs.get('username')
    form = db.session.query(Form) \
        .filter(Form.form_type == form_type) \
        .filter(Form.username == None) \
        .first()
    if form is None:
        logging.warning('Insufficient unique ids available for {}'.format(form_type))
        return False, kwargs
    form.lease(username)
    try:
        db.session.commit()
    except Exception as e:
        return False, kwargs
    kwargs['response_dict'] = Form.serialize(form)
    return True, kwargs


def renew_form_id_lease(**kwargs) -> tuple:
    logging.debug('inside renew_form_id_lease()')
    form_type = kwargs.get('form_type')
    username = kwargs.get('username')
    form_id = kwargs.get('form_id')
    form = db.session.query(Form) \
        .filter(Form.form_type == form_type) \
        .filter(Form.username == username) \
        .filter(Form.printed_timestamp == None) \
        .filter(Form.id == form_id) \
        .first()
    if form is None:
        logging.warning('User, {}, cannot renew the lease on {} form'.format(username, form_id))
        return False, kwargs
    form.lease(username)
    try:
        db.session.commit()
    except Exception as e:
        return False, kwargs
    kwargs['response_dict'] = Form.serialize(form)
    return True, kwargs


def mark_form_as_printed(**kwargs) -> tuple:
    logging.debug('inside mark_form_as_served()')
    form_type = kwargs.get('form_type')
    username = kwargs.get('username')
    form_id = kwargs.get('form_id')
    form = db.session.query(Form) \
        .filter(Form.form_type == form_type) \
        .filter(Form.username == username) \
        .filter(Form.id == form_id) \
        .first()
    if form is None:
        logging.warning('{}, cannot update {} - {} as printed'.format(
            username, form_type, form_id))
        return False, kwargs
    tz = pytz.timezone('America/Vancouver')
    form.printed_timestamp = datetime.datetime.now(tz)
    try:
        db.session.commit()
    except Exception as e:
        return False, kwargs
    kwargs['response_dict'] = Form.serialize(form)
    return True, kwargs


def request_contains_a_payload(**kwargs) -> tuple:
    request = kwargs.get('request')
    try:
        payload = request.get_json()
        kwargs['payload'] = payload
        logging.debug("payload: " + json.dumps(payload))
    except Exception as e:
        return False, kwargs
    return payload is not None, kwargs


def list_all_forms(**kwargs) -> tuple:
    form_type = kwargs.get('form_type')
    username = kwargs.get('username')
    logging.debug("inside list_all_forms() {} {}".format(username, form_type))
    try:
        all_forms = db.session.query(Form) \
            .filter(Form.form_type == form_type) \
            .filter(Form.username == kwargs['username']) \
            .all()
        kwargs['response'] = make_response(jsonify(Form.collection_to_dict(all_forms)))
    except Exception as e:
        logging.warning(str(e))
        return False, kwargs
    return True, kwargs


def get_a_form(**kwargs) -> tuple:
    form_type = kwargs.get('form_type')
    form_id = kwargs.get('form_id')
    try:
        form = db.session.query(Form) \
            .filter(Form.form_type == form_type) \
            .filter(Form.id == form_id) \
            .filter(Form.username == kwargs['username']) \
            .first()
        kwargs['response'] = make_response(jsonify(form), 200)
    except Exception as e:
        logging.warning(str(e))
        return False, kwargs
    return True, kwargs


