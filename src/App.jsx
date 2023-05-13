import React, { useState, useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import CommunityPage from "./pages/Community/CommunityPage";
import ProjectPage from "./pages/Community/Project/ProjectsPage";
import BlogsPage from "./pages/Community/Blogs/BlogsPage";
import EventsPage from "./pages/Community/Events/EventsPage";
import ChatPage from "./pages/Community/Chat/ChatPage";
import CampusPage from "./pages/Campus/CampusPage";
import Mentorship from "./components/1-1Mentorship/Mentorship";
import MentorChat from "./components/1-1Mentorship/Mentorchat";
import IntraCollege from "./pages/Campus/IntraCollege/IntraCollege";
import InterCollege from "./pages/Campus/InterCollege/InterCollege";
import Workshops from "./pages/Campus/Workshops/Workshops";
import ParticularCampus from "./pages/Campus/ParticularCampus/ParticularCampus";
import Hosting from "./pages/Hosting/Hosting";
import CampusDetails from "./pages/Campus/ParticularCampus/CampusDetails";
import ClubsPage from "./pages/Campus/ParticularCampus/ClubsPage";
import AlumniPage from "./pages/Campus/ParticularCampus/AlumniPage";
import ParticularClub from "./pages/Campus/ParticularCampus/ParticularClub";
import Login from "./pages/User/Login/Login";
import Profile from "./pages/User/Profile/Profile";
import Signup from "./pages/User/Signup/Signup";
import RegistrationForm from "./components/Registration/Registraion";
import OTP from "./pages/User/OtpVerification/Otpverification";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import HostEvent from "./pages/Hosting/EventRegistration";
// import EventModal from "./components/EventModal/EventModal";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Events from "./pages/Company/Events/events";
import Jobs from "./pages/Company/Jobs/jobs";
import Company from "./pages/Company/Company";
import JobDetails from "./pages/Company/Jobs/JobDetails";
import HackathonDetails from "./pages/Company/Events/EventsChoices/HackathonDetails";
import Projects from "./pages/Company/Projects/Projects";
import ProjectDetail from "./pages/Company/Projects/ProjectDetail";
import ComingSoon from "./pages/Maintenance/ComingSoon";
import ParticularEvent from "./pages/Community/Events/ParticularEvent";

function App() {
  // var formData = new FormData();
  // formData.append("name", "Gaurav");
  // console.log(formData.entries());

  // const { eventId } = useParams();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  return (
    <>
      {!isEventModalOpen && <Navbar />}
      {!isEventModalOpen && <MobileNavbar />}
      <Routes>
        <Route index element={<HomePage path="homepage" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegistrationForm></RegistrationForm>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otpverification" element={<OTP />} />
        <Route path="/community">
          <Route index element={<CommunityPage />} />
          <Route path="domains" element={<CommunityPage path="domains" />} />
          <Route path="projects">
            <Route path=":id" element={<ProjectPage path="projects" />} />
          </Route>
          <Route path="blogs">
            <Route path=":id" element={<BlogsPage path="blogs" />} />
          </Route>
          <Route path="events">
            <Route path=":id">
              <Route index element={<EventsPage path="events" />} />
              <Route
                path=":eventId"
                element={
                  <ParticularEvent setIsEventModalOpen={setIsEventModalOpen} />
                }
              />
            </Route>
          </Route>
          <Route path="chat">
            <Route path=":id" element={<ChatPage path="chat" />} />
          </Route>
        </Route>
        <Route path="/mentorChat" element={<MentorChat />} />
        <Route path="/campus">
          <Route index element={<CampusPage />} />
          <Route path="inter-college" element={<InterCollege />} />
          <Route path="intra-college" element={<IntraCollege />} />
          <Route path="workshop" element={<Workshops />} />
          <Route path=":collegeId">
            <Route index element={<ParticularCampus />} />
            <Route path="details" element={<CampusDetails />} />
            <Route
              path="technical-clubs"
              element={<ClubsPage type="Technical" />}
            />
            <Route
              path="cultural-clubs"
              element={<ClubsPage type="Cultural" />}
            />
            {/* <Route path="alumni" element={<AlumniPage />} /> */}
            <Route path="almas" element={<ComingSoon />} />
          </Route>
        </Route>
        <Route path="/mentorship" element={<ComingSoon />} />
        <Route path="/hostevent" element={<HostEvent />} />
        <Route path="hosting">
          <Route index element={<Hosting />} />
        </Route>
        <Route path="/company">
          <Route path="" element={<Company />} />
          <Route path="jobs">
            <Route path="" element={<Jobs />} />
            <Route path=":jobId" element={<JobDetails />} />
          </Route>
          <Route path="projects">
            <Route path="" element={<Projects />} />
            <Route path=":projectId" element={<ProjectDetail />} />
          </Route>
          <Route path="events">
            <Route path="" element={<Events />} />
            <Route path="hackathons/:hackId" element={<HackathonDetails />} />
            {/* <Route
              path="competitions/:competeId"
              element={<CompetitionDetails />}
            /> */}
          </Route>
        </Route>
      </Routes>
      {!isEventModalOpen && <Footer />}
    </>
  );
}
export default App;
