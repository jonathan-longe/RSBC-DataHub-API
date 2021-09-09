import os
from python.common.config import Config as BaseConfig

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(BaseConfig):
    FLASK_SECRET_KEY                    = os.getenv('FLASK_SECRET_KEY')

    ICBC_API_ROOT                       = os.getenv('ICBC_API_ROOT', "http://localhost:8080/api")
    ICBC_LOGIN_USER_ID                  = os.getenv('ICBC_LOGIN_USER_ID', 'user123')
    ICBC_API_USERNAME                   = os.getenv('ICBC_API_USERNAME', 'user1')
    ICBC_API_PASSWORD                   = os.getenv('ICBC_API_PASSWORD', 'secret')

    # URL of requesting resource
    ACCESS_CONTROL_ALLOW_ORIGIN         = os.getenv('ACCESS_CONTROL_ALLOW_ORIGIN', '*')

    DATABASE_URI                        = os.getenv('DATABASE_URI', 'sqlite:///:memory:')

    ADMIN_USERNAME                      = os.getenv('ADMIN_USERNAME', 'admin')
    ADMIN_PASSWORD                      = os.getenv('ADMIN_PASSWORD', 'secret')

    NUMBER_OF_PROHIBITION_IDS_IN_BLOCK  = 10


