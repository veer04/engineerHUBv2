import "./IndividualJobNew.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import { API_URL } from "../../../services/APIUtils";
import axios from "axios";
import AdsenseComp from "../../../components/AdsenseComp/AdsenseComp";
import {
  controller,
  getHiringDataById,
  getUserProfileById,
} from "../../../services/APIConfig";
import Page404 from "../../Maintenance/Page404";
import { redirectToAuth } from "../../../features/redirectToAuth";
import {
  calendarEndDateIcon,
  calendarStartDateIcon,
  cgpaIcon,
  experienceIcon,
  locationIcon,
  moneyIcon,
  numberOfOpeningsIcon,
  workTypeIcon,
} from "./icons";
import { FiExternalLink } from "react-icons/fi";
import {
  getUserId,
  getUserRole,
  isUserLoggedIn,
} from "../../../features/User/UserDetails";
import Loading from "../../../components/Loader/Loading";
import JobHiringModal, { modalState } from "./JobHiringModal";
import { Link } from "react-router-dom";
import { generateMetaTitle } from "../../../utils/generateMetaTitle";
import { generateMetaDescription } from "../../../utils/generateMetaDescription";

function seededRandom(seed) {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function IndividualJobNew() {
  const { hiringId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hiring, setHiring] = useState({});
  const [hiringName, setHiringName] = useState([]);
  const [numberOfAlmas, setNumberOfAlmas] = useState(0);
  const [error, setError] = useState(null);
  const [isApplicable, setIsApplicable] = useState(false);
  const [profile, setProfile] = useState({});
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => setWidth(window.innerWidth);
  const [userLatestInfo, setUserLatestInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isUserLoggedIn()) {
      getUserProfileById(setProfile, getUserId());
      setIsLoggedIn(true);
      const role = getUserRole();
      if (role !== "Organization" && role !== "Club" && role !== "Admin") {
        setIsApplicable(true);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`${API_URL}api/v1/getUserLatestInfo/${getUserId()}`)
        .then((res) => {
          setUserLatestInfo(res.data?.latestInfo);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("req cancel");
          } else {
            console.log("req performed");
          }
        });
    }
  }, [profile]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getHiringDataById(setHiring, hiringId);

    return () => {
      controller.abort();
    };
  }, [hiringId]);

  useEffect(() => {
    if (Object.keys(hiring).length !== 0 && hiring?.detailFound) {
      const metaTitle = generateMetaTitle({
        jobTitle: hiring.detailFound.opportunityName,
        companyName: hiring.detailFound.organisationName,
        location: hiring.detailFound.opportunityLocation,
        city: hiring.detailFound.city,
      });
      document.title = metaTitle;

      // Update meta title tag
      let metaTitleTag = document.querySelector('meta[name="title"]');
      if (!metaTitleTag) {
        metaTitleTag = document.createElement('meta');
        metaTitleTag.setAttribute('name', 'title');
        document.head.appendChild(metaTitleTag);
      }
      metaTitleTag.setAttribute('content', metaTitle);

      const metaDescription = generateMetaDescription({
        jobTitle: hiring.detailFound.opportunityName,
        companyName: hiring.detailFound.organisationName,
        location: hiring.detailFound.opportunityLocation,
        city: hiring.detailFound.city,
        shortDescription: hiring.detailFound.shortDescription,
      });
      
      // Update meta description tag
      let metaDescTag = document.querySelector('meta[name="description"]');
      if (!metaDescTag) {
        metaDescTag = document.createElement('meta');
        metaDescTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescTag);
      }
      metaDescTag.setAttribute('content', metaDescription);
    }
  }, [hiring]);

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });

  if (hiring?.success === false) return <Page404 />;

  const startDate = new Date(hiring?.detailFound?.applicationStartTime);
  let getStartDate = startDate
    .toLocaleTimeString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(/,/g, " /");
  const applicationStartDate = getStartDate.split("/")[0];

  const endDate = new Date(hiring?.detailFound?.applicationEndTime);
  let getEndDate = endDate
    .toLocaleTimeString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(/,/g, " /");
  const applicationEndDate = getEndDate.split("/")[0];

  const getHiringDetails = async () => {
    try {
      const response = await axios.get(
        `${API_URL}api/v1/hiring/${hiringId}/${getUserId()}`
      );

      if (response.status === 200) {
        const result = response.data;
        if (result.success) {
          const { organisationName, numberOfAlmas } = result.data.detailFound;
          setHiringName(organisationName);
          const seed = hiringId
            .split("")
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const randomAlmas = Math.floor(seededRandom(seed) * 10) + 1;
          setNumberOfAlmas(randomAlmas);
        } else {
          setError(result.message);
        }
      } else {
        setError("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching hiring details:", error);
    }
  };

  useEffect(() => {
    getHiringDetails();
  }, [hiringId]);

  const openModal = () => {
    if (modalState.setOpen) {
      modalState.setOpen(true);
    }
  };

  const closeModal = () => {
    if (modalState.setOpen) {
      modalState.setOpen(false);
    }
  };

  return (
    <section id="individual-job-container">
      <JobHiringModal
        latestInfo={userLatestInfo}
        hiringId={hiringId}
        setHiring={setHiring}
      />
      {Object.keys(hiring).length !== 0 ? (
        <>
          <div className="hiring-box">
            <div className="hiring-header">
              <div className="details">
                <img
                  className="hiring-logo"
                  src={hiring?.detailFound?.organisationLogo}
                  alt={`${hiring?.detailFound?.opportunityName} logo`}
                  loading="lazy"
                />
                <div className="info">
                  <h1 className="heading-sm">
                    {hiring?.detailFound?.opportunityName}{" "}
                  </h1>
                  <h2 className="body-md-regular">
                    <a
                      href={hiring?.detailFound?.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {hiring?.detailFound?.organisationName} <FiExternalLink />
                    </a>
                  </h2>
                  <h3 className="body-md-regular">
                    {hiring?.detailFound?.opportunityLocation}
                  </h3>
                </div>
              </div>
              <div className="views-section">
                <span className="views-capsule">
                  <BsEyeFill className="eye-icon" />
                  <span className="views-count">{hiring?.detailFound?.views || 0}</span>
                </span>
              </div>
            </div>
            <div className="hiring-tags">
              {hiring?.detailFound?.skillsRequired?.map((skill, index) => (
                <span key={index} className="hiring-tag label-sm">
                  #{skill}
                </span>
              ))}
            </div>
          </div>

            <div className="main-referral-container">
              <div className="left-cont">
                <div className="">
                  <h5 className="small-txt">
                    Struggling with getting shortlisted? We got you covered
                  </h5>
                  <h3 className="big-txt">
                    Need a referral in <span>{hiringName}?</span>
                  </h3>
                </div>
                <Link to={"/referrals"}>
                  <button className="referral-button">Get a referral</button>
                </Link>
              </div>

              <div className="features">
                <div className="feature">
                  <h5>#Feature 1</h5>
                  <p>
                    Get Referred from <span>{numberOfAlmas}</span> Almas through
                    engineerHUB's network
                  </p>
                </div>
                <div className="feature">
                  <h5>#Feature 2</h5>
                  <p>
                    No more "Shortlisting"! Get directly to the OAs or Interview
                    round.
                  </p>
                </div>
                <div className="feature">
                  <h5>#Feature 3</h5>
                  <p>100% Referral or Get your Money Back Guarantee</p>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center mb-3">
              <AdsenseComp adSlot="1960197314" />
            </div>
           {/* <div className="d-flex justify-content-center mb-3">
              <AdsenseComp adSlot="6898770594" />
            </div> */} 

            <div className="hiring-box pt-4">
              <div className="info-tiles-container">
                <div className="info-tiles">
                  <h6>Application Start Date</h6>
                  <div className="lower-container">
                    <span className="text-crop-2">{applicationStartDate}</span>
                    {calendarStartDateIcon}
                  </div>
                </div>
                <div className="info-tiles">
                  <h6>Application End Date</h6>
                  <div className="lower-container">
                    <span className="text-crop-2">{applicationEndDate}</span>
                    {calendarEndDateIcon}
                  </div>
                </div>
              </div>
            </div>

            <div className="hiring-box">
              <h4 className="body-sm-semibold">Job Description</h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: hiring?.detailFound?.description,
                }}
                className="hiring-styled-description"
              ></div>
            </div>

            <div className="d-flex justify-content-center mb-3">
              <AdsenseComp adSlot="1960197314" />
            </div>
            {/* <div className="d-flex justify-content-center mb-3">
              <AdsenseComp adSlot="6898770594" />
            </div> */}

            <div className="hiring-box">
              <h4 className="body-sm-semibold">More Information</h4>
              <div className="info-tiles-container">
                <div className="info-tiles">
                  <h6>Package</h6>
                  <div className="lower-container">
                    <span className="text-crop-2">
                      {hiring?.detailFound?.showSalary
                        ? !!hiring?.detailFound?.amount &&
                          hiring?.detailFound?.amount !== "N/A"
                          ? hiring?.detailFound?.amount
                          : hiring?.detailFound?.salaryType === "Fixed"
                          ? `${formatter.format(
                              hiring?.detailFound?.salaryAmount
                            )} ${hiring?.detailFound?.salaryUnit}`
                          : hiring?.detailFound.salaryType === "Range"
                          ? `${formatter.format(
                              hiring?.detailFound?.minRange
                            )} - ${hiring?.detailFound?.maxRange} ${
                              hiring?.detailFound?.salaryUnit
                            }`
                          : "N/A"
                        : !!hiring?.detailFound?.amount &&
                          hiring?.detailFound?.amount !== "N/A"
                        ? hiring?.detailFound?.amount
                        : !!hiring?.detailFound?.salaryDisclosure
                        ? hiring?.detailFound?.salaryDisclosure
                        : "N/A"}
                    </span>
                    {moneyIcon}
                  </div>
                </div>
                <div className="info-tiles">
                  <h6>Minimum Experience</h6>
                  <div className="lower-container">
                    {!!hiring?.detailFound?.experience ? (
                      <span className="text-crop-2">
                        {hiring?.detailFound?.experience !== "0"
                          ? hiring?.detailFound?.experience === "1"
                            ? `${hiring?.detailFound?.experience} year`
                            : `${hiring?.detailFound?.experience} years`
                          : `Fresher`}
                      </span>
                    ) : (
                      <span className="text-crop-2">
                        {hiring?.detailFound?.isForFreshers
                          ? "Fresher"
                          : `${
                              hiring?.detailFound?.minExperience ===
                              hiring?.detailFound?.maxExperience
                                ? `${hiring?.detailFound?.minExperience} ${
                                    hiring?.detailFound?.minExperience === 1
                                      ? "year"
                                      : "years"
                                  }`
                                : `${hiring?.detailFound?.minExperience} - ${
                                    hiring?.detailFound?.maxExperience === 1
                                      ? `${hiring?.detailFound?.maxExperience} year`
                                      : `${hiring?.detailFound?.maxExperience} years`
                                  }`
                            }`}
                      </span>
                    )}
                    {experienceIcon}
                  </div>
                </div>
                <div className="info-tiles">
                  <h6>Job Location</h6>
                  <div className="lower-container">
                    <span className="text-crop-2">
                      {hiring?.detailFound?.opportunityLocation === "WFH"
                        ? "Work From Home"
                        : hiring?.detailFound?.opportunityLocation === "Hybrid"
                        ? `Hybrid${
                            !!hiring?.detailFound?.city &&
                            hiring?.detailFound?.city !== "undefined"
                              ? ` - ${hiring?.detailFound?.city}`
                              : ""
                          }`
                        : hiring?.detailFound?.opportunityLocation === "On-Site"
                        ? !!hiring?.detailFound?.city &&
                          hiring?.detailFound?.city !== "undefined"
                          ? hiring?.detailFound?.city
                          : "On-Site"
                        : !!hiring?.detailFound?.opportunityLocation
                        ? hiring?.detailFound?.opportunityLocation
                        : "N/A"}
                    </span>
                    {locationIcon}
                  </div>
                </div>
                <div className="info-tiles">
                  <h6>Work Type</h6>
                  <div className="lower-container">
                    <span className="text-crop-2">
                      {hiring?.detailFound?.opportunityTiming
                        ? hiring?.detailFound?.opportunityTiming
                        : hiring?.detailFound?.opportunityMode}
                    </span>
                    {workTypeIcon}
                  </div>
                </div>
                {hiring?.detailFound?.openings && (
                  <div className="info-tiles">
                    <h6>Openings</h6>
                    <div className="lower-container">
                      <span className="text-crop-2">
                        {hiring?.detailFound?.openings}
                      </span>
                      {numberOfOpeningsIcon}
                    </div>
                  </div>
                )}
                {hiring?.detailFound?.eligibility && (
                  <div className="info-tiles">
                    <h6>Minimum CGPA</h6>
                    <div className="lower-container">
                      <span className="text-crop-2">
                        {hiring?.detailFound?.eligibility}
                      </span>
                      {cgpaIcon}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="hiring-button-container">
                {hiring?.detailFound?.isServiceOff === true ? (
                  <button 
                    className="body-md-semibold hiring-apply-btn w-100 expired"
                    disabled
                  >
                    Expired
                  </button>
                ) : isLoggedIn ? (
                  <>
                    {!isApplicable && (
                      <button 
                        className="body-md-semibold hiring-apply-btn w-100"
                        disabled
                      >
                        Not Applicable
                      </button>
                    )}
                    {isApplicable &&
                      hiring?.applied === false &&
                      (!!hiring?.detailFound?.contactEmail ? (
                        <a href={`mailto:${hiring?.detailFound?.contactEmail}?subject=${hiring?.detailFound?.contactEmailSubject}`} className="w-100">
                          <button 
                            className="body-md-semibold hiring-apply-btn w-100"
                          >
                            Apply
                          </button>
                        </a>
                      ) : !!hiring?.detailFound?.applyLink ? (
                        <a
                          href={hiring?.detailFound?.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-100"
                        >
                          <button 
                            className="body-md-semibold hiring-apply-btn w-100"
                          >
                            Apply <FiExternalLink style={{ marginLeft: ".25rem" }} />
                          </button>
                        </a>
                      ) : (
                        <button
                          onClick={openModal}
                          className="body-md-semibold hiring-apply-btn w-100"
                        >
                          Easy Apply
                        </button>
                      ))}
                    {hiring?.applied === true && (
                      <button 
                        className="body-md-semibold hiring-apply-btn w-100"
                        disabled
                      >
                        Applied
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => {
                      redirectToAuth("/login");
                    }}
                    className="body-md-semibold hiring-apply-btn w-100"
                  >
                    {!!hiring?.detailFound?.applyLink ? (
                      <>
                        Apply <FiExternalLink style={{ marginLeft: ".25rem" }} />
                      </>
                    ) : (
                      `Easy Apply`
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-center mb-3">
              <AdsenseComp adSlot="8096000870" />
            </div>
          </>
        ) : (
          <div
            style={{
              width: "100%",
              height: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading />
          </div>
        )}
      </section>
    );
  } 