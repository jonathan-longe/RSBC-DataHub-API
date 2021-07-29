from python.prohibition_web_service import db
from datetime import datetime, timedelta


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

