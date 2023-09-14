import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsStar } from "react-icons/bs";
import { CgEye } from "react-icons/cg";
import { Chip } from "@mui/material";
import "./HackathonCards.css";
import { useNavigate } from "react-router-dom";

const HackathonCard = ({
  _id,
  opportunityPoster,
  organisationLogo,
  opportunityName,
  opportunityLocation,
  skillsRequired,
  className,
}) => {
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

  //data should be a object containing stars,views and days
  // stars should be random number between 3 and 5 using a random function and _id as its seed
  // views should be random number between 100 and 1000 using a random function and _id as its seed
  // days should be random number between 5 and 30 using a random function and _id as its seed
  let generate_random_number = new Math.seedrandom(_id);
  const data = {
    stars: Math.floor(generate_random_number() * (5 - 3 + 1) + 3),
    views: Math.floor(generate_random_number() * (1000 - 100 + 1) + 100),
    days: Math.floor(generate_random_number() * (30 - 5 + 1) + 5),
  };

  return (
    <div
      onClick={() => {
        navigate(`/company/events/${_id}`);
      }}
      className={`HackathonCard ${className}`}
    >
      <div className="cardImg">
        <img src={opportunityPoster} alt="" />
        <span className="GoogleIcon">
          <img src={organisationLogo} alt="Logo" />
        </span>
      </div>
      <div className="cardBody">
        <h4>{opportunityName}</h4>
        <h6>{opportunityLocation}</h6>
        <span className="Tags">
          {skillsRequired?.map((tag, index) => (
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
