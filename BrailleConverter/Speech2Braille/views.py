from flask import Blueprint,render_template,  request
from flask import current_app

from ibm_watson import SpeechToTextV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator


from BrailleConverter.Grade1Processing import Grade1Conversion # Import the file with Grade 1 conversion  
from BrailleConverter.Grade2Processing import Grade2Conversion #Import the file with Grade 2 Conversion
from pydub import AudioSegment
from flask_cors import CORS # Attempt at using API, So catering for CORS
import os


Speech2Braille = Blueprint('Speech2Braille', __name__, url_prefix = '/Speech', static_folder = 'static', template_folder = 'Templates')

CORS(Speech2Braille)
#Route to the Speech or audio input form
@Speech2Braille.route('/', methods = ["GET"])

def Home():

        #Returns the html fiile with the form that accepts audio input
        return render_template('Speech.html')


@Speech2Braille.route('/', methods = ["POST"])

#This function will handle the live recordings which come in the MP3 Format
def liveConvert():
        
        Audio = request.files['AudioFile'] # Get Uploaded File


        #Set up the IBM Service
        Authenticator = IAMAuthenticator(current_app.config['API_KEY'])
        Converter = SpeechToTextV1(authenticator = Authenticator)
        Converter.set_service_url(current_app.config['IBM_URL'])


        Text = Converter.recognize(audio=Audio, content_type='audio/mp3', model='en-US_BroadbandModel', 
                continuous=True).get_result()

        FinalText = Text['results'][0]['alternatives'][0]['transcript']

        print(type(FinalText))
        print(FinalText)

        return 'ok'


@Speech2Braille.route('/Upload', methods = ["POST"])

def uploadConvert():
        #Set up the IBM Service
        Authenticator = IAMAuthenticator(current_app.config['API_KEY'])
        Converter = SpeechToTextV1(authenticator = Authenticator)
        Converter.set_service_url(current_app.config['IBM_URL'])

        Audio = request.files['AudioFile'] # Get Uploaded File

        if Audio.filename.endswith('.mp3'):

                Text = Converter.recognize(audio=Audio, content_type='audio/mp3', model='en-US_BroadbandModel', 
                continuous=True).get_result() 

        elif Audio.filename.endswith('.wav'):

                Text = Converter.recognize(audio=Audio, content_type='audio/wav', model='en-US_BroadbandModel', 
                continuous=True).get_result()

       
        
        print(Text)
        #print(Text['results'][0]['alternatives'][0]['transcript'])

        return 'ok'



#This is a function to convert mp3 files to .wav
def convertToWav(Audio):
        Audio = AudioSegment.from_mp3(Audio)
        Audio.export(os.path.join(current_app.config['WAV_FILE']),  format="wav")

        return Audio