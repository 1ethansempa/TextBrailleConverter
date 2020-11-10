from flask import Blueprint,render_template,  request
from flask import current_app
import speech_recognition  as sr
import os


Speech2Braille = Blueprint('Speech2Braille', __name__, url_prefix = '/Speech', static_folder = 'static', template_folder = 'Templates')


#Route to the Speech or audio input form
@Speech2Braille.route('/', methods = ["GET"])

def Home():

        #Returns the html fiile with the form that accepts audio input
        return render_template('Speech.html')


@Speech2Braille.route('/', methods = ["POST"])

def Convert():
        
        Audio = request.files['Upload_File'] # Get Uploaded File

        #The recognizer class helps in recognizing of speech
        Record = sr.Recognizer() # This creates an instance of the recognizer class

        #Going to use the Google web speech API for now

        TextFile = os.path.join(current_app.config['AUDIO_TEXT']) # specify where u want ur text to be written to
        
        f = open(TextFile, "a", encoding='UTF-8') # Initialise the text file to be appended to

        with sr.AudioFile(Audio) as source: # Opening the audio file

                Record.adjust_for_ambient_noise(source, duration=0.5) # removing noise-- has a time effect on the program

                Audio_Data =  Record.record(source) # recording the data to ensure its in the audio content format
                try:
                        
                        Text = Record.recognize_google(Audio_Data, language = "en-US") # Transalating the audio to text

                        f.write(Text) #Write to the intermediary text file 

                except sr.UnknownValueError:
                        print("File was not clear")
                        


        

        return '<h1> ALL GOOD</h1>'  



