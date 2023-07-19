import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsStar } from "react-icons/bs";
import { CgEye } from "react-icons/cg";
import { Chip } from "@mui/material";
import "./HackathonDetails.css";
import HackathonDesc from "./HackathonDesc";
import { useParams } from "react-router-dom";
import { Bucket_URL } from "../../../../services/APIUtils";
import { useEffect, useState } from "react";
import colorWheel from "../../../../assets/colorWheel";
import {
  controller,
  getHiringData,
  getHiringDataById,
} from "../../../../services/APIConfig";
import HackathonCard from "./HackathonCards";
const Card = ({ details }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [window.location.pathname]);
  const HackathonDummyData = {};
  return (
    <div
      className="Card"
      onClick={() => {
        navigate(`/company/events/${details._id}`);
      }}
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
          {details?.skillsRequired.map((tag, index) => (
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
            <BsStar /> {4}
          </span>
          <span>|</span>
          <span>
            <CgEye /> {1000} Views
          </span>
          <span>|</span>
          <span>
            <AiOutlineClockCircle /> {14} Days Left
          </span>
        </div>
      </div>
    </div>
  );
};

const HackathonDetails = () => {
  const [hiring, setHiring] = useState([]);
  const [hiringData, setHiringData] = useState({});
  const { hackId } = useParams();
  useEffect(() => {
    getHiringData(setHiring);
    getHiringDataById(setHiringData, hackId);
    return () => {
      controller.abort();
    };
  }, [hackId]);
  const bucket = `${Bucket_URL}frontend/company/events/hackathon/`;

  const data = [
    {
      stars: 3,
      views: 426,
      days: 9,
    },
    {
      stars: 3,
      views: 575,
      days: 20,
    },
    {
      stars: 4,
      views: 978,
      days: 7,
    },
    {
      stars: 5,
      views: 148,
      days: 171,
    },
    {
      stars: 3,
      views: 429,
      days: 15,
    },
    {
      stars: 5,
      views: 292,
      days: 27,
    },
  ];

  return (
    <div className="HackathonDetails">
      <div className="hackathonTiles">
        {hiring
          ?.filter((res) => res.opportunityType === "Event")
          .map((item, index) => {
            return (
              <HackathonCard
                details={item}
                data={data[index % data.length]}
                color={colorWheel[index % colorWheel.length]}
                key={index}
              />
            );
          })}
      </div>
      <div className="hackathonDetail">
        {hackId === "" ? (
          <div></div>
        ) : (
          <HackathonDesc details={{ ...hiringData }} />
        )}
      </div>
    </div>
  );
};

export default HackathonDetails;
