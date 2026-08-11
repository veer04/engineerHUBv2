import React, { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import "./styles/DesignSystem.js";
import OTP from "./pages/User/OtpVerification/Otpverification";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import NewNavbar from "./components/Navbar/NewNavbar";
import Events from "./pages/Company/Events/events";
import Success from "./pages/HomePage/Success";
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
import IndividualInternshipNew from "./pages/Company/Internship/IndividualInternshipNew";
const CommunityPage = lazy(() => import("./pages/Community/CommunityPage"));
const NewCampusPage = lazy(() => import("./pages/Campus/NewCampusPage"));
const CompanyNew = lazy(() => import("./pages/Company/CompanyNew"));
const Company = lazy(() => import("./pages/Company/Company"));
const Login = lazy(() => import("./pages/User/Login/Login"));
const CampusSearchPage = lazy(() => import("./pages/Campus/CampusSearchPage"));
const CampusDetails = lazy(() => import("./pages/Campus/CampusDetails"));
const TrendingEvents = lazy(() => import("./pages/Campus/TrendingEvents"));
import ChangePassword from "./pages/User/ForgotPassword/ChangePassword";
import ProfilePopUp from "./components/ProfileSection/ProfilePopUp/ProfilePopUp";
// import TestimonialsPopup from "./pages/Company/TestimonialsSection/TestimonialsPopup";
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
import { SEOProvider } from "./components/SEO/SEO.jsx";
import { ENABLE_COMMUNITY_CHAT } from "./config/featureFlags";
const BookNow = lazy(() =>
  import("./pages/Company/Referrals/BookNow/BookNow.jsx")
);
const BookNowPayment = lazy(() =>
  import("./pages/Company/Referrals/BookNowPayment/BookNowPayment.jsx")
);
const BookNowPaymentSuccess = lazy(() =>
  import(
    "./pages/Company/Referrals/BookNowPaymentSuccess/BookNowPaymentSuccess.jsx"
  )
);
const CompanyWisePrep = lazy(() =>
  import("./pages/Company/Referrals/CompanyWisePrep/CompanyWisePrep.jsx")
);
const PrepPayNow = lazy(() =>
  import("./pages/Company/Referrals/PrepPayNow/PrepPayNow")
);
const BookNowSuccessProduct = lazy(() =>
  import(
    "./pages/Company/Referrals/BookNowPaymentSuccess/BookNowSuccessProduct.jsx"
  )
);
const PaymentFailed = lazy(() =>
  import("./pages/Company/Referrals/PaymentFailed/PaymentFailed.jsx")
);
import ProfileDashboard from "./components/ProfileDashboard/ProfileDashboard.jsx";
import ProfileDashboardUserView from "./components/ProfileDashboard/UserViewProfileDashboard/ProfileDashboardUserView/ProfileDashboardUserView.jsx";
import ProfileDashboardEdit from "./components/ProfileDashboard/ProfileDashboardEdit/ProfileDashboardEdit.jsx";
import FloatingChatButton from "./components/FloatingChatButton/FloatingChatButton.jsx";
import CommunityChat from "./pages/Chat/CommunityChat.jsx";
import { ToastContainer } from "react-toastify";
import Enterprise from "./pages/Enterprise/Assests/Components/Enterprise.jsx";
import CompanyDashboardNew from "./pages/Profile/CompanyDashboardNew/CompanyDashboardNew.jsx";
// import { getUserRole } from "./features/User/UserDetails.jsx";
const DigitalProductAdminPage = lazy(() =>
  import("./pages/Admin/DigitalProductAdminPage.jsx")
);
const ReferralAdminPage = lazy(() =>
  import("./pages/Admin/ReferralAdminPage.jsx")
);
const ReferralUploadPage = lazy(() =>
  import("./pages/Admin/ReferralUploadPage.jsx")
);
const JobBoard = lazy(() => import("./pages/Company/Board/JobBoard.jsx"));
const InterviewLobby = lazy(() => import("./pages/Company/Board/InterviewSegment/InterviewLobby.jsx"));
const ScheduledInterviews = lazy(() => import("./pages/Company/Board/InterviewSegment/ScheduledInterviews.jsx"));
const Report = lazy(() => import("./pages/Company/Board/InterviewSegment/Report.jsx"));
const ScheduleAssessment = lazy(() =>
  import("./pages/Company/Board/AssessmentSegment/ScheduleAssessment.jsx")
);
const AssessmentReview = lazy(() =>
  import("./pages/Company/Board/AssessmentSegment/AssessmentReview.jsx")
);
const CandidateAssessmentEntry = lazy(() =>
  import("./pages/Candidate/Assessment/CandidateAssessmentEntry.jsx")
);
const CandidateAssessmentAttempt = lazy(() =>
  import("./pages/Candidate/Assessment/CandidateAssessmentAttempt.jsx")
);
const CandidateAssessmentSubmitted = lazy(() =>
  import("./pages/Candidate/Assessment/CandidateAssessmentSubmitted.jsx")
);
const CandidateAIInterviewEntry = lazy(() =>
  import("./pages/Candidate/AIInterview/CandidateAIInterviewEntry.jsx")
);
const CandidateAIInterviewRoom = lazy(() =>
  import("./pages/Candidate/AIInterview/CandidateAIInterviewRoom.jsx")
);
const CandidateAIInterviewSubmitted = lazy(() =>
  import("./pages/Candidate/AIInterview/CandidateAIInterviewSubmitted.jsx")
);
const ProctoringReport = lazy(() =>
  import("./pages/Company/Board/AssessmentSegment/ProctoringReport.jsx")
);
const AIInterviewProctoringReport = lazy(() =>
  import("./pages/Company/Board/InterviewSegment/AIInterviewProctoringReport.jsx")
);
const AIInterviewFeedback = lazy(() =>
  import("./pages/Company/Board/InterviewSegment/AIInterviewFeedback.jsx")
);
const JobsPage = lazy(() => import("./pages/Company/Jobs/JobsPage.jsx"));
const JobsPageNew = lazy(() => import("./pages/Company/Jobs/JobsPageNew.jsx"));
const InternshipPageNew = lazy(() =>
  import("./pages/Company/Internship/InternshipPageNew.jsx")
);
const IndividualJobNew = lazy(() =>
  import("./pages/Company/Jobs/IndividualJobNew.jsx")
);
// const HostingNotes = lazy(() => import("./pages/Hosting/HostingNotes.jsx"));
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
// const HostingEventHiring = lazy(() =>
//   import("./pages/Hosting/HostingEventHiring.jsx")
// );
// const HostingProject = lazy(() => import("./pages/Hosting/HostingProject.jsx"));
const HackathonDetailsNew = lazy(() =>
  import("./pages/Company/Events/EventsChoices/HackathonDetailsNew.jsx")
);
const ProjectDetailNew = lazy(() =>
  import("./pages/Company/Projects/ProjectDetailNew.jsx")
);
// const HostingPage = lazy(() => import("./pages/Hosting/HostingPage.jsx"));
const HostingInternship = lazy(() =>
  import("./pages/Hosting/HostingInternship.jsx")
);
const HostingJob = lazy(() => import("./pages/Hosting/HostingJob.jsx"));
// const HostingCulturalEvent = lazy(() =>
//   import("./pages/Hosting/HostingCulturalEvent.jsx")
// );
// const HostingTechnicalEvent = lazy(() =>
//   import("./pages/Hosting/HostingTechnicalEvent.jsx")
// );
// const HostingHackathon = lazy(() =>
//   import("./pages/Hosting/HostingHackathon.jsx")
// );
// const HostingWebinar = lazy(() => import("./pages/Hosting/HostingWebinar.jsx"));
const NewHomePage = lazy(() => import("./pages/NewHomepage/NewHomePage.jsx"));
const CandidatesDataPage = lazy(() =>
  import("./pages/CandidatesData/CandidatesDataPage.jsx")
);
const ProjectSubmission = lazy(() =>
  import("./pages/Community/Project/ProjectSubmission.jsx")
);
// const BlogHosting = lazy(() => import("./pages/Hosting/BlogHosting.jsx"));
const ClubDashboard = lazy(() =>
  import("./pages/Profile/ClubDashboard/ClubDashboard")
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
const TermsAndConditions = lazy(() =>
  import("./pages/TermsAndConditions/TermsAndConditions.jsx")
);

// Import the new event components
// import EventsNew from "./pages/Company/Events/EventsNew";
// import EventDetailsNew from "./pages/Company/Events/EventsChoices/EventDetailsNew";

function App() {
  const [OtpRoute, setOtpRoute] = useState("loading");
  // const [showPopup, setShowPopup] = useState(false);
  // const role = getUserRole();
  const location = useLocation();

  const isBoardRoute =
    location.pathname.includes("/career/jobs/board") ||
    location.pathname.includes("/company/jobs/board") ||
    location.pathname.includes("/chat/");
  const isCandidateAssessmentRoute =
    location.pathname.startsWith("/assessment/") ||
    location.pathname.startsWith("/ai-interview/");
  const isProctoringReportRoute =
    location.pathname.startsWith("/assessment-proctor/") ||
    location.pathname.startsWith("/ai-interview-proctor/") ||
    location.pathname.startsWith("/ai-interview-feedback/");

  // Employer product ID — booking page accessible from /connect or /employer
  const EMPLOYER_MEET_ID = "67a107c89d57a46e99582bd1";

  // Whether the current page is ANY booking page (session or digital product)
  const isAnyBookingRoute =
    // Session booking pages
    location.pathname === "/referrals/book-now/payment" ||
    (location.pathname.startsWith("/referrals/book-now/") &&
      !location.pathname.endsWith("/success")) ||
    // Digital product purchase pages
    location.pathname === "/referrals/product-book-now/payment" ||
    (location.pathname.startsWith("/referrals/product-book-now/") &&
      !location.pathname.endsWith("/success"));

  // Whether it's a non-employer referral booking (student sessions etc.)
  const isNonEmployerBookingRoute = (() => {
    if (location.pathname.startsWith("/referrals/book-now/")) {
      const id = location.pathname.split("/referrals/book-now/")[1];
      return id !== EMPLOYER_MEET_ID && id !== "payment" && id !== "success";
    }
    if (location.pathname === "/referrals/book-now/payment") {
      try {
        const meetingData = JSON.parse(localStorage.getItem("meetingData"));
        return meetingData?._id !== EMPLOYER_MEET_ID;
      } catch {
        return true;
      }
    }
    return false;
  })();

  // Top web navbar: hide for board/assessment routes + ALL booking pages
  const shouldHideTopNavbar = isBoardRoute || isCandidateAssessmentRoute || isProctoringReportRoute || isAnyBookingRoute;
  // Mobile sticky navbar: hide for board/assessment routes + ALL booking pages
  const shouldHideMobileNavbar = isBoardRoute || isCandidateAssessmentRoute || isProctoringReportRoute || isAnyBookingRoute;
  // Shared alias for body-class and ProfilePopUp gating (union of both)
  const shouldHideNavbar = shouldHideTopNavbar || shouldHideMobileNavbar;

  useEffect(() => {
    setOtpRoute(Boolean(sessionStorage.getItem("OtpRoute")));
  });

  useEffect(() => {
    if (shouldHideNavbar) {
      document.body.classList.add('crm-board-open');
    } else {
      document.body.classList.remove('crm-board-open');
    }
    
    return () => {
      document.body.classList.remove('crm-board-open');
    };
  }, [shouldHideNavbar]);

  /*
  useEffect(() => {
    // Don't show popup on login/signup pages
    const isAuthPage = location.pathname.includes("/login") || 
                       location.pathname.includes("/signup") || 
                       location.pathname.includes("/otp-verification");
    
    if (isAuthPage) {
      return;
    }
    
    // Check if popup was already closed in this session
    const popupClosed = sessionStorage.getItem("testimonialsPopupClosed");
    
    // Only show popup if it hasn't been closed in this session
    if (!popupClosed) {
      // Show popup after 10 seconds
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 10000);

      // Cleanup timer on unmount
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleClosePopup = () => {
    setShowPopup(false);
    // Store in sessionStorage that user closed the popup
    sessionStorage.setItem("testimonialsPopupClosed", "true");
  };
  */

  return (
    <SEOProvider>
      {!shouldHideTopNavbar && <NewNavbar />}
      {!shouldHideMobileNavbar && <MobileNavbar />}
      <ToastContainer />
      <GlobalSnackbar />
      {!isCandidateAssessmentRoute && !isProctoringReportRoute && <ProfilePopUp />}
      {/* <TestimonialsPopup show={showPopup} onClose={handleClosePopup} /> */}
      {/* <FloatingChatButton /> */}
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route index element={<NewHomePage path="homepage" />} />
          <Route path="/get-featured" element={<GetFeaturedForm />} />
          <Route path="/success" element={<Success></Success>}></Route>
          <Route path="/select-role" element={<Role />} />
          <Route path="/profile">
            <Route
              path="user/:userId"
              // element={<UserDashboard path="profile" />}
              element={<ProfileDashboard path="profile" />}
            >
              <Route path="add-post" element={<AddPostModal />} />
              <Route path="posts/:postId" element={<PostModalAllRole />} />
            </Route>
            <Route
              path="user/:userId/edit-profile"
              // element={<UserEditProfile />}
              element={<ProfileDashboardEdit />}
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
              // element={<CompanyDashboard path="profile" />}
              element={<CompanyDashboardNew path="profile" />}
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
            <Route path="notes">
              <Route path=":id" element={<NotesPage />}>
                <Route path=":notesId" element={<NotesWindow />} />
              </Route>
            </Route>
          </Route>
          {ENABLE_COMMUNITY_CHAT ? (
            <Route path="/chat">
              <Route
                index
                element={
                  <Navigate
                    to={`/chat/${encodeURIComponent("Announcements & Updates")}`}
                  />
                }
              />
              <Route path=":chatId" element={<CommunityChat />} />
            </Route>
          ) : (
            // COMMUNITY CHAT FEATURE DISABLED (can be re-enabled later)
            <Route path="/chat/*" element={<Navigate to="/" replace />} />
          )}
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
            <Route path="jobs" element={<HostingJob />} />
            <Route path="internships" element={<HostingInternship />} />
            <Route path="job" element={<HostingJob />} />
            <Route path="internship" element={<HostingInternship />} />
            <Route path="*" element={<Navigate to="/employer" replace />} />
          </Route>
          <Route path="/career">
            <Route path="" element={<CompanyNew />} />
            <Route path="jobs">
              <Route path="" element={<JobsPageNew />}>
                <Route path=":hiringId" element={<IndividualJobNew />} />
              </Route>
              <Route path="board">
                <Route path=":id" element={<JobBoard />} />
              <Route path=":id/assessment" element={<ScheduleAssessment />} />
                <Route path=":id/assessment/review" element={<AssessmentReview />} />
                <Route path=":id/interview" element={<InterviewLobby />} />
                <Route path=":id/interview/scheduled" element={<ScheduledInterviews />} />
                <Route path=":id/interview/report" element={<Report />} />
              </Route>
            </Route>
            <Route path="internships">
              <Route path="" element={<InternshipPageNew />}>
                <Route path=":hiringId" element={<IndividualInternshipNew />} />
              </Route>
            </Route>
            <Route path="projects">
              <Route path="" element={<Projects />} />
              <Route path=":projectId" element={<ProjectDetailNew />} />
            </Route>
            <Route path="events">
              <Route path="" element={<Events />} />
              <Route path=":hackId" element={<HackathonDetailsNew />} />
            </Route>
          </Route>

          <Route path="/assessment">
            <Route path=":inviteToken/attempt" element={<CandidateAssessmentAttempt />} />
            <Route path=":inviteToken/submitted" element={<CandidateAssessmentSubmitted />} />
            <Route path=":inviteToken" element={<CandidateAssessmentEntry />} />
          </Route>

          <Route path="/ai-interview">
            <Route path=":inviteToken/attempt" element={<CandidateAIInterviewRoom />} />
            <Route path=":inviteToken/submitted" element={<CandidateAIInterviewSubmitted />} />
            <Route path=":inviteToken" element={<CandidateAIInterviewEntry />} />
          </Route>

          {/* Recruiter proctoring report */}
          <Route
            path="/assessment-proctor/:hiringId/:inviteId/report"
            element={<ProctoringReport />}
          />

          {/* AI Interview proctoring report */}
          <Route
            path="/ai-interview-proctor/:hiringId/:inviteId/report"
            element={<AIInterviewProctoringReport />}
          />

          {/* AI Interview detailed feedback report */}
          <Route
            path="/ai-interview-feedback/:hiringId/:candidateId"
            element={<AIInterviewFeedback />}
          />

          <Route path="/company">
            <Route path="" element={<CompanyNew />} />
            <Route path="jobs">
              <Route path="" element={<JobsPageNew />}>
                <Route path=":hiringId" element={<IndividualJobNew />} />
              </Route>
              <Route path="board">
                <Route path=":id" element={<JobBoard />} />
              <Route path=":id/assessment" element={<ScheduleAssessment />} />
                <Route path=":id/assessment/review" element={<AssessmentReview />} />
                <Route path=":id/interview" element={<InterviewLobby />} />
                <Route path=":id/interview/scheduled" element={<ScheduledInterviews />} />
                <Route path=":id/interview/report" element={<Report />} />
              </Route>
            </Route>
            <Route path="internships">
              <Route path="" element={<InternshipPageNew />}>
                <Route path=":hiringId" element={<IndividualInternshipNew />} />
              </Route>
            </Route>
            <Route path="projects">
              <Route path="" element={<Projects />} />
              <Route path=":projectId" element={<ProjectDetailNew />} />
            </Route>
            <Route path="events">
              <Route path="" element={<Events />} />
              <Route path=":hackId" element={<HackathonDetailsNew />} />
            </Route>
          </Route>

          {/* <Route path="/company" element={<Company />} /> */}

          <Route path="/referrals" element={<Referrals />} />
          <Route path="/referrals/book-now/:referralId" element={<BookNow />} />
          {/* Shareable employer booking link */}
          <Route
            path="/connect"
            element={<Navigate to="/referrals/book-now/67a107c89d57a46e99582bd1" replace />}
          />
          <Route
            path="/referrals/book-now/payment"
            element={<BookNowPayment />}
          />

          <Route
            path="/referrals/book-now/payment/success"
            element={<BookNowPaymentSuccess />}
          />

          <Route
            path="/referrals/product-book-now/:booknowId"
            element={<CompanyWisePrep />}
          />

          <Route
            path="/referrals/product-book-now/payment"
            element={<PrepPayNow />}
          />

          <Route
            path="/referrals/product-book-now/payment/success"
            element={<BookNowSuccessProduct />}
          />

          <Route
            path="/referrals/booking/payment/failed"
            element={<PaymentFailed />}
          />

          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />

          <Route path="/candidatesdata" element={<CandidatesDataPage />} />

          <Route path="/admin">
            <Route index element={<Navigate to="/admin/referrals?pageNo=1&limit=30" replace />} />
            <Route path="referrals">
              <Route index element={<ReferralAdminPage />} />
            </Route>
            <Route path="upload" element={<ReferralUploadPage />} />
            <Route path="digital-products">
              <Route index element={<DigitalProductAdminPage />} />
            </Route>
          </Route>

          {/* <Route path="/profiledashboard" element={<ProfileDashboard />} />
          <Route
            path="/profiledashboarduserview"
            element={<ProfileDashboardUserView />}
          />

          <Route
            path="/profiledashboardedit"
            element={<ProfileDashboardEdit />}
          /> */}
          <Route path="*" element={<Page404 />} />

          <Route path="/employer" element={<Enterprise />} />

          {/* <Route
            path="/companydashboardnew"
            element={<CompanyDashboardNew />}
          /> */}
        </Routes>
      </Suspense>
      {!isCandidateAssessmentRoute && !isProctoringReportRoute && <NewFooter />}
    </SEOProvider>
  );
}
export default App;
