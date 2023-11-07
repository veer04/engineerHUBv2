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
import Success from "./pages/HomePage/Success";
import Internship from "./pages/Company/Internship/Internship";
import InternshipDetails from "./pages/Company/Internship/InternshipDetails";
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
import StudentSignup from "./pages/User/Signup/StudentSignup";
import ForgotPassword from "./pages/User/ForgotPassword/ForgotPassword";
import JobRegistration from "./pages/Hosting/JobRegistration";
import Page404 from "./pages/Maintenance/Page404";
import SignupUser from "./pages/User/Signup/SignupUser";
import jwt_decode from "jwt-decode";
const CommunityPage = lazy(() => import("./pages/Community/CommunityPage"));
const NewCampusPage = lazy(() => import("./pages/Campus/NewCampusPage"));
const Company = lazy(() => import("./pages/Company/Company"));
const Hosting = lazy(() => import("./pages/Hosting/Hosting.jsx"));
const Login = lazy(() => import("./pages/User/Login/Login"));
const CampusSearchPage = lazy(() => import("./pages/Campus/CampusSearchPage"));
const CampusDetails = lazy(() => import("./pages/Campus/CampusDetails"));
const TrendingEvents = lazy(() => import("./pages/Campus/TrendingEvents"));
import ChangePassword from "./pages/User/ForgotPassword/ChangePassword";
import getCookie, { getAccessToken } from "./features/getCookieValues";
import ProjectHosting from "./pages/Hosting/ProjectHosting";
import ProfilePopUp from "./components/ProfileSection/ProfilePopUp/ProfilePopUp";
import CompanyDashboard from "./pages/Profile/CompanyDashboard/CompanyDashboard";
import CompanyEditProfile from "./pages/Profile/CompanyDashboard/CompanyEditProfile";
import CoverImageModal from "./components/Dashboard/CoverImageModal";
import ClubDashboard from "./pages/Profile/ClubDashboard/ClubDashboard";
import ClubEditProfile from "./pages/Profile/ClubDashboard/ClubEditProfile";
import AddPostModal from "./components/Dashboard/AddPostModal";
import AddMemberModal from "./components/Dashboard/AddMemberModal";
import UserDashboard from "./pages/Profile/UserDashboard/UserDashboard";
import GlobalSnackbar from "./components/GlobalSnackbar/GlobalSnackbar";
import UserEditProfile from "./pages/Profile/UserDashboard/UserEditProfile";
import TrendingColleges from "./pages/Campus/TrendingColleges";
import TrendingClubCard from "./components/TrendingClubCard/TrendingClubCard";
// import TrendingListAlumni from "./components/TrendingList/TrendingListAlumni";
// import AlumniList from "./components/TrendingList/AlumniList";
import TrendingAlumni from "../src/components/TrendingAlumni/TrendingAlumni";
import CampusDetailsOld from "./pages/Campus/ParticularCampus/CampusDetails.jsx";
function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
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
      if (decoded.role === "Organization" || decoded.role === "Alumni") {
        setJobHostRoute(true);
      }
    } else {
      setSendLogin(true);
    }
  });

  return (
    <>
      {!isEventModalOpen && <Navbar />}
      {!isEventModalOpen && <MobileNavbar />}
      <GlobalSnackbar />
      <ProfilePopUp />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/helloMoto" element={<TrendingClubCard />}></Route>
          <Route index element={<HomePage path="homepage" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/success" element={<Success></Success>}></Route>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/selectRole" element={<Role />} />
          <Route path="/profile">
            <Route
              path="user/:userId"
              element={<UserDashboard path="profile" />}
            ></Route>
            <Route
              path="user/:userId/edit-profile"
              element={<UserEditProfile />}
            />
            <Route
              path="club/:clubId"
              element={<ClubDashboard path="profile" />}
            >
              <Route path="edit-cover-image" element={<CoverImageModal />} />
              <Route path="add-post" element={<AddPostModal />} />
              <Route path="add-member" element={<AddMemberModal />} />
              <Route path="posts/:postId" element={<PostModal />} />
            </Route>
            <Route
              path="club/:clubId/edit-profile"
              element={<ClubEditProfile />}
            />
            <Route
              path="organization/:organizationId"
              element={<CompanyDashboard path="profile" />}
            >
              <Route path="edit-cover-image" element={<CoverImageModal />} />
            </Route>
            <Route
              path="organization/:organizationId/edit-profile"
              element={<CompanyEditProfile />}
            />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/student-signup" element={<StudentSignup />} />
          <Route path="/User-signup" element={<SignupUser />} />
          <Route path="/clubSignup" element={<ClubSignup />} />
          <Route path="/mentorSignup" element={<MentorSignup />} />
          <Route path="/organizationSignup" element={<OrganizationSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          {OtpRoute === "true" ? (
            <Route exact path="/otp-verification" element={<OTP />} />
          ) : (
            <Route path="/otp-verification" element={<Page404 />} />
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
              <Route
                path=":id"
                element={<ChatPage path="chat" setIsChatOpen={setIsChatOpen} />}
              />
            </Route>
          </Route>
          <Route path="/mentorChat" element={<MentorChat />} />
          <Route path="/trending">
            <Route path="campuses/:collegeId">
              <Route index element={<TrendingColleges />} />
              <Route path="details" element={<CampusDetailsOld />} />
            </Route>
            <Route path="clubs/:clubId" element={<TrendingClubCard />} />
            <Route path="alumni/:almaId" element={<TrendingAlumni />} />
            <Route path="events/:eventId" element={<TrendingEvents />} />
          </Route>
          <Route path="/campus">
            <Route index element={<NewCampusPage />} />
            <Route path="search/:collegeId" element={<CampusSearchPage />} />
            <Route path=":collegeId">
              <Route index element={<CampusDetails />} />
              <Route path="details" element={<CampusDetailsOld />}></Route>
            </Route>
          </Route>
          <Route path="/mentorship" element={<ComingSoon />} />

          {eventHostRoute === true && sendLogin === true ? (
            <Route path="/host/event" element={<HostEvent />} />
          ) : (
            <Route path="/host/event" element={<Login />} />
          )}

          {jobHostRoute === true && sendLogin === true ? (
            <>
              <Route path="/host/project" element={<ProjectHosting />} />
              <Route path="/host/job" element={<JobRegistration />} />
              <Route path="/host/internship" element={<JobRegistration />} />
            </>
          ) : (
            <Route path="/host/job" element={<Login />} />
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
            <Route path="internships">
              <Route path="" element={<Internship />} />
              <Route path=":hiringId" element={<InternshipDetails />} />
            </Route>
            <Route path="projects">
              <Route path="" element={<Projects />} />
              <Route path=":projectId" element={<ProjectDetail />} />
            </Route>
            <Route path="events">
              <Route path="" element={<Events />} />
              <Route path=":hackId" element={<HackathonDetails />} />
            </Route>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>

      {!isEventModalOpen && !isChatOpen && <Footer />}
    </>
  );
}
export default App;
