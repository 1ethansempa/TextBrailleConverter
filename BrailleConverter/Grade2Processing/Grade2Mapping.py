# Contains dictionaries that map English letters to braille.

letters = {'a': chr(10241),
           'b': chr(10243),
           'c': chr(10249),
           'd': chr(10265),
           'e': chr(10257),
           'f': chr(10251),
           'g': chr(10267),
           'h': chr(10259),
           'i': chr(10250),
           'j': chr(10266),
           'k': chr(10245),
           'l': chr(10247),
           'm': chr(10253),
           'n': chr(10269),
           'o': chr(10261),
           'p': chr(10255),
           'q': chr(10271),
           'r': chr(10263),
           's': chr(10254),
           't': chr(10270),
           'u': chr(10277),
           'v': chr(10279),
           'w': chr(10298),
           'x': chr(10285),
           'y': chr(10301),
           'z': chr(10293)
        }

contractions = {'but': chr(10243),
                'can': chr(10249),
                'do': chr(10265),
                'every': chr(10257),
                'from': chr(10251),
                'go': chr(10267),
                'have': chr(10259),
                'just': chr(10266),
                'knowledge': chr(10280),
                'like': chr(10296),
                'more': chr(10253),
                'not': chr(10269),
                'people': chr(10255),
                'quite': chr(10271),
                'rather': chr(10263),
                'so': chr(10254),
                'that': chr(10270),
                'us': chr(10277),
                'very': chr(10279),
                'it': chr(10285),
                'you': chr(10301),
                'as': chr(10293),
                'and': chr(10287),
                'for': chr(10303),
                'of': chr(10295),
                'the': chr(10286),
                'with': chr(10302),
                'will': chr(10298),
                'his': chr(10278),
                'in': chr(10260),
                'was': chr(10292),
                'to': chr(10262),
                'above': chr(10241)+chr(10243)+chr(10279), #abv
                'about': chr(10241)+chr(10243), #ab
                'according': chr(10241)+chr(10249),  #ac
                'across' : chr(10241)+chr(10249)+chr(10263), #acr
                'after' : chr(10241)+chr(10251), #af
                'afternoon' : chr(10241)+chr(10251)+chr(10269), #afn
                'afterward' : chr(10241)+chr(10251)+chr(10298), #afw
                'again' : chr(10241)+chr(10267), #ag
                'against' : chr(10241)+chr(10267)+chr(10252), #ag/
                'almost' : chr(10241)+chr(10247)+chr(10253), #alm
                'already' : chr(10241)+chr(10247)+chr(10263),  #alr
                'also' : chr(10241)+chr(10247),  #al
                #'although' : chr(10241)+chr(10247)+chr(10278), #al?
                'altogether' : chr(10241)+chr(10247)+chr(10270), #alt
                'always' : chr(10241)+chr(10247)+chr(10298), #alw
                'beacause': chr(10243)+chr(10249), #2c
                'before' : chr(10243)+chr(10251), #2f
                'behind' : chr(10243)+chr(10259), #2h
                'below' : chr(10243)+chr(10247), #2l
                'beneath' : chr(10243)+chr(10269), #2n
                'beside' : chr(10243)+chr(10254), #2s
                'between' : chr(10243)+chr(10270), #2t
                'beyond' : chr(10243)+chr(10301), #2y
                'blind' : chr(10243)+chr(10247), #2l
                'braille': chr(10243)+chr(10263)+chr(10247), #brl
                #'cannot' : 
            }

punctuation = {',': chr(10242),
               ';': chr(10246),
               ':': chr(10258),
               '.': chr(10290),
               '!': chr(10262),
               '(': chr(10294),
               ')': chr(10294),
               '“': chr(10278),
               '”': chr(10292),
               '?': chr(10278),
               '/': chr(10252),
               '#': chr(10300),
               '\'': chr(10244),
               '…': chr(10290) + chr(10290) + chr(10290),
               '’': chr(10244),
               '­': chr(10276),
               '-': chr(10276),
               '‐': chr(10276),
               '‑': chr(10276),
               '‒': chr(10276),
               '–': chr(10276),
               '—': chr(10276),
               '―': chr(10276)
            }

numbers = {'1': chr(10241),
           '2': chr(10243),
           '3': chr(10249),
           '4': chr(10265),
           '5': chr(10257),
           '6': chr(10251),
           '7': chr(10267),
           '8': chr(10259),
           '9': chr(10250),
           '0': chr(10266)
           }

BrailleNumbers = {
            chr(10266): 0,
            chr(10241): 1,
            chr(10243): 2,
            chr(10249): 3,
            chr(10265): 4,
            chr(10257): 5, 
            chr(10251): 6,
            chr(10267): 7,
            chr(10259): 8,
            chr(10250): 9
}