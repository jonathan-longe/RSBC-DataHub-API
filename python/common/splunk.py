import logging
import logging.config
import requests

# We always return True regardless of whether the Splunk message is
# received successfully or not. We don't want the failure of Splunk logging
# call to disrupt the business flow where this function was called.


def application_accepted(**args) -> tuple:
    splunk_payload = {"event": "application_accepted"}
    _post_to_splunk(splunk_payload, **args)
    return True, args


def disclosure_sent(**args) -> tuple:
    splunk_payload = {"event": "disclosure_sent"}
    _post_to_splunk(splunk_payload, **args)
    return True, args


def review_scheduled(**args) -> tuple:
    splunk_payload = {"event": "review_scheduled"}
    _post_to_splunk(splunk_payload, **args)
    return True, args


def evidence_received(**args) -> tuple:
    splunk_payload = {"event": "evidence_received"}
    _post_to_splunk(splunk_payload, **args)
    return True, args


def review_fee_paid(**args) -> tuple:
    splunk_payload = {"event": "review_fee_paid"}
    _post_to_splunk(splunk_payload, **args)
    return True, args


def paybc_lookup(**args) -> tuple:
    splunk_payload = {"event": "paybc_lookup"}
    _post_to_splunk(splunk_payload, **args)
    return True, args


def paybc_invoice_generated(**args) -> tuple:
    splunk_payload = {"event": "paybc_invoice_generated"}
    _post_to_splunk(splunk_payload, **args)
    return True, args


def _post_to_splunk(splunk_payload: dict, **args):
    logging.warning(splunk_payload.get('event'))
    config = args.get('config')
    prohibition_number = args.get('prohibition_number')
    splunk_payload['prohibition_number'] = prohibition_number
    endpoint = "{}:{}/services/collector".format(config.SPLUNK_HOST, config.SPLUNK_PORT)
    headers = {"Authorization": "Splunk " + config.SPLUNK_TOKEN}
    try:
        response = requests.post(endpoint, headers=headers, json=splunk_payload)
    except requests.ConnectionError as error:
        logging.warning('no response from the Splunk API: {}'.format(error))
        return

    if response.status_code != 201:
        logging.warning('response from Splunk was not successful: {}'.format(response.text))
    return





