import React, { Component } from 'react'
import DocViewer,{ DocViewerRenderers} from "react-doc-viewer";
//import DocViewer,{ PDFRenderer,MSDocRenderer} from "react-doc-viewer";

const docs1=[{uri: require("E://Work/TextBraille/textbraille/src/files/Report system proposal (NGO).pdf")}]
const docs2=[{uri: require("E://Work/TextBraille/textbraille/src/files/1.pdf")}]

export default class BrailleRep extends Component {
    render() {
        return (
            <div>
                <div className="greyBckgrnd d-lg-none d-block">
                    <div className="text-area-btns">
                        <p>Download Braille File here</p>
                        <button className="btn"  type="button">Download</button>
                    </div>
                </div>
                <div className="displayArea mt-2 d-none d-lg-block mb-2">
                    <div className="d-flex">
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
        )
    }
}
