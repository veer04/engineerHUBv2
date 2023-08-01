import React, { useEffect } from "react";
import "./JobDescription.css";
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
const JobDescription = () => {
  const { hiringId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const bucket = `${Bucket_URL}frontend/company/jobs/`;
  const [hiring, setHiring] = useState({});
  const [isApplicable, setIsApplicable] = useState(false);
  const [profile, setProfile] = useState({});
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);

  useEffect(() => {
    if (getCookie("name")) {
      getUserProfileById(setProfile, getCookie("_id")[2]);
      setIsLoggedIn(true);
      if (
        Cookies.get("role") !== "Organization" &&
        Cookies.get("role") !== "Club" &&
        Cookies.get("role") !== "Admin" &&
        Cookies.get("role") !== "Alumni"
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
  formattedSalary.includes("NaN")
    ? (formattedSalary = "N/A")
    : (formattedSalary = formattedSalary);

  //using Intl formatter, check if the duration is 1 month or more than 1 month
  //if it is 1 month, then display "1 month" else display "2 months"
  let formattedDuration = new Intl.PluralRules("en-IN", {
    type: "ordinal",
  }).select(hiring?.detailFound?.duration);

  formattedDuration === "one"
    ? (formattedDuration = "1 Month")
    : (formattedDuration = `${hiring?.detailFound?.duration} Months`);

  if (hiring?.success === false) return <Page404 />;

  const JobDescription = (
    <div className="JobDescription">
      <div className="JobDetailHeader">
        <span>
          <div className="w-100 d-flex">
            <div
              style={{
                backgroundImage: `url(${hiring?.detailFound?.organisationLogo})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
              className="imgBox"
            ></div>
            <span className="heads">
              <h1>{hiring?.detailFound?.opportunityName}</h1>
              <a
                href={hiring?.detailFound?.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>{hiring?.detailFound?.organisationName}</h3>
              </a>
              <h3>{hiring?.detailFound?.opportunityLocation}</h3>
            </span>
          </div>
          <div className="apply-btn-container">
            {isLoggedIn ? (
              <div>
                {!isApplicable && (
                  <button className="btn" disabled>
                    Not Applicable
                  </button>
                )}
                {isApplicable && hiring?.applied === false && (
                  <button onClick={UserDataPost} className="btn">
                    Apply
                  </button>
                )}
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
              <Link to="/login">
                <div className="btn">Apply</div>
              </Link>
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
      <div className="JobDesc">
        <h5>Job Description</h5>
        <p id="quill-job-description"></p>
      </div>
      <div className="JobInfo">
        <h5>More Information</h5>
        <div className="JobInfoItems">
          <div className="JobInfoItem">
            <h6>Salary</h6>
            <p></p>
            <span>
              {hiring?.detailFound?.amount !== "N/A"
                ? `${formattedSalary} CTC`
                : "N/A"}
            </span>
            <img src={`${bucket}cash.svg`} alt="guide" />
          </div>
          <div className="JobInfoItem">
            <h6>Minimum Experience</h6>
            <p></p>
            <span>
              {hiring?.detailFound?.experience !== "0"
                ? hiring?.detailFound?.experience === "1"
                  ? `${hiring?.detailFound?.experience} year`
                  : `${hiring?.detailFound?.experience} years`
                : `Fresher`}
            </span>
            <img src={`${bucket}timer.svg`} alt="guide" />
          </div>
          <div className="JobInfoItem">
            <h6>Job Location</h6>
            <p></p>
            <span>{hiring?.detailFound?.opportunityLocation}</span>
            <img src={`${bucket}locate.svg`} alt="guide" />
          </div>
          <div className="JobInfoItem">
            <h6>Work type</h6>
            <p></p>
            <span>{hiring?.detailFound?.opportunityTiming}</span>
            <img src={`${bucket}time.svg`} alt="guide" />
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

  return Object.keys(hiring).length !== 0 ? JobDescription : <LoadingPage />;
};

export default JobDescription;
