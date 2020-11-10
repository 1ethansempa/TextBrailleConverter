import React, { useState, useEffect } from 'react'

const SpeechRecogintion = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecogintion()
mic.continuous =true;
mic.interimResults = true;
mic.lang='en-US'


function AudioRecord(){
    const [isListening, setIsListening] = useState(false)
    const [note, setNote] = useState(null)
    const [savedNotes, setSavedNotes] = useState([])
  
    useEffect(() => {
      handleListen()
    }, [isListening])
  
    const handleListen = () => {
      if (isListening) {
        mic.start()
        mic.onend = () => {
          console.log('continue..')
          mic.start()
        }
      } else {
        mic.stop()
        mic.onend = () => {
          console.log('Stopped Mic on Click')
        }
      }
      mic.onstart = () => {
        console.log('Mics on')
      }
  
      mic.onresult = event => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('')
        console.log(transcript)
        setNote(transcript)
        mic.onerror = event => {
          console.log(event.error)
        }
      }
    }
  
    const handleSaveNote = () => {
      setSavedNotes([...savedNotes, note])
      setNote('')
    }
        return (
            <>
            <div className="App mb-2">
        
            <div className="Card">
            <div className="form-group">
               <label>Click button below to record Audio:</label><br/>
               <div className="mt-5">
                <button id="audioBtn" className="d-none">
                <img className="audioIcon" alt="upload" src="mic2.png"/>
                </button>
                <div id="recordDiv">
                <button className="roundBtn-red mr-2"  onClick={handleSaveNote}>
                <i className="fas fa-times"></i>
                </button>
                <div className="audio-timer mr-2">
                <span><span>0 : 00</span></span>
                </div>
                <button className="roundBtn-green"  onClick={()=>{
                    setIsListening(prevState=>!prevState)
                }}>
                <i className="fas fa-check"></i>
                </button>
                </div>
               </div>
               
            </div>
            </div>
            </div>
            </>
        )
    }

export default AudioRecord
