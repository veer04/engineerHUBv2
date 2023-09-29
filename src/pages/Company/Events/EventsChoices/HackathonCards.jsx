import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsStar } from "react-icons/bs";
import { CgEye } from "react-icons/cg";
import { Chip } from "@mui/material";
import "./HackathonCards.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ViewApplicantsModal from "../../../../components/Dashboard/ViewApplicantsModal";
import { set } from "react-hook-form";

const HackathonCard = ({
  _id,
  filterByCompany,
  filterName,
  opportunityPoster,
  organisationLogo,
  opportunityName,
  opportunityLocation,
  skillsRequired,
  className,
  views,
  totalAppliedUsers,
  adminView,
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
  const [toggleModal, setToggleModal] = useState(false);

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
        navigate(
          `/company/events/${_id}${filterByCompany ? `?q=${filterName}` : ""}`
        );
      }}
      className={`HackathonCard ${!!className ? className : ""}`}
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
        {!adminView && (
          <>
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
              <>
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
              </>
            </div>
          </>
        )}
        {adminView && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontWeight: "600",
              }}
            >
              {views ? views : "0"} Views
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setToggleModal(true);
                // navigate(`/company/projects/${data._id}/applicants`);
              }}
              style={{
                //should be in center
                // position: "relative",
                left: "50%",
                // transform: "translateX(-50%)",
                backgroundColor: "#014051",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                color: "#fff",
                fontWeight: "500",
                fontSize: "14px",
                cursor: "pointer",
                outline: "none",
                boxShadow: "0px 0px 3.5px 0px rgba(0,0,0,0.75)",
              }}
            >
              View Applicants
            </button>
          </div>
        )}
      </div>
      {toggleModal && (
        <ViewApplicantsModal
          applicantsCount={totalAppliedUsers}
          setToggleModal={setToggleModal}
        />
      )}
    </div>
  );
};

export default HackathonCard;
