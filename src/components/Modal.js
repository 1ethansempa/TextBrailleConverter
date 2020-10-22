import React, { Component } from 'react';
import styled from 'styled-components';
import '../App.css';


const Heading = styled.h5`
font-family: "Fjalla One", sans-serif!important;
color:#000;
font-weight:700;
text-align:center;
font-size:32px;
`;
const Paragraph = styled.p`
  font-size: 16px;
  color:#6c757d!important;
`;

export default class Modal extends Component {
  componentDidMount() {
    // here I want to open modal
  }
  dismissModal = ()=>{
    this.props.toggle();
  
  }
  
render(){

        return(
            <div onClick={this.dismissModal}
            className={`modal fade ${this.props.openModal ? 'show' : ''}`}
            style={{
              display: `${this.props.openModal ? 'block' : 'none'}`,
              backgroundColor:`rgba(0, 0, 0, 0.6)`
            }}
            tabIndex="-1" role="dialog" aria-labelledby="errorMsgLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <Heading>{this.props.heading}</Heading>
                  <button type="button" className="close" 
                  data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" className="close1">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <Paragraph>{this.props.text}</Paragraph>
                </div>
                <div className="modal-footer">
                    <button type="button" data-dismiss="modal" className="btngray btn">Dismiss</button>
                  </div>
              </div>
            </div>
          </div>  
        )   
      }
   
}

