import React, { Component } from 'react';
//import Modal from '../components/Modal';
import Preloader from './Preloader'
import RecordAudio from './AudioRecord1'
import axios from 'axios';
import Dropzone from './Dropzone'
import FirstPart from './FirstPart'
import AudioOptions from './AudioOptions'
import TextOptions from './TextOptions'
import TextArea from './TextArea'
//import BrailleRep from './BrailleRep'
import { Redirect } from 'react-router-dom'
import { EditorState } from 'draft-js';
var fs = require('browserify-fs');

export default class Form extends Component {

    constructor(props) {
        super(props)
        this.state = 
        {showFirst:true,BrailleOption:undefined,BrailleFont:37,BrailleOptionError:false,
        showtextOptions:false,TextOption:undefined,textError:false,
        showDropzone:false,showFirstBtn:false,showSecondBtn:true,
        document:null,docName:'',docError:false,docErrorMsg:'',dropzoneType:true,
        showRadio:false,firstBtn:'Back',secondBtn:'Next',allowSubmit:false,
        showAudioForm:false, ifRadioSelected:0,showRecordAudio:false,
        AudioFile:null,isLoading:false,TextCount:0,AudioCount:0,redirect:0,submitCount:0,
        BrailleFile:null,url:'',RichText:EditorState.createEmpty(),docType:'',falseDoc:false,
        ProcessingText:'',correctString:''}
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    getTextArea=()=>{
      console.log('Redirect happened')
     
    }

    getRichText =(richEditorText)=>{
      this.setState({RichText:richEditorText,TextOption:0});
      console.log(this.state.RichText)
    }
   
    getBrailleOption =(brailleOption)=>{
      this.setState({BrailleOption:brailleOption,BrailleOptionError:false},()=>{
        console.log(this.state.BrailleOption)
      })
    }
    setRedirect=()=>{
      console.log(this.state.document);
      this.setState({redirect:1})
      console.log('Doc has been passed to rep')
     
    }

    getBrailleFont =(brailleFont)=>{
      this.setState({BrailleFont:brailleFont},()=>{
        console.log(this.state.BrailleFont)
      })
    }
    getTextOption =(textOption)=>{
      this.setState({TextOption:textOption},()=>{
        console.log(this.state.TextOption)
      })
    }

    getAudioOption =(audioOption)=>{
      this.setState({AudioOption:audioOption},()=>{
        console.log(this.state.AudioOption)
      })
    }
    getAudioFile =(audioFile,filename)=>{
        this.setState({AudioFile:audioFile,docName:filename},()=>{
          console.log(this.state.AudioFile)


        })
    }
    getDocument =(doc,filename,ext) =>{
      if(this.state.dropzoneType){
        this.setState({document:doc,docName:filename,docError:false},()=>{
          if(ext==='docx'||'doc'){
            this.setState({doctype:'word'})
          }
          console.log(this.state.document)
          console.log(this.state.docType)
          console.log(filename)
        })
      }
      else{
          this.getAudioFile(doc,filename)
      }
    }
      showOrHideProceed=(no)=>{
        if(no===0){
          this.setState({showSecondBtn:true,secondBtn:'Proceed',allowSubmit:true})
        }
        else{
          this.setState({AudioFile:null})
          this.setState({showSecondBtn:false})
        }
      }

     
    updateButtonState(brailleOption,count){
      if(count===0){
        this.setState({showFirst:true,showtextOptions:false,showFirstBtn:false,showRadio:false})
      }
      if(brailleOption==="0"||brailleOption==="1"||this.state.BrailleOption==="4"){
        if(count===1){
            this.setState({BrailleOptionError:false,showtextOptions:true,showFirst:false,
              showFirstBtn:true,showForm:false,docError:false,docErrorMsg:'',
              secondBtn:'Next',allowSubmit:false,dropzoneType:true})
        }
        else if(count===2){
          if(this.state.TextOption===undefined){
            this.setState({textError:true})
          }
          else if(this.state.TextOption===1){
            this.setState({showtextOptions:false,showForm:true,secondBtn:'Proceed',allowSubmit:true});  
          }
          else if(this.state.TextOption===0){
            this.setState({showtextOptions:false,secondBtn:'Proceed',allowSubmit:true}); 
             
          }
        }
      }

      else if(brailleOption==="2"||brailleOption==="3"){
        if(count===1){
          this.setState({BrailleOptionError:false,showRadio:true,showFirst:false,
            showSecondBtn:true,showFirstBtn:true,secondBtn:'Next',allowSubmit:false,
            showRecordAudio:false,dropzoneType:false,showForm:false})
        }
        else if(count ===2){
          if(this.state.AudioOption===1){
            if(this.state.AudioFile!==null){
              this.showOrHideProceed(0)
              this.setState({showRecordAudio:true,showRadio:false})
            }
            else{
              this.showOrHideProceed(1)
              this.setState({showRecordAudio:true,showRadio:false})
            }
              
          }
          else if(this.state.AudioOption===0){
            this.setState({showRadio:false,showForm:true,secondBtn:'Proceed',allowSubmit:true,
            dropzoneType:false});
          }
        }
        
    }
    }
      showBack=(e)=>{
        if(this.state.BrailleOption===undefined){
          
          this.setState({BrailleOptionError:true},()=>{
            console.log('Error in option')
          })  
      }
      else if(this.state.BrailleOption==="0"||this.state.BrailleOption==="1"||this.state.BrailleOption==="4"){
        
        this.setState({TextCount:this.state.TextCount - 1},()=>{
          this.updateButtonState(this.state.BrailleOption,this.state.TextCount)
        })
      }
      else if(this.state.BrailleOption==="2"||this.state.BrailleOption==="3"){
        this.setState({AudioCount:this.state.AudioCount - 1},()=>{
          this.updateButtonState(this.state.BrailleOption,this.state.AudioCount)
        })
      }
      }

      showNext=(e)=>{
        if(this.state.BrailleOption===undefined){
              this.setState({BrailleOptionError:true},()=>{
              console.log('Error in font or option')
            }) 
        }
        else if(this.state.BrailleOption==="0"||this.state.BrailleOption==="1"||this.state.BrailleOption==="4"){
         
          this.setState({TextCount:this.state.TextCount + 1},()=>{
            this.updateButtonState(this.state.BrailleOption,this.state.TextCount)
          })
        }
        else if(this.state.BrailleOption==="2"||this.state.BrailleOption==="3"){
          this.setState({AudioCount:this.state.AudioCount + 1},()=>{
            this.updateButtonState(this.state.BrailleOption,this.state.AudioCount)
          })
        }
      }
      uploadFile(){
        let reader = new FileReader()
        reader.readAsDataURL(this.state.document)
        reader.onload=(e)=>{
          const url1 = "http://localhost:3000/src/components/files";
        const FormData ={file:this.state.document}
        return axios.post(url1,FormData).then(response =>
          console.warn('result',response))
        }
      }
    
      handleSubmit(event) {
      event.preventDefault()
      
       let formData = new FormData();
       this.setState({submitCount: this.state.submitCount +1},()=>{
        if(this.state.submitCount!==1){
          if(this.state.BrailleOption==="0"||this.state.BrailleOption==="1"||this.state.BrailleOption==="4"){
        
            if(this.state.document!==null){
             if(this.state.TextOption===1){
             
              formData.append('Upload_File',this.state.document)
              formData.append('BrailleFont',this.state.BrailleFont)
              formData.append('BrailleOption',this.state.BrailleOption)
              formData.append('FileName',this.state.docName)
               for(var i of formData){
                 let name=i[0]
                 let value=i[1]
                   console.log(name+':'+value)
               }
              const config = {     
               headers: { 'content-type': 'multipart/form-data',
               "Access-Control-Allow-Origin": "*" }
           }
           this.setState({isLoading:true,docError:false,docErrorMsg:'',
           ProcessingText:'Your braille file is being processed.'})
           //`http://192.168.43.115:5000
               axios.post(`http://192.168.43.115:5000/`,formData,config)
               .then(res => {
                 console.log(res);
                 console.log(res.data);
                
                 if(res.data){
                  this.setState({redirect:1})
                 }
               })
 
               if(this.docType==='word'){
                 this.setState({falseDoc:true})
               }
              
              
               //this.setState({heading: "Success",msg:'Document uploaded successfully',uploadState:true })
             }

             
             else{

             }
             
             }
             else{
              if(this.state.TextOption===0){
                formData.append('RichEditorText',this.state.RichText.getCurrentContent().getPlainText())
                formData.append('BrailleFont',this.state.BrailleFont)
                formData.append('BrailleOption',this.state.BrailleOption)
                
                 for(var j of formData){
                   let name=j[0]
                   let value=j[1]
                     console.log(name+':'+value)
                 }
                const config = {     
                 headers: { 'content-type': 'multipart/form-data',
                 "Access-Control-Allow-Origin": "*" }
             }
             this.setState({isLoading:true,docError:false,docErrorMsg:'',
             ProcessingText:'Your braille file is being processed.'})
             //`http://192.168.43.115:5000
                 axios.post(`http://192.168.43.115:5000/Editor/`,formData,config)
                 .then(res => {
                   console.log(res);
                   console.log(res.data);
                  
                   if(res.data){
                    this.setState({redirect:1})
                   }
                 })
   
                 if(this.docType==='word'){
                   this.setState({falseDoc:true})
                 }
                 //this.setState({heading: "Success",msg:'Document uploaded successfully',uploadState:true }) 
               }
               else{
                console.log('This code was reached')
                this.setState({docError:true,docErrorMsg:'No document uploaded yet' })
               } 
             }
            
          }
          else if(this.state.BrailleOption==="2"||this.state.BrailleOption==="3"){
            
             const config = {     
             headers: { 'content-type': 'multipart/form-data' } 
             }
             if(this.state.AudioFile!==null){

              if(this.state.AudioOption===0){
                console.log('I was reached')
                formData.append('AudioFile',this.state.AudioFile)
                formData.append('BrailleFont',this.state.BrailleFont)
                formData.append('BrailleOption',this.state.BrailleOption)
                formData.append('FileName',this.state.docName)
                for(var k of formData){
                  let name=k[0]
                  let value=k[1]
            
                    console.log(name+':'+value)
                  
                    this.setState({isLoading:true,docError:false,docErrorMsg:'',
                    ProcessingText:'Your text is being processed.'})
                    axios.post(`http://192.168.43.115:5000/Speech/Upload`,formData,config).then(res => {
                      console.log(res);
                      console.log(res.data);
                     
                      if(res.data){
                      
                       this.setState({redirect:1,correctString:res.data},()=>{
                        
                       })
                      }
                     
                    })
                   }
              }
              else if(this.state.AudioOption===1){
                if(this.state.submitCount>2){
                  formData.append('AudioFile',this.state.AudioFile)
                  formData.append('BrailleFont',this.state.BrailleFont)
                  formData.append('BrailleOption',this.state.BrailleOption)
                  for(var m of formData){
                    let name=m[0]
                    let value=m[1]
                      console.log(name+':'+value)
                      this.setState({isLoading:true,docError:false,docErrorMsg:'',
                      ProcessingText:'Your text is being processed.'})
                      axios.post(`http://192.168.43.115:5000/Speech/`,formData,config).then(res => {
                        console.log(res);
                        console.log(res.data);
                       
                        if(res.data){
                         this.setState({redirect:1,correctString:res.data})
                        }
                       
                      })
                     }
                }
                else{

                }
               
              }
              else{

              }
               /*this.setState({uploadState:true,isLoading:true},()=>{
                 console.log('Preloader started')
               })*/  
             }
             else{
               //console.log(this.state.AudioFile)
               this.setState({heading: "Error",msg:'No Audio file uploaded' })
             }
          } 
           //this.toggleModal();
           //this.trueDisabled(); 
         }
         else{
  
         }
       });
      }
    render() {
      
        if(!this.state.isLoading){
          if(this.state.TextOption===0&&this.state.TextCount > 1)
          {
            /*
              return(
                <Redirect to={{pathname:"/TextArea"}}/>
              ) */
              return(
                <div>
                  <TextArea captureRichText={this.getRichText} editorText={this.state.RichText}/>
                  <div className="text-area-btns">  
                  {/*<button className={`btn mr-2`} type="button" 
                  onClick={this.showBack}>{this.state.firstBtn}
              </button>*/}
                  <button className={`btn mr-2`} 
                  onClick={this.handleSubmit} type={`button`}>{this.state.secondBtn}</button>
                  </div>
                </div>
              )  
          }
          else{
            return (
              <div className={`App mb-2`}>
                <div className="Card">
                  <form id="BrailleForm" autoComplete="off" onSubmit={this.handleSubmit} novalidate>
                  <div className="form-body">
                     
                   <FirstPart showFirstPart={this.state.showFirst}
                   captureBrailleOption={this.getBrailleOption} 
                   captureBrailleFont={this.getBrailleFont}
                   OptionError={this.state.BrailleOptionError}/>

                    <TextOptions showtextOptions={this.state.showtextOptions}
                    captureTextOption={this.getTextOption}
                    textError={this.state.textError}/>
                    
                    <Dropzone showForm={this.state.showForm} 
                    onFilesAdded={console.log} 
                    captureDoc={this.getDocument}
                    docError={this.state.docError}
                    docErrorMsg={this.state.docErrorMsg}
                    audioOrDoc={this.state.dropzoneType}
                    />

                    <AudioOptions showAudioOptions={this.state.showRadio}
                    captureAudioOption={this.getAudioOption}/>
      
                    <RecordAudio showRecordAudio={this.state.showRecordAudio}
                    captureAudio={this.getAudioFile} 
                    showProceedBtn={this.showOrHideProceed}/>

                  </div>

                  <div className="d-flex form-btns">  
                  <button className={`btn mr-2${this.state.showFirstBtn ? '':'disabled d-none'}`} 
                  type="button" onClick={this.showBack}>{this.state.firstBtn}</button>
                  <button className={`btn mr-2 ${this.state.showSecondBtn ? '':'disabled d-none'}`} 
                  onClick={this.showNext} type={`${this.state.allowSubmit ?'submit':'button'}`}>{this.state.secondBtn}</button>
                  </div>

                </form>
              </div>
            </div>
          )
          }
            
        }
        else{
          if(this.state.redirect===0){
            return( 
             <Preloader ProcessingText={this.state.ProcessingText}/>     
          ) 
        }
        else{
          if(this.state.AudioOption===0||this.state.AudioOption===1){
            return(
              <Redirect to={{pathname:"/CorrectForm",
              state:{correctString:this.state.correctString,
              BrailleFont:this.state.BrailleFont,
            BrailleOption:this.state.BrailleOption}}}/>
            )
          }
          else{
            return(
              <Redirect to={{pathname:"/BrailleRep",
            state:{document:this.state.document}}}/>
            )
          }
        
        } 
        }
        }

}
