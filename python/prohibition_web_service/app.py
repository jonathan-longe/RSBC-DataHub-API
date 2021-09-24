from flask_api import FlaskAPI
import logging
from python.prohibition_web_service.models import db
from python.prohibition_web_service.models import Form
from python.prohibition_web_service.config import Config
from python.prohibition_web_service.blueprints import impound_lot_operators, jurisdictions, forms, admin_forms
from python.prohibition_web_service.blueprints import provinces, countries, cities, colors, vehicles, icbc, keycloak
from python.prohibition_web_service.blueprints import vehicle_styles


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
application.register_blueprint(admin_forms.bp)
application.register_blueprint(keycloak.bp)
application.register_blueprint(vehicle_styles.bp)


db.init_app(application)


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
                form_type=form_type))
    database.session.bulk_save_objects(seed_records)
    database.session.commit()
    logging.warning("database seeded")
    return
