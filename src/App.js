import React from 'react';
import {Switch,Route} from 'react-router-dom';
import './App.css';
import  Default from './components/Default'
import Home  from './components/Home'
import Navbar from './components/Navbar'
import Help from './components/Help'
import Nlp from './components/Nlp'
import TextArea from './components/TextArea'
//<Route path="/RecordAudio" component={AudioRecord1}/>
//import AudioRecord1 from './components/AudioRecord1'


function App() {
  return (
 <React.Fragment>
   <Navbar/>
   <Switch>
   <Route exact path="/" component={Home}/>
     <Route path="/Help" component={Help}/>
     <Route path="/CorrectForm" component={Nlp}/>
     <Route path="/TextArea" component={TextArea}/>
     <Route component={Default}/>
   </Switch>
 </React.Fragment>
  );
}

export default App;
