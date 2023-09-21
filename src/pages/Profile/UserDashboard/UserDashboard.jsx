import React, { useState } from "react";
import "../Dashboard.css"; // !import this file first
import "../CompanyDashboard/CompanyDashboard.css";
import "./UserDashboard.css";
import { PiGlobeLight } from "react-icons/pi";
import { AiFillLinkedin } from "react-icons/ai";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { BsArrowDown, BsArrowRight, BsChevronDown } from "react-icons/bs";
import { FaBuildingColumns } from "react-icons/fa6";
import defaultPoster from "../../../assets/defaultPoster";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { VscGithub } from "react-icons/vsc";
import { useEffect } from "react";
import { controller, getUserProfileById } from "../../../services/APIConfig";
import { useNavigate, useParams } from "react-router-dom";
import { Bucket_URL } from "../../../services/APIUtils";
import { getUserRole } from "../../../features/User/UserDetails";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [viewMore1, setViewMore1] = useState(false);
  const [viewMore2, setViewMore2] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const bucket = `${Bucket_URL}frontend/hosting/`;

  useEffect(() => {
    getUserProfileById(setUser, userId);

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

  return (
    <main className="profile-dashboard">
      <h1 className="title">Profile</h1>
      <h2 className="subheading">
        {/* Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus
        platea feugiat odio. */}
      </h2>
      <section
        style={{
          marginTop: "3.25rem",
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
            {user?.educationDetails?.length > 0
              ? user?.educationDetails[user.educationDetails.length - 1]
                  ?.collegeId?.collegeName
              : "No address"}
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
                <i>Description not available</i>
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
              <i>No education details</i>
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
        </div>
        <div className="right-column column">
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
              <i>No project details</i>
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
                            <span>- Current</span>
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
              <i>No past experiences</i>
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
      {isUserAdmin && getUserRole() === "Alumni" && (
        <section className="box recruit-container">
          <p className="heading">MY ACTIVITIES</p>
          <div className="cards">
            <div
              onClick={() => navigate("/hostevent")}
              style={{
                backgroundImage: `url(${bucket}hackathon.png)`,
              }}
              className="card"
            >
              <div className="heading">Hackathon</div>
              <div className="subheading">
                Create Event <BsArrowRight />
              </div>
            </div>
            <div
              onClick={() => navigate("/hostevent")}
              style={{
                backgroundImage: `url(${bucket}webinar.png)`,
              }}
              className="card"
            >
              <div className="heading">Webinar</div>
              <div className="subheading">
                Create Event <BsArrowRight />
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
