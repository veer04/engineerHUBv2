import React from "react";
import { Chip } from "@mui/material";
import "./JobCards.css";
import { Link } from "react-router-dom";
const JobCards = ({ details, color }) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
  const formattedSalary = formatter.format(details.amount);

  return (
    <div className="JobCard on-hover-scale">
      <div className="cardContent">
        <h6>
          Highest CTC :{" "}
          <b>{details.amount !== "N/A" ? formattedSalary : "N/A"}</b>
        </h6>
        <h6 className="text-crop-1 overflow-hidden">
          Job Location : <b>{details.opportunityLocation}</b>
        </h6>
        <h3 className="text-crop-3 overflow-hidden p-0">
          {details.opportunityName}
        </h3>
        <span className="Tags">
          {details.skillsRequired?.map((skillsRequired, _id) => (
            <Chip
              key={_id}
              variant="outlined"
              size="small"
              label={`#${skillsRequired}`}
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
      <div
        className="cardFooter"
        style={{
          backgroundColor: color,
        }}
      >
        <div
          style={{
            backgroundImage: `url(${details.organisationLogo})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
        <h5 className="text-crop-2 overflow-hidden">
          {details.organisationName}
        </h5>
        <Link to={`/company/jobs/${details._id}`}>
          <div className="btn">View</div>
        </Link>
      </div>
    </div>
  );
};

export default JobCards;
