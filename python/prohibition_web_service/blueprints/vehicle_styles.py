from python.prohibition_web_service.config import Config
from flask import request, make_response, Blueprint
from flask_cors import CORS
from python.prohibition_web_service.blueprints.common import basic_auth_required
import logging.config
import python.common.helper as helper


logging.config.dictConfig(Config.LOGGING)
logging.info('*** vehicle styles blueprint loaded ***')

bp = Blueprint('vehicle_styles', __name__, url_prefix='/api/v1')
CORS(bp, resources={"/api/v1/vehicle_styles": {"origins": Config.ACCESS_CONTROL_ALLOW_ORIGIN}})


@bp.route('/vehicle_styles', methods=['GET'])
def index():
    """
    List all cities
    """
    if request.method == 'GET':
        data = helper.load_json_into_dict('python/prohibition_web_service/data/vehicle_styles.json')
        return make_response(data, 200)


@bp.route('/vehicle_styles/<string:city_id>', methods=['GET'])
@basic_auth_required
def get(city_id):
    """
    Get a specific city
    """
    if request.method == 'GET':
        return make_response({"error: method not implemented"}, 405)


@bp.route('/vehicle_styles', methods=['POST'])
@basic_auth_required
def create():
    """
    Save a new city
    """
    if request.method == 'POST':
        return make_response({"error: method not implemented"}, 405)


@bp.route('/vehicle_styles/<string:city_id>', methods=['PATCH'])
@basic_auth_required
def update(city_id):
    """
    Update a city
    """
    if request.method == 'PATCH':
        return make_response({"error: method not implemented"}, 405)



