import React from "react";
// import { Link } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShareIcon from "@mui/icons-material/Share";

import "./InternCard.css";

const InternCard = ({ company, position, link }) => {
  return (
    <div className="Intern-Container">
      <div className="Intern-Company">
        <div className="Company-Name">{company} is Hiring</div>
        <div className="Intern-View">
          <VisibilityOutlinedIcon /> 1000
        </div>
      </div>
      <div className="Intern-Position">
        Position: <span className="intern_post">{position}</span>
      </div>
      <div className="Intern-Apply-Link">
        <div>
          Apply : <span className="intern-link">{link}</span>
        </div>
        <div>
          <ShareIcon />
        </div>
      </div>
    </div>
  );
};

export default InternCard;
