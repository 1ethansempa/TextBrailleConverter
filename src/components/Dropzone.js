import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';

const Span = styled.span`
  font-size: 16px;
  text-align: center;
  color:#6c757d!important;
`;

export default class Dropzone extends Component {
  constructor(props) {
    super(props)
    this.state = { hightlight: false ,fileName:'Upload File',src:'cloudupload.png',openModal:false,
  msg:'',heading:'',file:null,isDisabled:false,uploadState:false}
    this.fileInputRef = React.createRef()
    this.openFileDialog = this.openFileDialog.bind(this)
    this.onFilesAdded = this.onFilesAdded.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDrop = this.onDrop.bind(this)
    
  }

  
  openFileDialog() {
    this.setState({
      isDisabled: false
    })
    if (this.state.isDisabled) return;
    this.fileInputRef.current.click();
  }
  
  onFilesAdded(evt) {
    if (this.state.isDisabled) 
    return
    const files = evt.target.files
    var name = this.fileInputRef.current.files[0].name;
  var ext = name.substring(name.lastIndexOf(".") + 1);
    if (this.props.onFilesAdded) {
      if(ext==="docx"||ext==="doc"||ext==="pdf"){
        const array = this.fileListToArray(files)
        this.props.onFilesAdded(array)
      }
      else{

      }
    }
    evt.preventDefault(); 
  if(ext ==="docx"|| ext ==="doc"){
    this.setState({ src: "word.png",fileName: this.fileInputRef.current.files[0].name,file: evt.target.value  });
  }
  else if(ext ==="pdf"){
    this.setState({ src: "pdf.png",fileName: this.fileInputRef.current.files[0].name,file: evt.target.value });
  }
  else{
    this.toggleModal();
    this.setState({heading: "Error",msg:`File type(.${ext}) not allowed!Please upload pdf or word document` });
    evt.target.value = null;
    this.trueDisabled();
    
    //alert("Only pdf and word documents allowed"); 
    
    
  }
  }

  onDragOver(evt) {
    evt.preventDefault()
    if (this.state.isDisabled) 
      return  this.setState({ hightlight: true })
  }

  onDragLeave() {
    this.setState({ hightlight: false })
  }

  onDrop(event) {
    event.preventDefault()

    if (this.state.isDisabled) 
    return
    const files = event.dataTransfer.files
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files)
      this.props.onFilesAdded(array)
    }
    this.setState({ hightlight: false })
  }

  fileListToArray(list) {
    const array = []
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i))
    }
    return array
  }

  toggleModal = () => this.setState({
    openModal: !this.state.openModal
  })
  trueDisabled = () => this.setState({
    isDisabled: true
  })
  falseDisabled = () => this.setState({
    isDisabled: false
  })

  handleValidation= (event) => {
    if(this.state.file!==null){
      this.setState({heading: "Success",msg:'File uploaded successfully',uploadState:true })
    }
    else{
      this.setState({heading: "Error",msg:'No file uploaded' })
    }
    this.toggleModal();
    this.trueDisabled();  
   
  }
  
  render() {
    return (
      <div className="App">
      <div className="Card">
      <form>
      <div
        className={`Dropzone ${this.state.hightlight ? 'Highlight' : ''}`}
        onDragOver={this.onDragOver} onDragLeave={this.onDragLeave}
        onDrop={this.onDrop} onClick={this.openFileDialog}
        style={{ cursor:  'pointer' }}
        >
        <input ref={this.fileInputRef} className="FileInput" type="file"
          accept=".docx, .doc,.pdf" onChange={this.onFilesAdded} value={this.state.file} required />
        <img alt="upload" className="Icon" src={this.state.src}/>
        <Span>{this.state.fileName}</Span>
        <Modal toggle = {this.toggleModal}
          openModal={this.state.openModal} heading={this.state.heading} text={this.state.msg}  
          uploadState={this.state.uploadState} isDisabled={false}/>
      
      </div>
      <button className="btn" type="submit" onClick={this.handleValidation}>Convert</button>
            </form>
            </div>
          </div>  
    )
  }
}
