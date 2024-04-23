import React, { useEffect } from "react";
import "../Jobs/JobDescription.css";
import { Chip } from "@mui/material";
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
import { redirectToAuth } from "../../../features/redirectToAuth";
import CustomSnackbar from "../../User/Login/CustomSnackbar";
import {
  calendarEndDateIcon,
  calendarStartDateIcon,
  experienceIcon,
  locationIcon,
  moneyIcon,
  workTypeIcon,
} from "../Jobs/icons";
const InternshipDesc = () => {
  const { hiringId } = useParams();
  const [flag, setFlag] = useState(-1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const bucket = `${Bucket_URL}frontend/company/jobs/`;
  const [hiring, setHiring] = useState({});
  const [internShipData, setInternshipData] = useState({});
  const [isApplicable, setIsApplicable] = useState(false);
  const [profile, setProfile] = useState({});
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const [snackbarValues, setSnackbarValues] = useState({
    severity: "error",
    message: "",
  });
  const [open, setOpen] = useState(false);

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
    setInternshipData(hiring.detailFound);
  }, [hiring]);
  if (hiring.success === false) return <Page404 />;

  const UserDataPost = () => {
    if (!!hiring?.detailFound?.applyLink) {
      window.open(hiring?.detailFound?.applyLink, "_blank");
      return;
    }

    if (isApplicable && hiring?.applied === false && !isResumeUploaded) {
      window.alert("Please upload your resume first");
      window.location.href = `/profile/student/${getCookie("_id")[2]}/edit`;
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

  const InternshipDesc = (
    <div className="InternshipDesc">
      {snackbarValues.severity === "success" && (
        <CustomSnackbar
          setOpen={setOpen}
          open={open}
          message={snackbarValues.message}
          severity={snackbarValues.severity}
          duration={5000}
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
                {hiring?.applied === true && (
                  <button className="btn" disabled>
                    Applied
                  </button>
                )}
              </div>
            ) : (
              <>
                {internShipData?._id === "65d0a7b2c58c23a4ac6b9f76" && (
                  <Link to="https://docs.google.com/forms/d/e/1FAIpQLSd39WuMG3eBnPoVmMLneBEhYBTU2Q3CCbNx5kQKmIIkINdTlQ/viewform">
                    <div className="btn">Apply</div>
                  </Link>
                )}
                {internShipData?._id !== "65d0a7b2c58c23a4ac6b9f76" && (
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
              </>
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
            <h6>Stipend</h6>
            {
              //check if featured array in hiring has CampusAmbassador then display "Bonus"
              hiring?.detailFound?.featuredArray?.includes(
                "CampusAmbassador"
              ) ? (
                <span>Bonus</span>
              ) : hiring?.detailFound?.isPaid ? (
                <span>
                  {hiring?.detailFound?.showSalary
                    ? !!hiring?.detailFound?.amount &&
                      hiring?.detailFound?.amount !== "N/A"
                      ? hiring?.detailFound?.amount
                      : hiring?.detailFound?.salaryType === "Fixed"
                      ? `${formatter.format(hiring?.detailFound?.salaryAmount)}`
                      : hiring?.detailFound.salaryType === "Range"
                      ? `${formatter.format(
                          hiring?.detailFound?.minRange
                        )} - ${formatter.format(hiring?.detailFound?.maxRange)}`
                      : "N/A"
                    : !!hiring?.detailFound?.amount &&
                      hiring?.detailFound?.amount !== "N/A"
                    ? hiring?.detailFound?.amount
                    : !!hiring?.detailFound?.salaryDisclosure
                    ? hiring?.detailFound?.salaryDisclosure
                    : "N/A"}
                </span>
              ) : (
                <span>Unpaid</span>
              )
            }
            {moneyIcon}
          </div>
          <div className="JobInfoItem">
            <h6>Duration</h6>
            <span>
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

  return Object.keys(hiring).length !== 0 ? InternshipDesc : <LoadingPage />;
};

export default InternshipDesc;
