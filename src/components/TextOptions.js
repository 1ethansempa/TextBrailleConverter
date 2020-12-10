import React, { Component } from 'react'

export default class TextOptions extends Component {
    constructor(props){
        super(props)
        this.state={TextOption:undefined}
        this.updateTextOption = this.updateTextOption.bind(this)
    }
    updateTextOption=(e)=>{
            this.props.captureTextOption(parseInt(e.target.value))
      }
    render() {
        return (
            <div className={`form-group ${this.props.showtextOptions ? '':'d-none'}`}>
            <label>Select Text Option:</label><br/><br/>
            {this.props.textError ? <div><span className='errorSpan'>Please Select Option</span><br/></div> : ''}
            <div className="radioBtns">
            <div className="radio">
            <span>
            <input type="radio"  name="TextOption" id="TextOption1" value="0" onChange={this.updateTextOption}/><span className="ml-1">Type Text</span>
            </span>
            </div><br/>
            <div className="radio">
            <span>
            <input type="radio"  name="TextOption" id="TextOption2" value="1"  onChange={this.updateTextOption}/><span className="ml-1">Upload Document</span>
            </span>
            </div><br/>
            </div>
            <br/>
            </div>
        )
    }
}
