import python.common.helper as helper
from python.prohibition_web_service.config import Config
from flask import request, make_response, Blueprint
import logging
import logging.config
import base64
import json
import requests

logging.config.dictConfig(Config.LOGGING)
logging.warning('*** blueprint - misc_routes loaded ***')

bp = Blueprint('misc', __name__, url_prefix='/api/v1')


def _icbc_api_authorization() -> dict:
    encoded_bytes = base64.b64encode("{}:{}".format(Config.ICBC_API_USERNAME, Config.ICBC_API_PASSWORD).encode('utf-8'))
    return {
        "Authorization": 'Basic {}'.format(str(encoded_bytes, "utf-8")),
        "loginUserId": Config.ICBC_LOGIN_USER_ID
    }


@bp.route('/health')
def health():
    return make_response({'success': 'healthy'}, 200)


@bp.route('/configuration/impoundLotOperators', methods=['GET'])
def get_impound_lot_operators():
    """
    This returns a list of active impound lot operators
    TODO - replace json static file with call to database
    """
    if request.method == 'GET':
        data = helper.load_json_into_dict('python/prohibition_web_service/data/impound_lot_operators.json')
        response = make_response(data, 200)
        response.headers.add('Access-Control-Allow-Origin', Config.ACCESS_CONTROL_ALLOW_ORIGIN)
        return response


@bp.route('/configuration/countries', methods=['GET'])
def get_countries():
    """
    This returns a list of countries
    TODO - replace json static file with call to database
    """
    if request.method == 'GET':
        data = helper.load_json_into_dict('python/prohibition_web_service/data/countries.json')
        response = make_response(data, 200)
        response.headers.add('Access-Control-Allow-Origin', Config.ACCESS_CONTROL_ALLOW_ORIGIN)
        return response


@bp.route('/configuration/provinces', methods=['GET'])
def get_provinces():
    """
    This returns a list of provinces
    TODO - replace json static file with call to database
    """
    if request.method == 'GET':
        data = helper.load_json_into_dict('python/prohibition_web_service/data/provinces.json')
        response = make_response(data, 200)
        response.headers.add('Access-Control-Allow-Origin', Config.ACCESS_CONTROL_ALLOW_ORIGIN)
        return response


@bp.route('/configuration/jurisdictions', methods=['GET'])
def get_jurisdictions():
    """
    This returns a list of driver's license jurisdictions
    TODO - replace json static file with call to database
    """
    if request.method == 'GET':
        data = helper.load_json_into_dict('python/prohibition_web_service/data/jurisdictions.json')
        response = make_response(data, 200)
        response.headers.add('Access-Control-Allow-Origin', Config.ACCESS_CONTROL_ALLOW_ORIGIN)
        return response


@bp.route('/configuration/cities', methods=['GET'])
def get_cities():
    """
    This returns a list of BC city names
    TODO - replace json static file with call to database
    """
    if request.method == 'GET':
        data = helper.load_json_into_dict('python/prohibition_web_service/data/cities.json')
        response = make_response(data, 200)
        response.headers.add('Access-Control-Allow-Origin', Config.ACCESS_CONTROL_ALLOW_ORIGIN)
        return response


@bp.route('/configuration/colors', methods=['GET'])
def get_colors():
    """
    This returns a list of common car colors
    TODO - replace json static file with call to database
    """
    if request.method == 'GET':
        data = helper.load_json_into_dict('python/prohibition_web_service/data/car_colors.json')
        response = make_response(data, 200)
        response.headers.add('Access-Control-Allow-Origin', Config.ACCESS_CONTROL_ALLOW_ORIGIN)
        return response


@bp.route('/configuration/vehicles', methods=['GET'])
def get_vehicle_make_model():
    """
    This returns a list of vehicle make, model and years.
    The data from this endpoint is cached locally so the app can work offline.
    TODO - replace this list with an authoritative list from PrimeCorp
    """
    if request.method == 'GET':
        data = helper.load_json_into_dict('python/prohibition_web_service/data/vehicle_make_model.json')
        response = make_response(data, 200)
        response.headers.add('Access-Control-Allow-Origin', Config.ACCESS_CONTROL_ALLOW_ORIGIN)
        return response


@bp.route('/drivers/<string:dl_number>', methods=['GET'])
def get_driver(dl_number):
    if request.method == 'GET':
        url = "{}/drivers/{}".format(Config.ICBC_API_ROOT, dl_number)
        icbc_response = requests.get(url, headers=_icbc_api_authorization())
        response = make_response(icbc_response.json(), icbc_response.status_code)
        response.headers.add('Access-Control-Allow-Origin', Config.ACCESS_CONTROL_ALLOW_ORIGIN)
        return response


@bp.route('/vehicles/<string:plate_number>', methods=['GET'])
def get_vehicle(plate_number):
    if request.method == 'GET':
        url = "{}/vehicles?plateNumber={}".format(Config.ICBC_API_ROOT, plate_number)
        icbc_response = requests.get(url, headers=_icbc_api_authorization())
        if icbc_response.status_code == 200:
            response = make_response(icbc_response.json()[0], icbc_response.status_code)
        else:
            response = make_response({"error": "service unavailable"}, 500)
        response.headers.add('Access-Control-Allow-Origin', Config.ACCESS_CONTROL_ALLOW_ORIGIN)
        return response


@bp.route('/prohibitions', methods=['POST'])
def create_prohibition():
    if request.method == 'POST':
        # TODO - implement business logic
        #  - preliminary validation
        #  - mark prohibition_id has "served"
        #  - save to RabbitMQ
        logging.info(json.dumps(request.data))
        return make_response({"status": "success"}, 201)

