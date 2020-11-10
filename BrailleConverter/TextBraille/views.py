from flask import Blueprint, render_template,  request, jsonify
from flask import current_app
import os
import pytesseract

from BrailleConverter.ImageProcessing import Functions # Import the functions file with Image Pre processing
from BrailleConverter.Grade1Processing import Grade1Conversion # Import the file with Grade 1 conversion  
from BrailleConverter.Grade2Processing import Grade2Conversion #Import the file with Grade 2 Conversion

from flask_cors import CORS # Attempt at using API, So catering for CORS


TextBraille = Blueprint('TextBraille', __name__, url_prefix = '', static_folder = 'static', template_folder = 'Templates')

CORS(TextBraille)
# Installed Poppler Binaries which is necessary in pdf to image Conversion
#using conda install -c conda-forge poppler

@TextBraille.route('/api/test', methods= ["POST"])

def Test():
        FormData = request.json
        print(FormData)

        Pdf = FormData["BrailleFont"] # Get Uploaded File
        print(Pdf)

        return jsonify(Pdf)

@TextBraille.route('/', methods = ["GET"])

def Home():
        return render_template('index.html')


@TextBraille.route('/', methods = ["POST"])

def Convert():
        pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe' #pointing to the binaries installed
        
        
        FontSize = request.form['BrailleFont'] # Get the Font Size
        print(FontSize)

        BrailleGrade =  request.form['BrailleOption']
        print(BrailleGrade)
        """
        FontSize = 24
        BrailleGrade = "1"
        """

        #These are Options to Guide the Conversion
        #Braille Grade value = 1 is to convert to Grade 2
        #Braille Grade Value =  2 is to convert to Grade 1


        Pdf = request.files['Upload_File'] # Get Uploaded File using basic http request 

        Pdf.save(os.path.join(current_app.config['PDF_UPLOADS'], Pdf.filename)) #Save File to be Used on image processing

        TextFile = os.path.join(current_app.config['TEXT_FILE']) # specify where u want ur text to be written to
        
        f = open(TextFile, "a", encoding='UTF-8') # Initialise the text file to be appended to
        

        f.truncate(0) # Clear contents of  csv. Might later go with multiple files
        try:
                Images =  Functions.pdftoimage(current_app.config['PDF_UPLOADS'] + "/" + Pdf.filename) #Call the Image Prep processing function to convert the Pdf to Image

        except UnicodeDecodeError:
                #
                pass

        for Image in Images:
                
                text = str(((pytesseract.image_to_string(Image) ))) # Calling Pytesseract converter

                f.write(text) # Append text to csv 

        f.close() # Close the text file instance

        BrailleOutput = os.path.join(current_app.config['FINAL_OUTPUT']) # specify where u want ur text to be written to

        if BrailleGrade ==  "0":
                Grade1Conversion.converttograde1(TextFile, BrailleOutput)
        else:
                Output = Grade2Conversion.converttograde2(TextFile)
                with open(BrailleOutput, "a", encoding="utf-8") as BrailleText: # Open a Braille Output text file as  append type
                        BrailleText.write(Output) 


        return '<h1> ALL GOOD</h1>'    
                





    