import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Registration from './Registration';
//import Home from './Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
