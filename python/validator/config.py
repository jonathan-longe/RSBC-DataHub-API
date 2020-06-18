import os
from python.common.config import Config as BaseConfig


class Config(BaseConfig):
    WATCH_QUEUE                 = os.getenv('WATCH_QUEUE')
    VALID_QUEUE                 = os.getenv('VALID_QUEUE')
    FAIL_QUEUE                  = os.getenv('FAIL_QUEUE')
    SCHEMA_PATH                 = os.getenv('SCHEMA_PATH', 'python/validator/')
    SCHEMA_FILENAME             = os.getenv('SCHEMA_FILENAME', 'etk_schemas.json')
    VALIDATOR_USER              = os.getenv('VALIDATOR_USER')
    VALIDATOR_PASS              = os.getenv('VALIDATOR_PASS')

