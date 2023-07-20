import React, { useEffect } from "react";
import "./JobDescription.css";
import { Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import { API_URL, Bucket_URL } from "../../../services/APIUtils";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import getCookie, { getAccessToken } from "../../../features/getCookieValues";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {
  controller,
  getHiringDataById,
  getHiringData,
} from "../../../services/APIConfig";
import LoadingPage from "../../../components/Loader/LoadingPage";
const JobDescription = ({ details }) => {
  const navigate = useNavigate();
  const { hiringId } = useParams();
  const [flag, setFlag] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const bucket = `${Bucket_URL}frontend/company/jobs/`;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (getCookie("name")) {
      setIsLoggedIn(true);
    }
  }, []);

  const UserDataPost = () => {
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
          Cookies.set("applied", "false");
          window.location.reload();
        }
      })
      .catch((res) => {
        if(res.status===409)
        {
          window.alert("already applied!");
          window.location.reload();
        }
   
      });
  };
  useEffect(() => {
    const responseFlag = axios
      .get(`${API_URL}api/v1/hiringUserFlag/${hiringId}`, {
        headers: {
          accesstoken: getAccessToken(),
        },
      })
      .then((res) => {
        if (res.data.applied === false) {
          Cookies.set("applied", "false");
          // window.location.reload();
        }
        if (res.data.applied === true) {
          Cookies.set("applied", "true");
          // window.location.reload();
        }
      })
      .catch((res) => {
        if (res.status === 409) {
          Cookies.set("applied", "false");
          // window.location.reload();
  
        }
      });
  }, [hiringId]);

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
  let formattedSalary = formatter.format(details?.maxSalary);
  formattedSalary.includes("NaN")
    ? (formattedSalary = "N/A")
    : (formattedSalary = formattedSalary);

  //using Intl formatter, check if the duration is 1 month or more than 1 month
  //if it is 1 month, then display "1 month" else display "2 months"
  let formattedDuration = new Intl.PluralRules("en-IN", {
    type: "ordinal",
  }).select(details?.duration);

  formattedDuration === "one"
    ? (formattedDuration = "1 Month")
    : (formattedDuration = `${details?.duration} Months`);

  const JobDescription = (
    <div className="JobDescription">
      <div className="JobDetailHeader">
        <span>
          <div className="w-100 d-flex">
            <span className="imgBox">
              <img src={details.organisationLogo} alt="Logo" />
            </span>
            <span className="heads">
              <h1>{details.opportunityName}</h1>
              <h3>{details.organisationName}</h3>
              <h3>{details.opportunityLocation}</h3>
            </span>
          </div>
          <div className="apply-btn-container">
            {isLoggedIn ? (
              <div onClick={UserDataPost}>
                {Cookies.get("applied") === "false" ? (
                  <div className="btn">Apply</div>
                ) : (
                  <button  className="btn" disabled>Applied</button>
                )}
              </div>
            ) : (
              isLoggedIn && details.websiteUrl ?(
                <Link to={details.websiteUrl}>
                <div className="btn">Apply <ArrowOutwardIcon/> </div>
              </Link>
              ):(<Link to="/login">
              <div className="btn">Apply</div>
            </Link>)

            )}
          </div>
        </span>
        <span className="Tags">
          {details.skillsRequired?.map((skillsRequired, index) => (
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
        <p>{details.description}</p>
      </div>
      {/* <div className="JobReq">
      <h5>Job Requirements</h5>
      <ul>
        {details.req.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div> */}
      <div className="JobInfo">
        <h5>More Information</h5>
        <div className="JobInfoItems">
          <div className="JobInfoItem">
            <h6>Salary / Stipend</h6>
            <p></p>
            <span>{details.maxSalary !== "N/A" ? formattedSalary : "N/A"}</span>
            <img src={`${bucket}cash.svg`} alt="guide" />
          </div>
          <div className="JobInfoItem">
            <h6>Time Availability</h6>
            <p></p>
            <span>{formattedDuration}</span>
            <img src={`${bucket}timer.svg`} alt="guide" />
          </div>
          <div className="JobInfoItem">
            <h6>Job Location</h6>
            <p></p>
            <span>{details.opportunityLocation}</span>
            <img src={`${bucket}locate.svg`} alt="guide" />
          </div>
          <div className="JobInfoItem">
            <h6>Work type</h6>
            <p></p>
            <span>{details.opportunityType}</span>
            <img src={`${bucket}time.svg`} alt="guide" />
          </div>
        </div>
      </div>
    </div>
  );

  return Object.keys(details).length !== 0 ? JobDescription : <LoadingPage />;
};

export default JobDescription;
