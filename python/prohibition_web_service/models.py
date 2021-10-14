from datetime import datetime, timedelta
from flask_sqlalchemy import SQLAlchemy
import logging

db = SQLAlchemy()


class Form(db.Model):
    id = db.Column('id', db.String(20), primary_key=True)
    form_type = db.Column(db.String(20), nullable=False)
    lease_expiry = db.Column(db.Date, nullable=True)
    printed_timestamp = db.Column(db.DateTime, nullable=True)
    username = db.Column(db.String(25), nullable=True)

    def __init__(self, form_id, form_type, printed=None, lease_expiry=None, username=None):
        self.id = form_id
        self.form_type = form_type
        self.printed_timestamp = printed
        self.lease_expiry = lease_expiry
        self.username = username

    @staticmethod
    def serialize(form):
        return {
            "id": form.id,
            "form_type": form.form_type,
            "lease_expiry": Form._format_lease_expiry(form.lease_expiry),
            "printed_timestamp": form.printed_timestamp
        }

    def lease(self, username):
        today = datetime.now()
        lease_expiry = today + timedelta(days=30)
        self.lease_expiry = lease_expiry
        self.username = username
        logging.info("{} leased {} until {}".format(
            self.username, self.id, self.lease_expiry.strftime("%Y-%m-%d")))

    @staticmethod
    def _format_lease_expiry(lease_expiry):
        if lease_expiry is None:
            return ''
        else:
            return datetime.strftime(lease_expiry, "%Y-%m-%d")

    @staticmethod
    def collection_to_dict(all_rows):
        result_list = []
        for row in all_rows:
            result_list.append(Form.serialize(row))
        return result_list
