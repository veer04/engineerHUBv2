import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import ProjectPage from "./pages/Community/Project/ProjectsPage";
import BlogsPage from "./pages/Community/Blogs/BlogsPage";
import EventsPage from "./pages/Community/Events/EventsPage";
import ChatPage from "./pages/Community/Chat/ChatPage";
import MentorChat from "./components/1-1Mentorship/Mentorchat";
import IntraCollege from "./pages/Campus/IntraCollege/IntraCollege";
import InterCollege from "./pages/Campus/InterCollege/InterCollege";
import Workshops from "./pages/Campus/Workshops/Workshops";
import ParticularCampus from "./pages/Campus/ParticularCampus/ParticularCampus";
import CampusDetails from "./pages/Campus/ParticularCampus/CampusDetails";
import ClubsPage from "./pages/Campus/ParticularCampus/ClubsPage";
import AlumniPage from "./pages/Campus/ParticularCampus/AlumniPage";
import ParticularClub from "./pages/Campus/ParticularCampus/ParticularClub";
import Signup from "./pages/User/Signup/Signup";
import RegistrationForm from "./components/Registration/Registration";
import OTP from "./pages/User/OtpVerification/Otpverification";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import HostEvent from "./pages/Hosting/EventRegistration";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Events from "./pages/Company/Events/events";
import Jobs from "./pages/Company/Jobs/jobs";
import JobDetails from "./pages/Company/Jobs/JobDetails";
import HackathonDetails from "./pages/Company/Events/EventsChoices/HackathonDetails";
import Projects from "./pages/Company/Projects/Projects";
import ProjectDetail from "./pages/Company/Projects/ProjectDetail";
import ComingSoon from "./pages/Maintenance/ComingSoon";
import ParticularEvent from "./pages/Community/Events/ParticularEvent";
import { lazy } from "react";
import ClubSignup from "./pages/User/Signup/ClubSignup";
import MentorSignup from "./pages/User/Signup/MentorSignup";
import OrganizationSignup from "./pages/User/Signup/OrganizationSignup";
import { Suspense } from "react";
import LoadingPage from "./components/Loader/LoadingPage";
import Role from "./pages/User/RoleWiseUserPage/Role";
import PostModal from "./components/PostModal/PostModal";
import ParticularAlumni from "./pages/Campus/ParticularCampus/ParticularAlumni";
// import ProfilePage from "./pages/User/Profile/ProfilePage";
import VerificationModal from "./components/VerificationModal/VerificationModal";
import StudentSignup from "./pages/User/Signup/StudentSignup";
import StudentProfilePage from "./pages/User/Profile/StudentProfile/StudentProfilePage";
import GeneralStudentData from "./pages/User/Profile/StudentProfile/GeneralStudentData";
import EditStudentData from "./pages/User/Profile/StudentProfile/EditStudentData";
import AddressStudentData from "./pages/User/Profile/StudentProfile/AddressStudentData";
import SocialMediaStudentData from "./pages/User/Profile/StudentProfile/SocialMediaStudentData";
import TechStackStudentData from "./pages/User/Profile/StudentProfile/TechStackStudentData";
import AlumniProfilePage from "./pages/User/Profile/AlumniProdile/AlumniProfilePage";
import GeneralAlumniData from "./pages/User/Profile/AlumniProdile/GeneralAlumniData";
import EditAlumniData from "./pages/User/Profile/AlumniProdile/EditAlumniData";
import SocialMediaAlumniData from "./pages/User/Profile/AlumniProdile/SocialMediaAlumniData";
import OrganizationProfilePage from "./pages/User/Profile/OrganizationProfile/OrganizationProfilePage";
import GeneralOrganizationData from "./pages/User/Profile/OrganizationProfile/GeneralOrganizationData";
import EditOrganizationData from "./pages/User/Profile/OrganizationProfile/EditOrganizationData";
import AddressOrganizationData from "./pages/User/Profile/OrganizationProfile/AddressOrganizationData";
import ClubProfilePage from "./pages/User/Profile/ClubProfile/ClubProfilePage";
import GeneralClubData from "./pages/User/Profile/ClubProfile/GeneralClubData";
import EditClubData from "./pages/User/Profile/ClubProfile/EditClubData";
import JobRegistration from "./pages/Hosting/JobRegistration";
import Page404 from "./pages/Maintenance/Page404";
import jwt_decode from "jwt-decode";
const CommunityPage = lazy(() => import("./pages/Community/CommunityPage"));
const CampusPage = lazy(() => import("./pages/Campus/CampusPage"));
const Company = lazy(() => import("./pages/Company/Company"));
const Hosting = lazy(() => import("./pages/Hosting/Hosting.jsx"));
const Login = lazy(() => import("./pages/User/Login/Login"));
import Chatpage from "./pages/chat/chatPage";
import getCookie, { getAccessToken } from "./features/getCookieValues";

