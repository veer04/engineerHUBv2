import React from "react";
import "./JobDescription.css";
import { Chip } from "@mui/material";
import { Bucket_URL } from "../../../services/APIUtils";

const JobDescription = ({ details }) => {
  const bucket = `${Bucket_URL}frontend/company/jobs/`;
  return (
    <div className="JobDescription">
      <div className="JobDetailHeader">
        <span>
          <span className="imgBox">
            <img src={details.logo} alt="Logo" />
          </span>
          <span className="heads">
            <h1>{details.name}</h1>
            <h3>{details.org}</h3>
            <h3>{details.location}</h3>
          </span>
          <div className="btn">Apply</div>
        </span>
        <span className="Tags">
          {details.tags.map((tag, index) => (
            <Chip
              key={index}
              variant="outlined"
              size="small"
              label={`#${tag}`}
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
        <p>{details.desc}</p>
      </div>
      <div className="JobReq">
        <h5>Job Requirements</h5>
        <ul>
          {details.req.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
      <div className="JobInfo">
        <h5>More Information</h5>
        <div className="JobInfoItems">
          <div className="JobInfoItem">
            <h6>Salary / Stipend</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis
              senectus arcu rhoncus arcu.
            </p>
            <span>{details.ctc}</span>
            <img src={`${bucket}cash.svg`} alt="guide" />
          </div>
          <div className="JobInfoItem">
            <h6>Time Availability</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis
              senectus arcu rhoncus arcu.
            </p>
            <span>{details.info.availability}</span>
            <img src={`${bucket}timer.svg`} alt="guide" />
          </div>
          <div className="JobInfoItem">
            <h6>Job Location</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis
              senectus arcu rhoncus arcu.
            </p>
            <span>{details.location}</span>
            <img src={`${bucket}locate.svg`} alt="guide" />
          </div>
          <div className="JobInfoItem">
            <h6>Work type</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis
              senectus arcu rhoncus arcu.
            </p>
            <span>{details.info.type}</span>
            <img src={`${bucket}time.svg`} alt="guide" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
