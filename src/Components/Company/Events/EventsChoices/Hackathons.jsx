import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsStar } from "react-icons/bs";
import { CgEye } from "react-icons/cg";
import { Chip } from "@mui/material";
import imgBanner from "../../../../assets/images/HackathonBanner.png";
import googleLogo from "../../../../assets/images/google.svg";
import "./Hackathons.css";

const Card = ({ details }) => {
  return (
    <div className="Card">
      <div className="cardImg">
        <img src={imgBanner} alt="" />
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
              label={`#${tag}`}
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

const Hackathons = () => {
  const hackathonsList = [
    {
      name: "Google Problem Solution Challenge - UNESCO",
      logo: googleLogo,
      locations: "Google, USA",
      tags: ["Competition", "Challenge", "Google"],
      stats: {
        stars: 50000,
        views: 1056,
        days: 5,
      },
    },
    {
      name: "Google Problem Solution Challenge - UNESCO",
      logo: googleLogo,
      locations: "Google, USA",
      tags: ["Competition", "Challenge", "Google"],
      stats: {
        stars: 50000,
        views: 1056,
        days: 5,
      },
    },
    {
      name: "Google Problem Solution Challenge - UNESCO",
      logo: googleLogo,
      locations: "Google, USA",
      tags: ["Competition", "Challenge", "Google"],
      stats: {
        stars: 50000,
        views: 1056,
        days: 5,
      },
    },
    {
      name: "Google Problem Solution Challenge - UNESCO",
      logo: googleLogo,
      locations: "Google, USA",
      tags: ["Competition", "Challenge", "Google"],
      stats: {
        stars: 50000,
        views: 1056,
        days: 5,
      },
    },
    {
      name: "Google Problem Solution Challenge - UNESCO",
      logo: googleLogo,
      locations: "Google, USA",
      tags: ["Competition", "Challenge", "Google"],
      stats: {
        stars: 50000,
        views: 1056,
        days: 5,
      },
    },
    {
      name: "Google Problem Solution Challenge - UNESCO",
      logo: googleLogo,
      locations: "Google, USA",
      tags: ["Competition", "Challenge", "Google"],
      stats: {
        stars: 50000,
        views: 1056,
        days: 5,
      },
    },
    {
      name: "Google Problem Solution Challenge - UNESCO",
      logo: googleLogo,
      locations: "Google, USA",
      tags: ["Competition", "Challenge", "Google"],
      stats: {
        stars: 50000,
        views: 1056,
        days: 5,
      },
    },
    {
      name: "Google Problem Solution Challenge - UNESCO",
      logo: googleLogo,
      locations: "Google, USA",
      tags: ["Competition", "Challenge", "Google"],
      stats: {
        stars: 50000,
        views: 1056,
        days: 5,
      },
    },
    {
      name: "Google Problem Solution Challenge - UNESCO",
      logo: googleLogo,
      locations: "Google, USA",
      tags: ["Competition", "Challenge", "Google"],
      stats: {
        stars: 50000,
        views: 1056,
        days: 5,
      },
    },
  ];
  return (
    <>
      {hackathonsList.map((item) => {
        return (
          <div className="Company-Hackathons">
            <Card details={item} />
          </div>
        );
      })}
    </>
  );
};

export default Hackathons;
