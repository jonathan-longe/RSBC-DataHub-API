from flask_api import FlaskAPI
import logging
from flask_sqlalchemy import SQLAlchemy
from python.prohibition_web_service.config import Config
from python.prohibition_web_service.blueprints import misc_routes, prohibition_leases, prohibitions


application = FlaskAPI(__name__)
application.config['SECRET_KEY'] = Config.FLASK_SECRET_KEY
application.config['SQLALCHEMY_DATABASE_URI'] = Config.DATABASE_URI
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
application.register_blueprint(misc_routes.bp)
application.register_blueprint(prohibition_leases.bp)
application.register_blueprint(prohibitions.bp)

db = SQLAlchemy(application)


def create_app():
    with application.app_context():
        logging.warning('inside create_app()')
        db.init_app(application)
        db.create_all()
        return application
