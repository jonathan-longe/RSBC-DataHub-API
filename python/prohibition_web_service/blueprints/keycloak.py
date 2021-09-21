from python.prohibition_web_service.config import Config
from flask import request, make_response, Blueprint
from python.prohibition_web_service.blueprints.common import basic_auth_required
import logging.config
import python.common.helper as helper


logging.config.dictConfig(Config.LOGGING)
logging.info('*** keycloak blueprint loaded ***')

bp = Blueprint('keycloak', __name__, url_prefix='/api/v1')


@bp.route('/keycloak', methods=['GET'])
def index():
    """
    Keycloak config
    """
    if request.method == 'GET':
        config = {
            "realm": Config.KEYCLOAK_REALM,
            "url": Config.KEYCLOAK_AUTH_URL,
            "clientId": Config.KEYCLOAK_CLIENT_ID
        }
        return make_response(config, 200)

