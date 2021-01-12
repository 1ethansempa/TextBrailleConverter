import React, { Component } from 'react';
import { EditorState, convertToRaw ,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';
import Preloader from './Preloader'
import { Redirect } from 'react-router-dom'
import IdleTimer from 'react-idle-timer'

//import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default class CorrectForm extends Component {
   constructor(props) {
   super(props);
   this.state = {
    editorState: 
    EditorState.createWithContent(ContentState.createFromText(
    this.props.location.state.correctString)),
    isLoading:false,redirect:0,
    //15 minute timeout
    timeout:1000 * 900 * 1,
    isTimedOut:false
     //this.props.location.state.correctString
     };
     this.idleTimer=null;
     this.onAction= this._onAction.bind(this)
     this.onActive= this._onActive.bind(this)
     this.onIdle= this._onIdle.bind(this)
   }
   _onAction(e){
    console.log('Something was done',e)
    this.setState({isTimedOut:false})
}
_onActive(e){
    console.log('User is active',e)
    this.setState({isTimedOut:false})
}
_onIdle(e){
    console.log('User is idle',e)
    const isTimedOut= this.state.isTimedOut
    if(isTimedOut){
        this.setState({redirect:2})
    }
    else{
        this.idleTimer.reset();
        this.setState({isTimedOut:true})
    }
}
 onEditorStateChange = editorState => {
    this.setState({ editorState });
    this.props.captureRichText(editorState)
    //console.log(this.state.editorState)
 };

 transformToBraille =(text)=>{
    let formData = new FormData();
    formData.append('RichEditorText',this.state.editorState.getCurrentContent().getPlainText())
    formData.append('BrailleFont',this.props.location.state.BrailleFont)
    formData.append('BrailleOption',this.props.location.state.BrailleOption)
    
     for(var j of formData){
       let name=j[0]
       let value=j[1]
         console.log(name+':'+value)
     }
    const config = {     
     headers: { 'content-type': 'multipart/form-data',
     "Access-Control-Allow-Origin": "*" }
 }
 this.setState({isLoading:true})
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

render() {
const { editorState } = this.state;
var HomeURL="/"
if(!this.state.isLoading)
{
    return (
        <div className="text-editor1">
           <IdleTimer ref={ref => {this.idleTimer = ref}}
            onActive={this.onActive}  onIdle={this.onIdle}
            onAction={this.onAction} element={document}
            timeout={this.state.timeout}
            />
          <Editor
            toolbar={{ options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'history'],
            blockType: {
              inDropdown: true,
              options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
            }}}
            editorState={editorState}
            wrapperClassName="rich-editor demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
            placeholder="Write text ..." />
      
              <textarea className={`d-none`}
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent())) }
              />
               <div className="text-area-btns">  
                      
                        <button className={`btn mr-2`} 
                        onClick={this.transformToBraille} type={`button`}>Proceed</button>
                        </div>   
        </div>
       
      );
}
else{
    if(this.state.redirect===0)
    {
        return(
            <Preloader ProcessingText={`Your braille file is being processed`}/>     
        )
    }
    else if(this.state.redirect===1){
        return(
            <Redirect to={{pathname:"/BrailleRep"}}/>
        )
    }
    else{
      return(
        <Redirect to={{HomeURL}}/>
    )
    }
    
}

} }

