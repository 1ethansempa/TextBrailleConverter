import React, { Component } from 'react'
import DocViewer,{ DocViewerRenderers} from "react-doc-viewer";
import IdleTimer from 'react-idle-timer'
import { Redirect } from 'react-router-dom'
//import DocViewer,{ PDFRenderer,MSDocRenderer} from "react-doc-viewer";

export default class BrailleRep extends Component {
    constructor(props){
        super(props);
        this.state={
            //15 minute timeout
            timeout:1000 * 900 * 1,
            isTimedOut:false,
            redirect:false
        }
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
            this.setState({redirect:true})
        }
        else{
            this.idleTimer.reset();
            this.setState({isTimedOut:true})
        }
    }
    render() {
        var HomeURL="/"
       if(!this.state.redirect){
        const docs1=[{uri: require(`E://Work/TextBraille/textbraille/src/components/files/${this.props.location.state.filename1}`)}]
        const docs2=[{uri: require("E://Work/TextBraille/textbraille/src/components/files/1.pdf")}]
        return (
            <>
            <IdleTimer ref={ref => {this.idleTimer = ref}}
            onActive={this.onActive}  onIdle={this.onIdle}
            onAction={this.onAction} element={document}
            timeout={this.state.timeout}
            />
            <div>
                <div className="greyBckgrnd d-lg-none d-block">
                    <div className="text-area-btns">
                        <p>Download Braille File here</p>
                        <a href="files/1.pdf" download>
                        <button className="btn"  type="button">Download</button>
                        </a>
                      
                    </div>
                </div>
                <div className="displayArea mt-2 d-none d-lg-block mb-2">
                    <div className={`d-flex`}>
                  
                    <div className={`col-lg-6 displayDoc`}>
                        <h4 className="greytext">Document</h4>
                        <DocViewer
                         pluginRenderers={DocViewerRenderers}
                         documents={docs1} />
                    </div>
                   
                    <div className="col-lg-6 displayBraille">
                        <h4 className="greytext">Braille File</h4>
                        <DocViewer
                         pluginRenderers={DocViewerRenderers}
                         documents={docs2} />
                    </div>
                    </div>
                    
                </div>
                
            </div>
            </>
        )
       }
       else{
           return (
            <>
           
               
            <Redirect to={{HomeURL}}/> 
            </>
           )
       }
   
    }
}
