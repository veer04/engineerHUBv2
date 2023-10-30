import React, { useState } from "react";
import "../Dashboard.css"; // !import this file first
import "../CompanyDashboard/CompanyDashboard.css";
import "./UserDashboard.css";
import moment from "moment";
import { PiGlobeLight } from "react-icons/pi";
import { AiFillLinkedin } from "react-icons/ai";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { BsArrowDown, BsArrowRight, BsChevronDown } from "react-icons/bs";
import { FaBuildingColumns } from "react-icons/fa6";
import defaultPoster from "../../../assets/defaultPoster";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BiCertification } from "react-icons/bi";
import { GrAchievement } from "react-icons/gr";
import { VscGithub } from "react-icons/vsc";
import { useEffect } from "react";
import CustomSnackbar from "../../User/Login/CustomSnackbar";
import {
  controller,
  getUserProfileById,
  patchResume,
} from "../../../services/APIConfig";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Bucket_URL } from "../../../services/APIUtils";
import { getUserRole } from "../../../features/User/UserDetails";
import LoadingPage from "../../../components/Loader/LoadingPage";
import Page404 from "../../Maintenance/Page404";

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

  const [isUpdating, setIsUpdating] = useState(false);
  const [isResumeUpdating, setIsResumeUpdating] = useState(false);
  const [isResumeUpdated, setIsResumeUpdated] = useState(false);
  const [resumeRes, setResumeRes] = useState(null);
  const [newResumeLink, setNewResumeLink] = useState("");
  const [response, setResponse] = useState(null);
  function fetchData() {
    getUserProfileById(setUser, userId, setFetchResponse);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();

    return () => {
      controller.abort();
    };
  }, [userId]);

  useEffect(() => {
    console.log(user);
    if (user?._id === userId) {
      setIsUserAdmin(true);
    } else {
      setIsUserAdmin(false);
    }
  }, [user]);
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

  const userDashboardPage = (
    <main className="profile-dashboard">
      <h1 className="title">Profile</h1>
      <h2 className="subheading">
        {/* Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus
        platea feugiat odio. */}
      </h2>
      <section
        style={{
          marginTop: "1rem",
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
        <div className="details">
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
          {isUserAdmin && (
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
          {isUserAdmin && (
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
            <p className="heading">Liscence and Certifications</p>
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
              <i style={{ color: "grey" }}>No past Liscence or Certification</i>
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
            <p className="heading">Achivements</p>
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
      {isUserAdmin && user?.role === "Alumni" && (
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
