import React, { Component } from 'react';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import styled from 'styled-components';

const override = css`
  display: block;
  margin: 5vh auto;
  
`;
const Heading = styled.h2`
  font-size: 16px;
  color:#6c757d!important;
`;
 export default class Preloader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
    render() {
     return(
     <div className="header-img-container mb-2 mt-5">
          <Heading>{this.props.ProcessingText}</Heading>
          <Heading>Please don't refresh or go back</Heading>
          <ClipLoader
        css={override}
        size={225}
        color={"forestgreen"}
        loading={this.state.loading}
      />
     </div>
       
     );
    }
 }