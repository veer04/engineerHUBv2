import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
import Internship from "./Components/Internship/Internship";
import { Component } from "react";

function App() {
  return (
    <div className="App">
      <NavBar/>
       <Internship/>
    </div>
  );
}

export default App;
