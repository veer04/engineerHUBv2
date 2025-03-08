import React, { useEffect, useLayoutEffect, useState } from "react";

import "./companydashboardnew.css";
import NewCompanyDashboardHeader from "./NewCompanyDashboardHeader/NewCompanyDashboardHeader";
import HostPageForProfileDashboard from "../../../components/ProfileDashboard/HostpageForProfileDashboard/HostPageForProfileDashboard";
import AboutCompNewCompany from "./AboutCompNewCompany/AboutCompNewCompany";
import NewCompanyThirdAndFourthSec from "./SectionThreeAndFourNewCompany/NewCompanyThirdAndFourthSec";
import { Bucket_URL } from "../../../services/APIUtils";
import YourCompanyActivitySection from "./NewCompanyDashboardHeader/YourCompanyActivitySection";
import {
  followOrganization,
  getAllPosts,
  getEventsByOrganisationId,
  getEventsByOrganisationIdPrivateMode,
  getInternshipsByOrganisationId,
  getInternshipsByOrganisationIdPrivateMode,
  getJobsByOrganisationId,
  getJobsByOrganisationIdPrivateMode,
  getOrganizationProfileById,
  getOrganizationProfileByIdPrivateMode,
  getProjectsByOrganisationId,
  getProjectsByOrganisationIdPrivateMode,
  unFollowOrganization,
} from "../../../services/APIConfig";
import { Outlet, useParams } from "react-router-dom";
import { getUserId, isUserLoggedIn } from "../../../features/User/UserDetails";
import HostPageForComapnyDashboard from "./HostPageForCompanyDashboard/HostPageForCompanyDashboard";

const CompanyDashboardNew = () => {
  const [organization, setOrganization] = useState({});
  const [fetchResponse, setFetchResponse] = useState({});
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [viewMore, setViewMore] = useState(false);
  const [activityChoice, setActivityChoice] = useState("jobs");
  const [hackathons, setHackathons] = useState([]);
  const [projects, setProjects] = useState([]);
  const [followResponse, setFollowResponse] = useState({});
  const [isActivityPresent, setIsActivityPresent] = useState(true);
  const [scrollAmount, setScrollAmount] = useState(220);
  const [posts, setPosts] = useState([]);
  const [activityLength, setActivityLength] = useState(false);

  const { organizationId } = useParams();
  const [showAll, setShowAll] = useState(false);
  const [showAll1, setShowAll1] = useState(false);

  // console.log(organization, "organization");
  function fetchData() {
    if (isUserLoggedIn()) {
      getOrganizationProfileByIdPrivateMode(
        setOrganization,
        organizationId,
        setFetchResponse
      );
    } else {
      getOrganizationProfileById(
        setOrganization,
        organizationId,
        setFetchResponse
      );
    }
  }

  useEffect(() => {
    if (activityChoice === "jobs") {
      if (jobs.length !== 0) {
        setIsActivityPresent(true);
        if (jobs.length > 3) {
          setActivityLength(true);
        } else {
          setActivityLength(false);
        }
      } else {
        setIsActivityPresent(false);
      }
    }
    if (activityChoice === "internships") {
      if (internships.length !== 0) {
        setIsActivityPresent(true);
        if (internships.length > 3) {
          setActivityLength(true);
        } else {
          setActivityLength(false);
        }
      } else {
        setIsActivityPresent(false);
      }
    }
    if (activityChoice === "hackathons") {
      if (hackathons.length !== 0) {
        setIsActivityPresent(true);
        if (hackathons.length > 3) {
          setActivityLength(true);
        } else {
          setActivityLength(false);
        }
      } else {
        setIsActivityPresent(false);
      }
    }
    if (activityChoice === "projects") {
      if (projects.length !== 0) {
        setIsActivityPresent(true);
        if (projects.length > 3) {
          setActivityLength(true);
        } else {
          setActivityLength(false);
        }
      } else {
        setIsActivityPresent(false);
      }
    }
    setShowAll(false);
    if (activityChoice === "jobs" || activityChoice === "internships") {
      setScrollAmount(220);
    }
    if (activityChoice === "projects") {
      setScrollAmount(201);
    }
    if (activityChoice === "hackathons") {
      setScrollAmount(233);
    }
  }, [activityChoice, jobs, internships, hackathons, projects]);

  function handleFollow() {
    if (organization?.isFollowing) {
      unFollowOrganization(organizationId, setFollowResponse);
    } else {
      followOrganization(organizationId, setFollowResponse);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
    getAllPosts(setPosts, organizationId);

    if (isUserLoggedIn() && organizationId === getUserId()) {
      setIsUserAdmin(true);
      getJobsByOrganisationIdPrivateMode(setJobs);
      getInternshipsByOrganisationIdPrivateMode(setInternships);
      getEventsByOrganisationIdPrivateMode(setHackathons);
      getProjectsByOrganisationIdPrivateMode(setProjects);
    } else {
      setIsUserAdmin(false);
      getJobsByOrganisationId(organizationId, setJobs);
      getInternshipsByOrganisationId(organizationId, setInternships);
      getEventsByOrganisationId(organizationId, setHackathons);
      getProjectsByOrganisationId(organizationId, setProjects);
    }
    setViewMore(false);
    setShowAll(false);
    setActivityChoice("jobs");
    setFollowResponse({});
  }, [organizationId]);

  useLayoutEffect(() => {
    fetchData();
  }, [window.location.pathname]);

  return (
    <main className="main-company-new-dashbooard-div">
      <div style={{ marginBottom: 20 }}>
        <NewCompanyDashboardHeader
          isUserAdmin={isUserAdmin}
          organization={organization}
        />
      </div>

      <div className="about-comp-main" style={{ marginBottom: 20 }}>
        <AboutCompNewCompany />
      </div>

      <div style={{ marginBottom: 20 }}>
        <HostPageForComapnyDashboard />
      </div>

      <div style={{ marginBottom: 20 }}>
        <YourCompanyActivitySection
          posts={posts}
          showAll={showAll}
          showAll1={showAll1}
          setShowAll1={setShowAll1}
          jobs={jobs}
          setJobs={setJobs}
          isActivityPresent={isActivityPresent}
          hackathons={hackathons}
          isUserAdmin={isUserAdmin}
          organization={organization}
          projects={projects}
          internships={internships}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <NewCompanyThirdAndFourthSec
          title={"4x your campus placements"}
          desc={
            "From connecting with 5 lakh+ engineers to assessments, virtual interviews, advanced analytics, and ATS-powered shortlisting—our platform automates and streamlines every step of the recruitment journey."
          }
          bgColor={"#E8BA9826"}
          btn={"For Companies"}
          btnLink={"/employer"}
          rightImage={`${Bucket_URL}newcompanydashboard/right_frame1.png`}
        />
      </div>

      <div style={{ marginBottom: 40 }}>
        <NewCompanyThirdAndFourthSec
          title={"70% less screening time"}
          desc={
            "Accelerate your hiring process with our streamlined platform—connect, assess, and onboard top talent within 72 hours, ensuring efficiency and quality every step of the way."
          }
          bgColor={"#8FC8E826"}
          btn={"For HRs"}
          btnLink={"/employer"}
          rightImage={`${Bucket_URL}newcompanydashboard/right_frame2.png`}
        />
      </div>
      <Outlet />
    </main>
  );
};

export default CompanyDashboardNew;
