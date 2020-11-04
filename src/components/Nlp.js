import React, { Component } from 'react'

var sentences=["This is a software engineering project.","That helps in the transformation of text",
"Into actual braille"];

export default class Nlp extends Component {
    constructor(props) {
        super(props)
        this.state = { sentencesCount:sentences.length,disableNext:this.CheckNext(),disablePrevious:true,errorPage:this.setErrorPage()
        ,errorMsg:this.setErrorMsg()}
        
    }

    setErrorMsg(){
        if(sentences.length>0){
            return sentences[0]
        }
        else{
            return ''
        }
    }

    CheckNext(){
        if(sentences.length>1){
           
           return false
        }
        else{
            return true
        }
    }
   

    setErrorPage(){
        if(sentences.length >0){ 
            return 1;
        }
        else{
            return 0;
        }
    }

    nextErrorPage=(e)=>{
            if(sentences.length>this.state.errorPage){
            this.setState({disablePrevious:false,errorMsg:sentences[this.state.errorPage],errorPage:this.state.errorPage+1})
            }
            else if((this.state.errorPage-1)===(sentences.length-1)){
            this.setState({disbaleNext:true})
            }
            
    }

    prevErrorPage=(e)=>{
        if(this.state.errorPage>1){
            this.setState({errorMsg:sentences[(this.state.errorPage)-2],errorPage:this.state.errorPage-1})
        }
        if(this.state.errorPage===2){
            this.setState({disablePrevious:true})
        }
       
    }

    render() {
        return (
    <div className="App mb-2">
        
      <div className="Card">
    <div className="form-group">
    <p className="correctFormP">We detected <span className="text-danger font-weight-bold">{this.state.sentencesCount}</span> possible errors in your document</p>
    
    <small className="text-muted">Click Next(>>) if sentence was intended</small><br/>
    <label for="sentence">Sentence</label>
    <span className="correctFormP"style={{float:'right'}}><span>{this.state.errorPage}</span>/<span>{this.state.sentencesCount}</span></span>
    <textarea className="form-control" id="sentence" rows="5" value={this.state.errorMsg}></textarea>
    <div style={{float:'right'}}>
    <button className={`mr-2 btn1 ${this.state.disablePrevious ? 'd-none':''}`} type="button" onClick={this.prevErrorPage}><i className="fas fa-angle-double-left"></i></button>
            <button className={`mr-2 btn1 ${this.state.disableNext ? 'd-none':''}`} type="button" onClick={this.nextErrorPage}><i className="fas fa-angle-double-right"></i></button>
    </div><br/>
    <div style={{textalign:'center'}}>
    <button className="btn mr-2"  type="button">Proceed Anyway</button>
    </div>
   
    </div>
   </div>
          </div>  
        )
    }
}
