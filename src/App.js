import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
import MagzineAndHandbook from "./Components/magzineandHandbook/magzineAndHandbook";
import Internship from "./Components/Internship/Internship";
import Hiring from "./Components/Hiring/Hiring";
import Campus from "./Components/Campus/Campus";
import UserPage from "./Components/UserPage/user";
import Mentors from "./Components/Mentors/Mentor";
import Teams from "./Components/Teams/Team";
import IndustryPersona from "./Components/IndustryPersona/IndustryPersona";
import Freecourses from "./Components/Courses/Freecourses";
import Resources from "./Components/Resources/Resources";
import Test from "./APIs/TestAPI";
import Login from "./Components/Login/login";
import Register from "./Components/Login/Register";
import SignUp from "./Components/Login/Signup";
import Footer from "./Components/Footer/Footer";
import Domain from "./Components/Domain/Domain";
// import User from "./Components/UserPage/user";
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="" exact element={<HomePage />} />
        
        <Route path="/resources" exact element={<Resources />} />
        <Route path="/mentor" exact element={<Mentors />} />
    
        <Route path="/courses" exact element={<Freecourses />} />
        <Route path="/internship" exact element={<Internship />} />
        <Route path="/magazine" exact element={<MagzineAndHandbook />} />
        <Route path="/hiring" exact element={<Hiring />} />
        <Route path="/campus" exact element={<Campus />} />
        <Route path="/Team" exact element={<Teams />} />
        <Route path="/industry" exact element={<IndustryPersona />} />
        <Route path="/userpage" exact element={<UserPage />} />

        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/domain" exact element={<Domain />} />
        <Route path="/test" exact element={<Test />} />
      </Routes>
      <div className="Footer">
        <Footer />
      </div>
    </Router>
  );
}

export default App;
