from python.prohibition_web_service.config import Config
import python.common.helper as helper
from flask import request, Blueprint, make_response, jsonify
from flask_cors import CORS
import logging.config
import python.prohibition_web_service.business.forms_logic as rules


logging.config.dictConfig(Config.LOGGING)
logging.info('*** forms blueprint loaded ***')

bp = Blueprint('forms', __name__, url_prefix='/api/v1')
CORS(bp, resources={"/api/v1/forms/*": {"origins": Config.ACCESS_CONTROL_ALLOW_ORIGIN}})


@bp.route('/forms/<string:form_type>', methods=['GET'])
def index(form_type):
    """
    List all forms for a user
    """
    if request.method == 'GET':
        kwargs = helper.middle_logic(rules.list_all_forms(),
                                     request=request,
                                     form_type=form_type,
                                     config=Config)
        return kwargs.get('response')


@bp.route('/forms/<string:form_type>/<string:form_id>', methods=['GET'])
def get(form_type, form_id):
    """
    Get a specific form
    """
    if request.method == 'GET':
        kwargs = helper.middle_logic(rules.get_a_form(),
                                     request=request,
                                     form_type=form_type,
                                     config=Config)
        return kwargs.get('response')


@bp.route('/forms/<string:form_type>', methods=['POST'])
def create(form_type):
    """
    Save a new form.  The web_app uses this endpoint to lease a unique form_id
    for 30 days and save the user's name in the form table. This endpoint is not
    used to submit a new form.  Any payload to this endpoint is ignored.
    """
    if request.method == 'POST':
        logging.info("created() invoked: | {}".format(request.get_data()))
        kwargs = helper.middle_logic(rules.create_a_form(),
                                     request=request,
                                     form_type=form_type,
                                     config=Config)
        return kwargs.get('response')


@bp.route('/forms/<string:form_type>/<string:form_id>', methods=['PATCH'])
def update(form_type, form_id):
    """
    Update an existing form is used when either a) submitting a form using an previously
    leased form_id; or, b) renewing the lease of a form_id.  If a patch request is
    received without a payload, this endpoint assumes the form lease should be renewed;
    otherwise, the payload is received as a form submission.
    """
    if request.method == 'PATCH':
        kwargs = helper.middle_logic(rules.update_a_form(),
                                     form_type=form_type,
                                     form_id=form_id,
                                     request=request,
                                     config=Config)
        return kwargs.get('response')


@bp.route('/forms/<string:form_type>/<string:form_id>', methods=['DELETE'])
def delete(form_type, form_id):
    """
    Delete a specific form
    """
    if request.method == 'DELETE':
        return make_response({'error': 'method not implemented'}, 405)

