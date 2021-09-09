import pytest
import json
import logging
import base64
from datetime import datetime, timedelta
from python.prohibition_web_service import create_app, ProhibitionIdLease
from python.prohibition_web_service.config import Config


@pytest.fixture
def app():
    return create_app()


@pytest.fixture
def as_guest(app):
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


@pytest.fixture
def db(app):
    from python.prohibition_web_service import db
    with app.app_context():
        db.init_app(app)
        db.create_all()
        yield db
        db.drop_all()
        db.session.commit()


@pytest.fixture
def prohibition_leases(db):
    today = datetime.strptime("2021-07-21", "%Y-%m-%d")
    yesterday = today - timedelta(days=1)
    prohibitions = [
        ProhibitionIdLease(prohibition_id='AA-123332', prohibition_type='24Hour', lease_expiry=today, served=False),
        ProhibitionIdLease(prohibition_id='AA-123333', prohibition_type='24Hour', lease_expiry=yesterday, served=False),
        ProhibitionIdLease(prohibition_id='AA-123334', prohibition_type='12Hour', lease_expiry=yesterday, served=False),
        ProhibitionIdLease(prohibition_id='AA-11111', prohibition_type='24Hour', lease_expiry=None, served=False)
    ]
    db.session.bulk_save_objects(prohibitions)
    db.session.commit()


def test_health_endpoint(as_guest):
    resp = as_guest.get('/api/v1/health')
    assert resp.status_code == 200
    assert resp.is_json
    assert resp.json == {'success': 'healthy'}


def test_get_prohibition_ids(as_guest, db, prohibition_leases):
    resp = as_guest.get("/api/v1/prohibitions/leases/24Hour",
                        content_type="application/json")
    assert resp.json == [
        {'id': 'AA-123332', 'prohibition_type': '24Hour', 'lease_expiry': '2021-07-21', 'served': False},
        {'id': 'AA-123333', 'prohibition_type': '24Hour',  'lease_expiry': '2021-07-20', 'served': False},
        {'id': 'AA-11111', 'prohibition_type': '24Hour', 'lease_expiry': '', 'served': False}]
    assert resp.status_code == 200


def test_lease_a_block_of_prohibition_ids(as_guest, db, prohibition_leases):
    prohibitions = [
        ProhibitionIdLease(prohibition_id='AA-11112', prohibition_type='24Hour', lease_expiry=None, served=False),
        ProhibitionIdLease(prohibition_id='AA-11113', prohibition_type='24Hour', lease_expiry=None, served=False),
        ProhibitionIdLease(prohibition_id='AA-11114', prohibition_type='24Hour', lease_expiry=None, served=False),
        ProhibitionIdLease(prohibition_id='AA-11115', prohibition_type='24Hour', lease_expiry=None, served=False),
        ProhibitionIdLease(prohibition_id='AA-11116', prohibition_type='24Hour', lease_expiry=None, served=False),
        ProhibitionIdLease(prohibition_id='AA-11117', prohibition_type='24Hour', lease_expiry=None, served=False),
    ]
    db.session.bulk_save_objects(prohibitions)
    db.session.commit()
    today = datetime.now()
    lease_expiry_string = datetime.strftime(today + timedelta(days=30), "%Y-%m-%d")
    resp = as_guest.post("/api/v1/prohibitions/leases/24Hour",
                         content_type="application/json")
    assert resp.headers['Access-Control-Allow-Origin'] == Config.ACCESS_CONTROL_ALLOW_ORIGIN
    assert resp.json == [
        {'id': 'AA-11111', 'prohibition_type': '24Hour', 'lease_expiry': lease_expiry_string, 'served': False},
        {'id': 'AA-11112', 'prohibition_type': '24Hour', 'lease_expiry': lease_expiry_string, 'served': False},
        {'id': 'AA-11113', 'prohibition_type': '24Hour', 'lease_expiry': lease_expiry_string, 'served': False},
        {'id': 'AA-11114', 'prohibition_type': '24Hour', 'lease_expiry': lease_expiry_string, 'served': False},
        {'id': 'AA-11115', 'prohibition_type': '24Hour', 'lease_expiry': lease_expiry_string, 'served': False},
        {'id': 'AA-11116', 'prohibition_type': '24Hour', 'lease_expiry': lease_expiry_string, 'served': False},
        {'id': 'AA-11117', 'prohibition_type': '24Hour', 'lease_expiry': lease_expiry_string, 'served': False}
    ]


def test_when_prohibition_submitted_lease_is_marked_as_served(as_guest, prohibition_leases, db, caplog):
    prohibition_id = 'AA-123332'
    payload = {"prohibition_id": "AA-123332"}
    resp = as_guest.patch("/api/v1/prohibitions/24Hour/{}".format(prohibition_id),
                          content_type="application/json",
                          json=payload)
    # TODO - save prohibition to RabbitMQ ingestor
    assert resp.status_code == 200
    assert json.dumps(payload) in caplog.text
    assert resp.json['id'] == prohibition_id
    assert resp.json['served'] is True


def test_add_batch_of_prohibition_ids_to_pool_of_available_ids(as_guest, db):
    payload = []
    for x in range(10000, 10050):
        payload.append('AA-' + str(x))
    resp = as_guest.post("/api/v1/prohibitions/24Hour",
                         content_type="application/json",
                         headers=_get_basic_authentication_header(Config),
                         json=payload)
    assert resp.status_code == 200
    leases = db.session.query(ProhibitionIdLease) \
        .filter(ProhibitionIdLease.prohibition_type == '24Hour') \
        .filter(ProhibitionIdLease.served == False, ProhibitionIdLease.lease_expiry == None) \
        .all()
    for lease in leases:
        assert lease.id in payload
    assert len(leases) == 50


def _get_basic_authentication_header(config) -> dict:
    username = config.ADMIN_USERNAME
    password = config.ADMIN_PASSWORD
    credentials = base64.b64encode((username + ":" + password).encode('utf-8')).decode('utf-8')
    headers = dict({
        'Authorization': 'Basic {}'.format(credentials),
        'Content-Type': 'application/x-www-form-urlencoded'
    })
    logging.debug(headers)
    return headers
