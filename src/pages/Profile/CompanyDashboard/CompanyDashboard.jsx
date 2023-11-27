import { useState, useEffect } from "react";
import "../Dashboard.css"; // !import this file first
import "./CompanyDashboard.css";
import { BsArrowRight, BsArrowUp } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlineLeft, AiOutlineRight, AiFillLinkedin } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { PiGlobeLight } from "react-icons/pi";
import { BiLogoInstagramAlt } from "react-icons/bi";
import banner from "./banner-1.png";
import banner2 from "./banner-2.png";
import default_profile_icon from "./default_profile_icon.png";
import sponsor_photo from "./sponsor_photo.png";
import { Bucket_URL } from "../../../services/APIUtils";
import JobCard from "../../../components/JobCard/JobCard";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import defaultPoster from "../../../assets/defaultPoster";
import { getUserId, isUserLoggedIn } from "../../../features/User/UserDetails";
import JobCards from "../../Company/Jobs/JobCards";
import colorWheel from "../../../assets/colorWheel";
import EventCard from "../../../components/EventCard/EventCard";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";
import {
  followOrganization,
  getAllEvents2,
  getAllInternships,
  getAllJobs2,
  getEvents,
  getEventsByOrganisationId,
  getEventsByOrganisationIdPrivateMode,
  getInternshipsByOrganisationId,
  getInternshipsByOrganisationIdPrivateMode,
  getJobsByOrganisationId,
  getJobsByOrganisationIdPrivateMode,
  getOrganizationProfileById,
  getOrganizationProfileByIdPrivateMode,
  getProjectData,
  getProjectsByOrganisationId,
  getProjectsByOrganisationIdPrivateMode,
  unFollowOrganization,
} from "../../../services/APIConfig";
import HackathonCard from "../../Company/Events/EventsChoices/HackathonCards";
import ProjectCards from "../../Company/Projects/ProjectCards";
import { useLayoutEffect } from "react";
import Page404 from "../../Maintenance/Page404";
import LoadingPage from "../../../components/Loader/LoadingPage";
import InternshipCard from "../../Company/Internship/InternshipCard";

