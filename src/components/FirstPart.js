import React, { Component } from 'react'
import Select from 'react-select';

const options = [
    { value: '0', label: 'English Text to Grade 1' },
    { value: '1', label: 'English Text to Grade 2' },
    { value: '2', label: 'English Speech to Grade 1' },
    { value: '3', label: 'English Speech to Grade 2' },
    { value: '4', label: 'Native Lang Text to Grade 1' }
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

export default class Firstpart extends Component {
    constructor(props) {
        super(props)
        this.state={BrailleOption:null,BrailleFont:37,FontWarning:'',FontError:false}
        this.onInputChange = this.onInputChange.bind(this)
        this.checkNumber = this.checkNumber.bind(this)
    }
    onInputChange = BrailleOption => {
      this.setState({ BrailleOption },()=>{
        if(this.state.BrailleOption!==null){
          this.props.captureBrailleOption(this.state.BrailleOption.value)
        }
        else{
          this.props.captureBrailleOption(undefined)
        }
       
      });
    }
    checkNumber = event=>{
      let { value, min, max } = event.target;
      value = Math.max(Number(min), Math.min(Number(max), Number(value)));
      this.setState({ BrailleFont:value, },()=>{
        this.props.captureBrailleFont(this.state.BrailleFont)
      });
    }
    render() {
        const BrailleOption=this.state.BrailleOption;
        return (
          <div id="firstPart" className={`${this.props.showFirstPart ? '':'d-none'}`}>
           {/*Braille Option*/}
        <div className="form-group">
        <label>Select Braille Option:</label>
        {this.props.OptionError ? <div><span className='errorSpan'>Please Select Option</span></div> : ''} 
        <Select id="BrailleOption" name="BrailleOption" 
        options={options} styles={customSelect} isSearchable={true} isClearable={true} value={BrailleOption}
        onChange={this.onInputChange}/>
        </div>

        {/*Braille Font Size*/}
        <div className="form-group">
        <label>Select Braille Font Size:</label>
        <input type="number" min="10" max="65" value={this.state.BrailleFont} className={`form-control`} 
        placeholder="Enter font size" onChange={this.checkNumber}/>
        <small className={`text-muted`}>Recommended Braille font size is 37px</small>
        </div>
      {/*End first part */}
        </div>
        )
    }
}
