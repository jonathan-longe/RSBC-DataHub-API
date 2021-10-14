import python.prohibition_web_service.middleware as middleware
import python.prohibition_web_service.http_responses as http_responses


def create_a_form() -> list:
    return [
        {"try": middleware.request_contains_a_payload, "fail": [
            {"try": middleware.lease_a_form_id, "fail": [
                {"try": http_responses.server_error_response, "fail": []},
            ]},
            {"try": http_responses.successful_create_response, "fail": []},
        ]},
        {"try": http_responses.bad_request_response, "fail": []}
    ]


def update_a_form() -> list:
    return [
        {"try": middleware.request_contains_a_payload, "fail": [
            # Request contains no payload - renew form lease
            {"try": middleware.renew_form_id_lease, "fail": [
                {"try": http_responses.bad_request_response, "fail": []},
            ]},
            {"try": http_responses.successful_update_response, "fail": []},
        ]},
        # Request contains a payload - process submitted form
        {"try": middleware.log_payload_to_splunk, "fail": []},
        {"try": middleware.mark_form_as_printed, "fail": [
            # TODO - Write to RabbitMQ fail queue
            {"try": http_responses.record_not_found, "fail": []},
        ]},
        # TODO - Write to RabbitMQ ingested queue
        {"try": http_responses.successful_update_response, "fail": []}
    ]
