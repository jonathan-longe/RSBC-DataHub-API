from flask_api import FlaskAPI
from datetime import datetime, timedelta
import logging
from flask_sqlalchemy import SQLAlchemy
from python.prohibition_web_service.config import Config
from python.prohibition_web_service.blueprints import impound_lot_operators, jurisdictions, forms
from python.prohibition_web_service.blueprints import provinces, countries, cities, colors, vehicles, icbc


application = FlaskAPI(__name__)
application.config['SECRET_KEY'] = Config.FLASK_SECRET_KEY
application.config['SQLALCHEMY_DATABASE_URI'] = Config.DATABASE_URI
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
application.register_blueprint(forms.bp)
application.register_blueprint(impound_lot_operators.bp)
application.register_blueprint(provinces.bp)
application.register_blueprint(jurisdictions.bp)
application.register_blueprint(countries.bp)
application.register_blueprint(cities.bp)
application.register_blueprint(colors.bp)
application.register_blueprint(vehicles.bp)
application.register_blueprint(icbc.bp)


db = SQLAlchemy(application)


class Form(db.Model):
    id = db.Column('id', db.String(20), primary_key=True)
    form_type = db.Column(db.String(20), nullable=False)
    lease_expiry = db.Column(db.Date, nullable=True)
    served_timestamp = db.Column(db.DateTime, nullable=True)

    def __init__(self, form_id, form_type, lease_expiry, served_datetime):
        self.id = form_id
        self.prohibition_type = form_type
        self.lease_expiry = lease_expiry
        self.served_timestamp = served_datetime

    def serialize(self):
        return {
            "id": self.id,
            "form_type": self.form_type,
            "lease_expiry": self._format_lease_expiry(self.lease_expiry),
            "served_timestamp": self.served_timestamp
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
    prefix = ["J", "AA", "40"]
    for idx, form_type in enumerate(["12Hour", "24Hour", "IRP"]):
        for x in range(100000, 100100):
            unique_id = '{}-{}'.format(prefix[idx], str(x))
            seed_records.append(Form(
                form_id=unique_id,
                form_type=form_type,
                lease_expiry=None,
                served_datetime=None))
    database.session.bulk_save_objects(seed_records)
    database.session.commit()
    logging.warning("database seeded")
    return
