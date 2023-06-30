import React, { useEffect } from "react";
import "./JobDescription.css";
import { Chip } from "@mui/material";
import { Bucket_URL } from "../../../services/APIUtils";
import { useNavigate, Link } from "react-router-dom";
const JobDescription = ({ details }) => {
  const navigate = useNavigate();
  const bucket = `${Bucket_URL}frontend/company/jobs/`;

  useEffect(() => {
    window.scrollTo(0, 0);
    
  }, []);
  useEffect(()=>
  {
    console.log(details,"job Description");
  },[details])
  return (
    <div className="JobDescription">
      <div className="JobDetailHeader">
        <span>
          <span className="imgBox">
            <img src={details.OrganisationPoster} alt="Logo" />
          </span>
          <span className="heads">
            <h1>{details.OpportunityPosition}</h1>
            <h3>{details.Organisation}</h3>
            <h3>{details.jobLocation}</h3>
          </span>
          <Link to={details.websiteUrl}>
            <div className="btn">Apply</div>
          </Link>
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
            <span>{details.jobTiming}</span>
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
