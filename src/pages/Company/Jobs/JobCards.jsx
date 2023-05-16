import React from "react";
import { Chip } from "@mui/material";
import "./JobCards.css";

const JobCards = ({ details }) => {
  return (
    <div className="JobCard on-hover-scale">
      <div className="cardContent">
        <h6>
          Average CTC : <b>{details.ctc}</b>
        </h6>
        <h6>
          Job Location : <b>{details.location}</b>
        </h6>
        <h3>{details.name}</h3>
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
                border: "1px solid #f3f3f3",
              }}
            />
          ))}
        </span>
      </div>
      <div className="cardFooter" style={{ background: details.bg }}>
        <span>
          <img src={details.logo} alt="Job Logo" />
        </span>
        <h5>{details.name}</h5>
        <a
          href={`/company/jobs/${details.jobId}`}
          style={{ textDecoration: "none" }}
        >
          <div className="btn">View</div>
        </a>
      </div>
    </div>
  );
};

export default JobCards;
