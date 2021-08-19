from flask_api import FlaskAPI
from datetime import datetime, timedelta
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


class ProhibitionIdLease(db.Model):
    id = db.Column('id', db.String(20), primary_key=True)
    prohibition_type = db.Column(db.String(20), nullable=False)
    lease_expiry = db.Column(db.Date, nullable=True)
    served = db.Column(db.Boolean, default=False)

    def __init__(self, prohibition_id, prohibition_type, lease_expiry, served):
        self.id = prohibition_id
        self.prohibition_type = prohibition_type
        self.lease_expiry = lease_expiry
        self.served = served

    def serialize(self):
        return {
            "id": self.id,
            "prohibition_type": self.prohibition_type,
            "lease_expiry": self._format_lease_expiry(self.lease_expiry),
            "served": self.served
        }

    def lease(self):
        today = datetime.now()
        lease_expiry = today + timedelta(days=30)
        self.lease_expiry = lease_expiry

    @staticmethod
    def _format_lease_expiry(lease_expiry):
        if lease_expiry is None:
            return ''
        else:
            return datetime.strftime(lease_expiry, "%Y-%m-%d")


def create_app():
    with application.app_context():
        logging.warning('inside create_app()')
        initialize_app(application)
        return application


def initialize_app(app):
    # Create tables if they do not exist already
    @app.before_first_request
    def create_tables_and_seed():
        engine = db.get_engine()
        tables = db.inspect(engine).get_table_names()
        if len(tables) == 0:
            logging.warning('Sqlite database does not exist - creating new file')
            db.create_all()
            _seed_database_for_development(db)
        else:
            logging.info("database already exists - no need to recreate")


def _seed_database_for_development(database):
    # TODO - Remove before flight
    seed_records = []
    prefix = ["AA"]
    # for ind, prohibition_type in enumerate(["12Hour", "24Hour", "IRP"]):
    for x in range(100000, 100100):
        unique_id = '{}-{}'.format(prefix[0], str(x))
        seed_records.append(ProhibitionIdLease(
            prohibition_id=unique_id,
            prohibition_type="24Hour",
            lease_expiry=None,
            served=False))
    database.session.bulk_save_objects(seed_records)
    database.session.commit()
    logging.warning("database seeded")
    return
