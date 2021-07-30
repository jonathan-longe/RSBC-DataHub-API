from flask_api import FlaskAPI
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from python.prohibition_web_service.config import Config
from python.prohibition_web_service.blueprints import misc_routes, prohibition_leases, prohibitions

db = SQLAlchemy()


def create_app():
    application = FlaskAPI(__name__)
    application.config['SECRET_KEY'] = Config.FLASK_SECRET_KEY
    application.config['SQLALCHEMY_DATABASE_URI'] = Config.DATABASE_URI

    db.init_app(application)
    application.register_blueprint(misc_routes.bp)
    application.register_blueprint(prohibition_leases.bp)
    application.register_blueprint(prohibitions.bp)

    @application.route('/health')
    def health():
        return jsonify('healthy')

    return application
