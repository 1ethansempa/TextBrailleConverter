# This is init file to initialise the Braille Converter Folder as package

#This will also initialise the flask object

from flask import Flask, Blueprint # Import the flask and Blueprint package 
from BrailleConverter.TextBraille.views import TextBraille #Import the Text Braille Blueprint
from  BrailleConverter.Speech2Braille.views import Speech2Braille
from BrailleConverter.Editor2Braille.views import Editor2Braille
from BrailleConverter.config import *



def CreateApp(config_class = DevelopmentConfig):

    Braille = Flask(__name__)  # Initialise the Flask object
    Braille.config.from_object(DevelopmentConfig) # load config from config file

    Braille.register_blueprint(TextBraille) #Register the TextBraille Blueprint

    Braille.register_blueprint(Editor2Braille) #Register the Editor to Braille Blueprint
    
    Braille.register_blueprint(Speech2Braille) # Register the Speech to Text Blueprint

    return Braille

