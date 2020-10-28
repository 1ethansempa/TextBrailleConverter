# Function to convert text to grade 1 Braille. 

#Takes An Argument of the Csv File with English Text to be converted to braille and the Path to file to write the output to

def converttograde1(Text_File, BrailleOutput):

    # Mapped dictionary with text as key and Braille Symbol as Value

    Grade1_Dictionary = {' ':'   ','\n':'\n', '!':'⠮','"':'⠐', '#':'⠼', '$':'⠫', '%':'⠩', '&':'⠯', "'":"⠄", '(':'⠷', ')':'⠾', '*':'⠡',
        '+':'⠬', ',':'⠠', '-':'⠤', '.':'⠨', '/':'⠌', '0':'⠴', '1':'⠂', '2':'⠆', '3':'⠒', '4':'⠲', '5':'⠢',
        '6':'⠖', '7':'⠶', '8':'⠦', '9':'⠔', ':':'⠱', ';':'⠰', '<':'⠣', '=':'⠿', '>':'⠜', '?':'⠹', '@':'⠈',
        'a':'⠁', ' b':'⠃', 'c':'⠉', 'd':'⠙', 'e':'⠑', 'f':'⠋', 'g':'⠛', 'h':'⠓', 'i':'⠊', 'j':'⠚', 'k':'⠅',
        'l':'⠇', 'm':'⠍', 'n':'⠝', 'o':'⠕', 'p':'⠏', 'q':'⠟', 'r':'⠗', 's':'⠎', 't':'⠞', 'u':'⠥', 'v':'⠧',
        'w':'⠺', 'x':'⠭', 'y':'⠽', 'z':'⠵', '[':'⠪', ']':'⠻', '^':'⠘', '_':'⠸', 'A':'⠠⠁', 'B':'⠠⠃', 'C':'⠠⠉',
        'D':'⠠⠙', 'E':'⠠⠑', 'F':'⠠⠋', 'G':'⠠⠛', 'H':'⠠⠓', 'I':'⠠⠊', 'J':'⠠⠚', 'K':'⠠⠅', 'L':'⠠⠇', 'M':'⠠⠍',
        'N':'⠠⠝', 'O':'⠠⠕', 'P':'⠠⠏', 'Q':'⠠⠟', 'R':'⠠⠗', 'S':'⠠⠎', 'T':'⠠⠞', 'U':'⠠⠥', 'V':'⠠⠧', 'W':'⠠⠺',
        'X':'⠠⠭', 'Y':'⠠⠽', 'Z':'⠠⠵'}

    Text =  open(Text_File, "r") # Open the medium text file as read type
    data =  Text.read() # read the data from the medium text file

    with open(BrailleOutput, "a", encoding="utf-8") as BrailleText: # Open a Braille Output text file as  append type

        for element in data:
            try:
                BrailleText.write(Grade1_Dictionary[element])  # Map each out put to grade 1 equivalent
            except KeyError:
                pass
