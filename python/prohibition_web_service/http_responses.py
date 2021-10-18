from flask import make_response
import logging


def successful_create_response(**kwargs) -> tuple:
    response_dict = kwargs.get('response_dict')
    kwargs['response'] = make_response(response_dict, 201)
    return True, kwargs


def successful_update_response(**kwargs) -> tuple:
    response_dict = kwargs.get('response_dict')
    kwargs['response'] = make_response(response_dict, 200)
    return True, kwargs


def server_error_response(**kwargs) -> tuple:
    kwargs['response'] = make_response({'error': 'server error'}, 500)
    return True, kwargs


def bad_request_response(**kwargs) -> tuple:
    kwargs['response'] = make_response({'error': 'bad request'}, 400)
    return True, kwargs


def record_not_found(**kwargs) -> tuple:
    kwargs['response'] = make_response({'error': 'record not found'}, 400)
    return True, kwargs


def unauthorized(**kwargs) -> tuple:
    kwargs['response'] = make_response({'error': 'unauthorized'}, 401)
    return True, kwargs


def unable_to_retrieve_keycloak_certificates(**kwargs) -> tuple:
    logging.warning("unable to retrieve keycloak certificates")
    kwargs['response'] = make_response({'error': 'unable to retrieve keycloak certificates'}, 500)
    return True, kwargs


def keycloak_token_not_valid(**kwargs) -> tuple:
    logging.warning("keycloak access token not valid")
    kwargs['response'] = make_response({'error': 'token not valid'}, 401)
    return True, kwargs


def keycloak_no_username(**kwargs) -> tuple:
    logging.warning("decoded keycloak token has no username")
    kwargs['response'] = make_response({'error': 'server error'}, 500)
    return True, kwargs
