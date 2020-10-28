from flask import Blueprint, render_template,  request
from flask import current_app
import os
import pytesseract

from BrailleConverter.ImageProcessing import Functions # Import the functions file with Image Pre processing
from BrailleConverter.Grade1Processing import Grade1Conversion # Import the file with Grade 1 conversion  


TextBraille = Blueprint('TextBraille', __name__, url_prefix = '', static_folder = 'static', template_folder = 'Templates')

# Installed Poppler Binaries which is necessary in pdf to image Conversion
#using conda install -c conda-forge poppler

@TextBraille.route('/', methods = ["GET"])

def Home():
        return render_template('index.html')


@TextBraille.route('/', methods = ["POST"])

def Convert():
        pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe' #pointing to the binaries installed

        Pdf = request.files['Upload_File'] # Get Uploaded File

        Pdf.save(os.path.join(current_app.config['PDF_UPLOADS'], Pdf.filename)) #Save File to be Used on image processing

        TextFile = os.path.join(current_app.config['TEXT_FILE']) # specify where u want ur text to be written to
        
        f = open(TextFile, "a", encoding='UTF-8') # Initialise the text file to be appended to

        f.truncate() # Clear contents of  csv. Might later go with multiple files

        Images =  Functions.pdftoimage(current_app.config['PDF_UPLOADS'] + "/" + Pdf.filename) #Call the Image Prep processing function to convert the Pdf to Image

        for Image in Images:
                
                text = str(((pytesseract.image_to_string(Image) ))) # Calling Pytesseract converter

                f.write(text) # Append text to csv 

        f.close() # Close the text file instance

        BrailleOutput = os.path.join(current_app.config['FINAL_OUTPUT']) # specify where u want ur text to be written to

        Grade1Conversion.converttograde1(TextFile, BrailleOutput)


        return '<h1> ALL GOOD</h1>'    
                





    