function App() {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [OtpRoute, setOtpRoute] = useState("False");
  const [eventHostRoute, setEventHostRoute] = useState(false);
  const [sendLogin, setSendLogin] = useState(true);
  const [jobHostRoute, setJobHostRoute] = useState(false);

  useEffect(() => {
    setOtpRoute(localStorage.getItem("OtpRoute"));
    if (getCookie("access_token")) {
      const token = getAccessToken();
      const decoded = jwt_decode(token);
      if (
        decoded.role === "Alumni" ||
        decoded.role === "Club" ||
        decoded.role === "Organization"
      ) {
        setEventHostRoute(true);
      }
      if (decoded.role === "Organization") {
        setJobHostRoute(false);
      }
    } else {
      setSendLogin(true);
    }
  });
  const userName = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("userName="));
  const isAuthenticated = !!userName;

  return (
    <>
      {!isEventModalOpen && <Navbar />}
      {!isEventModalOpen && <MobileNavbar />}
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route index element={<HomePage path="homepage" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/selectRole" element={<Role />} />

          <Route path="/ehubchats" element={<Chatpage />} />

          <Route path="/profile">
            <Route
              path="student/:userId"
              element={<StudentProfilePage path="profile" />}
            >
              <Route index element={<GeneralStudentData />} />
              <Route path="general" element={<GeneralStudentData />} />
              <Route path="edit" element={<EditStudentData />} />
              <Route path="address" element={<AddressStudentData />} />
              <Route path="social-media" element={<SocialMediaStudentData />} />
              <Route path="tech-stack" element={<TechStackStudentData />} />
            </Route>
            <Route
              path="alumni/:alumniId"
              element={<AlumniProfilePage path="profile" />}
            >
              <Route index element={<GeneralAlumniData />} />
              <Route path="general" element={<GeneralAlumniData />} />
              <Route path="edit" element={<EditAlumniData />} />
              <Route path="social-media" element={<SocialMediaAlumniData />} />
            </Route>
            <Route
              path="club/:clubId"
              element={<ClubProfilePage path="profile" />}
            >
              <Route index element={<GeneralClubData />} />
              <Route path="general" element={<GeneralClubData />} />
              <Route path="edit" element={<EditClubData />} />
            </Route>
            <Route
              path="organization/:organizationId"
              element={<OrganizationProfilePage path="profile" />}
            >
              <Route index element={<GeneralOrganizationData />} />
              <Route path="general" element={<GeneralOrganizationData />} />
              <Route path="edit" element={<EditOrganizationData />} />
              <Route path="address" element={<AddressOrganizationData />} />
            </Route>
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/student-signup" element={<StudentSignup />} />
          <Route path="/clubSignup" element={<ClubSignup />} />
          <Route path="/mentorSignup" element={<MentorSignup />} />
          <Route path="/organizationSignup" element={<OrganizationSignup />} />
          <Route path="/login" element={<Login />} />

          {OtpRoute === "true" ? (
            <Route exact path="/otpverification" element={<OTP />} />
          ) : (
            <Route path="/otpverification" element={<Login />} />
          )}

          <Route path="/under-maintenance" element={<ComingSoon />} />
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
                    <ParticularEvent
                      setIsEventModalOpen={setIsEventModalOpen}
                    />
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
              <Route path="technical-clubs">
                <Route index element={<ClubsPage type="Technical" />} />
                <Route path=":clubId" element={<ParticularClub />}>
                  <Route path="posts/:postId" element={<PostModal />} />
                </Route>
              </Route>
              <Route path="cultural-clubs">
                <Route index element={<ClubsPage type="Cultural" />} />
                <Route path=":clubId" element={<ParticularClub />}>
                  <Route path="posts/:postId" element={<PostModal />} />
                </Route>
              </Route>
              <Route path="almas">
                <Route index element={<AlumniPage />} />
                <Route path=":almaId" element={<ParticularAlumni />} />
              </Route>
            </Route>
          </Route>
          <Route path="/mentorship" element={<ComingSoon />} />

          {eventHostRoute === true && sendLogin === true ? (
            <Route path="/hostevent" element={<HostEvent />} />
          ) : (
            <Route path="/hostevent" element={<Login />} />
          )}

          {jobHostRoute === true && sendLogin === true ? (
            <Route path="/hostjob" element={<JobRegistration />} />
          ) : (
            <Route path="/hostjob" element={<Login />} />
          )}

          <Route path="hosting">
            <Route index element={<Hosting />} />
          </Route>
          <Route path="/company">
            <Route path="" element={<Company />} />
            <Route path="jobs">
              <Route path="" element={<Jobs />} />
              <Route path=":hiringId" element={<JobDetails />} />
            </Route>
            <Route path="projects">
              <Route path="" element={<Projects />} />
              <Route path=":projectId" element={<ProjectDetail />} />
            </Route>
            <Route path="events">
              <Route path="" element={<Events />} />
              <Route path=":hackId" element={<HackathonDetails />} />
              {/* <Route
              path="competitions/:competeId"
              element={<CompetitionDetails />}
            /> */}
            </Route>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>

      {!isEventModalOpen && <Footer />}
    </>
  );
}
export default App;
