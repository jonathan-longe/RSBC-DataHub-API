from functools import wraps
import logging
from flask import jsonify, request
import python.common.helper as helper
from python.prohibition_web_service.config import Config


def basic_auth_required(f):
    """
    Decorator that implements basic auth
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not helper.check_credentials(
                Config.ADMIN_USERNAME, Config.ADMIN_PASSWORD, auth.username, auth.password):
            logging.warning("Request denied - unauthorized - IP Address: {}".format(request.remote_addr))
            message = {'error': 'Unauthorized'}
            resp = jsonify(message)
            resp.status_code = 401
            return resp
        return f(*args, **kwargs)
    return decorated
