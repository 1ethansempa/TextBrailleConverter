import os # os is necessary for to get the environment variables from the .env file

class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True


class ProductionConfig(Config):
    pass


class DevelopmentConfig(Config):
    ENV = "development"
    DEBUG = True
    SECRET_KEY = os.environ.get("SECRET_KEY")
    PDF_UPLOADS = os.environ.get("PDF_UPLOADS")
    TEXT_FILE = os.environ.get("TEXT_FILE")
    FINAL_OUTPUT = os.environ.get("FINAL_OUTPUT")
    AUDIO_TEXT = os.environ.get("AUDIO_TEXT")