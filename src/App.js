
import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'



export default class App extends Component {

  apiKey=process.env.REACT_APP_NEWS_API
 state={
  progress: 0,
 }
 setProgress=(progress)=> {
  this.setState({ progress: progress});
 }
  render() {
    
    return (
      <div>
         <Router>
       <Navbar/>
       <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
        
      />
       
       <Routes> 
       {/* <News apiKey={this.apiKey}pageSize={5} Country='us' category='sports'/> */}
       <Route  exect path="/" element={<News apiKey={this.apiKey}key="general" setProgress={this.setProgress} pageSize={5} Country='us' category='general'/>} />
       <Route  exect path="/technology"  element={<News apiKey={this.apiKey}setProgress={this.setProgress} key="technology" pageSize={5} Country='us' category='technology'/>} />
       <Route  exect path="/science"  element={<News apiKey={this.apiKey}setProgress={this.setProgress} key="science" pageSize={5} Country='us' category='science'/>} />
       <Route  exect path="/sports"  element={<News apiKey={this.apiKey}setProgress={this.setProgress} key="sports" pageSize={5} Country='us' category='sports'/>} />
       <Route  exect path="/business"  element={<News apiKey={this.apiKey}setProgress={this.setProgress} key="business" pageSize={5} Country='us' category='business'/>} />
       <Route  exect path="/entertainment" key="entertainment" element={<News apiKey={this.apiKey}setProgress={this.setProgress} key="entertainment" pageSize={5} Country='us' category='entertainment'/>} />
       <Route  exect path="/health"  element={<News apiKey={this.apiKey}setProgress={this.setProgress} key="health" pageSize={5} Country='us' category='health'/>} />
       </Routes>

       </Router>
      </div>
    )
  }
}


