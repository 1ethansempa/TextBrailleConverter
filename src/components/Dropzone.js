import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';
import RecordAudio from '../components/AudioRecord1'
import Select from 'react-select';
import axios from 'axios';

const Span = styled.span`
  font-size: 16px;
  text-align: center;
  color:#555!important;
`;

const options = [
  { value: '0', label: 'English Text to Grade 1' },
  { value: '1', label: 'English Text to Grade 2' },
  { value: '2', label: 'English Speech to Grade 1' },
  { value: '3', label: 'English Speech to Grade 2' },
  { value: '4', label: 'Luganda Text to Grade 1' }
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
  option: (provided,state) => ({
    ...provided,
    fontSize:16,
    menuColor:'forestgreen'
  })
};

export default class Dropzone extends Component {

  //set state and binded functions
  constructor(props) {
  super(props)
  this.state = { hightlight: false ,fileName:'Drag or Drop File',src:'cloudupload.png',openModal:false,
  msg:'',heading:'',file:null,isDisabled:false,uploadState:false,showDropzone:false,showFirst:true,
  showForm:false,showRadio:false,firstBtn:'Next',secondBtn:'Proceed',allowSubmit:true,BrailleOption:null,BrailleOptionError:false,BrailleFont:37,
  AudioOption:undefined,showAudioForm:false,radioError:false,ifRadioSelected:0,showRecordAudio:false
  }
    this.fileInputRef = React.createRef()
    this.openFileDialog = this.openFileDialog.bind(this)
    this.onFilesAdded = this.onFilesAdded.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateAudioOption = this.updateAudioOption.bind(this)
  }
  //Dropzone functions
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
        
