import React, { useEffect } from "react";
import "./ProjectDesc.css";
import "./ProjectDescNew.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { API_URL, Bucket_URL } from "../../../services/APIUtils";
import { useState } from "react";
import getCookie, { getAccessToken } from "../../../features/getCookieValues";
import Cookies from "js-cookie";
import axios from "axios";
import LoadingPage from "../../../components/Loader/LoadingPage";
import Page404 from "../../Maintenance/Page404";
import { getUserProfileById } from "../../../services/APIConfig";
import { redirectToAuth } from "../../../features/redirectToAuth";
import CustomSnackbar from "../../User/Login/CustomSnackbar";
import JobApplyModal from "../Jobs/JobApplyModal";
import { Chip } from "@mui/material";
import {
  durationIcon,
  emailIcon,
  experienceIcon,
  locationIcon,
  moneyIcon,
  phoneIcon,
  workTypeIcon,
} from "../Jobs/icons";
import { getUserId } from "../../../features/User/UserDetails";

const ProjectDescNew = ({ data, isApplied }) => {
  const { projectId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isApplicable, setIsApplicable] = useState(false);
  const [profile, setProfile] = useState({});
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const [snackbarValues, setSnackbarValues] = useState({
    severity: "error",
    message: "",
  });
  const [open, setOpen] = useState(false);

  const bucket = `${Bucket_URL}frontend/company/jobs/`;
  // const [hiring, setHiring] = useState({});
  const [isApplyingJob, setIsApplyingJob] = useState(false);

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

  const UserDataPost = () => {
    if (!!data?.applyLink) {
      window.open(data?.applyLink, "_blank");
      return;
    }

    if (isApplicable && isApplied === false && !isResumeUploaded) {
      window.alert("Please upload your resume first");
      window.location.href = `/profile/user/${getUserId()}`;
      return;
    }

    const newData = {
      projectId,
      resumeUrl: profile?.resume,
    };
    axios
      .post(`${API_URL}api/v1/projectRegistration`, newData, {
        headers: {
          accesstoken: getAccessToken(),
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
          setSnackbarValues({
            severity: "success",
            message: `You have successfully applied for this project!`,
          });
          setOpen(true);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((res) => {
        if (res.status === 409) {
          window.alert("already applied!");
        }
      });
  };

  function handleModalState() {
    setIsApplyingJob(false);
  }

  function handleJobApplied(data) {
    // setHiring((prev) => ({ ...prev, applied: true }));
    setSnackbarValues({
      severity: "success",
      message: `You have successfully applied to this job!`,
    });
    setOpen(true);
  }

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
  let formattedSalary = formatter.format(data?.amount);
  formattedSalary.includes("NaN") ? (formattedSalary = "N/A") : formattedSalary;

  //using Intl formatter, check if the duration is 1 month or more than 1 month
  //if it is 1 month, then display "1 month" else display "2 months"
  let formattedDuration = new Intl.PluralRules("en-IN", {
    type: "ordinal",
  }).select(data?.duration);

  formattedDuration === "one"
    ? (formattedDuration = "1 Month")
    : (formattedDuration = `${data?.duration} Months`);

  if (data?.success === false) return <Page404 />;

  const startDate = new Date(data?.applicationStartTime);
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

  const endDate = new Date(data?.applicationEndTime);
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

  return (
    <div className="JobDescription project-desc">
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
      {/*<div className="ProjectDescHeader">*/}
      {/*  <span className="logoIcon">*/}
      {/*    <img src={data.organisationLogo} />*/}
      {/*  </span>*/}
      {/*  <h1>{data.projectName}</h1>*/}
      {/*</div>*/}
      {/*<div className="ProjectDescImage">*/}
      {/*  <img src={data.projectPoster} alt="Project" />*/}
      {/*</div>*/}
      <div className="JobDetailHeader">
        <div className="poster mb-4">
          <img src={data?.projectPoster} alt="project poster" />
        </div>
        <span>
          <div className="w-100 d-flex">
            <a
              href={data?.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                style={{
                  backgroundImage: `url(${data?.organisationLogo})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
                className="imgBox"
              ></div>
            </a>
            <span className="heads">
              <h1>{data?.projectName}</h1>
              <a
                href={data?.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseOver={(e) => {
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                {data?.organisationName}
              </a>
              <span> </span>
            </span>
          </div>
          <div className="apply-btn-container">
            {isLoggedIn ? (
              <div>
                {!isApplicable && (
                  <button className="btn ApplyNowBtn" disabled>
                    Not Applicable
                  </button>
                )}
                {isApplicable && isApplied === false && (
                  <button onClick={UserDataPost} className="btn ApplyNowBtn">
                    {!!data?.applyLink ? "Apply" : `Easy Apply`}
                  </button>
                )}
                {isApplied === true && (
                  <button className="btn ApplyNowBtn" disabled>
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
                className="btn ApplyNowBtn"
              >
                Easy Apply
              </div>
              // </Link>
            )}
          </div>
        </span>
        <span className="Tags">
          {data?.techStack?.map((tech, index) => (
            <Chip
              key={index}
              variant="outlined"
              size="small"
              label={`#${tech}`}
              style={{
                fontWeight: "500",
                fontSize: "12px",
                marginRight: "15px",
                marginBottom: "5px",
              }}
            />
          ))}
        </span>
      </div>
      {data?.applicationStartTime && (
        <div className="JobInfo">
          <div className="JobInfoItems">
            <div className="JobInfoItem">
              <h6>Application Start Date</h6>
              <span>{applicationStartDate}</span>
              <img src={`${bucket}calendar.png`} alt="calendar" />
            </div>
            <div className="JobInfoItem">
              <h6>Application End Date</h6>
              <span>{applicationEndDate}</span>
              <img src={`${bucket}calendar.png`} alt="calendar" />
            </div>
          </div>
        </div>
      )}
      <div className="JobDesc">
        <h5>Description</h5>
        <p
          id="quill-job-description"
          dangerouslySetInnerHTML={{
            __html: data?.description,
          }}
        ></p>
      </div>
      <div className="JobInfo">
        <h5>More Information</h5>
        <div className="JobInfoItems">
          <div className="JobInfoItem">
            <h6>Amount</h6>
            <span>
              {data?.showPayDetails
                ? !!data?.stipend && data?.stipend !== "N/A"
                  ? data?.stipend
                  : data?.payingMethod === "fixed"
                  ? `${formatter.format(data?.fixedAmount)}`
                  : data.payingMethod === "range"
                  ? `${formatter.format(data?.minRange)} - ${formatter.format(
                      data?.maxRange
                    )}`
                  : data?.payingMethod === "hourly"
                  ? `${formatter.format(data?.amountPerHour)} per hour`
                  : "N/A"
                : !!data?.stipend && data?.stipend !== "N/A"
                ? data?.stipend
                : data?.amountToDisclose}
            </span>
            {moneyIcon}
          </div>
          <div className="JobInfoItem">
            <h6>Duration</h6>
            <span>
              {`${data?.estimatedTime} ${
                data?.estimatedTime === 1
                  ? data?.timePeriod?.slice(0, -1)
                  : data?.timePeriod
              }`}
            </span>
            {durationIcon}
          </div>
          <div className="JobInfoItem">
            <h6>Contact Number</h6>
            <span>{`+${data?.mobileCountryCode} ${data?.mobileNo}`}</span>
            {phoneIcon}
          </div>
          <div className="JobInfoItem">
            <h6>Contact Email</h6>
            <span>{`${data?.contactEmail}`}</span>
            {emailIcon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescNew;
