import pytest
from python.prohibition_web_service import create_app


@pytest.fixture
def application():
    return create_app()


@pytest.fixture
def as_guest(application):
    application.config['TESTING'] = True
    with application.test_client() as client:
        yield client


def test_get_impound_lot_operators(as_guest):
    resp = as_guest.get("/api/v1/configuration/impoundLotOperators",
                        follow_redirects=True,
                        content_type="application/json")
    assert resp.status_code == 200
    assert "Busters Towing" in resp.json[0]['name']


def test_get_provinces(as_guest):
    resp = as_guest.get("/api/v1/configuration/provinces",
                        follow_redirects=True,
                        content_type="application/json")
    assert resp.status_code == 200
    assert "AB" in resp.json[2]['objectCd']
    assert "Alberta" in resp.json[2]['objectDsc']


def test_get_jurisdictions(as_guest):
    resp = as_guest.get("/api/v1/configuration/jurisdictions",
                        follow_redirects=True,
                        content_type="application/json")
    assert resp.status_code == 200
    assert "AB" in resp.json[2]['objectCd']
    assert "Alberta" in resp.json[2]['objectDsc']


def test_get_countries(as_guest):
    resp = as_guest.get("/api/v1/configuration/countries",
                        follow_redirects=True,
                        content_type="application/json")
    assert resp.status_code == 200
    assert "CAN" in resp.json[0]['objectCd']
    assert "Canada" in resp.json[0]['objectDsc']
