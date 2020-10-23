import React, { Component } from 'react';
import Form  from '../components/Form';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Paragraph = styled.p`
  font-size: 16px;
  color:#6c757d!important;
`;

const Heading = styled.h5`
font-family: "Fjalla One", sans-serif!important;
color:forestgreen;
font-weight:700;
text-align:center;
font-size:32px;
`;

export default class Home extends Component {
    render() {
        return (
            <div className="container">
<div className="row">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-6">

                           {/*<Heading>Welcome!</Heading>*/}
                           <div className="header-img-container mb-2">
                           <Link to="#"><img className="header-img" src="welcome-braille-font.png" alt="dots-all-for-now-font" border="0"/>
                           </Link>
                           </div>
                          
                              <Paragraph>
                                TextBrailleConverter is a way to convert pdf/word files to braille.
                                Select an option(either document upload/audio record) to get started.
                              </Paragraph>
                            </div>
                         
                        <div className="col-sm-4"></div>          
          </div>
          <div className="row">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-6">
                            {/*form component*/}
                             <Form/> 
                            </div>
                        <div className="col-sm-4"></div>          
          </div>             
</div>
        )}

}

