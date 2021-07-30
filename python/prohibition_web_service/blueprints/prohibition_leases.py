from python.prohibition_web_service.config import Config
from flask import request, make_response, Blueprint
import logging.config
import json
from datetime import datetime, timedelta


logging.config.dictConfig(Config.LOGGING)
logging.warning('*** blueprint - prohibition_leases loaded ***')

bp = Blueprint('leases', __name__, url_prefix='/api/v1/prohibitions/leases')


@bp.route('/<string:prohibition_type>', methods=['GET'])
def index(prohibition_type):
    """
    Get a list of prohibition leases
    """
    if request.method == 'GET':
        from python.prohibition_web_service import db
        from python.prohibition_web_service.models import ProhibitionIdLease
        leases = db.session.query(ProhibitionIdLease)\
            .filter(ProhibitionIdLease.prohibition_type == prohibition_type).all()
        # TODO - need to paginate or limit records returned
        data = list()
        for lease in leases:
            data.append(ProhibitionIdLease.serialize(lease))
        return make_response(data, 200)


@bp.route('/<string:prohibition_type>', methods=['POST'])
def create(prohibition_type):
    """
    Lease a block of prohibition ids
    """
    if request.method == 'POST':
        from python.prohibition_web_service import db
        results = _get_block_of_prohibition_ids(
            Config.NUMBER_OF_PROHIBITION_IDS_IN_BLOCK,
            prohibition_type, db)
        return make_response(results, 200)


@bp.route('/<string:prohibition_type>', methods=['PATCH'])
def update(prohibition_type):
    """
    Renew a block of prohibitions by submitting a block of prohibition ids
    as a payload
    """
    if request.method == 'PATCH':
        from python.prohibition_web_service import db
        try:
            prohibition_ids = request.get_json()
        except Exception as e:
            return make_response("bad payload", 400)
        renewals = _renew_prohibition_ids(prohibition_ids, prohibition_type, db)
        if len(renewals) < Config.NUMBER_OF_PROHIBITION_IDS_IN_BLOCK:
            logging.warning('within if statement')
            results = _get_block_of_prohibition_ids(
                Config.NUMBER_OF_PROHIBITION_IDS_IN_BLOCK - len(renewals),
                prohibition_type, db)
            return make_response(results + renewals, 200)
        return make_response(renewals, 200)


def _get_block_of_prohibition_ids(number_ids_required: int, prohibition_type: str, db):
    from python.prohibition_web_service.models import ProhibitionIdLease
    leases = db.session.query(ProhibitionIdLease) \
        .filter(ProhibitionIdLease.prohibition_type == prohibition_type) \
        .filter(ProhibitionIdLease.served == False, ProhibitionIdLease.lease_expiry == None) \
        .limit(number_ids_required) \
        .all()
    today = datetime.now()
    results = []
    for lease in leases:
        lease.lease_expiry = today + timedelta(days=30)
        results.append(ProhibitionIdLease.serialize(lease))
    db.session.commit()
    return results


def _renew_prohibition_ids(prohibition_ids: list, prohibition_type: str, db):
    from python.prohibition_web_service.models import ProhibitionIdLease
    results = []
    for prohibition_id in prohibition_ids:
        lease = db.session.query(ProhibitionIdLease) \
            .filter(ProhibitionIdLease.prohibition_type == prohibition_type) \
            .filter(ProhibitionIdLease.served == False) \
            .filter(ProhibitionIdLease.id == prohibition_id) \
            .first()
        if lease is not None:
            today = datetime.now()
            lease.lease_expiry = today + timedelta(days=30)
            db.session.commit()
            results.append(ProhibitionIdLease.serialize(lease))
    return results
