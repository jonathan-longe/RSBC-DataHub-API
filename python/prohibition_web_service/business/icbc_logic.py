from python.prohibition_web_service.business.keycloak_logic import get_authorized_keycloak_user
import python.prohibition_web_service.middleware.icbc_middleware as icbc_middleware
import python.prohibition_web_service.http_responses as http_responses


def get_driver() -> list:
    return get_authorized_keycloak_user() + [
        {"try": icbc_middleware.get_icbc_api_authorization_header, "fail": [
            {"try": http_responses.server_error_response, "fail": []},
        ]},
        {"try": icbc_middleware.get_icbc_driver, "fail": [
            {"try": http_responses.server_error_response, "fail": []},
        ]}
    ]


def get_vehicle() -> list:
    return get_authorized_keycloak_user() + [
        {"try": icbc_middleware.get_icbc_api_authorization_header, "fail": [
            {"try": http_responses.server_error_response, "fail": []},
        ]},
        {"try": icbc_middleware.get_icbc_vehicle, "fail": [
            {"try": http_responses.server_error_response, "fail": []},
        ]}
    ]