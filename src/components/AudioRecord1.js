import React, { Component } from 'react'
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
export default class AudioRecord1 extends Component {
    
    constructor(props){
        super(props)
        this.state={micClicked:false,startRecording:false,stopRecording:false,blobURL: '',
            showRecording:false,isBlocked: false, showRecordBtns:false, audioLabel:'Click button below to record Audio:'
        }
    }
    componentDidMount(){
      navigator.getUserMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
        navigator.getUserMedia({ audio: true },
            () => {
              console.log('Permission Granted');
              this.setState({ isBlocked: false });
            },
            () => {
              console.log('Permission Denied');
              this.setState({ isBlocked: true })
            },
          );
    }
 
    triggerStartRecording=(e)=>{
        console.log("Mic was clicked")
       this.setState({micClicked:true,showRecordBtns:true,audioLabel:'Click right button to save or left to cancel:'})
       this.start()
        
    }
    triggerStopRecording1=(e)=>{
        console.log('Recording was stopped and saved')
        this.setState({showRecordBtns:false,stopRecording:true})
        this.stop()
    }
    
    start = () => {
      if (this.state.isBlocked) {
        console.log('Permission Denied');
      } else {
        Mp3Recorder
          .start()
          .then(() => {
            this.setState({ startRecording: true });
          }).catch((e) => console.error(e));
      }
   }

      stop = () => {
        Mp3Recorder
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
           
            const blobURL = URL.createObjectURL(blob)
            console.log(blobURL)
            this.setState({ blobURL, startRecording: false,showRecording:true, audioLabel:'Click Proceed to Continue:' });
          }).catch((e) => console.log(e));
      };

      deleteAudio=()=>{
        this.setState({showRecording:false,blobURL:'',startRecording:false,
        stopRecording:false,micClicked:false,showRecordBtns:false,audioLabel:'Click button below to record Audio:'})
      }


   
     
    render() {
        return (
            <div className="App mb-2">
        
            <div className="Card">
            <div className="form-group">
               <label>{this.state.audioLabel}</label><br/>
               <small className={`text-muted ${this.state.micClicked ? 'd-none':''}`}>Max record time is 2 minutes</small>
               <div className="mt-5">
                <button id="audioBtn" className={`${this.state.micClicked  ? 'd-none' :''}`} onClick={this.triggerStartRecording}>
                <img className="audioIcon" alt="upload" src="mic2.png"/>
                </button>
                <div id="recordDiv" className={`${this.state.showRecordBtns? '' :'d-none'}`} >
                <button className="roundBtn-red mr-2"  onClick={this.deleteAudio}>
                <i className="fas fa-times"></i>
                </button>
                <div className="audio-timer mr-2">
                <span><span>0 : 00</span></span>
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
            </div>
            </div>
        )
    }
}
