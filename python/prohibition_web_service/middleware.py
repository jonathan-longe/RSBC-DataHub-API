import logging
import json
import datetime
import pytz
import requests
from flask import jsonify, make_response
import base64
import jwt
from python.prohibition_web_service.models import db, Form
from python.prohibition_web_service.config import Config


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
        logging.debug("payload: " + json.dumps(payload))
    except Exception as e:
        return False, kwargs
    return payload is not None, kwargs


def get_authorization_header_from_request(**kwargs) -> tuple:
    request = kwargs.get('request')
    try:
        kwargs['auth_header'] = request.headers.get('Authorization').split(" ")
    except Exception as e:
        return False, kwargs
    return len(kwargs.get('auth_header')) == 2, kwargs


def get_token_from_authorization_header(**kwargs) -> tuple:
    auth_header = kwargs.get('auth_header')
    try:
        kwargs['access_token'] = auth_header[1]
    except Exception as e:
        kwargs['error'] = "keycloak authorization header is not valid: " + str(e)
        return False, kwargs
    return auth_header[0] == 'Bearer' and kwargs['access_token'] is not None, kwargs


def get_keycloak_certificates(**kwargs) -> tuple:
    try:
        jwks_client = jwt.PyJWKClient(Config.KEYCLOAK_CERTS_URL)
        kwargs['signing_key'] = jwks_client.get_signing_key_from_jwt(kwargs.get('access_token')).key
    except Exception as e:
        kwargs['error'] = str(e)
        return False, kwargs
    return True, kwargs


def decode_keycloak_access_token(**kwargs) -> tuple:
    access_token = kwargs.get('access_token')
    signing_key = kwargs.get('signing_key')
    try:
        kwargs['decoded_access_token'] = jwt.decode(access_token,
                                                    signing_key,
                                                    algorithms=[Config.KEYCLOAK_ALGORITHM],
                                                    audience=Config.KEYCLOAK_CLIENT_ID)
    except Exception as e:
        logging.warning(str(e))
        return False, kwargs
    return True, kwargs


def get_username_from_decoded_access_token(**kwargs) -> tuple:
    decoded_access_token = kwargs.get('decoded_access_token')
    try:
        kwargs['username'] = decoded_access_token['preferred_username']
    except Exception as e:
        kwargs['error'] = "preferred_username not present in decoded access token: " + str(e)
        return False, kwargs
    return True, kwargs


def list_all_forms(**kwargs) -> tuple:
    form_type = kwargs.get('form_type')
    try:
        all_forms = db.session.query(Form) \
            .filter(Form.form_type == form_type) \
            .filter(Form.username == kwargs['username']) \
            .all()
        kwargs['response'] = make_response(jsonify(Form.collection_to_dict(all_forms)))
    except Exception as e:
        logging.warning()
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
        logging.warning()
        return False, kwargs
    return True, kwargs


def get_icbc_api_authorization_header(**kwargs) -> tuple:
    username = kwargs.get('username')
    try:
        encoded_bytes = base64.b64encode("{}:{}".format(Config.ICBC_API_USERNAME, Config.ICBC_API_PASSWORD).encode('utf-8'))
        kwargs['icbc_header'] = {
            "Authorization": 'Basic {}'.format(str(encoded_bytes, "utf-8")),
            "loginUserId": username
        }
    except Exception as e:
        logging.warning("error creating ICBC authorization header")
        return False, kwargs
    return True, kwargs


def get_icbc_driver(**kwargs) -> tuple:
    url = "{}/drivers/{}".format(Config.ICBC_API_ROOT, kwargs.get('dl_number'))
    try:
        icbc_response = requests.get(url, headers=kwargs.get('icbc_header'))
        kwargs['response'] = make_response(icbc_response.json(), icbc_response.status_code)
    except Exception as e:
        return False, kwargs
    return True, kwargs


def get_icbc_vehicle(**kwargs) -> tuple:
    url = "{}/vehicles?plateNumber={}".format(Config.ICBC_API_ROOT, kwargs.get('plate_number'))
    try:
        icbc_response = requests.get(url, headers=kwargs.get('icbc_header'))
        kwargs['response'] = make_response(icbc_response.json(), icbc_response.status_code)
    except Exception as e:
        return False, kwargs
    return True, kwargs

