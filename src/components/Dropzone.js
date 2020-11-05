import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';
import Select from 'react-select';
import axios from 'axios';

const Span = styled.span`
  font-size: 16px;
  text-align: center;
  color:#555!important;
`;

const options = [
  { value: '0', label: 'English Text to Grade 1' },
  { value: '1', label: 'English Text to Grade 2' }
]

const customSelect = {
  control: (base) => ({
    ...base,
    border: '1px solid #555',
    boxShadow: 'none',
    fontSize:16,
    menuColor:'forestgreen',
    width:250,
    '&:hover': {
        border: '1px solid forestgreen',
    }
}),
  option: (provided) => ({
    ...provided,
    fontSize:16,
    menuColor:'forestgreen'
  })
};

export default class Dropzone extends Component {
  constructor(props) {
    super(props)
    this.state = { hightlight: false ,fileName:'Upload File',src:'cloudupload.png',openModal:false,
  msg:'',heading:'',file:null,isDisabled:false,uploadState:false,showDropzone:false,showFirst:true,
  showSecond:false,firstBtn:'Next',BrailleOption:null,BrailleOptionError:false,BrailleFont:24
}
    this.fileInputRef = React.createRef()
    this.openFileDialog = this.openFileDialog.bind(this)
    this.onFilesAdded = this.onFilesAdded.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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
        this.setState({file:this.fileInputRef.current.files[0]})
        console.log(this.state.file)
        
       
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
     
  }

  onInputChange = BrailleOption => {
    this.setState({ BrailleOption });

    console.log(`Option selected:`, BrailleOption);
  };

  checkNumber = event=>{
    let { value, min, max } = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    this.setState({ BrailleFont:value });
  }

  showNext=(e)=>{
    if(this.state.BrailleOption===null||undefined||''){
        this.setState({BrailleOptionError:true})
    }
    else{
      this.setState({showSecond:!this.state.showSecond,showFirst:!this.state.showFirst,
        firstBtn:`${!this.state.showFirst ? 'Next':'Back'}`,BrailleOptionError:false})
    }
  
  }

  handleSubmit(event) {
    event.preventDefault();
   
    if(this.state.file!==null){
      axios.post(`http://192.168.43.115:5000/api/test`, {
        BrailleOption:this.state.BrailleOption,
        BrailleFont:this.state.BrailleFont,
        Upload_File:this.state.file
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      this.setState({heading: "Success",msg:'File uploaded successfully',uploadState:true })
    }
    else{
      this.setState({heading: "Error",msg:'No file uploaded' })
    }
    this.toggleModal();
    this.trueDisabled(); 
    
  }
  
  render() {
    const BrailleOption=this.state.BrailleOption;
    return (
      <div className="App mb-2">
      <div className="Card">
      <form id="BrailleForm" autoComplete="off" onSubmit={this.handleSubmit}>

      <div className="form-group">



        <label className={`${this.state.showFirst ? '':'d-none'}`}>Select Braille Option:</label>
      <Select id="BrailleOption" className={`${this.state.showFirst ? '':'d-none'}`} name="BrailleOption" 
      options={options} styles={customSelect} isSearchable={true} isClearable={true} value={BrailleOption}
      onChange={this.onInputChange} />
       {this.state.BrailleOptionError ? <div><span className='errorSpan'>Please Select Option</span></div> : ''} 
      </div>

      <div className="form-group">
     <label className={`${this.state.showFirst ? '':'d-none'}`}>Select Braille Font Size:</label>
    <input type="number" min="10" max="65" value={this.state.BrailleFont} className={`form-control ${this.state.showFirst ? '':'d-none'}`} placeholder="Enter font size" onChange={this.checkNumber}/>
    <small className={`text-muted ${this.state.showFirst ? '':'d-none'}`}>Select font size between 10 and 65</small><br/>
    
    </div>
      
      <div className={`Dropzone ${this.state.hightlight ? 'Highlight' : ''} ${this.state.showSecond ? '':'d-none'}`}
        onDragOver={this.onDragOver} onDragLeave={this.onDragLeave}
        onDrop={this.onDrop} onClick={this.openFileDialog} style={{ cursor:  'pointer' }}>
        <input ref={this.fileInputRef} className="FileInput" type="file"
          accept=".docx, .doc,.pdf" onChange={this.onFilesAdded} value={this.state.file} required />
        <img alt="upload" className="Icon" src={this.state.src}/>
        <Span>{this.state.fileName}</Span>
        <Modal toggle = {this.toggleModal}
          openModal={this.state.openModal} heading={this.state.heading} text={this.state.msg}  
          uploadState={this.state.uploadState} isDisabled={false}/>
      </div>
      <div className="d-flex">
      <button className="btn mr-2"  type="button" onClick={this.showNext}>{this.state.firstBtn}</button>

      <button className={`btn mr-2 ${this.state.showSecond ? '':'disabled d-none'}`} type="submit">Proceed</button>
      </div>
            </form>
            </div>
          </div>  
    )
  }
}
