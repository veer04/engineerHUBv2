import React, { useEffect } from "react";
import "./JobDescription.css";
import { Chip } from "@mui/material";
import { API_URL, Bucket_URL } from "../../../services/APIUtils";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import getCookie, { getAccessToken } from "../../../features/getCookieValues";
import jwt_decode from "jwt-decode";
import axios from "axios";
const JobDescription = ({ details }) => {
  const navigate = useNavigate();
  const[flag, setFlag]=useState(true);
  const[isLoggedIn,setIsLoggedIn]=useState(false);
  const bucket = `${Bucket_URL}frontend/company/jobs/`;

  useEffect(() => {
    window.scrollTo(0, 0);
    if(getCookie("name"))
    {
      setIsLoggedIn(true);
    }
  }, []);

const UserDataPost=()=>{
const data={
    hiringId: details._id,
           }
axios.post(`${API_URL}api/v1/hiringRegistration`,data,
{
  headers: {
    accesstoken: getAccessToken(), 
  },
}
).then((res)=>{
  if (
    response.status === 200 ||
    response.status === 201 ||
    response.status === 202 ||
    response.status === 203 ||
    response.status === 204
  ) {
     setFlag(false);
  }

}).catch((err)=>{
  window.alert(err.message);
})
}
  useEffect(()=>
  {
    console.log(details,"job Description");
  },[details])
  return (
    <div className="JobDescription">
      <div className="JobDetailHeader">
        <span>
          <span className="imgBox">
            <img src={details.OrganisationPoster || details.OrganizationPoster} alt="Logo" />
          </span>
          <span className="heads">
            <h1>{details.OpportunityPosition}</h1>
            <h3>{details.Organisation}</h3>
            <h3>{details.jobLocation}</h3>
          </span>
          <div>
            {
              isLoggedIn ? (
                <div
                onClick={UserDataPost}
                >
                  {
                    flag?(
                      <div className="btn">Applied</div>
                    ):(
                      <div className="btn">Apply</div>
                    )
                  }
              </div>
              ):(
                <Link to={"https://ehubbusiness.com/login"}>
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
            <span>{details.JobTiming}</span>
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