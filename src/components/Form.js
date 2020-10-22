import React, { Component } from 'react';
import Dropzone from '../components/Dropzone'


export default class Form extends Component {
    render() {
        return (
            <Dropzone onFilesAdded={console.log}/>
        )}

}

