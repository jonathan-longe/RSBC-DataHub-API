import python.prohibition_web_service.middleware as middleware
import python.prohibition_web_service.http_responses as http_responses


def create_a_form() -> list:
    """
    PayBC has successfully processed the applicant's credit card details and
    is now posting the payment details to our API.  In the event that PayBC
    does not receive a successful response, PayBC will try again indefinitely.
    """
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
    """
    PayBC has successfully processed the applicant's credit card details and
    is now posting the payment details to our API.  In the event that PayBC
    does not receive a successful response, PayBC will try again indefinitely.
    """
    return [
        {"try": middleware.request_contains_a_payload, "fail": [
            # Request contains no payload - renew form lease
            {"try": middleware.renew_form_id_lease, "fail": [
                {"try": http_responses.bad_request_response, "fail": []},
            ]},
            {"try": http_responses.successful_update_response, "fail": []},
        ]},
        # Request contains a payload - process submitted form
        {"try": middleware.mark_form_as_served, "fail": [
            # TODO - Write to RabbitMQ fail queue
        ]},
        # TODO - Write to RabbitMQ ingested queue
        {"try": http_responses.successful_update_response, "fail": []}
    ]
