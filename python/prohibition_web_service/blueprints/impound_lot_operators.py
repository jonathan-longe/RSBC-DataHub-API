from python.prohibition_web_service.config import Config
from flask import request, make_response, Blueprint
from python.prohibition_web_service.blueprints.common import basic_auth_required
import logging.config
import python.common.helper as helper


logging.config.dictConfig(Config.LOGGING)
logging.info('*** impound lot operators blueprint loaded ***')

bp = Blueprint('impound_lot_operators', __name__, url_prefix='/api/v1/impound_lot_operators')


@bp.route('/', methods=['GET'])
def index():
    """
    List all impound lot operators
    """
    if request.method == 'GET':
        data = helper.load_json_into_dict('python/prohibition_web_service/data/impound_lot_operators.json')
        response = make_response(data, 200)
        response.headers.add('Access-Control-Allow-Origin', Config.ACCESS_CONTROL_ALLOW_ORIGIN)
        return response


@bp.route('/<string:ilo_id>', methods=['GET'])
@basic_auth_required
def get(form_type, ilo_id):
    """
    Get a specific impound lot operator
    """
    if request.method == 'GET':
        return make_response({"error: method not implemented"}, 405)


@bp.route('/', methods=['POST'])
@basic_auth_required
def create():
    """
    Save a new impound lot operators
    """
    if request.method == 'POST':
        return make_response({"error: method not implemented"}, 405)


@bp.route('/<string:ilo_id>', methods=['PATCH'])
def update(ilo_id):
    """
    Update an existing impound lot operator
    """
    if request.method == 'PATCH':
        return make_response({"error: method not implemented"}, 405)



