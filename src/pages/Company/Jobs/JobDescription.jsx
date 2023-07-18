import React, { useEffect } from "react";
import "./JobDescription.css";
import { Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import { API_URL, Bucket_URL } from "../../../services/APIUtils";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import getCookie, { getAccessToken } from "../../../features/getCookieValues";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {
  controller,
  getHiringDataById,
  getHiringData,
} from "../../../services/APIConfig";
const JobDescription = ({ details }) => {
  const navigate = useNavigate();
  const { hiringId } = useParams();
  const [flag, setFlag] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const bucket = `${Bucket_URL}frontend/company/jobs/`;
  const [hiring, setHiring] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0);
    getHiringDataById(setHiring, hiringId);
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
        window.alert(res.message);
        window.location.reload();
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
        }
        if (res.data.applied === true) {
          Cookies.set("applied", "true");
        }

        console.log(res);
      })
      .catch((res) => {
        if (res.status === 409) {
          Cookies.set("applied", "false");
        }
      });
    console.log(responseFlag);
    console.log(details._id);
    // console.log(details, "job Description");
  }, []);
  return (
    <div className="JobDescription">
      <div className="JobDetailHeader">
        <span>
          <div className="w-100 d-flex">
            <span className="imgBox">
              <img
                src={details.OrganisationPoster || details.OrganizationPoster}
                alt="Logo"
              />
            </span>
            <span className="heads">
              <h1>{details.OpportunityPosition}</h1>
              <h3>{details.Organisation}</h3>
              <h3>{details.jobLocation}</h3>
            </span>
          </div>
          <div className="apply-btn-container">
            {isLoggedIn ? (
              <div onClick={UserDataPost}>
                {Cookies.get("applied") === "false" ? (
                  <div className="btn">Apply</div>
                ) : (
                  <div className="btn">Applied</div>
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
            <span>{details.maxSalary}</span>
            <img src={`${bucket}cash.svg`} alt="guide" />
          </div>
          <div className="JobInfoItem">
            <h6>Time Availability</h6>
            <p></p>
            <span>{details.JobTiming || details.jobTiming}</span>
            <img src={`${bucket}timer.svg`} alt="guide" />
          </div>
          <div className="JobInfoItem">
            <h6>Job Location</h6>
            <p></p>
            <span>{details.jobLocation}</span>
            <img src={`${bucket}locate.svg`} alt="guide" />
          </div>
          <div className="JobInfoItem">
            <h6>Work type</h6>
            <p></p>
            <span>{details.jobType}</span>
            <img src={`${bucket}time.svg`} alt="guide" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