        this.setState({file: files}, () => {
          console.log('file', this.state.file);
      })
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
    this.setState({BrailleOptionError:false})
    console.log(`Option selected:`, BrailleOption);
  };

  checkNumber = event=>{
    let { value, min, max } = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    this.setState({ BrailleFont:value });
  }

  updateAudioOption=(e)=>{
    this.setState({AudioOption:e.target.value,radioError:false},()=>{
      console.log(this.state.AudioOption)
    })
  }

  showNext=(e)=>{
    if(this.state.BrailleOption===null||undefined||''){
        this.setState({BrailleOptionError:true})
    }
    else{
      if(this.state.BrailleOption.value==="0"||this.state.BrailleOption.value==="1"||
      this.state.BrailleOption.value==="4"){
        this.setState({showForm:!this.state.showForm,showSecond:!this.state.showSecond,showFirst:!this.state.showFirst,
          firstBtn:`${!this.state.showFirst ? 'Next':'Back'}`,BrailleOptionError:false})
      }
      else if(this.state.BrailleOption.value==="3"||this.state.BrailleOption.value==="2"){
          if(this.state.ifRadioSelected===0){
            this.setState({showRadio:true,showFirst:false,allowSubmit:false,showForm:false,
              firstBtn:'Back',showSecond:true,secondBtn:'Next',ifRadioSelected:1})
          }
          else if(this.state.ifRadioSelected===1){
            this.setState({showRadio:false,showFirst:true,allowSubmit:false,
              firstBtn:'Next',showSecond:false,secondBtn:'Next',ifRadioSelected:0})
          }
          else if(this.state.ifRadioSelected===2){
            this.setState({showRadio:true,showFirst:false,allowSubmit:false,showForm:false,
              firstBtn:'Back',showSecond:true,secondBtn:'Next',ifRadioSelected:1})
          }
       

      }
    }
  }

  showAudioForm=(e)=>{
    if(this.state.AudioOption==="0"){
      this.setState({showForm:true,showSecond:true,showFirst:false,
      showRadio:false,allowSubmit:true,secondBtn:'Proceed',ifRadioSelected:2})
    }
    else if(this.state.AudioOption==="1"){
      this.setState({showForm:false,showRecordAudio:true,showSecond:true,showFirst:false,
        showRadio:false,allowSubmit:true,secondBtn:'Proceed',ifRadioSelected:2})
    }
    else{
      this.setState({radioError:true})
    }  
  }

  handleSubmit(event) {
    event.preventDefault();
   let formData = new FormData();
   formData.append('Upload_File',this.fileInputRef.current.files[0])
   formData.append('BrailleFont',this.state.BrailleFont)
   formData.append('BrailleOption',this.state.BrailleOption.value)
    for(var i of formData){
      let name=i[0]
      let value=i[1]

        console.log(name+':'+value)
    }
   const config = {     
    headers: { 'content-type': 'multipart/form-data' }
}

    if(this.state.file!==null){
      axios.post(`http://192.168.43.115:5000/`,formData,config)
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
      <form id="BrailleForm" autoComplete="off" onSubmit={this.handleSubmit} novalidate>

      {/* Start Form Components*/}
        <div className="form-body">
      {/*Start first part*/}
        {/*Braille Option*/}
        <div className="form-group">
        <label className={`${this.state.showFirst ? '':'d-none'}`}>Select Braille Option:</label>
        {this.state.BrailleOptionError ? <div><span className='errorSpan'>Please Select Option</span></div> : ''} 
        <Select id="BrailleOption" className={`${this.state.showFirst ? '':'d-none'}`} name="BrailleOption" 
        options={options} styles={customSelect} isSearchable={true} isClearable={true} value={BrailleOption}
        onChange={this.onInputChange} />
        </div>

        {/*Braille Font Size*/}
        <div className="form-group">
        <label className={`${this.state.showFirst ? '':'d-none'}`}>Select Braille Font Size:</label>
        <input type="number" min="10" max="65" value={this.state.BrailleFont} className={`form-control ${this.state.showFirst ? '':'d-none'}`} placeholder="Enter font size" onChange={this.checkNumber}/>
        <small className={`text-muted ${this.state.showFirst ? '':'d-none'}`}>Recommended Braille font size is 37px</small>
        </div>
      {/*End first part */}

      {/*Start Dropzone*/}
      
        <div className={`Dropzone ${this.state.hightlight ? 'Highlight' : ''} ${this.state.showForm ? '':'d-none'}`}
        onDragOver={this.onDragOver} onDragLeave={this.onDragLeave}
        onDrop={this.onDrop} onClick={this.openFileDialog} style={{ cursor:  'pointer' }}>
         
        <input ref={this.fileInputRef} className="FileInput" type="file"
          accept=".docx, .doc,.pdf" onChange={this.onFilesAdded} value={this.state.file} />
        <img alt="upload" className="Icon" src={this.state.src}/>
        <Span>{this.state.fileName}</Span>
        <Modal toggle = {this.toggleModal}
          openModal={this.state.openModal} heading={this.state.heading} text={this.state.msg}  
          uploadState={this.state.uploadState} isDisabled={false}/>
        </div>
      {/*End Dropzone*/}

    {/*Start Audio Part*/}
      {/* Start Radio Buttons*/}
      <div className={`form-group ${this.state.showRadio?'':'d-none'}`}>
      <label>Select Audio Option:</label><br/>
      {this.state.radioError ? <div><span className='errorSpan'>Please Select Option</span><br/></div> : ''}
      <div className="radioBtns">
      <div className="radio">
      <span>
      <input type="radio"  name="AudioOption" id="AudioOption1" value="0" onChange={this.updateAudioOption} /><span className="ml-1">Upload Audio File</span>
      </span>
      </div><br/>
      <div className="radio">
      <span>
      <input type="radio"  name="AudioOption" id="AudioOption2" value="1"  onChange={this.updateAudioOption} /><span className="ml-1">Record Audio</span>
      </span>
      </div><br/>
      </div>
      <br/>
      </div>
      {/*End Radio Buttons */}

      {/*Record Audio Component */}
      <RecordAudio showRecordAudio={this.state.showRecordAudio} />
      {/* End Record Audio*/}

    {/*End Audio Part */}

    {/* End Form Components*/}
        </div>

      {/*Buttons*/}
      <div className="d-flex form-btns">
      
      <button className="btn mr-2"  type="button" onClick={this.showNext}>{this.state.firstBtn}</button>

      <button className={`btn mr-2 ${this.state.showSecond ? '':'disabled d-none'}`} type={`${this.state.allowSubmit ? 'submit':'button'}`} onClick={this.state.allowSubmit ? this.handleSubmit:this.showAudioForm }>{this.state.secondBtn}</button>
      </div>
            </form>
            </div>
          </div>  
    )
  }
}