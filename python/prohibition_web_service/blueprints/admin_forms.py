from python.prohibition_web_service.config import Config
from flask import request, Blueprint, make_response, render_template, send_from_directory
import python.common.rsi_email as rsi_email
import logging.config

logging.config.dictConfig(Config.LOGGING)
logging.info('*** admin forms blueprint loaded ***')

bp = Blueprint('admin_forms', __name__)

TEMPLATE_PATH = "./python/prohibition_web_service/templates/"

# TODO - Remove before flight - add authentication to each of these endpoints


@bp.route('/css/<path:name>', methods=['GET'])
def css(name):
    """
    Make available CSS assets
    """
    if request.method == 'GET':
        logging.warning("inside css()")
        return send_from_directory('templates/assets/bootstrap-4.6.0-dist/css', name, as_attachment=True)


@bp.route('/admin/forms', methods=['GET'])
def index():
    """
    List all forms
    """
    if request.method == 'GET':
        from python.prohibition_web_service import db, Form
        all_forms = db.session.query(Form) \
            .filter_by(**request.args) \
            .limit(Config.MAX_RECORDS_RETURNED) \
            .all()
        template = rsi_email.get_jinja2_env(TEMPLATE_PATH).get_template("all.html")
        return render_template(template, forms=all_forms)


@bp.route('/admin/forms/<string:form_id>', methods=['GET'])
def get(form_id):
    """
    Get a specific form
    """
    if request.method == 'GET':
        return make_response('method not implemented', 405)


@bp.route('/admin/forms', methods=['POST'])
def create():
    """
    Create a new form
    """
    if request.method == 'POST':
        return make_response('method not implemented', 405)


@bp.route('/admin/forms/<string:form_id>', methods=['PATCH'])
def update(form_id):
    """
    Update a specific form
    """
    if request.method == 'PATCH':
        return make_response('method not implemented', 405)


@bp.route('/admin/forms/<string:form_id>', methods=['DELETE'])
def delete(form_id):
    """
    Delete a specific form
    """
    if request.method == 'DELETE':
        return make_response('method not implemented', 405)

