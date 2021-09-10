import pytest
import logging
import base64
import json
from datetime import datetime, timedelta
from python.prohibition_web_service import create_app, Form
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
def forms(db):
    today = datetime.strptime("2021-07-21", "%Y-%m-%d")
    yesterday = today - timedelta(days=1)
    forms = [
        Form(form_id='AA-123332', form_type='24Hour', username='usr', lease_expiry=today, served=None),
        Form(form_id='AA-123333', form_type='24Hour', username='usr', lease_expiry=yesterday, served=None),
        Form(form_id='AA-123334', form_type='12Hour', username='usr', lease_expiry=yesterday, served=None),
        Form(form_id='AA-11111', form_type='24Hour', username=None, lease_expiry=None, served=None)
    ]
    db.session.bulk_save_objects(forms)
    db.session.commit()


def test_index_method_only_returns_current_users_form_records(as_guest, forms):
    resp = as_guest.get("/api/v1/forms/24Hour",
                        content_type="application/json",
                        headers=_get_basic_authentication_header(Config))
    assert len(resp.json) == 2
    assert resp.json == [
        {'id': 'AA-123332', 'form_type': '24Hour', 'lease_expiry': '2021-07-21', 'served_timestamp': None},
        {'id': 'AA-123333', 'form_type': '24Hour', 'lease_expiry': '2021-07-20', 'served_timestamp': None}
    ]
    assert resp.status_code == 200


def test_unauthorized_users_cannot_get_forms(as_guest, forms):
    resp = as_guest.get("/api/v1/forms/24Hour",
                        content_type="application/json")
    assert resp.status_code == 401


def test_when_form_created_user_receives_unique_form_id_for_later_use(as_guest, forms):
    resp = as_guest.post("/api/v1/forms/24Hour",
                         content_type="application/json",
                         headers=_get_basic_authentication_header(Config))
    today = datetime.now()
    expected_lease_expiry = datetime.strftime(today + timedelta(days=30), "%Y-%m-%d")

    assert resp.status_code == 201
    assert resp.json == {
        'id': 'AA-11111', 'form_type': '24Hour', 'lease_expiry': expected_lease_expiry, 'served_timestamp': None
    }


def test_unauthorized_users_cannot_create_forms(as_guest, forms):
    resp = as_guest.post("/api/v1/forms/24Hour",
                         content_type="application/json")
    assert resp.status_code == 401


def test_if_no_unique_ids_available_user_receives_a_500_response(as_guest, db):
    today = datetime.strptime("2021-07-21", "%Y-%m-%d")
    forms = [
        Form(form_id='AA-123332', form_type='24Hour', username='other_user', lease_expiry=today, served=None),
    ]
    db.session.bulk_save_objects(forms)
    db.session.commit()

    resp = as_guest.post("/api/v1/forms/24Hour",
                         content_type="application/json",
                         headers=_get_basic_authentication_header(Config))
    assert resp.status_code == 500


def test_users_cannot_submit_payloads_to_the_create_endpoint(as_guest, db):
    resp = as_guest.post("/api/v1/forms/24Hour",
                         content_type="application/json",
                         data=json.dumps({"attribute": "value"}),
                         headers=_get_basic_authentication_header(Config))
    assert resp.status_code == 400


def test_user_cannot_renew_lease_on_form_that_has_been_served(as_guest, db):
    today = datetime.strptime("2021-07-21", "%Y-%m-%d")
    forms = [
        Form(form_id='AA-123332', form_type='24Hour', username='usr', lease_expiry=today, served=today),
    ]
    db.session.bulk_save_objects(forms)
    db.session.commit()

    resp = as_guest.patch("/api/v1/forms/24Hour/{}".format('AA-123332'),
                          content_type="application/json",
                          headers=_get_basic_authentication_header(Config))
    assert resp.status_code == 400


def test_unauthorized_users_cannot_update_forms_or_renew_lease_on_form(as_guest, forms):
    resp = as_guest.patch("/api/v1/forms/24Hour/{}".format("AA-123332"),
                          content_type="application/json")
    assert resp.status_code == 401


def test_when_form_updated_without_payload_user_receives_updated_lease_date(as_guest, forms):
    resp = as_guest.patch("/api/v1/forms/24Hour/{}".format('AA-123332'),
                          content_type="application/json",
                          headers=_get_basic_authentication_header(Config))
    today = datetime.now()
    expected_lease_expiry = datetime.strftime(today + timedelta(days=30), "%Y-%m-%d")

    assert resp.status_code == 200
    assert resp.json == {
        'id': 'AA-123332', 'form_type': '24Hour', 'lease_expiry': expected_lease_expiry, 'served_timestamp': None
    }


def test_form_delete_method_not_implemented(as_guest):
    resp = as_guest.delete("/api/v1/forms/24Hour/{}".format('AA-123332'),
                           content_type="application/json",
                           headers=_get_basic_authentication_header(Config))
    assert resp.status_code == 405
    assert resp.json == {"error": "method not implemented"}


def _get_basic_authentication_header(config) -> dict:
    username = config.ADMIN_USERNAME
    password = config.ADMIN_PASSWORD
    credentials = base64.b64encode((username + ":" + password).encode('utf-8')).decode('utf-8')
    headers = dict({
        'Authorization': 'Basic {}'.format(credentials)
    })
    logging.debug(headers)
    return headers
