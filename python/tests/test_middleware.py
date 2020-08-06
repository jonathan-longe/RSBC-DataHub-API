from datetime import datetime, timedelta
from python.form_verifier.config import Config as BusinessConfig
import python.form_verifier.middleware as middleware
from python.common.helper import load_json_into_dict


# To override the config class for testing
class Config(BusinessConfig):
    pass
    

class TestMiddleware:

    @staticmethod
    def test_date_served_today_passes_validation():
        sample_data = load_json_into_dict('python/tests/sample_data/irp_form_submission.json')
        assert type(sample_data) is dict
        today = datetime.today().strftime("%Y-%m-%d")
        sample_data['form_submission']['form']['prohibition-information']['date-of-service'] = today
        (result, args) = middleware.date_served_not_older_than_one_week(message=sample_data)
        assert result is True

    @staticmethod
    def test_date_served_one_week_ago_passes_validation():
        sample_data = load_json_into_dict('python/tests/sample_data/irp_form_submission.json')
        last_week = (datetime.today() - timedelta(days=7)).strftime('%Y-%m-%d')
        sample_data['form_submission']['form']['prohibition-information']['date-of-service'] = last_week
        (result, args) = middleware.date_served_not_older_than_one_week(message=sample_data)
        assert result is True

    @staticmethod
    def test_date_served_8_days_ago_fails_validation():
        sample_data = load_json_into_dict('python/tests/sample_data/irp_form_submission.json')
        more_than_7_days = (datetime.today() - timedelta(days=8)).strftime('%Y-%m-%d')
        sample_data['form_submission']['form']['prohibition-information']['date-of-service'] = more_than_7_days
        (result, args) = middleware.date_served_not_older_than_one_week(message=sample_data, days=7)
        assert result is False

    @staticmethod
    def test_user_submitted_last_name_matches_vips():
        sample_data = load_json_into_dict('python/tests/sample_data/irp_form_submission.json')
        response_from_api = {
                "surnameNm": "Charles"
        }
        sample_data['form_submission']['vips_response'] = response_from_api
        result, args = middleware.user_submitted_last_name_matches_vips(message=sample_data)
        assert result is True

    @staticmethod
    def test_modify_event_method():
        new_event_name = "new_event"
        event = load_json_into_dict('python/tests/sample_data/irp_form_submission.json')
        modified_event = middleware.modify_event(event, new_event_name)
        assert new_event_name in modified_event
        assert modified_event['event_type'] == new_event_name
