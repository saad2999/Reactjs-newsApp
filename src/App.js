
import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export default class App extends Component {

 
  render() {
    
    return (
      <div>
         <Router>
       <Navbar/>
       
       <Routes> 
       {/* <News pageSize={5} Country='us' category='sports'/> */}
       <Route  exect path="/" element={<News  key="general" pageSize={5} Country='us' category='general'/>} />
       <Route  exect path="/technology"  element={<News key="technology" pageSize={5} Country='us' category='technology'/>} />
       <Route  exect path="/science"  element={<News key="science" pageSize={5} Country='us' category='science'/>} />
       <Route  exect path="/sports"  element={<News key="sports" pageSize={5} Country='us' category='sports'/>} />
       <Route  exect path="/business"  element={<News key="business" pageSize={5} Country='us' category='business'/>} />
       <Route  exect path="/entertainment" key="entertainment" element={<News key="entertainment" pageSize={5} Country='us' category='entertainment'/>} />
       <Route  exect path="/health"  element={<News key="health" pageSize={5} Country='us' category='health'/>} />
       </Routes>

       </Router>
      </div>
    )
  }
}


