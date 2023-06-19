import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsStar } from "react-icons/bs";
import { CgEye } from "react-icons/cg";
import { Chip } from "@mui/material";
import "./HackathonCards.css";
import { useNavigate } from "react-router-dom";

const HackathonCard = ({ details }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        details.link && navigate(`/company/events/hackathons/${details.link}`);
      }}
      className="HackathonCard"
    >
      <div className="cardImg">
        <img src={details.imgBanner} alt="" />
        <span className="GoogleIcon">
          <img src={details.logo} alt="Logo" />
        </span>
      </div>
      <div className="cardBody">
        <h4>{details.name}</h4>
        <h6>{details.locations}</h6>
        <span className="Tags">
          {details.tags.map((tag, index) => (
            <Chip
              key={index}
              variant="outlined"
              size="small"
              label={tag}
              style={{
                fontWeight: "500",
                fontSize: "10px",
                marginRight: "15px",
              }}
            />
          ))}
        </span>
        <div className="Stats">
          <span>
            <BsStar /> {details.stats.stars}
          </span>
          <span>|</span>
          <span>
            <CgEye /> {details.stats.views} Views
          </span>
          <span>|</span>
          <span>
            <AiOutlineClockCircle /> {details.stats.days} Days Left
          </span>
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;
