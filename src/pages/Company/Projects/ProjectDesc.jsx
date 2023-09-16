import React, { useEffect } from "react";
import "./ProjectDesc.css";
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

const ProjectDesc = ({ data, isApplied }) => {
  const { projectId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

    if (isApplicable && hiring?.applied === false && !isResumeUploaded) {
      window.alert("Please upload your resume first");
      window.location.href = `/profile/student/${getCookie("_id")[2]}/edit`;
      return;
    }

    const newData = {
      projectId,
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
          window.location.reload();
        }
      })
      .catch((res) => {
        if (res.status === 409) {
          window.alert("already applied!");
        }
      });
  };

  useEffect(() => {
    document.getElementById("project-description").innerHTML = data.description;
  }, [data.description]);
  return (
    <div className="ProjectDesc">
      <div className="ProjectDescHeader">
        <span className="logoIcon">
          <img src={data.organisationLogo} />
        </span>
        <h1>{data.projectName}</h1>
      </div>
      <div className="ProjectDescImage">
        <img src={data.projectPoster} alt="Project" />
      </div>
      <div className="ProjectDescription">
        <h5>Description</h5>
        <p id="project-description">{data.description}</p>
      </div>
      <div className="ProjectTags">
        <h5>Project Tags</h5>
        <span className="tag">
          {data.techStack?.map((tag, index) => {
            return <span key={index}>{tag}</span>;
          })}
        </span>
      </div>
      <div className="ProjectPrerequisite"></div>
      <div className="AdditionalInfo">
        {data?.stipend && (
          <div className="AdditionalInfoChip">
            <h5>Salary/Stipend</h5>
            <p>{data.stipend}/-</p>
          </div>
        )}
        {data?.estimatedTime && (
          <div className="AdditionalInfoChip">
            <h5>Work Availability</h5>
            <p>{`${data.estimatedTime} ${data.timePeriod}`}</p>
          </div>
        )}
      </div>
      {isLoggedIn ? (
        <div>
          {!isApplicable && (
            <button className="btn ApplyNowBtn" disabled>
              Not Applicable
            </button>
          )}
          {isApplicable && isApplied === false && (
            <button onClick={UserDataPost} className="btn ApplyNowBtn">
              Easy Apply
            </button>
          )}
          {isApplied === true && (
            <button className="btn ApplyNowBtn" disabled>
              Applied
            </button>
          )}
        </div>
      ) : (
        <Link to="/login">
          <div className="btn ApplyNowBtn">Easy Apply</div>
        </Link>
      )}
    </div>
  );
};

export default ProjectDesc;
