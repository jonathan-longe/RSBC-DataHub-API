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
    assert "123 Brenda's Towing Company" in resp.json[0]['identityNm']

