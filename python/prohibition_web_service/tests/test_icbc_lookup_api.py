import pytest
import responses
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


@responses.activate
def test_get_driver(as_guest):

    responses.add(responses.GET,
                  '{}/drivers/{}'.format(Config.ICBC_API_ROOT, "5120503"),
                  json=_sample_driver_response(),
                  status=200)

    resp = as_guest.get("/api/v1/drivers/5120503",
                        follow_redirects=True,
                        content_type="application/json")
    assert resp.status_code == 200
    assert 'dlNumber' in resp.json
    assert resp.json['dlNumber'] == "5120503"
    assert resp.headers['Access-Control-Allow-Origin'] == Config.ACCESS_CONTROL_ALLOW_ORIGIN


@responses.activate
def test_get_vehicle(as_guest):

    responses.add(responses.GET,
                  '{}/vehicles?plateNumber={}'.format(Config.ICBC_API_ROOT, "LD626J"),
                  json=_sample_vehicle_response(),
                  status=200)

    resp = as_guest.get("/api/v1/vehicles/LD626J",
                        follow_redirects=True,
                        content_type="application/json")
    assert resp.status_code == 200
    assert 'plateNumber' in resp.json
    assert resp.json['plateNumber'] == "LD626J"
    assert resp.headers['Access-Control-Allow-Origin'] == Config.ACCESS_CONTROL_ALLOW_ORIGIN


def _sample_driver_response() -> dict:
    return {
      "dlNumber": "5120503",
      "birthDate": "1955-02-22",
      "party": {
        "ICBCEnterpriseID": "976949180580602",
        "partyType": "Person",
        "lastName": "JOHNSTONE",
        "firstName": "KAREN",
        "secondName": "PATRICIA",
        "thirdName": "",
        "nameType": "Legal",
        "birthDate": "1955-02-22",
        "dlNumber": "5120503",
        "dlPlaceOfIssue": "BC",
        "addresses": [
          {
            "addressType": "Mailing",
            "addressLine1": "9150 ARRASTRA CREEK FOREST SER",
            "addressLine2": "",
            "addressLine3": "",
            "city": "COALMONT",
            "region": "BC",
            "country": "CAN",
            "postalCode": "V0X1W0",
            "unitNumber": "",
            "streetNumber": "9150",
            "streetName": "ARRASTRA CREEK FOREST SERVICE",
            "streetType": "RD",
            "streetDirection": "",
            "boxNumber": "",
            "location": "",
            "postalStationName": "",
            "postalStationQualifier": "",
            "postalStationType": "",
            "routeServiceClass": "",
            "routeServiceNumber": "",
            "additionalDeliveryInfo": ""
          }
        ]
      }
    }


def _sample_vehicle_response() -> list:
    return [
      {
        "plateNumber": "LD626J",
        "registrationNumber": "03371224",
        "vehicleIdNumber": "5Y2SL65806Z418645",
        "effectiveDate": "",
        "vehicleMake": "PONTIAC",
        "vehicleModel": "VIBE",
        "vehicleStyle": "FourDoorSedan",
        "vehicleModelYear": "2006",
        "vehicleColour": "Grey",
        "vehicleType": "Passenger",
        "nscNumber": "",
        "vehicleParties": [
          {
            "roleType": "RegisteredOwner",
            "party": {
              "ICBCEnterpriseID": "138929719980602",
              "partyType": "Person",
              "lastName": "WIEBE",
              "firstName": "ANDREW",
              "secondName": "JAMES",
              "thirdName": "",
              "nameType": "Legal",
              "birthDate": "1964-09-22",
              "dlNumber": "4714606",
              "dlPlaceOfIssue": "BC",
              "addresses": [
                {
                  "addressType": "Residence",
                  "addressLine1": "7608 HEATHER ST",
                  "addressLine2": "",
                  "addressLine3": "",
                  "city": "VANCOUVER",
                  "region": "BC",
                  "country": "CAN",
                  "postalCode": "V6P3R1",
                  "unitNumber": "",
                  "streetNumber": "7608",
                  "streetName": "HEATHER",
                  "streetType": "ST",
                  "streetDirection": "",
                  "boxNumber": "",
                  "location": "",
                  "postalStationName": "",
                  "postalStationQualifier": "",
                  "postalStationType": "",
                  "routeServiceClass": "",
                  "routeServiceNumber": "",
                  "additionalDeliveryInfo": ""
                }
              ]
            }
          }
        ]
      }
    ]


