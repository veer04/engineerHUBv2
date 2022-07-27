import React from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import HomePage from './Components/HomePage/HomePage';
// import MagzineAndHandbook from './Components/magzineandHandbook/magzineAndHandbook';
import Internship from './Components/Internship/Internship';

function App() {
  return (
    <div className="App">
     <NavBar/>
     <Internship/>
     
    </div>
  );
}

export default App;
