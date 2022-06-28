import React from "react";
// import { Link } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShareIcon from "@mui/icons-material/Share";

import "./InternCard.css";

const InternCard = ({ company, position, link }) => {
  return (
    <div className="Intern-Container">
      <div className="Intern-Company">
        <div className="Company-Name">American Express is Hiring</div>
        <div className="Intern-View">
          <VisibilityOutlinedIcon /> 1000
        </div>
      </div>
      <div className="Intern-Position">
        Position: <span className="intern_post">Data Scientists Analyst</span>
      </div>
      <div className="Intern-Apply-Link">
        <div>
          Apply :{" "}
          <span className="intern-link">
            https://internshala.com/internships/matching-preferences
          </span>
        </div>
        <div>
          <ShareIcon />
        </div>
      </div>
    </div>
  );
};

export default InternCard;
