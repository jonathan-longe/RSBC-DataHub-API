from python.prohibition_web_service.config import Config
from flask import request, make_response, Blueprint
from python.prohibition_web_service.blueprints.common import basic_auth_required
import logging.config
import python.common.helper as helper


logging.config.dictConfig(Config.LOGGING)
logging.warning('*** vehicles blueprint loaded ***')

bp = Blueprint('vehicles', __name__, url_prefix='/api/v1/vehicles')


@bp.route('/', methods=['GET'])
def index():
    """
    This returns a list of vehicle make, model and years.
    TODO - replace this list with an authoritative list from PrimeCorp
    """
    if request.method == 'GET':
        data = helper.load_json_into_dict('python/prohibition_web_service/data/vehicle_make_model.json')
        response = make_response(data, 200)
        response.headers.add('Access-Control-Allow-Origin', Config.ACCESS_CONTROL_ALLOW_ORIGIN)
        return response


@bp.route('/<string:vehicle_id>', methods=['GET'])
@basic_auth_required
def get(vehicle_id):
    """
    Get a specific vehicle
    """
    if request.method == 'GET':
        return make_response({"error: method not implemented"}, 405)


@bp.route('/', methods=['POST'])
@basic_auth_required
def create():
    """
    Save a new vehicle
    """
    if request.method == 'POST':
        return make_response({"error: method not implemented"}, 405)


@bp.route('/<string:vehicle_id>', methods=['PATCH'])
def update(vehicle_id):
    """
    Update a vehicle
    """
    if request.method == 'PATCH':
        return make_response({"error: method not implemented"}, 405)



