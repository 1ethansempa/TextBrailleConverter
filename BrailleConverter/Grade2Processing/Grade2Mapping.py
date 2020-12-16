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
                'cannot':chr(10296)+chr(10249), #_c 
                'conceive': chr(10249)+chr(10249)+ chr(10279),
          #3cv, 3 is incorrect
                'concieving': chr(10249)+chr(10249)+ chr(10279)+ chr(10267), #same as above
                'could': chr(10249)+ chr(10265), #cd
                'day': chr(10242)+chr(10265), #"d 
                'declaring': chr(10265)+ chr(10249) + chr(10247)+ chr(10267), #dclg
                'deceive': chr(10265)+chr(10249)+chr(10279), #dcv
                'deceiving': chr(10265)+chr(10249)+chr(10279)+chr(10267), #dcvg
                'either': chr(10257)+chr(10250), #ei
                'ever': chr(10278)+ chr(10257), #"e inequivalent
                'father': chr(10242)+chr(10251), #"f
                'friend': chr(10251)+chr(10263), #fr
                'good': chr(10267)+chr(10265), #gd
                'great': chr(10267)+chr(10263)+chr(10270), #grt
                'had': chr(10296)+chr(10259), #_h 
                'here': chr(10242)+chr(10259), #"h
                'him': chr(10259)+chr(10253), #hm
                'himself': chr(10259)+chr(10253)+chr(10251), #hmf
                'immediate': chr(10250)+chr(10253)+chr(10253), #imm
                'letter': chr(10247)+chr(10263), #lr
                'itself': chr(10285)+chr(10251), #xf
                'little': chr(10247)+chr(10247), #ll
                'lord': chr(10242)+chr(10247), #"l
                'many': chr(10296)+chr(10253), #_m
                'mother': chr(10242)+chr(10253), #"m
                'must':chr(10253)+chr(10252), #m/
                'myself': chr(10253)+chr(10301)+chr(10251), #myf
                'name': chr(10242)+chr(10269), #"n
                'necessary': chr(10269)+chr(10257)+chr(10249), #nec
                'neither':chr(10269)+chr(10257)+chr(10250), #nei
                'one': chr(10242)+chr(10261), #"o
                'oneself': chr(10242)+chr(10261)+chr(10251), #"of
                'paid': chr(10255)+chr(10265), #pd
                'part': chr(10242)+chr(10255), #"p
                'people': chr(10255), #p
                'question': chr(10242)+chr(10271), #"q
                'quick': chr(10271)+chr(10245), #qk
                'quite':chr(10271), #q
                'rather':chr(10263), #r
                'receive': chr(10263)+chr(10249)+chr(10279), #rcv
                'receiving': chr(10263)+chr(10249)+chr(10279)+chr(10267), #rcvg
                'rejoice': chr(10263)+chr(10266)+chr(10249), #rjc
                'rejoicing': chr(10263)+chr(10266)+chr(10249)+chr(10267), #rjcg
                'right': chr(10242)+chr(10263), #"r
                'said':chr(10254)+chr(10265), #sd
                'some':chr(10242)+chr(10254), #"s
                'spirit': chr(10296)+chr(10254), #_s
                'still':chr(10252), #/
                'that': chr(10270), #t
                'today':chr(10270)+chr(10265), #td
                'together': chr(10270)+chr(10267)+chr(10263), #tgr
                'tomorrow': chr(10270)+chr(10253), #tm
                'tonight': chr(10270)+chr(10269), #tn
                'under': chr(10242)+chr(10277), #"u
                'us': chr(10277), #u
                'very': chr(10279), #v
                'was': chr(10266),#0
                'were': chr(10267), #7
                'will': chr(10298), #w
                'world': chr(10296)+chr(10298), #_w
                'would': chr(10298)+chr(10265), #wd
                'you': chr(10301), #y
                'young': chr(10242)+chr(10301), #"y
                'your': chr(10301)+chr(10263), #yr
                'yourself': chr(10301)+chr(10263)+chr(10251), #yrf
                'yourselves': chr(10301)+chr(10263)+chr(10279)+chr(10254), #yrvs
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