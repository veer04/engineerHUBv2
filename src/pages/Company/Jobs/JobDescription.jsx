import React, { useEffect } from "react";
import "./JobDescription.css";
import { Chip } from "@mui/material";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { API_URL, Bucket_URL } from "../../../services/APIUtils";
import { Link } from "react-router-dom";
import { useState } from "react";
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
const JobDescription = () => {
  const { hiringId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const bucket = `${Bucket_URL}frontend/company/jobs/`;
  const bucket2 = `${Bucket_URL}frontend/company/icons/`;
  const [hiring, setHiring] = useState({});
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
    if (getCookie("name")) {
      getUserProfileById(setProfile, getCookie("_id")[2]);
      setIsLoggedIn(true);
      if (
        Cookies.get("role") !== "Organization" &&
        Cookies.get("role") !== "Club" &&
        Cookies.get("role") !== "Admin"
      ) {
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
      setHiring({});
      controller.abort();
    };
  }, [hiringId]);
  useEffect(() => {
    if (Object.keys(hiring).length !== 0) {
      document.title = `${hiring?.detailFound?.opportunityName} | ${hiring?.detailFound?.organisationName} | engineerHUB`;
    }
  }, [hiring]);

  function handleModalState() {
    setIsApplyingJob(false);
  }

  function handleJobApplied(data) {
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

    if (isApplicable) {
      setIsApplyingJob(true);
      // window.location.href = `/profile/user/${getUserId()}`;
      return;
    }

    const data = {
      hiringId,
    };
    axios
      .post(`${API_URL}api/v1/hiringRegistration`, data, {
        headers: {
          accessToken: getAccessToken(),
        },
      })
      .then((res) => {
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

  const JobDescription = (
    <div className="JobDescription">
      {snackbarValues.severity === "success" && (
        <CustomSnackbar
          setOpen={setOpen}
          open={open}
          message={snackbarValues.message}
          severity={snackbarValues.severity}
          duration={5000}
        />
      )}
      {isApplyingJob && (
        <JobApplyModal
          change={handleModalState}
          jobApplied={handleJobApplied}
          resume={profile.resume}
        />
      )}
      <div className="JobDetailHeader">
        <span>
          <div className="w-100 d-flex">
            <a
              href={hiring?.detailFound?.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                style={{
                  backgroundImage: `url(${hiring?.detailFound?.organisationLogo})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
                className="imgBox"
              ></div>
            </a>
            <span className="heads">
              <h1>{hiring?.detailFound?.opportunityName}</h1>
              <a
                href={hiring?.detailFound?.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseOver={(e) => {
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                {hiring?.detailFound?.organisationName}
              </a>
              <h3>{hiring?.detailFound?.opportunityLocation}</h3>
            </span>
          </div>
          <div className="apply-btn-container">
            {hiring?.detailFound?.isServiceOff === true ? (
              <button className="btn" disabled>
                Expired
              </button>
            ) : isLoggedIn ? (
              <div>
                {!isApplicable && (
                  <button className="btn" disabled>
                    Not Applicable
                  </button>
                )}
                {isApplicable &&
                  hiring?.applied === false &&
                  (!!hiring?.detailFound?.contactEmail ? (
                    <a
                      href={`mailto:${hiring?.detailFound?.contactEmail}?subject=${hiring?.detailFound?.contactEmailSubject}`}
                    >
                      <button className="btn">Apply</button>
                    </a>
                  ) : (
                    <button onClick={UserDataPost} className="btn">
                      {!!hiring?.detailFound?.applyLink
                        ? "Apply"
                        : `Easy Apply`}
                    </button>
                  ))}
                {/* {isApplicable &&
                  hiring?.applied === false &&
                  !isResumeUploaded && (
                    <button onClick={UserDataPost} className="btn">
                      Apply
                    </button>
                  )} */}
                {hiring?.applied === true && (
                  <button className="btn" disabled>
                    Applied
                  </button>
                )}
              </div>
            ) : (
              // <Link to="/login">
              <div
                onClick={() => {
                  redirectToAuth("/login");
                }}
                className="btn"
              >
                Apply
              </div>
              // </Link>
            )}
          </div>
        </span>
        <span className="Tags">
          {hiring?.detailFound?.skillsRequired?.map((skillsRequired, index) => (
            <Chip
              key={index}
              variant="outlined"
              size="small"
              label={`#${skillsRequired}`}
              style={{
                fontWeight: "500",
                fontSize: "10px",
                marginRight: "15px",
                marginBottom: "5px",
              }}
            />
          ))}
        </span>
      </div>
      <div
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
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation;
            window.open(`https://bit.ly/45bFpz6`, "_blank");
          }}
          className="promotion-btn"
        >
          {width > 650 ? "Register" : <FaExternalLinkAlt />}
        </button>
      </div>
      <div className="JobInfo">
        <div className="JobInfoItems JobInfoItems-date">
          <div className="JobInfoItem">
            <h6>Application Start Date</h6>
            <span>{applicationStartDate}</span>
            {calendarStartDateIcon}
          </div>
          <div className="JobInfoItem">
            <h6>Application End Date</h6>
            <span>{applicationEndDate}</span>
            {calendarEndDateIcon}
          </div>
        </div>
      </div>
      <div className="JobDesc">
        <h5>Job Description</h5>
        <p id="quill-job-description"></p>
      </div>
      <div className="JobInfo">
        <h5>More Information</h5>
        <div className="JobInfoItems">
          <div className="JobInfoItem">
            <h6>Package</h6>
            <span>
              {hiring?.detailFound?.showSalary
                ? !!hiring?.detailFound?.amount &&
                  hiring?.detailFound?.amount !== "N/A"
                  ? hiring?.detailFound?.amount
                  : hiring?.detailFound?.salaryType === "Fixed"
                  ? `${formatter.format(hiring?.detailFound?.salaryAmount)} ${
                      hiring?.detailFound?.salaryUnit
                    }`
                  : hiring?.detailFound.salaryType === "Range"
                  ? `${formatter.format(
                      hiring?.detailFound?.minRange
                    )} - ${formatter.format(hiring?.detailFound?.maxRange)} ${
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
          <div className="JobInfoItem">
            <h6>Minimum Experience</h6>
            {!!hiring?.detailFound?.experience ? (
              <span>
                {hiring?.detailFound?.experience !== "0"
                  ? hiring?.detailFound?.experience === "1"
                    ? `${hiring?.detailFound?.experience} year`
                    : `${hiring?.detailFound?.experience} years`
                  : `Fresher`}
              </span>
            ) : (
              <span>
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
          <div className="JobInfoItem">
            <h6>Job Location</h6>
            <span>
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
          <div className="JobInfoItem">
            <h6>Work type</h6>
            <span>
              {hiring?.detailFound?.opportunityTiming
                ? hiring?.detailFound?.opportunityTiming
                : hiring?.detailFound?.opportunityMode}
            </span>
            {workTypeIcon}
          </div>
          {hiring?.detailFound?.openings && (
            <div className="JobInfoItem">
              <h6>Openings</h6>
              <span>{hiring?.detailFound?.openings}</span>
              {numberOfOpeningsIcon}
            </div>
          )}
          {hiring?.detailFound?.eligibility && (
            <div className="JobInfoItem">
              <h6>Minimum CGPA</h6>
              <span>
                {hiring?.detailFound?.eligibility
                  ? hiring?.detailFound?.eligibility
                  : hiring?.detailFound?.eligibility}
              </span>
              {cgpaIcon}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (Object.keys(hiring).length !== 0) {
      document.getElementById("quill-job-description").innerHTML =
        hiring?.detailFound?.description;
    }
  }, [hiring]);

  return Object.keys(hiring).length !== 0 ? JobDescription : <LoadingPage />;
};

export default JobDescription;
