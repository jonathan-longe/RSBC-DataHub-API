from python.prohibition_web_service.config import Config
from flask import request, make_response, Blueprint
from python.prohibition_web_service.blueprints.common import basic_auth_required
import logging.config
import python.common.helper as helper


logging.config.dictConfig(Config.LOGGING)
logging.info('*** jurisdictions blueprint loaded ***')

bp = Blueprint('jurisdictions', __name__, url_prefix='/api/v1/jurisdictions')


@bp.route('/', methods=['GET'])
def index():
    """
    List all driver's license jurisdictions
    """
    if request.method == 'GET':
        data = helper.load_json_into_dict('python/prohibition_web_service/data/jurisdictions.json')
        response = make_response(data, 200)
        response.headers.add('Access-Control-Allow-Origin', Config.ACCESS_CONTROL_ALLOW_ORIGIN)
        return response


@bp.route('/<string:jurisdiction_id>', methods=['GET'])
@basic_auth_required
def get(jurisdiction_id):
    """
    Get a specific jurisdiction
    """
    if request.method == 'GET':
        return make_response({"error: method not implemented"}, 405)


@bp.route('/', methods=['POST'])
@basic_auth_required
def create():
    """
    Save a new jurisdiction
    """
    if request.method == 'POST':
        return make_response({"error: method not implemented"}, 405)


@bp.route('/<string:jurisdiction_id>', methods=['PATCH'])
def update(jurisdiction_id):
    """
    Update an jurisdiction
    """
    if request.method == 'PATCH':
        return make_response({"error: method not implemented"}, 405)



