from flask import Blueprint, render_template,  request, jsonify, send_from_directory
from flask import current_app
import os
import pytesseract

from gingerit.gingerit import GingerIt

import docx2txt
import platform
import textract

import fpdf

import uuid

from BrailleConverter.ImageProcessing import Functions # Import the functions file with Image Pre processing
from BrailleConverter.Grade1Processing import Grade1Conversion # Import the file with Grade 1 conversion  
from BrailleConverter.Grade2Processing import Grade2Conversion #Import the file with Grade 2 Conversion

from flask_cors import CORS # Attempt at using API, So catering for CORS


TextBraille = Blueprint('TextBraille', __name__, url_prefix = '', static_folder = 'static', template_folder = 'Templates')

CORS(TextBraille)
# Installed Poppler Binaries which is necessary in pdf to image Conversion
#using conda install -c conda-forge poppler

@TextBraille.route('/', methods = ["GET"])

def Home():
        print()
        return render_template('index.html')


@TextBraille.route('/', methods = ["POST"])

def Convert():
        if platform.system() == 'Windows':
                pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe' #pointing to the binaries installed
                

        fpdf.set_global("SYSTEM_TTFONTS", os.path.join(os.path.dirname(__file__),'fonts'))
        

        FontSize = request.form['BrailleFont'] # Get the Font Size
        FontSize =  int(FontSize)
        print(FontSize)

        BrailleGrade =  request.form['BrailleOption']
        print(BrailleGrade)
        
        #These are Options to Guide the Conversion
        #Braille Grade value = 1 is to convert to Grade 2
        #Braille Grade Value =  2 is to convert to Grade 1

        """
        FontSize = 12
        BrailleGrade = "1"
        """
    
        #FileName = "test.pdf"
        FileName = request.form['FileName']
        print(type(FileName))
        print(FileName)

        TextFile = os.path.join(current_app.config['TEXT_FILE']) # specify where u want ur text to be written to

        if FileName.endswith('.docx'):
                Docx = request.files['Upload_File'] # Get Uploaded File using basic http request

                Docx.save(os.path.join(current_app.config['WORD_DOCS'], Docx.filename)) #Save File
                text = docx2txt.process(current_app.config['WORD_DOCS'] + "/" + Docx.filename)
                print(text)

                f = open(TextFile, "a", encoding='UTF-8') # Initialise the text file to be appended to
        
                f.truncate(0) # Clear contents of .txt Might later go with multiple files

                f.write(text) # Append text to csv 

                f.close() # Close the text file instance
        elif FileName.endswith('.doc'):

                Doc = request.files['Upload_File'] # Get Uploaded File using basic http request 

                Doc.save(os.path.join(current_app.config['WORD_DOCS'], Docx.filename)) #Save File to be Used on image processing 

                text = textract.process(current_app.config['WORD_DOCS'] + "/" + Doc.filename, extension='doc')
                text = text.decode("utf-8") 

                f = open(TextFile, "a", encoding='UTF-8') # Initialise the text file to be appended to
        
                f.truncate(0) # Clear contents of .txt Might later go with multiple files

                f.write(text) # Append text to csv 

                f.close() # Close the text file instance
        elif FileName.endswith('.pdf'):
                Pdf = request.files['Upload_File'] # Get Uploaded File using basic http request 

                Pdf.save(os.path.join(current_app.config['PDF_UPLOADS'], Pdf.filename)) #Save File to be Used on image processing

                f = open(TextFile, "a", encoding='UTF-8') # Initialise the text file to be appended to
        
                f.truncate(0) # Clear contents of .txt Might later go with multiple files
                try:
                        Images =  Functions.pdftoimage(current_app.config['PDF_UPLOADS'] + "/" + Pdf.filename) #Call the Image Prep processing function to convert the Pdf to Image

                except UnicodeDecodeError:
                        pass

                for Image in Images:
                
                        Text = str(((pytesseract.image_to_string(Image) ))) # Calling Pytesseract converter

                        parser = GingerIt()
                        correction =  parser.parse(Text)

                        text = correction['corrections']

                        f.write(text) # Append text to csv 

                f.close() # Close the text file instance

        BrailleOutput = os.path.join(current_app.config['FINAL_OUTPUT']) # specify where u want ur text to be written to

        if BrailleGrade ==  "0":
                Grade1Conversion.converttograde1(TextFile, BrailleOutput)
        else:
                Output = Grade2Conversion.converttograde2(TextFile)
                with open(BrailleOutput, "a", encoding="utf-8") as BrailleText: # Open a Braille Output text file as  append type
                        BrailleText.write(Output) 

        BraillePDF = fpdf.FPDF()  # Initialising Braille PDF
        BraillePDF.add_font("Swell-Braille", style="", fname="Swell-Braille.ttf", uni=True)
        BraillePDF.add_page() #Adding a Page
        BraillePDF.set_font("Swell-Braille", size = FontSize) #Set Font Size

        Pdf_ID = uuid.uuid1()
        Pdf_ID =  str(Pdf_ID)

        T = open(BrailleOutput, "r+" , encoding="utf8") 

        for x in T:
                BraillePDF.cell(200, 10, txt = x, ln = 1, align = 'L') 


        BraillePDF.output(current_app.config['BRAILLE_PDF'] + "/" + Pdf_ID +".pdf") 

        T.truncate(0) # Clear contents of .txt Might later go with multiple files

        T.close() # Close the text file instance

        return send_from_directory(current_app.config['BRAILLE_PDF'], Pdf_ID +".pdf", mimetype='application/pdf')                





    