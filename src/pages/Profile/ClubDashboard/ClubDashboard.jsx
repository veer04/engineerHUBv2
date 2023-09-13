import { useState, useEffect } from "react";
import "../Dashboard.css"; // !import this file first
import "./ClubDashboard.css";
import { BsArrowRight } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlineLeft, AiOutlineRight, AiFillLinkedin } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { PiGlobeLight } from "react-icons/pi";
import { BiLogoInstagramAlt } from "react-icons/bi";
import banner from "./banner-1.png";
import default_profile_icon from "./default_profile_icon.png";
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
  getAllEvents2,
  getAllInternships,
  getAllJobs2,
  getAllPosts,
  getClubProfileById,
  getEvents,
  getFeaturedEvents,
  getOrganizationProfileById,
  getProjectData,
} from "../../../services/APIConfig";
import HackathonCard from "../../Company/Events/EventsChoices/HackathonCards";
import ProjectCards from "../../Company/Projects/ProjectCards";
import ClubPostCard from "../../../components/ClubPostCard/ClubPostCard";
import ClubMemberCard from "../../../components/ClubMemberCard/ClubMemberCard";

export default function ClubDashboard() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [organization, setOrganization] = useState({});
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [showAll1, setShowAll1] = useState(false);
  const [showAll2, setShowAll2] = useState(false);
  const [showAll3, setShowAll3] = useState(false);
  const [activityChoice, setActivityChoice] = useState("jobs");
  const logo = defaultPoster; // later fetch from api
  const [jobs, setJobs] = useState([]);
  const [members, setMembers] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [internships, setInternships] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isBannerPresent, setIsBannerPresent] = useState(true);
  const [isLogoPresent, setIsLogoPresent] = useState(true);
  const [isDescriptionPresent, setIsDescriptionPresent] = useState(true);
  const [isActivityPresent, setIsActivityPresent] = useState(true);
  const [scrollAmount, setScrollAmount] = useState(220);
  const bucket = `${Bucket_URL}frontend/hosting/`;
  const bucket2 = `${Bucket_URL}frontend/profile/dashboard/`;

  const eyeSvg = (
    <svg
      width="19"
      height="14"
      viewBox="0 0 19 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 6.97656C1 6.97656 3.98828 1 9.21777 1C14.4473 1 17.4355 6.97656 17.4355 6.97656C17.4355 6.97656 14.4473 12.9531 9.21777 12.9531C3.98828 12.9531 1 6.97656 1 6.97656Z"
        stroke="black"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9C10.1046 9 11 8.10457 11 7C11 5.89543 10.1046 5 9 5C7.89543 5 7 5.89543 7 7C7 8.10457 7.89543 9 9 9Z"
        stroke="black"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const scrollLeft = () => {
    const carousel = document.querySelector(".carousel");
    carousel.scrollLeft -= scrollAmount;
  };
  const scrollRight = () => {
    const carousel = document.querySelector(".carousel");
    carousel.scrollLeft += scrollAmount;
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
    getClubProfileById(setOrganization, clubId);
    getAllPosts(setJobs, clubId);
    getFeaturedEvents(setFeaturedEvents);

    if (isUserLoggedIn() && clubId === getUserId()) {
      setIsUserAdmin(true);
    } else {
      setIsUserAdmin(false);
    }
  }, [clubId]);

  useEffect(() => {
    console.log("organization", organization);
  }, [organization]);

  // useEffect(() => {
  //   console.log("jobs", jobs);
  // }, [jobs]);

  // useEffect(() => {
  //   console.log("internships", internships);
  // }, [internships]);

  // useEffect(() => {
  //   console.log("hackathons", hackathons);
  // }, [hackathons]);

  // useEffect(() => {
  //   console.log("projects", projects);
  // }, [projects]);

  useEffect(() => {
    if (activityChoice === "jobs") {
      if (jobs.length !== 0) {
        setIsActivityPresent(true);
      } else {
        setIsActivityPresent(false);
      }
    }
    if (activityChoice === "internships") {
      if (internships.length !== 0) {
        setIsActivityPresent(true);
      } else {
        setIsActivityPresent(false);
      }
    }
    if (activityChoice === "hackathons") {
      if (hackathons.length !== 0) {
        setIsActivityPresent(true);
      } else {
        setIsActivityPresent(false);
      }
    }
    if (activityChoice === "projects") {
      if (projects.length !== 0) {
        setIsActivityPresent(true);
      } else {
        setIsActivityPresent(false);
      }
    }
    setShowAll1(false);
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

  return (
    <>
      <main className="profile-dashboard club-dashboard">
        <h1 className="title">Profile</h1>
        <h2 className="subheading">
          Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales
          faucibus platea feugiat odio.
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
                    {organization?.subheading ? (
                      organization?.subheading
                    ) : (
                      <i className="text-crop-1 overflow-hidden">
                        Subheading not available
                      </i>
                    )}
                  </h2>
                  <div>
                    <span className="text-crop-1 overflow-hidden">
                      {organization?.organisationType ? (
                        <>
                          {organization?.organisationType}
                          <h3>•</h3>
                          <h3 className="text-crop-1 overflow-hidden">
                            {organization?.location}
                          </h3>
                        </>
                      ) : (
                        <i className="text-crop-1 overflow-hidden">
                          Organization type not available
                        </i>
                      )}
                    </span>
                  </div>
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
                  {organization?.webSiteUrl && (
                    <a href={organization?.webSiteUrl}>
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
            {!isUserAdmin && <button className="follow-btn">+ Follow</button>}
            <div className="lower-container">
              {/* {isUserAdmin && (
                <div className="edit">
                  <FiEdit2 />
                </div>
              )} */}
              <p className="heading">ABOUT US</p>
              {organization?.description && (
                <span
                  className={`content ${
                    viewMore ? "no-text-crop" : "text-crop-4"
                  } `}
                >
                  {organization?.description}
                </span>
              )}
              {!organization?.description && (
                <p className="no-description">
                  <i>Description not available</i>
                </p>
              )}
              {organization?.description && !viewMore && (
                <div onClick={() => setViewMore(true)} className="view-more">
                  View More
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="box recent-activities">
          <p className="heading">POSTS</p>
          <div className="carousel-container">
            {jobs.length !== 0 && (
              <div className="carousel-grid">
                {showAll1
                  ? jobs.map((jobDetail, index) => (
                      <ClubPostCard key={index} {...jobDetail} />
                    ))
                  : jobs
                      .slice(0, 3)
                      .map((jobDetail, index) => (
                        <ClubPostCard key={index} {...jobDetail} />
                      ))}
              </div>
            )}

            {!isActivityPresent && (
              <div className="no-jobs empty-container">
                {/* <MdAddCircle /> */}
                <p>{`No posts to show`}</p>
              </div>
            )}
          </div>
          {isActivityPresent && !showAll1 && (
            <div className="btn-container">
              <button
                onClick={() => setShowAll1(true)}
                className="all-jobs-btn"
              >
                Show all {activityChoice} <BsArrowRight />
              </button>
            </div>
          )}
        </section>
        <section className="box recent-activities">
          <p className="heading">CLUB MEMBERS</p>
          <div className="carousel-container">
            {/* <div className="carousel-grid">
              {showAll2
                ? jobs.map((jobDetail, index) => (
                    <ClubMemberCard
                      key={index}
                      {...jobDetail}
                      className="scroll-card no-hover-scale"
                    />
                  ))
                : jobs
                    .slice(0, 3)
                    .map((jobDetail, index) => (
                      <ClubMemberCard
                        key={index}
                        {...jobDetail}
                        className="scroll-card no-hover-scale"
                      /> 
                    ))}
            </div> */}

            {isActivityPresent && (
              <div className="no-jobs empty-container">
                {/* <MdAddCircle /> */}
                <p>{`No members to show`}</p>
              </div>
            )}
          </div>
          {isActivityPresent && !showAll2 && (
            <div className="btn-container">
              <button
                onClick={() => setShowAll2(true)}
                className="all-jobs-btn"
              >
                Show all {activityChoice} <BsArrowRight />
              </button>
            </div>
          )}
        </section>
        <section className="box recent-activities">
          <p className="heading">FEATURED EVENTS</p>
          <div className="carousel-container">
            <div className="carousel-grid">
              {showAll3
                ? featuredEvents.map((jobDetail, index) => (
                    <EventCard
                      key={index}
                      {...jobDetail}
                      className="scroll-card no-hover-scale"
                    />
                  ))
                : featuredEvents
                    .slice(0, 3)
                    .map((jobDetail, index) => (
                      <EventCard
                        key={index}
                        {...jobDetail}
                        className="scroll-card no-hover-scale"
                      />
                    ))}
            </div>

            {!isActivityPresent && (
              <div className="no-jobs empty-container">
                {/* <MdAddCircle /> */}
                <p>{`No events to show`}</p>
              </div>
            )}
          </div>
          {isActivityPresent && !showAll3 && (
            <div className="btn-container">
              <button
                onClick={() => setShowAll3(true)}
                className="all-jobs-btn"
              >
                Show all {activityChoice} <BsArrowRight />
              </button>
            </div>
          )}
        </section>
      </main>
      <Outlet />
    </>
  );
}
