import datetime


class Helper:

    @staticmethod
    def add_error_to_message(message: dict, error: dict) -> dict:
        """
            Add 'errors' as a message attribute so as to keep a
            history of events in case it fails repeatedly.
        :param message:
        :param error:
        :return:
        """
        if 'errors' not in message:
            message['errors'] = []
        message['errors'].append({
            'error': error,
            'timestamp': datetime.datetime.now()
        })
        return message