export default function CompanyDashboard() {
  const { organizationId } = useParams();
  const navigate = useNavigate();
  const [organization, setOrganization] = useState({});
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [activityChoice, setActivityChoice] = useState("jobs");
  const logo = defaultPoster; // later fetch from api
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isActivityPresent, setIsActivityPresent] = useState(true);
  const [activityLength, setActivityLength] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(220);
  const bucket = `${Bucket_URL}frontend/hosting/`;
  const bucket2 = `${Bucket_URL}frontend/profile/dashboard/`;
  const [followResponse, setFollowResponse] = useState({});
  const [fetchResponse, setFetchResponse] = useState({});

  const scrollLeft = () => {
    const carousel = document.querySelector(".carousel");
    carousel.scrollLeft -= scrollAmount;
  };
  const scrollRight = () => {
    const carousel = document.querySelector(".carousel");
    carousel.scrollLeft += scrollAmount;
  };

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
    window.scrollTo(0, 0);
    fetchData();
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

  useEffect(() => {
    if (!!followResponse) fetchData();
  }, [followResponse]);

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

  const companyDashboardPage = (
    <>
      <main className="profile-dashboard">
        <h1 className="title">Profile</h1>
        <h2 className="subheading">
          {/* Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales
        faucibus platea feugiat odio. */}
        </h2>
        <section className="box details-container">
          <div className="cover">
            {organization?.imagePoster && (
              <img
                className="cover-image"
                loading="lazy"
                src={organization?.imagePoster}
                alt="Cover Image"
              />
            )}
            {!organization?.imagePoster && (
              <img
                className="cover-image"
                loading="lazy"
                src={`${bucket2}cover-image-1.png`}
                alt="Cover Image"
              />
            )}
            {isUserAdmin && (
              <button
                onClick={() => navigate("edit-cover-image")}
                className="edit-option"
              >
                <FiEdit />
              </button>
            )}
            <div className="logo">
              {organization?.image && (
                <img src={organization?.image} alt="Profile Picture" />
              )}
              {!organization?.image && (
                <img src={default_profile_icon} alt="Profile Picture" />
              )}
            </div>
          </div>
          <div className="details">
            <div className="upper-container">
              <div className="left-container">
                <div>
                  <h1 className="text-crop-1 overflow-hidden">
                    {organization?.name}
                  </h1>
                  <h2 className="text-crop-1 overflow-hidden">
                    {organization?.subHeading ? (
                      organization?.subHeading
                    ) : (
                      <i
                        style={{ color: "grey" }}
                        className="text-crop-1 overflow-hidden"
                      >
                        Subheading not available
                      </i>
                    )}
                  </h2>
                  <div>
                    <span className="text-crop-1 overflow-hidden">
                      {organization?.organisationType ? (
                        <>
                          <div className="d-flex flex-row gap-1">
                            <span className="text-crop-1 overflow-hidden">
                              {organization?.organisationType}
                            </span>
                            <span>•</span>
                            <span className="text-crop-1 overflow-hidden">
                              {organization?.country}
                            </span>
                          </div>
                        </>
                      ) : (
                        <i
                          style={{ color: "grey" }}
                          className="text-crop-1 overflow-hidden"
                        >
                          Organization type not available
                        </i>
                      )}
                    </span>
                  </div>
                  {!!organization?.followerCount && (
                    <span className="follower-count">
                      {`${organization?.followerCount} ${
                        organization?.followerCount > 1
                          ? "Followers"
                          : "Follower"
                      }`}
                    </span>
                  )}
                  {isUserAdmin && (
                    <button
                      onClick={() => navigate("edit-profile")}
                      className="md-edit-btn"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
              <div className="right-container">
                <div className="socials">
                  {organization?.websiteUrl && (
                    <a href={organization?.websiteUrl}>
                      <PiGlobeLight />
                    </a>
                  )}
                  {organization?.linkedIn && (
                    <a href={organization?.linkedIn}>
                      <AiFillLinkedin />
                    </a>
                  )}
                  {organization?.instagram && (
                    <a href={organization?.instagram}>
                      <BiLogoInstagramAlt />
                    </a>
                  )}
                </div>
                {isUserAdmin && (
                  <button
                    onClick={() => navigate("edit-profile")}
                    className="edit-btn"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
            {isUserLoggedIn() && !isUserAdmin && (
              <button
                style={{
                  backgroundColor: organization?.isFollowing
                    ? "transparent"
                    : "#002B36",
                  color: organization?.isFollowing ? "#002B36" : "#fff",
                }}
                onClick={() => handleFollow()}
                onMouseEnter={(e) => {
                  if (organization?.isFollowing) {
                    e.target.innerHTML = "Unfollow";
                  }
                }}
                onMouseLeave={(e) => {
                  if (organization?.isFollowing) {
                    e.target.innerHTML = "Following";
                  }
                }}
                className="follow-btn"
              >
                {`${organization?.isFollowing ? "Following" : "+ Follow"}`}
              </button>
            )}
            <div className="lower-container">
              {/* {isUserAdmin && (
              <div className="edit">
                <FiEdit2 />
              </div>
            )} */}
              <p className="heading">ABOUT US</p>
              {organization?.aboutUs && (
                <span
                  className={`content ${
                    viewMore ? "no-text-crop" : "text-crop-4"
                  } `}
                >
                  {organization?.aboutUs}
                </span>
              )}
              {!organization?.aboutUs && (
                <p className="no-description">
                  <i style={{ color: "grey" }}>Description not available</i>
                </p>
              )}
              {organization?.aboutUs && !viewMore && (
                <div onClick={() => setViewMore(true)} className="view-more">
                  View More
                </div>
              )}
            </div>
          </div>
        </section>
        <section id="recent-activities" className="box recent-activities">
          <p className="heading">RECENT ACTIVITIES</p>
          <div className="tags-container">
            <button
              onClick={() => setActivityChoice("jobs")}
              className={`tag ${
                activityChoice === "jobs" ? "--is-active" : ""
              }`}
            >
              Jobs
            </button>
            <button
              onClick={() => setActivityChoice("internships")}
              className={`tag ${
                activityChoice === "internships" ? "--is-active" : ""
              }`}
            >
              Internships
            </button>
            <button
              onClick={() => setActivityChoice("hackathons")}
              className={`tag ${
                activityChoice === "hackathons" ? "--is-active" : ""
              }`}
            >
              Hackathons
            </button>
            <button
              onClick={() => setActivityChoice("projects")}
              className={`tag ${
                activityChoice === "projects" ? "--is-active" : ""
              }`}
            >
              Projects
            </button>
          </div>
          <div className="carousel-container">
            {isActivityPresent && !showAll && (
              <button onClick={scrollLeft} className="arrow arrow-left">
                <AiOutlineLeft />
              </button>
            )}
            {isActivityPresent && (
              <div className={`${showAll ? "carousel-grid" : "carousel"}`}>
                {activityChoice === "jobs" &&
                  jobs.map((jobDetail, index) => (
                    <JobCards
                      key={index}
                      details={jobDetail}
                      color={colorWheel[index % colorWheel.length]}
                      className="scroll-card no-hover-scale"
                      adminView={isUserAdmin}
                      filterByCompany={true}
                      filterName={organization?.name}
                    />
                  ))}
                {activityChoice === "internships" &&
                  internships.map((jobDetail, index) => (
                    <InternshipCard
                      key={index}
                      details={jobDetail}
                      color={colorWheel[index % colorWheel.length]}
                      className="scroll-card no-hover-scale"
                      adminView={isUserAdmin}
                      filterByCompany={true}
                      filterName={organization?.name}
                    />
                  ))}
                {activityChoice === "hackathons" &&
                  hackathons.map((jobDetail, index) => (
                    <HackathonCard
                      key={index}
                      {...jobDetail}
                      className="scroll-card no-hover-scale"
                      adminView={isUserAdmin}
                      filterByCompany={true}
                      filterName={organization?.name}
                    />
                  ))}
                {activityChoice === "projects" &&
                  projects.map((jobDetail, index) => (
                    <ProjectCards
                      key={index}
                      data={jobDetail}
                      className="scroll-card no-hover-scale"
                      adminView={isUserAdmin}
                      filterByCompany={true}
                      filterName={organization?.name}
                    />
                  ))}
              </div>
            )}
            {!isActivityPresent && (
              <div className="no-jobs empty-container">
                {/* <MdAddCircle /> */}
                <p
                  style={{ color: "grey" }}
                >{`No ${activityChoice} to show`}</p>
              </div>
            )}
            {isActivityPresent && !showAll && (
              <button onClick={scrollRight} className="arrow arrow-right">
                <AiOutlineRight />
              </button>
            )}
          </div>
          {isActivityPresent && activityLength && !showAll && (
            <div className="btn-container">
              <button onClick={() => setShowAll(true)} className="all-jobs-btn">
                Show all {activityChoice} <BsArrowRight />
              </button>
            </div>
          )}
          {isActivityPresent && activityLength && showAll && (
            <div className="btn-container">
              <button
                onClick={() => setShowAll(false)}
                className="all-jobs-btn"
              >
                Show less {activityChoice} <BsArrowUp />
              </button>
            </div>
          )}
        </section>
        {isUserAdmin && (
          <section className="box recruit-container">
            <p className="heading">RECRUIT THE BEST FOR YOU</p>
            <div className="cards">
              <div
                onClick={() => navigate("/host/job")}
                style={{
                  backgroundImage: `url(${bucket}jobs.png)`,
                }}
                className="card"
              >
                <div className="heading">Jobs</div>
                <div className="subheading">
                  Create Jobs <BsArrowRight />
                </div>
              </div>
              <div
                onClick={() => navigate("/host/internship")}
                style={{
                  backgroundImage: `url(${bucket}internships.png)`,
                }}
                className="card"
              >
                <div className="heading">Internships</div>
                <div className="subheading">
                  Create Jobs <BsArrowRight />
                </div>
              </div>
              <div
                onClick={() => navigate("/host/event")}
                style={{
                  backgroundImage: `url(${bucket}hackathon.png)`,
                }}
                className="card"
              >
                <div className="heading">Event Hiring</div>
                <div className="subheading">
                  Create Event <BsArrowRight />
                </div>
              </div>
              <div
                onClick={() => navigate("/host/project")}
                style={{
                  backgroundImage: `url(${bucket}project.png)`,
                }}
                className="card"
              >
                <div className="heading">Projects</div>
                <div className="subheading">
                  Host Projects <BsArrowRight />
                </div>
              </div>
            </div>
          </section>
        )}
        {isUserAdmin && (
          <section
            id="sponsor"
            style={{
              backgroundImage: `url(${banner})`,
            }}
            className="box promotion-container"
          >
            <div className="left-container">
              <p>Sponsor the event to make your reach</p>
              <a href="https://wa.me/919354647032?text=I+want+to+Sponsor+my+Events">
                <button>Connect with us</button>
              </a>
            </div>
            <div className="right-container">
              <img src={sponsor_photo} alt="Sponsor" />
            </div>
          </section>
        )}
        {isUserAdmin && (
          <section
            style={{
              backgroundImage: `url(${banner2})`,
            }}
            className="box promotion-container flex-row-reverse"
          >
            <div className="left-container d-flex flex-column align-items-end">
              <p className="text-end">Advertise your Company Profile</p>
              <a href="https://wa.me/919354647032?text=I+want+to+Advertise+my+Company">
                <button>Connect with us</button>
              </a>
            </div>
            <div className="right-container">
              <img src={sponsor_photo} alt="Sponsor" />
            </div>
          </section>
        )}
      </main>
      <Outlet />
    </>
  );

  return !!Object.keys(fetchResponse).length ? (
    fetchResponse?.status >= 200 && fetchResponse?.status <= 300 ? (
      companyDashboardPage
    ) : (
      <Page404 />
    )
  ) : (
    <LoadingPage />
  );
}
