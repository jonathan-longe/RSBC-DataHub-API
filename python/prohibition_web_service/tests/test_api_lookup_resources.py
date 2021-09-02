import pytest
from python.prohibition_web_service import create_app
from python.prohibition_web_service.config import Config


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
    assert resp.headers['Access-Control-Allow-Origin'] == Config.ACCESS_CONTROL_ALLOW_ORIGIN


def test_get_provinces(as_guest):
    resp = as_guest.get("/api/v1/configuration/provinces",
                        follow_redirects=True,
                        content_type="application/json")
    assert resp.status_code == 200
    assert "AB" in resp.json[2]['objectCd']
    assert "Alberta" in resp.json[2]['objectDsc']
    assert resp.headers['Access-Control-Allow-Origin'] == Config.ACCESS_CONTROL_ALLOW_ORIGIN


def test_get_jurisdictions(as_guest):
    resp = as_guest.get("/api/v1/configuration/jurisdictions",
                        follow_redirects=True,
                        content_type="application/json")
    assert resp.status_code == 200
    assert "AB" in resp.json[2]['objectCd']
    assert "Alberta" in resp.json[2]['objectDsc']
    assert resp.headers['Access-Control-Allow-Origin'] == Config.ACCESS_CONTROL_ALLOW_ORIGIN


def test_get_countries(as_guest):
    resp = as_guest.get("/api/v1/configuration/countries",
                        follow_redirects=True,
                        content_type="application/json")
    assert resp.status_code == 200
    assert "CAN" in resp.json[0]['objectCd']
    assert "Canada" in resp.json[0]['objectDsc']
    assert resp.headers['Access-Control-Allow-Origin'] == Config.ACCESS_CONTROL_ALLOW_ORIGIN


def test_get_cities(as_guest):
    resp = as_guest.get("/api/v1/configuration/cities",
                        follow_redirects=True,
                        content_type="application/json")
    assert resp.status_code == 200
    assert "Victoria" in resp.json
    assert "100 Mile House" in resp.json
    assert resp.headers['Access-Control-Allow-Origin'] == Config.ACCESS_CONTROL_ALLOW_ORIGIN


def test_get_car_colors(as_guest):
    resp = as_guest.get("/api/v1/configuration/colors",
                        follow_redirects=True,
                        content_type="application/json")
    assert resp.status_code == 200
    assert "Yellow" in resp.json
    assert resp.headers['Access-Control-Allow-Origin'] == Config.ACCESS_CONTROL_ALLOW_ORIGIN


def test_get_vehicles(as_guest):
    resp = as_guest.get("/api/v1/configuration/vehicles",
                        follow_redirects=True,
                        content_type="application/json")
    assert resp.status_code == 200
    assert "A.C." == resp.json[0]['make']
    assert "ACE ROADSTER" == resp.json[0]['model']
    assert "1961" == resp.json[0]['year']
    assert resp.headers['Access-Control-Allow-Origin'] == Config.ACCESS_CONTROL_ALLOW_ORIGIN
