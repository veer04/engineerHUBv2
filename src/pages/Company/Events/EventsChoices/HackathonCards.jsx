import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsStar } from "react-icons/bs";
import { CgEye } from "react-icons/cg";
import { Chip } from "@mui/material";
import "./HackathonCards.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { controller, getHiringDataById } from "../../../../services/APIConfig";

const HackathonCard = ({ details, color, data }) => {
  // const hiringId=useParams();
  // const[eventData,setEventData]=useState({})
  // useEffect(()=>
  // {
  //   getHiringDataById(setEventData,hiringId);
  //   return ()=>{
  //     controller.abort();
  //   }
  // })
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/company/events/${details._id}`);
      }}
      className="HackathonCard"
    >
      <div className="cardImg">
        <img src={details.opportunityPoster} alt="" />
        <span className="GoogleIcon">
          <img src={details.organisationLogo} alt="Logo" />
        </span>
      </div>
      <div className="cardBody">
        <h4>{details.opportunityName}</h4>
        <h6>{details.opportunityLocation}</h6>
        <span className="Tags">
          {details.skillsRequired?.map((tag, index) => (
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
            <BsStar /> {data.stars}
          </span>
          <span>|</span>
          <span>
            <CgEye /> {data.views} Views
          </span>
          <span>|</span>
          <span>
            <AiOutlineClockCircle /> {data.days} Days Left
          </span>
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;
