import "./IndividualJob.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { API_URL, Bucket_URL } from "../../../services/APIUtils";
import axios from "axios";
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
import JobHiringModal from "./JobHiringModal";
import { Link } from "react-router-dom";

function seededRandom(seed) {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function IndividualJob() {
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
    if (Object.keys(hiring).length !== 0) {
      document.title = `${hiring?.detailFound?.opportunityName} | ${hiring?.detailFound?.organisationName} | engineerHUB`;
    }
    setTimeout(() => {
      if (
        !!document.getElementById("jobs-container") &&
        !!document.getElementById("individual-job-container")
      )
        document.getElementById("jobs-container").style.height = `${
          document.getElementById("individual-job-container").offsetHeight -
          98.4
        }px`;
    }, 100);
  }, [hiring]);

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
  let formattedSalary = formatter.format(hiring?.detailFound?.amount);
  formattedSalary.includes("NaN") ? (formattedSalary = "N/A") : formattedSalary;

  //using Intl formatter, check if the duration is 1 month or more than 1 month
  //if it is 1 month, then display "1 month" else display "2 months"
  let formattedDuration = new Intl.PluralRules("en-IN", {
    type: "ordinal",
  }).select(hiring?.detailFound?.duration);

  formattedDuration === "one"
    ? (formattedDuration = "1 Month")
    : (formattedDuration = `${hiring?.detailFound?.duration} Months`);

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

      const result = response.data;
      console.log(result, "hiringDetails");
    } catch (error) {
      console.error("Error fetching hiring details:", error);
    }
  };
  console.log(hiringName, "hiringName");

  useEffect(() => {
    getHiringDetails();
  }, [hiringId]);

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
            </div>
            <div className="hiring-tags">
              {hiring?.detailFound?.skillsRequired?.map((skill, index) => (
                <span key={index} className="hiring-tag label-sm">
                  #{skill}
                </span>
              ))}
            </div>
          </div>
          {/* <div
            onClick={() => {
              window.open(
                width <= 520
                  ? `${`${Bucket_URL}frontend/company/promotion/pankaj-kalra-mobile.png`}`
                  : `${`${Bucket_URL}frontend/company/promotion/pankaj-kalra-desktop.png`}`,
                "_blank"
              );
            }}
            style={{
              backgroundImage:
                width <= 520
                  ? `url(${`${Bucket_URL}frontend/company/promotion/pankaj-kalra-mobile.png`})`
                  : `url(${`${Bucket_URL}frontend/company/promotion/pankaj-kalra-desktop.png`})`,
              aspectRatio: width <= 520 ? "900/1146" : "2100/864",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "10px",
              position: "relative",
              cursor: "pointer",
              marginBottom: ".5rem",
              boxShadow: "0px 4px 4px rgba(198, 198, 198, 0.25)",
            }}
          >
            <button
              onClick={(e) => {
                window.open(`https://bit.ly/45bFpz6`, "_blank");
              }}
              className="promotion-btn"
            >
              {width > 650 ? "Register" : <FaExternalLinkAlt />}
            </button>
          </div> */}

          {/* //first task 11/07/2024 saif */}
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
          <div style={{ margin: "1rem 0" }}>
            <amp-ad
              width="100vw"
              height="320"
              type="adsense"
              data-ad-client="ca-pub-8474972598474156"
              data-ad-slot="2309720790"
              data-auto-format="rspv"
              data-full-width=""
            >
              <div overflow=""></div>
            </amp-ad>
          </div>
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
                      {hiring?.detailFound?.eligibility
                        ? hiring?.detailFound?.eligibility
                        : hiring?.detailFound?.eligibility}
                    </span>
                    {cgpaIcon}
                  </div>
                </div>
              )}
            </div>
          </div>

          <>
            {hiring?.detailFound?.isServiceOff === true ? (
              <button className="body-md-semibold hiring-apply-btn" disabled>
                Expired
              </button>
            ) : isLoggedIn ? (
              <>
                {!isApplicable && (
                  <button
                    className="body-md-semibold hiring-apply-btn"
                    disabled
                  >
                    Not Applicable
                  </button>
                )}
                {isApplicable &&
                  hiring?.applied === false &&
                  (!!hiring?.detailFound?.contactEmail ? (
                    <a
                      href={`mailto:${hiring?.detailFound?.contactEmail}?subject=${hiring?.detailFound?.contactEmailSubject}`}
                    >
                      <button className="body-md-semibold hiring-apply-btn">
                        Apply
                      </button>
                    </a>
                  ) : !!hiring?.detailFound?.applyLink ? (
                    <a
                      href={hiring?.detailFound?.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="body-md-semibold hiring-apply-btn">
                        Apply{" "}
                        <FiExternalLink style={{ marginLeft: ".25rem" }} />
                      </button>
                    </a>
                  ) : (
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#jobHiringModal"
                      className="body-md-semibold hiring-apply-btn"
                    >
                      Easy Apply
                    </button>
                  ))}
                {hiring?.applied === true && (
                  <button
                    className="body-md-semibold hiring-apply-btn"
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
                className="body-md-semibold hiring-apply-btn"
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
          </>
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
