import React from "react";
import { useEffect,useState } from "react";
import { Chip } from "@mui/material";
import "./JobCards.css";
import {controller,getHiringData } from "../../../services/APIConfig";
import { Outlet, useNavigate, useParams } from "react-router-dom";
const JobCards = ({details,color}) => {
  
  return (
    <div className="JobCard on-hover-scale">
      <div className="cardContent">
        <h6>
          Average CTC : <b>{details.maxSalary}</b>
        </h6>
        <h6 className="text-crop-1 overflow-hidden">
          Job Location : <b>{details.jobLocation}</b>
        </h6>
        <h3 className="text-crop-3 overflow-hidden p-0">{details.OpportunityPosition}</h3>
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
      <div className="cardFooter"
      style={{
        backgroundColor:color
      }}>
        <span>
          <img src={details.OrganisationPoster} alt="Job Logo" />
        </span>
        <h5 className="text-crop-2 overflow-hidden">{details.OpportunityPosition}</h5>
        <a
          href={`/company/jobs/${details._id}`}
          style={{ textDecoration: "none" }}
        >
          <div className="btn">View</div>
        </a>
      </div>
    </div>
  );
};

export default JobCards;
