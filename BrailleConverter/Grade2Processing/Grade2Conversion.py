#This file is going to contain helper functions as well as function to map to Grade 2 Braille

"""                             LETS BEGIN                      """

from BrailleConverter.Grade2Processing import Grade2Mapping
import re # Import the regex expression library

CAPITAL = chr(10272)  #  This is the symbol for capital letters in Braille 
NUMBER = chr(10300)  #  This is the symbol for numbers in Braille. 
UNRECOGNIZED = '?' # This is a place holder in the event of an Unrecognized characters

open_quotes = True

#This function will call  the necessary functions to complete the grade 2 braille conversion

def converttograde2(Text_File):

        braille = ""

        Words = getWords(Text_File) # Call the function to split the text file to the individual words
        
        for word in Words:  
            

            word = convertNumbers(word) #    Call the function to convert Numbers in text to Braille
           
            word = capital_letters_handler(word) # Call the Function that Adds the Capital Letter prefix in the Text

        
            Trimmed_Word = trim(word) # Trim the text, to remove punctuatuion

            Untrimmed_Word = word
            index = Untrimmed_Word.find(Trimmed_Word)
            shavings = Untrimmed_Word.replace(Trimmed_Word, "")
            braille = buildBraille(Trimmed_Word, shavings, index, braille) + " "

        return braille[:-1]  # Remove that final space that was added.
        
        

#This function is going to extract individual words from the text

def getWords(Text_File):

    Text =  open(Text_File, "r") # Open the medium text file as read type
    data =  Text.read() # read the data from the medium text file
    words = re.split('(\W)', data)
    

    result = []
    

    for word in words:
        if word == '':
            pass
        elif word == ' ':
            pass
        elif word == '\x0c':
            pass
        else:
            result.append(word)
    return result

#This function will check for numbers in a word and convert the numbers to braille


def convertNumbers(word):
        
    if word == "": # Check if the word is blank, then simply end function and return the word
        return word

    result = word[0] #Get the first element of the word passed

    if word[0].isdigit(): # Use Python inbuilt isdigit function to check if the element is a number

        result = NUMBER + Grade2Mapping.numbers.get(word[0])

    for i in range(1, len(word)):
        if word[i].isdigit() and word[i-1].isdigit():

            result += Grade2Mapping.numbers.get(word[i])

        elif word[i].isdigit():

            result += NUMBER + Grade2Mapping.numbers.get(word[i])

        else:

            result += word[i]

    return result


#This function is to handle capital letters 
#This function is to handle capital letters 
def capital_letters_handler(word):
    
    if word == "": # Check if the word is blank

        return word
        
    elif word != "" and len(word) > 1:
        FirstLetter = word[0]
        SecondLetter = word[1]
        
        if FirstLetter.isupper() and SecondLetter.islower():
            
            result = ""
            
            result += CAPITAL + word[0].lower()
            for i in range(1, len(word)):
                result += word[i].lower()
                
            return result
            
        elif FirstLetter.isupper() and SecondLetter.isupper():
            result = ""
            
            result += CAPITAL + CAPITAL + word[0].lower()
            for i in range(1, len(word)):
                result += word[i].lower()
                
            return result
            
        else:
            result = ""
            
            for i in range(0, len(word)):
                result += word[i].lower()
                
            return result
        
        
    else:
        
        result = ""  #End the function there and return nothing since its blank
        for char in word:
            if char.isupper():
                result += CAPITAL + char.lower()
            else:
                result += char.lower()
        return result


#This function is to remove punctuation and symbols in the word
def trim(word):
    
    while len(word) is not 0 and not word[0].isalnum(): # Check is alphanumeric character
        word = word[1:]
    while len(word) is not 0 and not word[-1].isalnum():
        word = word[:-1]
    return word
    #This will be helpful for words like yes! or fullstops.
    #Still hoping to see if  i can work with  sysmols in between words




# This is a function to cconvert The contractions to Braille.
#If Word does not exist as contraction, will convert character by Character

def word_to_braille(word):
   
    if word in Grade2Mapping.contractions: # check if the Word exists among the contractions

        return Grade2Mapping.contractions.get(word) #If Yes, map to its respective contraction

    elif word == '\n': # Check if it is a a key word for new line

        return '\n'
        
    else:
        result = ""
        for char in word:  #If No,get each character in the word

            result += char_to_braille(char) # Call the function that converts characters to braille

        return result # Return result


#This function Checks if The character has already been converted to Braille
#Returns The Character if true 
def is_braille(char):
 
    if len(char) > 1: #Check to see if it is actually one character passed
        return False
        
    return char in Grade2Mapping.BrailleNumbers \
        or char == CAPITAL \
        or char == NUMBER


def buildBraille(Trimmed_Word, shavings, index, braille):
    # Translate a trimmed word to braille then we will re-attach the shavings.
    if shavings == "":
        braille += word_to_braille(Trimmed_Word)
    else:

        for i in range(0, len(shavings)):

            if i == index and Trimmed_Word is not "":

                braille += word_to_braille(Trimmed_Word)

            braille += word_to_braille(shavings[i])

        if index == len(shavings):  # If the shavings are all at the beginning.
            braille += word_to_braille(Trimmed_Word)
    return braille



#This function wiil # Find the UTF code of a particular character.
#Used when an unidentified character is found.

def find_utf_code(char):  
    if len(char) != 1:
        return -1
    for i in range(0, 55000):
        if char == chr(i):
            return i



def char_to_braille(char):
    # Convert an alphabetic char to braille.
    

    if is_braille(char): # Check if it has already been converted to Braille
        return char
   
    elif char == "\"":

        global open_quotes
        if open_quotes:
            open_quotes = not open_quotes
            return Grade2Mapping.punctuation.get("“")
        else:
            open_quotes = not open_quotes
            return Grade2Mapping.punctuation.get("”")

    elif char in Grade2Mapping.letters and char.isupper():
        return CAPITAL + Grade2Mapping.letters.get(char)
    elif char in Grade2Mapping.letters:
        return Grade2Mapping.letters.get(char)
    elif char in Grade2Mapping.punctuation:
        return Grade2Mapping.punctuation.get(char)
    else:
        print("Unrecognized Symbol:", char, "with UTF code:", find_utf_code(char))
        return UNRECOGNIZED

































