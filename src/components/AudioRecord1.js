import React, { Component } from 'react'
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
export default class AudioRecord1 extends Component {
    
    constructor(props){
        super(props)
        this.state={micClicked:false,startRecording:false,stopRecording:false,blobURL: '',
            showRecording:false,isBlocked: false, showRecordBtns:false,
            audioLabel:'Click button below to record Audio:',
            minutes:0,seconds:0,file:null
        }
    }
   //componentDidMount(){}
    //componentWillUnmount(){}
    saveAudio = (file)=>{
      this.props.setAudioFile(file)
    }

    triggerStartRecording=(e)=>{
        console.log("Mic was clicked")
       navigator.getUserMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
        navigator.getUserMedia({ audio: true },
            () => {
              console.log('Permission Granted');
              this.setState({ isBlocked: false,
                micClicked:true,showRecordBtns:true,
                audioLabel:'Click right button to save or left to cancel:',
                seconds:0 },()=>{
                this.start()  
              });
            },
            () => {
              console.log('Permission Denied');
              this.setState({ isBlocked: true },()=>{
                this.start()  
              })
            },
          ); 
    }
    triggerStopRecording1=(e)=>{
        console.log('Recording was stopped and saved')
        this.setState({showRecordBtns:false,stopRecording:true,seconds:0,minutes:0})
        this.stop()
    }
    
    start = () => {
      if (this.state.isBlocked) {
        console.log('Permission Denied');
      } else {
        this.props.showProceedBtn(1)
        this.myInterval=setInterval(()=>{
          const {seconds,minutes} =this.state

          if(seconds>=0&&seconds <59){
            this.setState(prevState=>({
              seconds:prevState.seconds +1
            }))
          }
          else if(seconds===59){
            this.setState(prevState=>({
              seconds:0,
              minutes:prevState.minutes+1
            }))
            if(minutes===1){
              this.triggerStopRecording1()
            }
          }  
        },1000)
        
        Mp3Recorder.start().then(() => {
            this.setState({ startRecording: true });
          }).catch((e) => console.error(e));  
      }
   }

      stop = (e) => {
        Mp3Recorder
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
            const blobURL = URL.createObjectURL(blob)
            this.setState({file:blob, blobURL, startRecording: false,showRecording:true, audioLabel:'Click Proceed to Continue:' },()=>{
              this.props.captureAudio(this.state.file,"1.mp3")
              this.props.showProceedBtn(0)
              
            });
          }).catch((e) => console.log(e));
          
          clearInterval(this.myInterval)
         
      };

      deleteAudio=()=>{
        this.setState({showRecording:false,blobURL:'',startRecording:false,seconds:0,minutes:0,
        stopRecording:false,micClicked:false,showRecordBtns:false,audioLabel:'Click button below to record Audio:'},()=>{
          this.props.showProceedBtn(1)
        })
      }
 
    render() {
      const {minutes, seconds}=this.state
        return (
          
            <div className={`form-group ${this.props.showRecordAudio ? '': 'd-none'}`}>
               <label>{this.state.audioLabel}</label><br/>
               <small className={`text-muted ${this.state.micClicked ? 'd-none':''}`}>Max record time is 2 minutes</small>
               <small className={`text-muted ${this.state.showRecordBtns ? '':'d-none'}`}>Please be audible</small>
               <div className="mt-5">
                <button id="audioBtn" className={`${this.state.micClicked  ? 'd-none' :''}`} onClick={this.triggerStartRecording}>
                <img className="audioIcon" alt="upload" src="mic2.png"/>
                </button>
                <div id="recordDiv" className={`${this.state.showRecordBtns? '' :'d-none'}`} >
                <button className="roundBtn-red mr-2"  onClick={this.deleteAudio}>
                <i className="fas fa-times"></i>
                </button>
                <div className="audio-timer mr-2">
                <span className="timer"><span><button id="blinkingDot" className="mr-2"></button>{minutes} :
                 {seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span></span>
                </div>
                <button className="roundBtn-green" onClick={this.triggerStopRecording1}>
                <i className="fas fa-check"></i>
                </button>
                </div>
               </div>
               <div className={` ${this.state.showRecording ? 'd-flex':'d-none'}`}>
               <audio controls="controls" className={`mt-2 mr-2`} src={this.state.blobURL}>
                </audio>
                <button id="trashBtn" className={``} title="Delete Audio" onClick={this.deleteAudio}>
                <i className="fa fa-trash"></i>
                </button>
               </div>
            </div>
        )
    }
}
