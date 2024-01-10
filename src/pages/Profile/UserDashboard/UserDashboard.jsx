import React, { useState } from "react";
import "../Dashboard.css"; // !import this file first
import "../CompanyDashboard/CompanyDashboard.css";
import "./UserDashboard.css";
import moment from "moment";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { PiGlobeLight } from "react-icons/pi";
import { AiFillLinkedin, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BiLogoInstagramAlt } from "react-icons/bi";
import {
  BsArrowDown,
  BsArrowRight,
  BsArrowUp,
  BsChevronDown,
} from "react-icons/bs";
import { FaBuildingColumns } from "react-icons/fa6";
import defaultPoster from "../../../assets/defaultPoster";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BiCertification } from "react-icons/bi";
import { GrAchievement } from "react-icons/gr";
import { VscGithub } from "react-icons/vsc";
import { RxCross1 } from "react-icons/rx";
import { useEffect } from "react";
import CustomSnackbar from "../../User/Login/CustomSnackbar";
import {
  controller,
  getEventsByOrganisationId,
  getEventsByOrganisationIdPrivateMode,
  getInternshipsByOrganisationId,
  getInternshipsByOrganisationIdPrivateMode,
  getJobsByOrganisationId,
  getJobsByOrganisationIdPrivateMode,
  getProjectsByOrganisationId,
  getProjectsByOrganisationIdPrivateMode,
  getUserProfileById,
  patchResume,
} from "../../../services/APIConfig";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Bucket_URL } from "../../../services/APIUtils";
import {
  getUserId,
  getUserRole,
  isUserLoggedIn,
} from "../../../features/User/UserDetails";
import LoadingPage from "../../../components/Loader/LoadingPage";
import Page404 from "../../Maintenance/Page404";
import colorWheel from "../../../assets/colorWheel";
import { getAccessToken } from "../../../features/getCookieValues";
import { Cookie } from "@mui/icons-material";
import JobCards from "../../Company/Jobs/JobCards";
import InternshipCard from "../../Company/Internship/InternshipCard";
import HackathonCard from "../../Company/Events/EventsChoices/HackathonCards";
import ProjectCards from "../../Company/Projects/ProjectCards";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { userId } = useParams();
  // const [profile] = useOutletContext();
  const [resume, setResume] = useState(null);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [viewMore1, setViewMore1] = useState(false);
  const [viewMore2, setViewMore2] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const bucket = `${Bucket_URL}frontend/hosting/`;
  const [fetchResponse, setFetchResponse] = useState({});
  const [snackbarValues, setSnackbarValues] = useState({
    severity: "success",
    message: "",
  });
  const [resumeErrors, setResumeErrors] = useState({
    resume: "",
  });
  const [showEditOptions, setShowEditOptions] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isResumeUpdating, setIsResumeUpdating] = useState(false);
  const [isResumeUpdated, setIsResumeUpdated] = useState(false);
  const [resumeRes, setResumeRes] = useState(null);
  const [newResumeLink, setNewResumeLink] = useState("");
  const [response, setResponse] = useState(null);
  const [links, setLinks] = useState(true);
  const [activityChoice, setActivityChoice] = useState("jobs");
  const [isActivityPresent, setIsActivityPresent] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [activityLength, setActivityLength] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [projects, setProjects] = useState([]);
  const [scrollAmount, setScrollAmount] = useState(220);

  const scrollLeft = () => {
    const carousel = document.querySelector(".carousel");
    carousel.scrollLeft -= scrollAmount;
  };
  const scrollRight = () => {
    const carousel = document.querySelector(".carousel");
    carousel.scrollLeft += scrollAmount;
  };

  function handleEditOptions() {
    // let token=getAccessToken();
    // let decode =jwt_decode(token);
    // let id=decode._id;

    if (user._id === getUserId()) {
      setShowEditOptions(true);
    }
  }
  function fetchData() {
    getUserProfileById(setUser, userId, setFetchResponse);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();

    if (isUserLoggedIn() && userId === getUserId()) {
      setIsUserAdmin(true);
      getJobsByOrganisationIdPrivateMode(setJobs);
      getInternshipsByOrganisationIdPrivateMode(setInternships);
      getEventsByOrganisationIdPrivateMode(setHackathons);
      getProjectsByOrganisationIdPrivateMode(setProjects);
    } else {
      setIsUserAdmin(false);
      getJobsByOrganisationId(userId, setJobs);
      getInternshipsByOrganisationId(userId, setInternships);
      getEventsByOrganisationId(userId, setHackathons);
      getProjectsByOrganisationId(userId, setProjects);
    }
    setShowAll(false);
    setActivityChoice("jobs");
  }, [userId]);

  useEffect(() => {
    console.log(user);
    handleEditOptions();
  }, [user]);

  useEffect(() => {
    handleEditOptions();
  });
  const validateInputResume = () => {
    let valid = true;
    const newErrors = {
      resume: "",
    };
    if (resumeRes === undefined || resumeRes === null || resumeRes === "") {
      newErrors.resume = "Resume is required";
      valid = false;
    }
    setResumeErrors(newErrors);
    return valid;
  };

  useEffect(() => {
    if (!!resumeRes) {
      if (resumeRes.status >= 200 && resumeRes.status < 300) {
        setIsResumeUpdated(true);

        setNewResumeLink(resumeRes.data.data);
        setIsResumeUpdating(false);
        setOpen(true);
        setSnackbarValues({
          severity: "success",
          message: "Resume updated successfully!",
        });
      } else {
        setIsResumeUpdating(false);
        // alert(resumeRes.data.message);
      }
    }
  }, [resumeRes]);

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

  const handleResume = async () => {
    setIsResumeUpdating(true);
    if (validateInputResume() === true) {
      const file = new FormData();
      file.append("resume", resumeRes);
      patchResume(userId, file, setResumeRes);
    } else if (isResumeUpdating === true) {
      window.location.reload();
    } else {
      setIsResumeUpdating(false);
    }
  };

  const whatsappLinks = [
    { label: "DSA", link: "https://chat.whatsapp.com/GmcQ6ubbRIe0JLruQ0vnbI" },
    {
      label: "Python & ML",
      link: "https://chat.whatsapp.com/ByOOBlUdiSoEIh993OvESC",
    },
    {
      label: "UI/UX",
      link: "https://chat.whatsapp.com/FjAaqsdEvDE34OaPIWOsfd",
    },
    {
      label: "CyberSecurity",
      link: "https://chat.whatsapp.com/KREHrrtcpxT28CWnVR3z6z",
    },
    {
      label: "App Dev",
      link: "https://chat.whatsapp.com/HbIxq5KjWhZ8rwvHuPUh3X",
    },
    {
      label: "Web Dev",
      link: "https://chat.whatsapp.com/LhQw599u98NG4Dk4o2VU8w",
    },
    {
      label: "DevOps",
      link: "https://chat.whatsapp.com/DW312U3MP5EDXzXC0w31gH",
    },
  ];

  const userDashboardPage = (
    <main className="profile-dashboard profile-dashboard--adjustment">
      <h1 className="title">Profile</h1>
      {links && user?.role !== "Alumni" && isUserLoggedIn() && (
        <section
          style={{
            marginTop: "1rem",
            position: "relative",
          }}
          className="box whatsapp-links-container"
        >
          <button
            onClick={() => setLinks(false)}
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              borderRadius: "50%",
              backgroundColor: "white",
              aspectRatio: "1/1",
              fontSize: ".875rem",
              padding: "5px",
              display: "flex",
            }}
          >
            <RxCross1 />
          </button>
          <p style={{ marginBottom: "1.5rem" }} className="heading">
            Quick Links to join our whatsapp domains
          </p>
          <div
            style={{ gap: ".9rem", marginBottom: "1rem" }}
            className="links-container w-100 d-flex justify-content-center align-items-center flex-wrap"
          >
            {whatsappLinks.map((item, index) => (
              <div
                key={index}
                onClick={() => (window.location.href = item.link)}
                style={{
                  padding: ".5rem",
                  borderRadius: ".45rem",
                  width: "140px",
                  height: "48px",
                  border: "1px solid black",
                  fontSize: "1rem",
                  aspectRatio: "1/1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  cursor: "pointer",
                  backgroundColor: colorWheel[index % colorWheel.length],
                  color: "black",
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </section>
      )}
      <section
        style={{
          marginTop: !links ? "1rem" : "0rem",
        }}
        className="box user-container"
      >
        <div className="profile-image">
          {user?.image ? (
            <img src={user.image} alt="profile image" />
          ) : (
            <img src={defaultPoster} alt="default image" />
          )}
        </div>
        <div className="details upperDetails">
          <span className="username text-crop-1 overflow-hidden">
            {`${user?.userName ? `@${user.userName}` : "No username"}`}
          </span>
          <span className="name">{`${user.firstName} ${user.lastName}`}</span>
          <span className="address text-crop-2 overflow-hidden">
            {user?.educationDetails?.length > 0 ? (
              user?.educationDetails[user.educationDetails.length - 1]
                ?.collegeId?.collegeName
            ) : (
              <i style={{ color: "grey" }}>No campus details</i>
            )}
          </span>
          {isUserAdmin && (
            <span className="email text-crop-1 overflow-hidden">
              {user?.email}
            </span>
          )}
        </div>
        <div className="info">
          <div className="socials">
            {user?.socialMediaDetails?.linkedIn && (
              <a href={user?.socialMediaDetails?.linkedIn}>
                <AiFillLinkedin />
              </a>
            )}
            {user?.socialMediaDetails?.github && (
              <a href={user?.socialMediaDetails?.github}>
                <VscGithub />
              </a>
            )}
            {user?.socialMediaDetails?.instagram && (
              <a href={user?.socialMediaDetails?.instagram}>
                <BiLogoInstagramAlt />
              </a>
            )}
          </div>

          {showEditOptions && (
            <>
              {/* <p
    className="buttons"
      >
      Update Resume
      </p> */}
              <div className="profile-picture-container">
                <p className="text-danger mb-1">{resumeErrors.resume}</p>
                <input
                  type="file"
                  name="profile"
                  id="student-profile-image"
                  className="mb-4"
                  style={{ border: "none" }}
                  onChange={(e) => setResumeRes(e.target.files[0])}
                />
              </div>
              <div
                className="buttons"
                style={{
                  marginBottom: "10px",
                }}
              >
                <button className="button edit-btn" onClick={handleResume}>
                  {isResumeUpdating ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Update Resume"
                  )}
                </button>
                {/* <a
          href={!isResumeUpdated ? user.resume : newResumeLink}
          target="_blank"
        >
          <button
            className="logBtn me-3 logout-btn"
            style={{
              textAlign: "center",
            }}
            disabled={isResumeUpdating}
          >
            View Resume
          </button>
        </a> */}
              </div>

              {snackbarValues.severity === "success" && (
                <CustomSnackbar
                  setOpen={setOpen}
                  open={open}
                  message={snackbarValues.message}
                  severity={snackbarValues.severity}
                />
              )}
            </>
          )}
          {showEditOptions && (
            <div className="buttons">
              <button
                onClick={() => navigate("edit-profile")}
                className="button edit-btn"
              >
                Edit Profile
              </button>
              {/* <button className="button upload-btn">Upload Resume</button> */}
            </div>
          )}
        </div>
      </section>
      <div className="user-box">
        <div className="left-column column">
          <section className="box">
            <p className="heading">ABOUT ME</p>
            {user?.aboutMe && (
              <span
                className={`content ${true ? "no-text-crop" : "text-crop-4"} `}
              >
                {user?.aboutMe}
              </span>
            )}
            {!user?.aboutMe && (
              <p className="no-description">
                <i style={{ color: "grey" }}>Description not available</i>
              </p>
            )}
            {/* {user?.aboutUs && true && (
              <div onClick={() => {}} className="view-more">
                View More
              </div>
            )} */}
          </section>
          <section className="box">
            <p className="heading">EDUCATION</p>
            {user?.educationDetails?.length !== 0 ? (
              user.educationDetails?.map((education) => {
                return (
                  <div key={education._id} className="education">
                    <div className="image">
                      {education?.collegeId?.collegeLogo ? (
                        <img
                          src={education?.collegeId?.collegeLogo}
                          alt="logo"
                        />
                      ) : (
                        <FaBuildingColumns />
                      )}
                    </div>
                    <div className="details">
                      <span className="name text-crop-2 overflow-hidden">
                        {education?.collegeId?.collegeName}
                      </span>
                      <span className="course">{education?.degree}</span>
                      <span className="year">
                        {education?.startYear} - {education?.endYear}
                      </span>
                      <span className="grade">{`${
                        education?.marks ? `Grade: ${education?.marks}` : ""
                      }`}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <i style={{ color: "grey" }}>No education details</i>
            )}
          </section>
          {/* <section className="box">
            <p className="heading">MY SKILLS</p>
            <div className="chips-container">
              {user?.skillsDetails?.map((skill) => {
                return (
                  <div key={skill._id} className="skill">
                    {skill.skills}
                  </div>
                );
              })}
            </div>
          </section> */}
          {/* <section className="box">
            <p className="heading">MY INTERESTS</p>
            <div className="chips-container">
              <div className="interest">Reading</div>
              <div className="interest">Competitive Programming</div>
              <div className="interest">Swimming</div>
            </div>
          </section> */}
          <section className="box">
            <p className="heading">License and Certifications</p>
            {user?.licenceDetails?.length !== 0 ? (
              user?.licenceDetails
                ?.slice(0, viewMore2 ? user?.licenceDetails?.length : 2)
                .map((experience) => {
                  return (
                    <div key={experience._id} className="experience">
                      <div className="logo">
                        {experience?.logo ? (
                          <img src={experience?.logo} alt="" />
                        ) : (
                          <BiCertification />
                        )}
                      </div>
                      <div className="details">
                        <p className="title">{experience.certificationName}</p>
                        {/* <div className="company-name">
                          <span>{experience.organisationName}</span>
                          {experience?.jobType && (
                            <span>• {experience?.jobType}</span>
                          )}
                        </div> */}
                        <div className="time">
                          <span>
                            {moment(experience.issuedDate)
                              .utc()
                              .format("YYYY-MM-DD")}
                          </span>

                          {/*<span>• 2yrs and 3mos</span>*/}
                        </div>
                        <div className="description">
                          <span>{experience?.issuedBy}</span>

                          {/*<span>• 2yrs and 3mos</span>*/}
                        </div>
                        <div className="description">
                          <span>
                            <Link to={experience?.certificateUrl}>
                              {experience?.certificateUrl}
                            </Link>
                          </span>

                          {/*<span>• 2yrs and 3mos</span>*/}
                        </div>
                        {/* <span className="location">
                          {experience?.state}
                          {`${
                            experience?.country
                              ? `, ${experience?.country}`
                              : ""
                          }`}
                        </span> */}
                      </div>
                    </div>
                  );
                })
            ) : (
              <i style={{ color: "grey" }}>No past License or Certification</i>
            )}
            {user?.licenceDetails?.length > 2 && !viewMore2 && (
              <div className="view-more-container">
                <button
                  onClick={() => setViewMore2(true)}
                  className="view-more"
                >
                  View More <BsChevronDown />
                </button>
              </div>
            )}
          </section>
        </div>
        <div className="right-column column">
          {isUserAdmin && user?.role === "Alumni" ? (
            <>
              <section className="box">
                <p className="heading">EXPERIENCE</p>
                {user?.experienceDetails?.length !== 0 ? (
                  user?.experienceDetails
                    ?.slice(0, viewMore2 ? user?.experienceDetails?.length : 2)
                    .map((experience) => {
                      return (
                        <div key={experience._id} className="experience">
                          <div className="logo">
                            {experience?.logo ? (
                              <img src={experience?.logo} alt="" />
                            ) : (
                              <HiOutlineBuildingOffice2 />
                            )}
                          </div>
                          <div className="details">
                            <p className="title">{experience.designation}</p>
                            <div className="company-name">
                              <span>{experience.organisationName}</span>
                              {experience?.jobType && (
                                <span>• {experience?.jobType}</span>
                              )}
                            </div>
                            <div className="time">
                              <span>{experience?.startYear}</span>{" "}
                              {experience?.currentlyWorking && (
                                <span>- Present</span>
                              )}{" "}
                              {!experience?.currentlyWorking &&
                                experience?.endYear && (
                                  <span>- {experience?.endYear}</span>
                                )}{" "}
                              {/*<span>• 2yrs and 3mos</span>*/}
                            </div>
                            <span className="location">
                              {experience?.state}
                              {`${
                                experience?.country
                                  ? `, ${experience?.country}`
                                  : ""
                              }`}
                            </span>
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <i style={{ color: "grey" }}>No past experiences</i>
                )}
                {user?.experienceDetails?.length > 2 && !viewMore2 && (
                  <div className="view-more-container">
                    <button
                      onClick={() => setViewMore2(true)}
                      className="view-more"
                    >
                      View More <BsChevronDown />
                    </button>
                  </div>
                )}
              </section>
              <section className="box">
                <p className="heading">PROJECTS</p>
                {user?.projectDetails?.length !== 0 ? (
                  user?.projectDetails
                    ?.slice(0, viewMore1 ? user?.projectDetails?.length : 2)
                    .map((project) => {
                      return (
                        <div key={project._id} className="project">
                          <p className="title text-crop-2 overflow-hidden">
                            {project.projectTitle}
                          </p>
                          <span className="description text-crop-2 overflow-hidden">
                            {project.projectDescription}
                          </span>
                        </div>
                      );
                    })
                ) : (
                  <i style={{ color: "grey" }}>No project details</i>
                )}
                {user?.projectDetails?.length > 2 && !viewMore1 && (
                  <div className="view-more-container">
                    <button
                      onClick={() => setViewMore1(true)}
                      className="view-more"
                    >
                      View More <BsChevronDown />
                    </button>
                  </div>
                )}
              </section>
            </>
          ) : (
            <>
              <section className="box">
                <p className="heading">PROJECTS</p>
                {user?.projectDetails?.length !== 0 ? (
                  user?.projectDetails
                    ?.slice(0, viewMore1 ? user?.projectDetails?.length : 2)
                    .map((project) => {
                      return (
                        <div key={project._id} className="project">
                          <p className="title text-crop-2 overflow-hidden">
                            {project.projectTitle}
                          </p>
                          <span className="description text-crop-2 overflow-hidden">
                            {project.projectDescription}
                          </span>
                        </div>
                      );
                    })
                ) : (
                  <i style={{ color: "grey" }}>No project details</i>
                )}
                {user?.projectDetails?.length > 2 && !viewMore1 && (
                  <div className="view-more-container">
                    <button
                      onClick={() => setViewMore1(true)}
                      className="view-more"
                    >
                      View More <BsChevronDown />
                    </button>
                  </div>
                )}
              </section>
              <section className="box">
                <p className="heading">EXPERIENCE</p>
                {user?.experienceDetails?.length !== 0 ? (
                  user?.experienceDetails
                    ?.slice(0, viewMore2 ? user?.experienceDetails?.length : 2)
                    .map((experience) => {
                      return (
                        <div key={experience._id} className="experience">
                          <div className="logo">
                            {experience?.logo ? (
                              <img src={experience?.logo} alt="" />
                            ) : (
                              <HiOutlineBuildingOffice2 />
                            )}
                          </div>
                          <div className="details">
                            <p className="title">{experience.designation}</p>
                            <div className="company-name">
                              <span>{experience.organisationName}</span>
                              {experience?.jobType && (
                                <span>• {experience?.jobType}</span>
                              )}
                            </div>
                            <div className="time">
                              <span>{experience?.startYear}</span>{" "}
                              {experience?.currentlyWorking && (
                                <span>- Present</span>
                              )}{" "}
                              {!experience?.currentlyWorking &&
                                experience?.endYear && (
                                  <span>- {experience?.endYear}</span>
                                )}{" "}
                              {/*<span>• 2yrs and 3mos</span>*/}
                            </div>
                            <span className="location">
                              {experience?.state}
                              {`${
                                experience?.country
                                  ? `, ${experience?.country}`
                                  : ""
                              }`}
                            </span>
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <i style={{ color: "grey" }}>No past experiences</i>
                )}
                {user?.experienceDetails?.length > 2 && !viewMore2 && (
                  <div className="view-more-container">
                    <button
                      onClick={() => setViewMore2(true)}
                      className="view-more"
                    >
                      View More <BsChevronDown />
                    </button>
                  </div>
                )}
              </section>
            </>
          )}
          <section className="box">
            <p className="heading">Achievements</p>
            {user?.achievementDetails?.length !== 0 ? (
              user?.achievementDetails
                ?.slice(0, viewMore2 ? user?.achievementDetails?.length : 2)
                .map((experience) => {
                  return (
                    <div key={experience._id} className="experience">
                      <div className="logo">
                        {experience?.logo ? (
                          <img src={experience?.logo} alt="" />
                        ) : (
                          <GrAchievement />
                        )}
                      </div>
                      <div className="details">
                        <p className="title">{experience.achievementName}</p>
                        {/* <div className="company-name">
                          <span>{experience.organisationName}</span>
                          {experience?.jobType && (
                            <span>• {experience?.jobType}</span>
                          )}
                        </div> */}
                        <div className="time">
                          <span>
                            {moment(experience.achievementDate)
                              .utc()
                              .format("YYYY-MM-DD")}
                          </span>

                          {/*<span>• 2yrs and 3mos</span>*/}
                        </div>
                        <div className="description">
                          <span>{experience?.description}</span>

                          {/*<span>• 2yrs and 3mos</span>*/}
                        </div>
                        {/* <span className="location">
                          {experience?.state}
                          {`${
                            experience?.country
                              ? `, ${experience?.country}`
                              : ""
                          }`}
                        </span> */}
                      </div>
                    </div>
                  );
                })
            ) : (
              <i style={{ color: "grey" }}>No past Achievements</i>
            )}
            {user?.experienceDetails?.length > 2 && !viewMore2 && (
              <div className="view-more-container">
                <button
                  onClick={() => setViewMore2(true)}
                  className="view-more"
                >
                  View More <BsChevronDown />
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
      {user?.role === "Alumni" && (
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
                      filterName={user?.name}
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
                      filterName={user?.name}
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
                      filterName={user?.name}
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
                      filterName={user?.name}
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
      )}
      {showEditOptions && user?.role === "Alumni" && (
        <section className="box recruit-container">
          <p className="heading">MY ACTIVITIES</p>
          <div className="cards">
            <div
              onClick={() => {
                navigate("/host/event");
              }}
              style={{
                backgroundImage: `url(${bucket}hackathon.png)`,
              }}
              className="card"
            >
              <div className="heading">Hackathon</div>
              <div className="subheading">
                Create Hackathon <BsArrowRight />
              </div>
            </div>
            <div
              onClick={() => {
                navigate("/host/event");
              }}
              style={{
                backgroundImage: `url(${bucket}webinar.png)`,
              }}
              className="card"
            >
              <div className="heading">Webinar</div>
              <div className="subheading">
                Create Webinar <BsArrowRight />
              </div>
            </div>
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
            {/* </Link>
          <Link to="/host/event"> */}
            <div
              onClick={() => navigate("/host/internship")}
              style={{
                backgroundImage: `url(${bucket}internships.png)`,
              }}
              className="card"
            >
              <div className="heading">Internships</div>
              <div className="subheading">
                Create Internships <BsArrowRight />
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );

  return !!Object.keys(fetchResponse).length ? (
    fetchResponse?.status >= 200 && fetchResponse?.status <= 300 ? (
      userDashboardPage
    ) : (
      <Page404 />
    )
  ) : (
    <LoadingPage />
  );
}
