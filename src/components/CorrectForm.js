import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

//import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default class CorrectForm extends Component {
   constructor(props) {
   super(props);
   this.state = {
     editorState: EditorState.createEmpty()
     };
   }
 onEditorStateChange = editorState => {
    this.setState({ editorState });
    this.props.captureRichText(editorState)
    //console.log(this.state.editorState)
 };

render() {
const { editorState } = this.state;
return (
  <div className="text-editor1">
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

      
  </div>
 
);
} }

