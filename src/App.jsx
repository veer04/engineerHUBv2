import React, { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
// import MentorChat from "./components/1-1Mentorship/Mentorchat";
// import RegistrationForm from "./components/Registration/Registration";
import OTP from "./pages/User/OtpVerification/Otpverification";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
// import HostEvent from "./pages/Hosting/EventRegistration";
import NewNavbar from "./components/Navbar/NewNavbar";
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
import ClubSignup from "./pages/User/Signup/ClubSignup";
// import MentorSignup from "./pages/User/Signup/MentorSignup";
import OrganizationSignup from "./pages/User/Signup/OrganizationSignup";
import LoadingPage from "./components/Loader/LoadingPage";
import Role from "./pages/User/RoleWiseUserPage/Role";
import PostModal from "./components/PostModal/PostModal";
// import StudentSignup from "./pages/User/Signup/StudentSignup";
import ForgotPassword from "./pages/User/ForgotPassword/ForgotPassword";
// import JobRegistration from "./pages/Hosting/JobRegistration";
import Page404 from "./pages/Maintenance/Page404";
import SignupUser from "./pages/User/Signup/SignupUser";
import jwt_decode from "jwt-decode";
const CommunityPage = lazy(() => import("./pages/Community/CommunityPage"));
const NewCampusPage = lazy(() => import("./pages/Campus/NewCampusPage"));
const Company = lazy(() => import("./pages/Company/Company"));
// const Hosting = lazy(() => import("./pages/Hosting/Hosting.jsx"));
const Login = lazy(() => import("./pages/User/Login/Login"));
const CampusSearchPage = lazy(() => import("./pages/Campus/CampusSearchPage"));
const CampusDetails = lazy(() => import("./pages/Campus/CampusDetails"));
const TrendingEvents = lazy(() => import("./pages/Campus/TrendingEvents"));
import ChangePassword from "./pages/User/ForgotPassword/ChangePassword";
import getCookie, { getAccessToken } from "./features/getCookieValues";
// import ProjectHosting from "./pages/Hosting/ProjectHosting";
import ProfilePopUp from "./components/ProfileSection/ProfilePopUp/ProfilePopUp";
import CompanyDashboard from "./pages/Profile/CompanyDashboard/CompanyDashboard";
import CompanyEditProfile from "./pages/Profile/CompanyDashboard/CompanyEditProfile";
import CoverImageModal from "./components/Dashboard/CoverImageModal";
// import ClubDashboard from "./pages/Profile/ClubDashboard/ClubDashboard";
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
import TrendingWorkshops from "./pages/Campus/TrendingWorkshops.jsx";
import ProjectWindow from "./pages/Community/Project/ProjectWindow.jsx";
import EventWindow from "./pages/Community/Events/EventWindow.jsx";
import BlogWindow from "./pages/Community/Blogs/BlogWindow.jsx";
import NewFooter from "./components/Footer/NewFooter.jsx";
import GetFeaturedForm from "./pages/NewHomepage/GetFeaturedForm.jsx";
import HostingProject from "./pages/Hosting/HostingProject.jsx";
import HostingEventHiring from "./pages/Hosting/HostingEventHiring.jsx";
const HostingPage = lazy(() => import("./pages/Hosting/HostingPage.jsx"));
const HostingInternship = lazy(() =>
  import("./pages/Hosting/HostingInternship.jsx")
);
const HostingJob = lazy(() => import("./pages/Hosting/HostingJob.jsx"));
const HostingCulturalEvent = lazy(() =>
  import("./pages/Hosting/HostingCulturalEvent.jsx")
);
const HostingTechnicalEvent = lazy(() =>
  import("./pages/Hosting/HostingTechnicalEvent.jsx")
);
const HostingHackathon = lazy(() =>
  import("./pages/Hosting/HostingHackathon.jsx")
);
const HostingWebinar = lazy(() => import("./pages/Hosting/HostingWebinar.jsx"));
const NewHomePage = lazy(() => import("./pages/NewHomepage/NewHomePage.jsx"));
const ProjectSubmission = lazy(() =>
  import("./pages/Community/Project/ProjectSubmission.jsx")
);
const BlogHosting = lazy(() => import("./pages/Hosting/BlogHosting.jsx"));
const ClubDashboard = lazy(() =>
  import("./pages/Profile/ClubDashboard/ClubDashboard")
);
const NewChatPage = lazy(() =>
  import("./pages/Community/Chat/NewChatPage.jsx")
);
const NewProjectsPage = lazy(() =>
  import("./pages/Community/Project/NewProjectsPage.jsx")
);
const NewEventsPage = lazy(() =>
  import("./pages/Community/Events/NewEventsPage.jsx")
);
const NewBlogsPage = lazy(() =>
  import("./pages/Community/Blogs/NewBlogsPage.jsx")
);

function App() {
  const [OtpRoute, setOtpRoute] = useState("loading");
  const [eventHostRoute, setEventHostRoute] = useState(false);
  const [sendLogin, setSendLogin] = useState(true);
  const [jobHostRoute, setJobHostRoute] = useState(false);

  useEffect(() => {
    setOtpRoute(Boolean(sessionStorage.getItem("OtpRoute")));
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
      <NewNavbar />
      <MobileNavbar />
      <GlobalSnackbar />
      <ProfilePopUp />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {/* <Route index element={<HomePage path="homepage" />} /> */}
          <Route index element={<NewHomePage path="homepage" />} />
          <Route path="/get-featured" element={<GetFeaturedForm />} />
          <Route path="/success" element={<Success></Success>}></Route>
          {/* <Route path="/register" element={<RegistrationForm />} /> */}
          <Route path="/select-role" element={<Role />} />
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
          {/* <Route path="/student-signup" element={<StudentSignup />} /> */}
          <Route path="/User-signup" element={<SignupUser />} />
          <Route path="/clubSignup" element={<ClubSignup />} />
          {/* <Route path="/mentorSignup" element={<MentorSignup />} /> */}
          <Route path="/organizationSignup" element={<OrganizationSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          {OtpRoute === true && (
            <Route exact path="/otp-verification" element={<OTP />} />
          )}
          {OtpRoute === false && (
            <Route exact path="/otp-verification" element={<Page404 />} />
          )}
          {OtpRoute === "loading" && (
            <Route exact path="/otp-verification" element={<LoadingPage />} />
          )}

          <Route path="/under-maintenance" element={<ComingSoon />} />
          <Route path="/community">
            <Route index element={<CommunityPage />} />
            <Route path="domains" element={<CommunityPage path="domains" />} />
            <Route path="projects">
              <Route path=":id" element={<NewProjectsPage />}>
                <Route path=":projectId" element={<ProjectWindow />} />
              </Route>
              <Route
                path=":id/:projectId/submit"
                element={<ProjectSubmission />}
              />
            </Route>
            <Route path="blogs">
              <Route path=":id" element={<NewBlogsPage />}>
                <Route path=":blogId" element={<BlogWindow />} />
              </Route>
            </Route>
            <Route path="events">
              <Route path=":id" element={<NewEventsPage />}>
                <Route path=":eventId" element={<EventWindow />} />
              </Route>
            </Route>
            <Route path="chat">
              <Route path=":id" element={<NewChatPage />} />
            </Route>
          </Route>
          {/* <Route path="/mentorChat" element={<MentorChat />} /> */}
          <Route path="/trending">
            <Route path="campuses/:collegeId">
              <Route index element={<TrendingColleges />} />
              <Route path="details" element={<CampusDetailsOld />} />
            </Route>
            <Route path="clubs/:clubId" element={<TrendingClubCard />} />
            <Route path="alumni/:almaId" element={<TrendingAlumni />} />
            <Route path="events/:eventId" element={<TrendingEvents />} />
            <Route path="workshops/:eventId" element={<TrendingWorkshops />} />
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

          <Route path="host">
            {/* <Route index element={<Hosting />} /> */}
            <Route index element={<HostingPage />} />
            {/* {eventHostRoute === true && sendLogin === true ? (
              <Route path="event" element={<HostEvent />} />
            ) : (
              <Route path="event" element={<Login />} />
            )} */}
            {/* {jobHostRoute === true && sendLogin === true ? (
              <>
                <Route path="project" element={<ProjectHosting />} />
                <Route path="job" element={<JobRegistration />} />
                <Route path="internship" element={<JobRegistration />} />
              </>
            ) : (
              <Route path="job" element={<Login />} />
            )} */}
            <Route path="job" element={<HostingJob />} />
            <Route path="internship" element={<HostingInternship />} />
            <Route path="project" element={<HostingProject />} />
            <Route path="cultural-event" element={<HostingCulturalEvent />} />
            <Route path="technical-event" element={<HostingTechnicalEvent />} />
            <Route path="hackathon" element={<HostingHackathon />} />
            <Route path="webinar" element={<HostingWebinar />} />
            <Route path="event-hiring" element={<HostingEventHiring />} />
            <Route path="blog" element={<BlogHosting />} />
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

      <NewFooter />
    </>
  );
}
export default App;
