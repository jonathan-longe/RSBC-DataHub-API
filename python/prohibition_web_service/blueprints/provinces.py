from python.prohibition_web_service.config import Config
from flask import request, make_response, Blueprint
from python.prohibition_web_service.blueprints.common import basic_auth_required
import logging.config
import python.common.helper as helper


logging.config.dictConfig(Config.LOGGING)
logging.warning('*** provinces blueprint loaded ***')

bp = Blueprint('provinces', __name__, url_prefix='/api/v1/provinces')


@bp.route('/', methods=['GET'])
def index():
    """
    List all provinces
    """
    if request.method == 'GET':
        data = helper.load_json_into_dict('python/prohibition_web_service/data/provinces.json')
        response = make_response(data, 200)
        response.headers.add('Access-Control-Allow-Origin', Config.ACCESS_CONTROL_ALLOW_ORIGIN)
        return response


@bp.route('/<string:province_id>', methods=['GET'])
@basic_auth_required
def get(province_id):
    """
    Get a specific province
    """
    if request.method == 'GET':
        return make_response({"error: method not implemented"}, 405)


@bp.route('/', methods=['POST'])
@basic_auth_required
def create():
    """
    Save a new province
    """
    if request.method == 'POST':
        return make_response({"error: method not implemented"}, 405)


@bp.route('/<string:province_id>', methods=['PATCH'])
def update(province_id):
    """
    Update an province
    """
    if request.method == 'PATCH':
        return make_response({"error: method not implemented"}, 405)



