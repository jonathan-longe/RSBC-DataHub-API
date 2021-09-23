import logging
import json
import datetime
from python.prohibition_web_service.models import db, Form


def validate_update(**kwargs) -> tuple:
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
        .filter(Form.served_timestamp == None) \
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


def mark_form_as_served(**kwargs) -> tuple:
    logging.debug('inside mark_form_as_served()')
    form_type = kwargs.get('form_type')
    username = kwargs.get('username')
    form_id = kwargs.get('form_id')
    form = db.session.query(Form) \
        .filter(Form.form_type == form_type) \
        .filter(Form.username == username) \
        .filter(Form.served_timestamp == None) \
        .filter(Form.id == form_id) \
        .first()
    if form is None:
        logging.warning('User, {}, cannot update {} as served'.format(username, form_id))
        return False, kwargs
    form.served_timestamp = datetime.datetime.now()
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
        logging.debug("payload: " + json.dumps(payload))
    except Exception as e:
        return False, kwargs
    return payload is not None, kwargs
