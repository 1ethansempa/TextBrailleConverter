import React from 'react';
import {Switch,Route} from 'react-router-dom';
import './App.css';
import  Default from './components/Default'
import Home  from './components/Home'
import Navbar from './components/Navbar'
import Help from './components/Help'



function App() {
  return (
 <React.Fragment>
   <Navbar/>
   <Switch>
   <Route exact path="/" component={Home}/>
     <Route path="/Help" component={Help}/>
     <Route component={Default}/>
   </Switch>
 </React.Fragment>
  );
}

export default App;
