import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
import MagzineAndHandbook from "./Components/magzineandHandbook/magzineAndHandbook";
import Internship from "./Components/Internship/Internship";
import Hiring from "./Components/Hiring/Hiring";
import Campus from "./Components/Campus/Campus";
import Udaan from "./Components/Udaan/Udaan";
// import { RequireAuth } from 'react-auth-kit';
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
// import Mentorship from "./Components/Mentorshippaid/Mentorship";
import Tnp from "./Components/Tnp/Tnp";
// import User from "./Components/UserPage/user";
import Pviewer from "./Components/pdf/Viewer";
import Modal from "./Components/Modal/Modal";
import Discord from "./Components/RouteforSocial/Discord";
import Instagram from "./Components/RouteforSocial/Instagram";
import LinkedIn from "./Components/RouteforSocial/Linkedin";
import Whatsapp from "./Components/RouteforSocial/Whatsapp";
import Twitter from "./Components/RouteforSocial/Twitter";
import Events from "./Components/Company/events";
import Jobs from "./Components/Company/jobs";
import JobDescription from "./Components/Company/JobDescription";

// import Eventspage from "./Components/Events/EventsMainPage/Eventspage";
function App() {
  const showNavbarAndFooter = () => {
    const { pathname } = window.location;
    const validRoutes = [
      "/",
      "/courses",
      "/login",
      "/domain",
      "/hiring",
      "/magazine",
      "/campus",
      "/teams",
      "/resources/:domain",
      "/resources/:domain/:domain",
      "/mentors",
      "/mentors/:domain/:domain",
      "/internship",
      "udaan",
      "/coursepage/:id",
      "/modal",
      "domain",
      "/register",
      "/signup",
      "/mentors/DevOps",
      "/mentors/UI%20UX%20Design",
      "/mentors/Machine%20Learning%20&%20AI",
      "/mentors/Data%20Structures%20&%20Algorithms",
      "/mentors/Web%20Development",
      "/mentors/App%20Development",
      "/mentors/Cyber%20Security",
      "/resources/DevOps",
      "/resources/UI%20UX%20Design",
      "/resources/Machine%20Learning%20&%20AI",
      "/resources/Data%20Structures%20&%20Algorithms",
      "/resources/App%20Development",
      "/resources/Cyber%20Security",
    ];
    return validRoutes.includes(pathname);
  };

  return (
    <>
      <Router>
        <div>
          {showNavbarAndFooter() && <NavBar />}
          <Routes>
            <Route path="" exact element={<HomePage />} />
            <Route path="/whatsapp" element={<Whatsapp />} />
            <Route path="/discord" element={<Discord />} />
            <Route path="/instagram" element={<Instagram />} />
            <Route path="/company/events" element={<Events />} />
            <Route path="/company/jobs" element={<Jobs />} />
            <Route path="/company/jobs/:jobId" element={<Jobs />} />
            <Route path="/linkedin" element={<LinkedIn />} />
            <Route path="/twitter" element={<Twitter />} />
            <Route path="/resources/:domain" exact element={<Resources />} />
            <Route
              path="/resources/:domain/:domain"
              exact
              element={<Resources />}
            />
            <Route path="/mentors/:domain" exact element={<Mentors />} />
            <Route
              path="/mentors/:domain/:domain"
              exact
              element={<Mentors />}
            />
            <Route path="/domain" exact element={<Domain />} />
            <Route path="/login" exact element={<Login />} />
            {/* <Route path="/courses"  element={<RequireAuth loginPath={'/modal'}> <CoursesWrapper/> </RequireAuth> } /> */}
            <Route path="/courses" element={<CoursesWrapper />}></Route>
            <Route path="/internship" exact element={<Internship />} />
            <Route path="/udaan" exact element={<Udaan />} />
            {/* <Route path="/mentorship" exact element={<Mentorship/>}/> */}
            <Route path="/magazine" exact element={<MagzineAndHandbook />} />
            <Route path="/hiring" exact element={<Hiring />} />
            <Route path="/campus" exact element={<Campus />} />
            <Route path="/teams" exact element={<Teams />} />
            {/* <Route exact path="/discord" element={<Whatsapp/>} /> */}
            {/* <Route exact path="/discord">
    <Redirect to={{ pathname: 'https://discord.com/invite/ZMZAEZ5NfA' }} />
  </Route> */}

            <Route path="/tnp" exact element={<Tnp />} />
            {/* <Route path="/events" exact element={<Eventspage/>} /> */}
            <Route path="/industry" exact element={<IndustryPersona />} />
            <Route
              path="/coursepage/:id"
              exact
              element={<CourseSubWrapper />}
            />

            {/* <Route path="/login" exact element={<Login />} /> */}
            <Route path="/modal" exact element={<Modal />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/domain" exact element={<Domain />} />

            <Route path="/pdf" exact element={<Pviewer />} />
          </Routes>
          <div className="Footer">{showNavbarAndFooter() && <Footer />}</div>
        </div>
      </Router>
    </>
  );
}

export default App;
