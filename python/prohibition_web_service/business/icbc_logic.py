import python.prohibition_web_service.middleware as middleware
import python.prohibition_web_service.http_responses as http_responses


def get_driver() -> list:
    return [
        {"try": middleware.get_authorization_header_from_request, "fail": [
            {"try": http_responses.unauthorized, "fail": []},
        ]},
        {"try": middleware.get_token_from_authorization_header, "fail": [
            {"try": http_responses.unauthorized, "fail": []},
        ]},
        {"try": middleware.get_keycloak_certificates, "fail": [
            {"try": http_responses.unable_to_retrieve_keycloak_certificates, "fail": []},
        ]},
        {"try": middleware.decode_keycloak_access_token, "fail": [
            {"try": http_responses.keycloak_token_not_valid, "fail": []},
        ]},
        {"try": middleware.get_username_from_decoded_access_token, "fail": [
            {"try": http_responses.keycloak_no_username, "fail": []},
        ]},
        {"try": middleware.get_icbc_api_authorization_header, "fail": [
            {"try": http_responses.server_error_response, "fail": []},
        ]},
        {"try": middleware.get_icbc_driver, "fail": [
            {"try": http_responses.server_error_response, "fail": []},
        ]}
    ]


def get_vehicle() -> list:
    return [
        {"try": middleware.get_authorization_header_from_request, "fail": [
            {"try": http_responses.unauthorized, "fail": []},
        ]},
        {"try": middleware.get_token_from_authorization_header, "fail": [
            {"try": http_responses.unauthorized, "fail": []},
        ]},
        {"try": middleware.get_keycloak_certificates, "fail": [
            {"try": http_responses.unable_to_retrieve_keycloak_certificates, "fail": []},
        ]},
        {"try": middleware.decode_keycloak_access_token, "fail": [
            {"try": http_responses.keycloak_token_not_valid, "fail": []},
        ]},
        {"try": middleware.get_username_from_decoded_access_token, "fail": [
            {"try": http_responses.keycloak_no_username, "fail": []},
        ]},
        {"try": middleware.get_icbc_api_authorization_header, "fail": [
            {"try": http_responses.server_error_response, "fail": []},
        ]},
        {"try": middleware.get_icbc_vehicle, "fail": [
            {"try": http_responses.server_error_response, "fail": []},
        ]}
    ]