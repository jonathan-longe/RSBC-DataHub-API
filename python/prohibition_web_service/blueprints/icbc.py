from python.prohibition_web_service.config import Config
from flask import request, make_response, Blueprint
import logging.config
import base64
import requests

logging.config.dictConfig(Config.LOGGING)
logging.info('*** icbc blueprint loaded ***')

bp = Blueprint('icbc', __name__, url_prefix='/api/v1/icbc')


def _icbc_api_authorization(username) -> dict:
    encoded_bytes = base64.b64encode("{}:{}".format(Config.ICBC_API_USERNAME, Config.ICBC_API_PASSWORD).encode('utf-8'))
    return {
        "Authorization": 'Basic {}'.format(str(encoded_bytes, "utf-8")),
        "loginUserId": username
    }


@bp.route('/drivers/<string:dl_number>', methods=['GET'])
def get_driver(dl_number):
    if request.method == 'GET':
        username = 'usr'  # TODO - remove before flight
        url = "{}/drivers/{}".format(Config.ICBC_API_ROOT, dl_number)
        icbc_response = requests.get(url, headers=_icbc_api_authorization(username))
        response = make_response(icbc_response.json(), icbc_response.status_code)
        response.headers.add('Access-Control-Allow-Origin', Config.ACCESS_CONTROL_ALLOW_ORIGIN)
        return response


@bp.route('/vehicles/<string:plate_number>', methods=['GET'])
def get_vehicle(plate_number):
    if request.method == 'GET':
        username = 'usr'  # TODO - remove before flight
        url = "{}/vehicles?plateNumber={}".format(Config.ICBC_API_ROOT, plate_number)
        icbc_response = requests.get(url, headers=_icbc_api_authorization(username))
        if icbc_response.status_code == 200:
            response = make_response(icbc_response.json()[0], icbc_response.status_code)
        else:
            response = make_response({"error": "service unavailable"}, 500)
        response.headers.add('Access-Control-Allow-Origin', Config.ACCESS_CONTROL_ALLOW_ORIGIN)
        return response
