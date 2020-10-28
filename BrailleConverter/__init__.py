# This is init file to initialise the Braille Converter Folder as package

#This will also initialise the flask object

from flask import Flask, Blueprint # Import the flask and Blueprint package 
from BrailleConverter.TextBraille.views import TextBraille #Import the Text Braille Blueprint
from BrailleConverter.config import *


def CreateApp(config_class = DevelopmentConfig):

    Braille = Flask(__name__)  # Initialise the Flask object
    Braille.config.from_object(DevelopmentConfig) # load config from config file

    print(Braille.config['SECRET_KEY'])
    Braille.register_blueprint(TextBraille) #Register the TextBraille Blueprint

    return Braille

