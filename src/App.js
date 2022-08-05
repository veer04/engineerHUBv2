import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
import MagzineAndHandbook from "./Components/magzineandHandbook/magzineAndHandbook";
import Internship from "./Components/Internship/Internship";
import Hiring from "./Components/Hiring/Hiring";
import Login from "./Components/Login/login.js";

function App() {
  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route path="" exact element={<HomePage />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/internship" exact element={<Internship />} />
        <Route path="/magazine" exact element={<MagzineAndHandbook />} />
        <Route path="/hiring" exact element={<Hiring />} />
      </Routes>
    </Router>
  );
}

export default App;
