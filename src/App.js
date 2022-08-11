
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
import MagzineAndHandbook from "./Components/magzineandHandbook/magzineAndHandbook";
import Internship from "./Components/Internship/Internship";
import Hiring from "./Components/Hiring/Hiring";
import Campus from "./Components/Campus/Campus";
import Login from "./Components/Login/login.js";
import Courses from "./Components/freecourses-pages/Freecourses.jsx";
import Mentors from "./Components/Mentors/Mentor"
import Teams from "./Components/Teams/Team"
import IndustryPersona from "./Components/IndustryPersona/IndustryPersona";
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="" exact element={<HomePage />} />

        <Route path="/login" exact element={<Login />} />
        <Route path="/courses" exact element={<Courses />} />
        <Route path="/internship" exact element={<Internship />} />
        <Route path="/magazine" exact element={<MagzineAndHandbook />} />
        <Route path="/hiring" exact element={<Hiring />} />
        <Route path="/campus" exact element={<Campus />} />
        <Route path="/mentor" exact element={<Mentors />} />
        <Route path="/Team" exact element={<Teams />} />
        <Route path="/industry" exact element={<IndustryPersona />} />
      </Routes>
    </Router>

  )
}

export default App;