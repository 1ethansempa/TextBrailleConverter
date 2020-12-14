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
    WORD_DOCS = os.environ.get("WORD_DOCS")
    TEXT_FILE = os.environ.get("TEXT_FILE")
    FINAL_OUTPUT = os.environ.get("FINAL_OUTPUT")
    AUDIO_TEXT = os.environ.get("AUDIO_TEXT")
    WAV_FILE = os.environ.get("WAV_FILE")
    BRAILLE_PDF = os.environ.get("BRAILLE_PDF")
    API_KEY = os.environ.get("IBM_API_KEY")
    IBM_URL = os.environ.get("IBM_URL")