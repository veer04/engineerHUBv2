import React, { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/DesignSystem.js";
import OTP from "./pages/User/OtpVerification/Otpverification";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import NewNavbar from "./components/Navbar/NewNavbar";
import Events from "./pages/Company/Events/events";
// import Jobs from "./pages/Company/Jobs/jobs";
// import JobDetails from "./pages/Company/Jobs/JobDetails";
import Success from "./pages/HomePage/Success";
// import Internship from "./pages/Company/Internship/Internship";
// import InternshipDetails from "./pages/Company/Internship/InternshipDetails";
import Projects from "./pages/Company/Projects/Projects";
import ComingSoon from "./pages/Maintenance/ComingSoon";
import ClubSignup from "./pages/User/Signup/ClubSignup";
import OrganizationSignup from "./pages/User/Signup/OrganizationSignup";
import LoadingPage from "./components/Loader/LoadingPage";
import Role from "./pages/User/RoleWiseUserPage/Role";
import PostModal from "./components/PostModal/PostModal";
import ForgotPassword from "./pages/User/ForgotPassword/ForgotPassword";
import Page404 from "./pages/Maintenance/Page404";
import SignupUser from "./pages/User/Signup/SignupUser";
const CommunityPage = lazy(() => import("./pages/Community/CommunityPage"));
const NewCampusPage = lazy(() => import("./pages/Campus/NewCampusPage"));
const Company = lazy(() => import("./pages/Company/Company"));
const Login = lazy(() => import("./pages/User/Login/Login"));
const CampusSearchPage = lazy(() => import("./pages/Campus/CampusSearchPage"));
const CampusDetails = lazy(() => import("./pages/Campus/CampusDetails"));
const TrendingEvents = lazy(() => import("./pages/Campus/TrendingEvents"));
import ChangePassword from "./pages/User/ForgotPassword/ChangePassword";
import ProfilePopUp from "./components/ProfileSection/ProfilePopUp/ProfilePopUp";
import CompanyDashboard from "./pages/Profile/CompanyDashboard/CompanyDashboard";
import CompanyEditProfile from "./pages/Profile/CompanyDashboard/CompanyEditProfile";
import CoverImageModal from "./components/Dashboard/CoverImageModal";
import ClubEditProfile from "./pages/Profile/ClubDashboard/ClubEditProfile";
import AddPostModal from "./components/Dashboard/AddPostModal";
import AddMemberModal from "./components/Dashboard/AddMemberModal";
import UserDashboard from "./pages/Profile/UserDashboard/UserDashboard";
import GlobalSnackbar from "./components/GlobalSnackbar/GlobalSnackbar";
import UserEditProfile from "./pages/Profile/UserDashboard/UserEditProfile";
import TrendingColleges from "./pages/Campus/TrendingColleges";
import TrendingClubCard from "./components/TrendingClubCard/TrendingClubCard";
import TrendingAlumni from "../src/components/TrendingAlumni/TrendingAlumni";
import CampusDetailsOld from "./pages/Campus/ParticularCampus/CampusDetails.jsx";
import TrendingWorkshops from "./pages/Campus/TrendingWorkshops.jsx";
import ProjectWindow from "./pages/Community/Project/ProjectWindow.jsx";
import EventWindow from "./pages/Community/Events/EventWindow.jsx";
import BlogWindow from "./pages/Community/Blogs/BlogWindow.jsx";
import NewFooter from "./components/Footer/NewFooter.jsx";
import BookNow from "./pages/Company/Referrals/BookNow/BookNow.jsx";
// import PopUpModalBootstrap from "./components/PopUpModal/PopUpModalBootstrap.jsx";
const JobsPage = lazy(() => import("./pages/Company/Jobs/JobsPage.jsx"));
const InternshipsPage = lazy(() =>
  import("./pages/Company/Jobs/InternshipsPage.jsx")
);
const IndividualInternship = lazy(() =>
  import("./pages/Company/Jobs/IndividualInternship.jsx")
);
const IndividualJob = lazy(() =>
  import("./pages/Company/Jobs/IndividualJob.jsx")
);
const HostingNotes = lazy(() => import("./pages/Hosting/HostingNotes.jsx"));
const GetFeaturedForm = lazy(() =>
  import("./pages/NewHomepage/GetFeaturedForm.jsx")
);
const NotesWindow = lazy(() =>
  import("./pages/Community/Notes/NotesWindow.jsx")
);
const NotesPage = lazy(() => import("./pages/Community/Notes/NotesPage.jsx"));
const PostModalAllRole = lazy(() =>
  import("./components/PostModal/PostModalAllRole.jsx")
);
const HostingEventHiring = lazy(() =>
  import("./pages/Hosting/HostingEventHiring.jsx")
);
const HostingProject = lazy(() => import("./pages/Hosting/HostingProject.jsx"));
const HackathonDetailsNew = lazy(() =>
  import("./pages/Company/Events/EventsChoices/HackathonDetailsNew.jsx")
);
const ProjectDetailNew = lazy(() =>
  import("./pages/Company/Projects/ProjectDetailNew.jsx")
);
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

const Referrals = lazy(() => import("./pages/Company/Referrals/Referrals.jsx"));

function App() {
  const [OtpRoute, setOtpRoute] = useState("loading");

  useEffect(() => {
    setOtpRoute(Boolean(sessionStorage.getItem("OtpRoute")));
  });

  return (
    <>
      {/* <PopUpModalBootstrap /> */}
      <NewNavbar />
      <MobileNavbar />
      <GlobalSnackbar />
      <ProfilePopUp />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route index element={<NewHomePage path="homepage" />} />
          <Route path="/get-featured" element={<GetFeaturedForm />} />
          <Route path="/success" element={<Success></Success>}></Route>
          <Route path="/select-role" element={<Role />} />
          <Route path="/profile">
            <Route
              path="user/:userId"
              element={<UserDashboard path="profile" />}
            >
              <Route path="add-post" element={<AddPostModal />} />
              <Route path="posts/:postId" element={<PostModalAllRole />} />
            </Route>
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
              <Route path="add-post" element={<AddPostModal />} />
              <Route path="posts/:postId" element={<PostModalAllRole />} />
            </Route>
            <Route
              path="organization/:organizationId/edit-profile"
              element={<CompanyEditProfile />}
            />
          </Route>
          <Route path="/signup" element={<SignupUser />} />
          <Route path="/club-signup" element={<ClubSignup />} />
          <Route path="/organization-signup" element={<OrganizationSignup />} />
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
            <Route path="notes">
              <Route path=":id" element={<NotesPage />}>
                <Route path=":notesId" element={<NotesWindow />} />
              </Route>
            </Route>
          </Route>
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
            <Route index element={<HostingPage />} />
            <Route path="job" element={<HostingJob />} />
            <Route path="internship" element={<HostingInternship />} />
            <Route path="project" element={<HostingProject />} />
            <Route path="cultural-event" element={<HostingCulturalEvent />} />
            <Route path="technical-event" element={<HostingTechnicalEvent />} />
            <Route path="hackathon" element={<HostingHackathon />} />
            <Route path="webinar" element={<HostingWebinar />} />
            <Route path="event-hiring" element={<HostingEventHiring />} />
            <Route path="blog" element={<BlogHosting />} />
            <Route path="notes" element={<HostingNotes />} />
          </Route>
          <Route path="/company">
            <Route path="" element={<Company />} />
            <Route path="jobs">
              <Route path="" element={<JobsPage />}>
                <Route path=":hiringId" element={<IndividualJob />} />
                {/* <Route path=":hiringId" element={<IndividualJob />} /> */}
                {/* <Route path=":hiringId" element={<JobDetails />} /> */}
              </Route>
              {/* <Route path="" element={<Jobs />} /> */}
            </Route>
            <Route path="internships">
              <Route path="" element={<InternshipsPage />}>
                <Route path=":hiringId" element={<IndividualInternship />} />
                {/* <Route path=":hiringId" element={<IndividualJob />} /> */}
                {/* <Route path=":hiringId" element={<JobDetails />} /> */}
              </Route>
              {/* <Route path="" element={<Jobs />} /> */}
            </Route>
            {/* <Route path="internships">
              <Route path="" element={<Internship />} />
              <Route path=":hiringId" element={<InternshipDetails />} />
            </Route> */}
            <Route path="projects">
              <Route path="" element={<Projects />} />
              <Route path=":projectId" element={<ProjectDetailNew />} />
            </Route>
            <Route path="events">
              <Route path="" element={<Events />} />
              <Route path=":hackId" element={<HackathonDetailsNew />} />
            </Route>
          </Route>

          <Route path="/referrals" element={<Referrals />} />
          {/* <Route path="/referrals/book-now" element={<BookNow />} /> */}
          <Route path="/referrals/book-now/:referralId" element={<BookNow />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>

      <NewFooter />
    </>
  );
}
export default App;
