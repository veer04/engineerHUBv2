import React, { useEffect } from "react";
import "./InternshipDesc.css";
import { Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import { API_URL, Bucket_URL } from "../../../services/APIUtils";
import { Link } from "react-router-dom";
import { useState } from "react";
import getCookie, { getAccessToken } from "../../../features/getCookieValues";
import Cookies from "js-cookie";
import axios from "axios";
import { controller, getHiringDataById } from "../../../services/APIConfig";
import LoadingPage from "../../../components/Loader/LoadingPage";
import Page404 from "../../Maintenance/Page404";
const InternshipDesc = () => {
  const { hiringId } = useParams();
  const [flag, setFlag] = useState(-1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const bucket = `${Bucket_URL}frontend/company/jobs/`;
  const [hiring, setHiring] = useState({});
  const [isApplicable, setIsApplicable] = useState(false);

  useEffect(() => {
    if (getCookie("name")) {
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
    window.scrollTo(0, 0);
    getHiringDataById(setHiring, hiringId);
    if (getCookie("name")) {
      axios
        .get(`${API_URL}api/v1/hiringUserFlag/${hiringId}`, {
          headers: {
            accesstoken: getAccessToken(),
          },
        })
        .then((res) => {
          setFlag(res.data.applied ? 1 : 0);
        })
        .catch((res) => {
          if (res.status === 409) {
            setFlag(0);
          }
        });
      return () => {
        setHiring({});
        setFlag(-1);
        controller.abort();
      };
    }
  }, [hiringId]);

  const UserDataPost = () => {
    if (!!hiring?.applyLink) {
      window.open(hiring?.applyLink, "_blank");
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
        if (
          res.status === 200 ||
          res.status === 201 ||
          res.status === 202 ||
          res.status === 203 ||
          res.status === 204
        ) {
          setFlag(1);
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
  let formattedSalary = formatter.format(hiring?.amount);
  formattedSalary.includes("NaN")
    ? (formattedSalary = "N/A")
    : (formattedSalary = formattedSalary);

  //using Intl formatter, check if the duration is 1 month or more than 1 month
  //if it is 1 month, then display "1 month" else display "2 months"
  let formattedDuration = new Intl.PluralRules("en-IN", {
    type: "ordinal",
  }).select(hiring?.duration);

  formattedDuration === "one"
    ? (formattedDuration = "1 Month")
    : (formattedDuration = `${hiring?.duration} Months`);

  if (hiring.success === false) return <Page404 />;

  const InternshipDesc = (
    <div className="InternshipDesc">
      <div className="JobDetailHeader">
        <span>
          <div className="w-100 d-flex">
            <div
              style={{
                backgroundImage: `url(${hiring.organisationLogo})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
              className="imgBox"
            ></div>
            <span className="heads">
              <h1>{hiring.opportunityName}</h1>
              <a
                href={hiring.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>{hiring.organisationName}</h3>
              </a>
              <h3>{hiring.opportunityLocation}</h3>
            </span>
          </div>
          <div className="apply-btn-container">
            {/* {isLoggedIn && hiring.websiteUrl ? (
              <Link to={hiring.websiteUrl}>
                <div className="btn">
                  Apply
                </div>
              </Link>
            ) :  */}
            {isLoggedIn ? (
              <div>
                {!isApplicable && flag === -1 && (
                  <button className="btn" disabled>
                    Not Applicable
                  </button>
                )}
                {isApplicable && flag === -1 && (
                  <button className="btn" disabled>
                    Apply
                  </button>
                )}
                {flag === 0 && isApplicable && (
                  <button onClick={UserDataPost} className="btn">
                    Apply
                  </button>
                )}
                {flag === 0 && !isApplicable && (
                  <button className="btn" disabled>
                    Not Applicable
                  </button>
                )}
                {flag === 1 && (
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
          {hiring.skillsRequired?.map((skillsRequired, index) => (
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
        <p>{hiring.description}</p>
      </div>
      <div className="JobInfo">
        <h5>More Information</h5>
        <div className="JobInfoItems">
          <div className="JobInfoItem">
            <h6>Stipend</h6>
            <p></p>
            {hiring.isPaid ? (
              <span>{hiring.amount !== "N/A" ? formattedSalary : "N/A"}</span>
            ) : (
              <span>Unpaid</span>
            )}
            <img src={`${bucket}cash.svg`} alt="guide" />
          </div>
          <div className="JobInfoItem">
            <h6>Duration</h6>
            <p></p>
            <span>{formattedDuration}</span>
            <img src={`${bucket}timer.svg`} alt="guide" />
          </div>
          <div className="JobInfoItem">
            <h6>Job Location</h6>
            <p></p>
            <span>{hiring.opportunityLocation}</span>
            <img src={`${bucket}locate.svg`} alt="guide" />
          </div>
          <div className="JobInfoItem">
            <h6>Work type</h6>
            <p></p>
            <span>{hiring.opportunityTiming}</span>
            <img src={`${bucket}time.svg`} alt="guide" />
          </div>
        </div>
      </div>
    </div>
  );

  return Object.keys(hiring).length !== 0 ? InternshipDesc : <LoadingPage />;
};

export default InternshipDesc;
