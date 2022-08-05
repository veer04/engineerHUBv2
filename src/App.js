import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
import MagzineAndHandbook from "./Components/magzineandHandbook/magzineAndHandbook";
import Internship from "./Components/Internship/Internship";
import Hiring from "./Components/Hiring/Hiring";
import Admin from "./Components/Admin/admin";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="" exact element={<HomePage />} />
        <Route path="/admin" exact element={<Admin />} />
        <Route path="/internship" exact element={<Internship />} />
        <Route path="/magazine" exact element={<MagzineAndHandbook />} />
        <Route path="/hiring" exact element={<Hiring />} />
      </Routes>
    </Router>
  );
}

export default App;
