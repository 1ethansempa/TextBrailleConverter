#These functions are necessary to help improve the quality of images

""""""""" ..............LETS GET STARTED.....................  """""""""

import pdf2image        # Import Pdf2Image Package
from PIL import Image   #Import the Pillow Package

# Parameters for convertt from path method in pdftoimage packaage

DPI = 300
OUTPUT_FOLDER = None
FIRST_PAGE = None
LAST_PAGE = None
FORMAT = 'jpeg'
THREAD_COUNT = 1
USERPWD = None
USE_CROPBOX = False
STRICT = False

def pdftoimage(PDF_PATH):
    Images = pdf2image.convert_from_path(PDF_PATH, dpi=DPI, output_folder=OUTPUT_FOLDER, first_page=FIRST_PAGE, last_page=LAST_PAGE, fmt=FORMAT, thread_count=THREAD_COUNT, userpw=USERPWD, use_cropbox=USE_CROPBOX, strict=STRICT)
    return Images
