from flask import Blueprint,render_template,  request, jsonify
from flask import current_app

from BrailleConverter.Grade1Processing import Grade1Conversion # Import the file with Grade 1 conversion  
from BrailleConverter.Grade2Processing import Grade2Conversion #Import the file with Grade 2 Conversion

from flask_cors import CORS # Attempt at using API, So catering for CORS

import uuid

import fpdf

import os

Editor2Braille = Blueprint('Editor2Braille', __name__, url_prefix = '/Editor', static_folder = 'static', template_folder = 'Templates')

CORS(Editor2Braille)

@Editor2Braille.route('/', methods = ["POST"])
def Editor():

    fpdf.set_global("SYSTEM_TTFONTS", os.path.join(os.path.dirname(__file__),'fonts'))

    Text = request.form['RichEditorText']

    FontSize = request.form['BrailleFont'] # Get the Font Size
    FontSize =  int(FontSize)

    BrailleGrade =  request.form['BrailleOption']

    TextFile = os.path.join(current_app.config['TEXT_FILE']) # specify where u want ur text to be written to

    f = open(TextFile, "a", encoding='UTF-8') # Initialise the text file to be appended to
        
    f.truncate(0) # Clear contents of .txt Might later go with multiple files. But did not

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

        T = open(BrailleOutput, "r", encoding="utf8") 

        for x in T:
                BraillePDF.cell(200, 10, txt = x, ln = 1, align = 'L') 


        BraillePDF.output(current_app.config['BRAILLE_PDF'] + "/" + Pdf_ID +".pdf") 

        T.truncate(0) # Clear contents of .txt Might later go with multiple files

        T.close() # Close the text file instance

        return send_from_directory(current_app.config['BRAILLE_PDF'], Pdf_ID +".pdf", mimetype='application/pdf')
    

    