import "./IndividualJob.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { API_URL, Bucket_URL } from "../../../services/APIUtils";
import getCookie, { getAccessToken } from "../../../features/getCookieValues";
import Cookies from "js-cookie";
import axios from "axios";
import {
  controller,
  getHiringDataById,
  getUserProfileById,
} from "../../../services/APIConfig";
import LoadingPage from "../../../components/Loader/LoadingPage";
import Page404 from "../../Maintenance/Page404";
import JobApplyModal from "./JobApplyModal";
import CustomSnackbar from "../../User/Login/CustomSnackbar";
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
import { Link } from "react-router-dom";

export default function IndividualInternship() {
  const { hiringId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const bucket = `${Bucket_URL}frontend/company/jobs/`;
  const bucket2 = `${Bucket_URL}frontend/company/icons/`;
  const [hiring, setHiring] = useState({});
  const [hiringName, setHiringName] = useState([]);
  const [numberOfAlmas, setNumberOfAlmas] = useState([]);
  const [isApplicable, setIsApplicable] = useState(false);
  const [profile, setProfile] = useState({});
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const [isApplyingJob, setIsApplyingJob] = useState(false);
  const [snackbarValues, setSnackbarValues] = useState({
    severity: "error",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => setWidth(window.innerWidth);

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
      if (!!profile?.resume) {
        setIsResumeUploaded(true);
      } else {
        setIsResumeUploaded(false);
      }
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

  function handleModalState() {
    setIsApplyingJob(false);
  }

  function handleJobApplied() {
    setHiring((prev) => ({ ...prev, applied: true }));
    setSnackbarValues({
      severity: "success",
      message: `You have successfully applied to this job!`,
    });
    setOpen(true);
  }
  const UserDataPost = () => {
    if (!!hiring?.detailFound?.applyLink) {
      window.open(hiring?.detailFound?.applyLink, "_blank");
      return;
    }

    if (isApplicable && hiring?.applied === false && !isResumeUploaded) {
      window.alert("Please upload your resume first");
      window.location.href = `/profile/user/${getUserId()}/`;
      return;
    }

    const data = {
      hiringId,
    };
    axios
      .post(`${API_URL}api/v1/hiringRegistration`, data, {
        headers: {
          accesstoken: getAccessToken(),
        },
      })
      .then((res) => {
        setSnackbarValues({
          severity: "success",
          message: `You have successfully applied to this internship!`,
        });
        setOpen(true);
        if (
          res.status === 200 ||
          res.status === 201 ||
          res.status === 202 ||
          res.status === 203 ||
          res.status === 204
        ) {
          getHiringDataById(setHiring, hiringId);
        }
      })
      .catch((res) => {
        if (res.status === 409) {
          window.alert("already applied!");
        }
      });
  };

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
          setNumberOfAlmas(numberOfAlmas);
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
      <CustomSnackbar
        setOpen={setOpen}
        open={open}
        message={snackbarValues.message}
        severity={snackbarValues.severity}
        duration={5000}
      />
      {isApplyingJob && (
        <JobApplyModal
          change={handleModalState}
          jobApplied={handleJobApplied}
          resume={profile.resume}
        />
      )}
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
              <>
                {hiring?.detailFound?.isServiceOff === true ? (
                  <button
                    className="body-md-semibold hiring-apply-btn"
                    disabled
                  >
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
                      ) : (
                        <button
                          onClick={UserDataPost}
                          className="body-md-semibold hiring-apply-btn"
                        >
                          {!!hiring?.detailFound?.applyLink ? (
                            <>
                              Apply{" "}
                              <FiExternalLink
                                style={{ marginLeft: ".25rem" }}
                              />
                            </>
                          ) : (
                            `Easy Apply`
                          )}
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
                  <>
                    {hiring?.detailFound?._id ===
                      "65d0a7b2c58c23a4ac6b9f76" && (
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLSd39WuMG3eBnPoVmMLneBEhYBTU2Q3CCbNx5kQKmIIkINdTlQ/viewform">
                        <button className="body-md-semibold hiring-apply-btn">
                          Apply
                        </button>
                      </a>
                    )}
                    {hiring?.detailFound?._id !==
                      "65d0a7b2c58c23a4ac6b9f76" && (
                      // <Link to="/login">
                      <button
                        onClick={() => {
                          redirectToAuth("/login");
                        }}
                        className="body-md-semibold hiring-apply-btn"
                      >
                        {!!hiring?.detailFound?.applyLink ? (
                          <>
                            Apply{" "}
                            <FiExternalLink style={{ marginLeft: ".25rem" }} />
                          </>
                        ) : (
                          `Easy Apply`
                        )}
                      </button>
                      // </Link>
                    )}
                  </>
                )}
              </>
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
              <Link to={"https://topmate.io/engineerhub"} target="_blank">
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
          <div className="hiring-box">
            <h4 className="body-sm-semibold">More Information</h4>
            <div className="info-tiles-container">
              <div className="info-tiles">
                <h6>Stipend</h6>
                <div className="lower-container">
                  <span className="text-crop-2">
                    {
                      //check if featured array in hiring has CampusAmbassador then display "Bonus"
                      hiring?.detailFound?.featuredArray?.includes(
                        "CampusAmbassador"
                      )
                        ? "Bonus"
                        : hiring?.detailFound?.isPaid === "Paid"
                        ? hiring?.detailFound?.showSalary
                          ? !!hiring?.detailFound?.amount &&
                            hiring?.detailFound?.amount !== "N/A"
                            ? hiring?.detailFound?.amount
                            : hiring?.detailFound?.salaryType === "Fixed"
                            ? `${formatter.format(
                                hiring?.detailFound?.salaryAmount
                              )}`
                            : hiring?.detailFound.salaryType === "Range"
                            ? `${formatter.format(
                                hiring?.detailFound?.minRange
                              )} - ${formatter.format(
                                hiring?.detailFound?.maxRange
                              )}`
                            : "N/A"
                          : !!hiring?.detailFound?.amount &&
                            hiring?.detailFound?.amount !== "N/A"
                          ? hiring?.detailFound?.amount
                          : !!hiring?.detailFound?.salaryDisclosure
                          ? hiring?.detailFound?.salaryDisclosure
                          : "N/A"
                        : "Unpaid"
                    }
                  </span>
                  {moneyIcon}
                </div>
              </div>
              <div className="info-tiles">
                <h6>Duration</h6>
                <div className="lower-container">
                  <span className="text-crop-2">
                    {!!hiring?.detailFound?.duration
                      ? formattedDuration
                      : `${
                          hiring?.detailFound?.minDuration ===
                          hiring?.detailFound?.maxDuration
                            ? `${hiring?.detailFound?.minDuration} ${
                                hiring?.detailFound?.minDuration === 1
                                  ? "month"
                                  : "months"
                              }`
                            : `${hiring?.detailFound?.minDuration} - ${hiring?.detailFound?.maxDuration} months`
                        }`}
                  </span>
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
