import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Mentor from "./Components/Mentors/Mentor";
import Internship from "./Components/Internship/Internship";
import { Component } from "react";

function App() {
  return (
    <div className="App">
      <NavBar/>
       {/* <Internship/> */}
       <Mentor />
    </div>
  );
}

export default App;
