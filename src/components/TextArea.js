import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default class TextArea extends Component {
   constructor(props) {
   super(props);
   this.state = {
     editorState: EditorState.createEmpty()
     };
   }
 onEditorStateChange = editorState => {
    this.setState({ editorState });
    console.log(this.state.editorState)
 };
render() {
const { editorState } = this.state;
return (
  <div className="text-editor1">
    <Editor 
      editorState={editorState}
      wrapperClassName="rich-editor demo-wrapper"
      editorClassName="demo-editor"
      onEditorStateChange={this.onEditorStateChange}
      placeholder="The message goes here..." />
       <div className="text-area-btns">
        
        <button className="btn mr-2"  type="button">Back</button>
      
        <button className={`btn mr-2`} type={`submit`}>Proceed</button>
        </div>
  </div>
 
);
} }
