from python.prohibition_web_service.config import Config
import python.common.helper as helper
from flask import request, make_response, Blueprint, jsonify
import logging.config
import json
from functools import wraps


logging.config.dictConfig(Config.LOGGING)
logging.warning('*** blueprint - prohibitions loaded ***')

bp = Blueprint('prohibitions', __name__, url_prefix='/api/v1/prohibitions')


def basic_auth_required(f):
    """
    Decorator that implements basic auth when added to a route
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


@bp.route('/<string:prohibition_type>', methods=['POST'])
@basic_auth_required
def create(prohibition_type):
    """
    Add batch of prohibition ids to the database
    """
    if request.method == 'POST':
        from python.prohibition_web_service import db
        from python.prohibition_web_service.models import ProhibitionIdLease
        try:
            prohibition_ids = request.get_json()
        except Exception as e:
            return make_response("bad payload", 400)
        prohibitions = []
        if isinstance(prohibition_ids, list):
            for prohibition in prohibition_ids:
                prohibitions.append(
                    ProhibitionIdLease(
                        prohibition_id=prohibition,
                        prohibition_type=prohibition_type,
                        lease_expiry=None,
                        served=False
                    ),)
            db.session.bulk_save_objects(prohibitions)
            db.session.commit()
            return make_response("ok", 200)


@bp.route('/<string:prohibition_type>/<string:prohibition_id>', methods=['PATCH'])
def update(prohibition_type, prohibition_id):
    """
    Receive a prohibition form and mark the prohibition as 'served'
    """
    if request.method == 'PATCH':
        from python.prohibition_web_service import db
        from python.prohibition_web_service.models import ProhibitionIdLease
        lease = db.session.query(ProhibitionIdLease) \
            .filter(ProhibitionIdLease.prohibition_type == prohibition_type) \
            .filter(ProhibitionIdLease.id == prohibition_id) \
            .first()
        lease.served = True
        db.session.commit()
        # TODO - save the prohibition data to a RabbitMQ
        logging.warning(json.dumps(request.get_json()))
        return make_response(ProhibitionIdLease.serialize(lease), 200)



