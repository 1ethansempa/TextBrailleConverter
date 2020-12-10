import React, { Component } from 'react'

export default class AudioOptions extends Component {
    constructor(props){
        super(props)
        this.state={AudioOption:undefined,radioError:false}
        this.updateAudioOption = this.updateAudioOption.bind(this)
    }
    updateAudioOption=(e)=>{
        this.props.captureAudioOption(parseInt(e.target.value))
      }
    render() {
        return (
            <div className={`form-group ${this.props.showAudioOptions ?'':'d-none'}`}>
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
        )
    }
}
