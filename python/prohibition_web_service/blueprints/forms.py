from python.prohibition_web_service.config import Config
import python.common.helper as helper
from flask import request, make_response, Blueprint, jsonify
from python.prohibition_web_service.blueprints.common import basic_auth_required
import logging.config
import json
from functools import wraps


logging.config.dictConfig(Config.LOGGING)
logging.warning('*** forms blueprint loaded ***')

bp = Blueprint('prohibitions', __name__, url_prefix='/api/v1/forms')


@bp.route('/<string:form_type>', methods=['GET'])
@basic_auth_required
def index(form_type):
    """
    List all forms for a user
    """
    if request.method == 'GET':
        # TODO - implement index() method
        pass


@bp.route('/<string:form_type>/<string:form_id>', methods=['GET'])
@basic_auth_required
def get(form_type, form_id):
    """
    Get a specific form
    """
    if request.method == 'GET':
        # TODO - implement get() method
        pass


@bp.route('/<string:form_type>', methods=['POST'])
@basic_auth_required
def create(form_type):
    """
    Save a new form
    """
    if request.method == 'POST':
        from python.prohibition_web_service import db, ProhibitionIdLease
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
                        form_type=form_type,
                        lease_expiry=None,
                        served=False
                    ),)
            db.session.bulk_save_objects(prohibitions)
            db.session.commit()
            return make_response("ok", 200)


@bp.route('/<string:form_type>/<string:form_id>', methods=['PATCH'])
def update(form_type, form_id):
    """
    Update an existing form
    """
    if request.method == 'PATCH':
        from python.prohibition_web_service import db, ProhibitionIdLease
        lease = db.session.query(ProhibitionIdLease) \
            .filter(ProhibitionIdLease.form_type == form_type) \
            .filter(ProhibitionIdLease.id == prohibition_id) \
            .first()
        lease.served = True
        db.session.commit()
        # TODO - save the prohibition data to a RabbitMQ
        logging.warning(json.dumps(request.get_json()))
        return make_response(ProhibitionIdLease.serialize(lease), 200)



