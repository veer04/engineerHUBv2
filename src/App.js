import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
import MagzineAndHandbook from "./Components/magzineandHandbook/magzineAndHandbook";
import Internship from "./Components/Internship/Internship";
import Hiring from "./Components/Hiring/Hiring";
import Campus from "./Components/Campus/Campus";
import Udaan from "./Components/Udaan/Udaan";
import { RequireAuth } from 'react-auth-kit'
import Mentors from "./Components/Mentors/Mentors";
import Teams from "./Components/Teams/Team";
import IndustryPersona from "./Components/IndustryPersona/IndustryPersona";
import Resources from "./Components/Resources/ResourceWrapper";
import CoursesWrapper from "./Components/Courses/CourseWrapper";
import CourseSubWrapper from "./Components/Courses/CourseSubWrapper";
import Login from "./Components/Login/login";
import Register from "./Components/Login/Register";
import SignUp from "./Components/Login/Signup";
import Footer from "./Components/Footer/Footer";
import Domain from "./Components/Domain/Domain";
// import User from "./Components/UserPage/user";
import Pviewer from "./Components/pdf/Viewer";
// import Modal from "./Components/Modal/Modal";

function App() {

  return (
    <Router>
      
      <NavBar />
      <Routes>
        <Route path="" exact element={<HomePage />} />

        <Route path="/resources/:domain" exact element={<Resources />} />
        <Route path="/resources/:domain/:domain" exact element={<Resources />} />
        <Route path="/mentors/:domain" exact element={<Mentors />} />
        <Route path="/mentors/:domain/:domain" exact element={<Mentors />} />
        <Route path="/domain" exact element={<Domain />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/courses"  element={<RequireAuth loginPath={'/login'}> <CoursesWrapper/> </RequireAuth> } />
        <Route path="/internship" exact element={<Internship />} />
        <Route path="/udaan" exact element={<Udaan/>} />
        <Route path="/magazine" exact element={<MagzineAndHandbook />} />
        <Route path="/hiring" exact element={<Hiring />} />
        <Route path="/campus" exact element={<Campus />} />
        <Route path="/teams" exact element={<Teams />} />
        <Route path="/industry" exact element={<IndustryPersona />} />
        <Route path="/coursepage/:id" exact element={<CourseSubWrapper />} />

        {/* <Route path="/login" exact element={<Login />} /> */}
        
        {/* <Route path="/modal" exact element={<Modal />} /> */}
        <Route path="/register" exact element={<Register />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/domain" exact element={<Domain />} />

        <Route path="/pdf" exact element={<Pviewer />} />
      </Routes>
    
      <div className="Footer">
        <Footer />
      </div>

    </Router>
  );
}

export default App;
