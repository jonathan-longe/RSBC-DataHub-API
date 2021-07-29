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


def test_lookup_vehicle_make_model(as_guest):
    resp = as_guest.get("/api/v1/vehicle_make_models",
                        follow_redirects=True,
                        content_type="application/json")
    assert resp.status_code == 200
    assert {"make": "TOYOTA", "model": "COROLLA CE 4DR", "year": "2019"} in resp.json

