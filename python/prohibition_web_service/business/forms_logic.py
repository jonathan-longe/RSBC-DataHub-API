import python.prohibition_web_service.middleware.form_middleware as form_middleware
import python.prohibition_web_service.http_responses as http_responses
from python.prohibition_web_service.business.keycloak_logic import get_authorized_keycloak_user


def list_all_forms() -> list:
    return get_authorized_keycloak_user() + [
        {"try": form_middleware.list_all_forms, "fail": [
            {"try": http_responses.server_error_response, "fail": []},
        ]}
    ]


def get_a_form() -> list:
    return get_authorized_keycloak_user() + [
        {"try": form_middleware.get_a_form, "fail": [
            {"try": http_responses.server_error_response, "fail": []},
        ]}
    ]


def create_a_form() -> list:
    return get_authorized_keycloak_user() + [
        {"try": form_middleware.request_contains_a_payload, "fail": [
            {"try": form_middleware.lease_a_form_id, "fail": [
                {"try": http_responses.server_error_response, "fail": []},
            ]},
            {"try": http_responses.successful_create_response, "fail": []},
        ]},
        {"try": http_responses.bad_request_response, "fail": []}
    ]


def update_a_form() -> list:
    return get_authorized_keycloak_user() + [
        {"try": form_middleware.request_contains_a_payload, "fail": [
            # Request contains no payload - renew form lease
            {"try": form_middleware.renew_form_id_lease, "fail": [
                {"try": http_responses.bad_request_response, "fail": []},
            ]},
            {"try": http_responses.successful_update_response, "fail": []},
        ]},
        # Request contains a payload - process submitted form
        {"try": form_middleware.log_payload_to_splunk, "fail": []},
        {"try": form_middleware.mark_form_as_printed, "fail": [
            # TODO - Write to RabbitMQ fail queue
            {"try": http_responses.record_not_found, "fail": []},
        ]},
        # TODO - Write to RabbitMQ ingested queue
        {"try": http_responses.successful_update_response, "fail": []}
    ]
