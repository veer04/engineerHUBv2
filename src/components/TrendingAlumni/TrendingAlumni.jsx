import React from "react";
import "./TrendingAlumni.css";
import "../../pages/Profile/UserDashboard/UserDashboard.css";
import "../../pages/Profile/Dashboard.css";
import "../../pages/Profile/CompanyDashboard/CompanyDashboard.css";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import defaultPoster from "../../assets/defaultPoster";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Fragment, useEffect, useState, useLayoutEffect } from "react";
import { Bucket_URL } from "../../services/APIUtils";
import "../../../src/pages/Campus/TrendingColleges.css";
import { BsArrowRight, BsArrowUp } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiFillLinkedin } from "react-icons/ai";
import { PiGlobeLight } from "react-icons/pi";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import{BiCertification} from "react-icons/bi";
import {GrAchievement} from "react-icons/gr";
import { VscGithub } from "react-icons/vsc";
import "../../components/TrendingList/TrendingList.css";

import CampusSearchBox from "../CampusSearchBox/CampusSearchBox";
import {
  getAlumniProfileById,
  getAlumniById,
  getTrendingAlumni,
  getUserProfileById,
  getTrendingAlumni2,
} from "../../services/APIConfig";
import { FaArrowTrendUp } from "react-icons/fa6";
import AlumniList from "../TrendingList/AlumniList";
import Page404 from "../../pages/Maintenance/Page404";
import LoadingPage from "../Loader/LoadingPage";
import default_profile_icon from "../../pages/Profile/ClubDashboard/default_profile_icon.png";
import { isUserLoggedIn, getUserId } from "../../features/User/UserDetails";
import TrendingListAlumni from "../TrendingList/TrendingListAlumni";
const TrendingAlumni = () => {
  const { almaId } = useParams();
  const {userId}=useParams();
  const navigate = useNavigate();
  const bucket = `${Bucket_URL}frontend/hosting/`;
  const [width, setWidth] = useState(window.innerWidth);
  const [trendingList, setTrendingList] = useState([]);

  const [alumniData, setAlumniData] = useState({});
  const [alumni, setAlumni] = useState({});
  const [allAlumni, setAllAlumni] = useState([]);
  const [isUserAdmin, setIsUserAdmin] = useState(true);
  const [viewMore1, setViewMore1] = useState(false);
  const [showAll1, setShowAll1] = useState(false);
  const [viewMore2, setViewMore2] = useState(false);
  const [showAll2, setShowAll2] = useState(false);
  const [showAll3, setShowAll3] = useState(false);
  const [output, setOutput] = useState("");
  const [fetchResponse, setFetchResponse] = useState({});
  const bucket2 = `${Bucket_URL}frontend/profile/dashboard/`;
  function fetchData() {
    getUserProfileById(setAlumniData,almaId, setFetchResponse);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    getTrendingAlumni2(setTrendingList);
    fetchData();
    // getAlumniById(setAlumni, almaId);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      //   setAlumni({});
      window.removeEventListener("resize", handleResize);
    };
  }, [almaId]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isUserLoggedIn() && almaId === getUserId()) {
      setIsUserAdmin(true);
    } else {
      setIsUserAdmin(false);
    }
  }, [almaId]);

  useEffect(() => {
    if (output) {
      navigate(`/alma/search/${output}`);
    }
  }, [output]);

  useEffect(() => {
    if (Object.keys(alumniData).length !== 0) {
      document.title = `${alumniData?.firstName} ${alumniData?.lastName} | Alumni | engineerHUB`;
      setAlumni(alumniData?.data?.data);
    }
  }, [alumniData]);
 
  const renderTrendingAlumni = (
    <>
      <main className="trending-Colleges trending-alumni "
       style={{overflowX:"hidden"}}>
      <div className="search-bar__container" style={{display:"flex", justifyContent:"center", paddingBottom:"2%",}} >
        <div style={{justifyContent:"center",
    alignItems:"center"}}>
          <CampusSearchBox
            data={trendingList}
            style={{margin:"auto",}}
            placeholder="You are looking for which Alumni?"
            searchParams={["alumniName"]}
            listLength={4}
            setOutput={setOutput}
          />
        </div>
      </div>
      
      <div className="content-container row">
        <aside id="column-1" className="column column-1 col-lg-3" style={{marginLeft:"2%"}}>
          <div className="list-heading">
            <div>
              {/* <FaArrowTrendUp /> Trending Alumni */}
            </div>
          </div>
          <div className="cards">
            <div className="card">
            <TrendingListAlumni expanded/>
          </div>
          </div>
        </aside>
        <div id="column-2" className="column column-2 col-lg-8">
      <section className="intro">
      {/* <h1 className="title">Profile</h1> */}
      <div className="profile-dashboard " >
      <section
        
        className="box user-container"
      >
        <div className="profile-image">
          {alumniData?.image ? (
            <img src={alumniData.image} alt="profile image" />
          ) : (
            <img src={defaultPoster} alt="default image" />
          )}
        </div>
        <div className="details">
          <span className="username text-crop-1 overflow-hidden">
            {`${alumniData?.userName ? `@${alumniData?.userName}` : "No username"}`}
          </span>
          <span className="name">{`${alumniData?.firstName} ${alumniData?.lastName}`}</span>
          <span className="address text-crop-2 overflow-hidden">
            {alumniData?.educationDetails?.length > 0 ? (
              alumniData?.educationDetails[alumniData?.educationDetails.length - 1]
                ?.collegeId?.collegeName
            ) : (
              <i>No campus details</i>
            )}
          </span>
          {isUserAdmin && (
            <span className="email text-crop-1 overflow-hidden">
              {alumniData?.email}
            </span>
          )}
        </div>
        <div className="info">
          <div className="socials">
            {alumniData?.socialMediaDetails?.linkedIn && (
              <a href={alumniData?.socialMediaDetails?.linkedIn}>
                <AiFillLinkedin />
              </a>
            )}
            {alumniData?.socialMediaDetails?.github && (
              <a href={alumniData?.socialMediaDetails?.github}>
                <VscGithub />
              </a>
            )}
            {alumniData?.socialMediaDetails?.instagram && (
              <a href={alumniData?.socialMediaDetails?.instagram}>
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
      {/* <div className="profile-picture-container">
        <p className="text-danger mb-1">{resumeErrors.resume}</p>
        <input
          type="file"
          name="profile"
          id="student-profile-image"
          className="mb-4"
          style={{border:"none"}}
          onChange={(e) => setResumeRes(e.target.files[0])}
        />
      </div> */}
      {/* <div className="buttons" style={{
        marginBottom:"10px"
      }}> */}
        {/* <button
          className="button edit-btn"
          
          onClick={handleResume}
        >
          {isResumeUpdating ? (
            <div className="spinner-border text-primary"    role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Update Resume"
          )}
        </button> */}
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
      {/* </div> */}

      {/* {snackbarValues.severity === "success" && (
        <CustomSnackbar
          setOpen={setOpen}
          open={open}
          message={snackbarValues.message}
          severity={snackbarValues.severity}
        />
      )} */}
            </>
          )}
          {isUserAdmin && (
            <div className="buttons">
              {/* <button
                onClick={() => navigate("edit-profile")}
                className="button edit-btn"
              >
                Edit Profile
              </button> */}
              {/* <button className="button upload-btn">Upload Resume</button> */}
            </div>
          )}
        </div>
      </section>
      <div className="user-box">
        <div className="left-column column">
          <section className="box">
            <p className="heading">ABOUT ME</p>
            {alumniData?.aboutMe && (
              <span
                className={`content ${true ? "no-text-crop" : "text-crop-4"} `}
              >
                {alumniData?.aboutMe}
              </span>
            )}
            {!alumniData?.aboutMe && (
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
            {alumniData?.educationDetails?.length !== 0 ? (
              alumniData.educationDetails?.map((education) => {
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
              <small style={{opacity:"0.4"}}>No education details</small>
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
            {alumniData?.licenceDetails?.length !== 0 ? (
              alumniData?.licenceDetails
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
                          <span>{moment(experience.issuedDate).utc().format("YYYY-MM-DD")}</span>
                       
                          {/*<span>• 2yrs and 3mos</span>*/}
                        </div>
                        <div className="description">
                          <span>{experience?.issuedBy}</span>
                       
                          {/*<span>• 2yrs and 3mos</span>*/}
                        </div>
                        <div className="description">
                          <span><Link to={experience?.certificateUrl}>{experience?.certificateUrl}</Link></span>
                       
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
              <small style={{opacity:"0.4"}}>No past Liscence or Certification</small>
            )}
            {alumniData?.licenceDetails?.length > 2 && !viewMore2 && (
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
          {
            isUserAdmin && alumniData?.role==="Alumni" ?(
              <>
                 <section className="box">
            <p className="heading">EXPERIENCE</p>
            {alumniData?.experienceDetails?.length !== 0 ? (
              alumniData?.experienceDetails
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
              <small style={{opacity:"0.4"}}>No past experiences</small>
            )}
            {alumniData?.experienceDetails?.length > 2 && !viewMore2 && (
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
            {alumniData?.projectDetails?.length !== 0 ? (
              alumniData?.projectDetails
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
              <small style={{opacity:"0.4"}}>No project details</small>
            )}
            {alumniData?.projectDetails?.length > 2 && !viewMore1 && (
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
            ):
            (<>
                      <section className="box">
            <p className="heading">PROJECTS</p>
            {alumniData?.projectDetails?.length !== 0 ? (
              alumniData?.projectDetails
                ?.slice(0, viewMore1 ? alumniData?.projectDetails?.length : 2)
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
              <small style={{opacity:"0.4"}}>No project details</small>
            )}
            {alumniData?.projectDetails?.length > 2 && !viewMore1 && (
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
            {alumniData?.experienceDetails?.length !== 0 ? (
              alumniData?.experienceDetails
                ?.slice(0, viewMore2 ? alumniData?.experienceDetails?.length : 2)
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
              <small style={{opacity:"0.4"}}>No past experiences</small>
            )}
            {alumniData?.experienceDetails?.length > 2 && !viewMore2 && (
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
              </>)
          }
          <section className="box">
            <p className="heading">Achivements</p>
            {alumniData?.achievementDetails?.length !== 0 ? (
              alumniData?.achievementDetails
                ?.slice(0, viewMore2 ? alumniData?.achievementDetails?.length : 2)
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
                          <span>{moment(experience.achievementDate).utc().format('YYYY-MM-DD')}</span>
                       
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
              <small style={{opacity:"0.4"}}>No past Achievements</small>
            )}
            {alumniData?.experienceDetails?.length > 2 && !viewMore2 && (
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
    
    </div>
        {/* <section className="more-details">
            <AlumniList />
            </section> */}
        
      </section>
      </div>
      </div>
 
    </main>
    </>

  
  );


  return !!Object.keys(trendingList).length ? (
    trendingList?.status >= 200 && trendingList?.status <= 300 ? (
      renderTrendingAlumni
    ) : (
      renderTrendingAlumni
      
    )
  ) : (
    <LoadingPage />
  );
};

export default TrendingAlumni;
