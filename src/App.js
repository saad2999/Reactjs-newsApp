import './App.css';

import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

function App() {
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

  

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          color='#f11946'
          height={3}
          progress={progress}
        />

        <Routes>
          <Route exect path="/" element={<News apiKey={apiKey} key="general" updateProgress={setProgress} pageSize={5} Country='us' category='general' />} />
          <Route exect path="/technology" element={<News apiKey={apiKey} updateProgress={setProgress} key="technology" pageSize={5} Country='us' category='technology' />} />
          <Route exect path="/science" element={<News apiKey={apiKey} updateProgress={setProgress} key="science" pageSize={5} Country='us' category='science' />} />
          <Route exect path="/sports" element={<News apiKey={apiKey} updateProgress={setProgress} key="sports" pageSize={5} Country='us' category='sports' />} />
          <Route exect path="/business" element={<News apiKey={apiKey} updateProgress={setProgress} key="business" pageSize={5} Country='us' category='business' />} />
          <Route exect path="/entertainment" key="entertainment" element={<News apiKey={apiKey} updateProgress={setProgress} key="entertainment" pageSize={5} Country='us' category='entertainment' />} />
          <Route exect path="/health" element={<News apiKey={apiKey} updateProgress={setProgress} key="health" pageSize={5} Country='us' category='health' />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
