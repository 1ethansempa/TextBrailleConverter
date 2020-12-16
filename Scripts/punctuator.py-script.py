#!c:\pythonprojects\finalyear-project\scripts\python.exe
# EASY-INSTALL-ENTRY-SCRIPT: 'punctuator==0.9.6','console_scripts','punctuator.py'
__requires__ = 'punctuator==0.9.6'
import re
import sys
from pkg_resources import load_entry_point

if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw?|\.exe)?$', '', sys.argv[0])
    sys.exit(
        load_entry_point('punctuator==0.9.6', 'console_scripts', 'punctuator.py')()
    )
