import React, { useEffect, useState } from "react";
import "./Connect.css";
import ConnectCards from "./ConnectCards/ConnectCards";
import { API_URL } from "../../../services/APIUtils";
import { useParams } from "react-router-dom";

const ConnectWithUs = ({ compName }) => {
  const [filterConnects, setFilterConnects] = useState("All");
  const [visibleCards, setVisibleCards] = useState([]);
  const [animationClass, setAnimationClass] = useState("show");
  const [allMeetData, setAllMeetData] = useState([]);
  const { referralId } = useParams();

  const getAllOpenMeet = async () => {
    try {
      const response = await fetch(
        `https://meet-engineerhub.onrender.com/api/v1/meet/open`
      );

      if (response.ok) {
        const data = await response.json();
        setAllMeetData(data?.data);

        console.log(data, "getallmeetdata");
      } else {
        throw new Error("error getting the data");
      }
    } catch (error) {
      console.error("error getting the data");
    }
  };

  useEffect(() => {
    getAllOpenMeet();
  }, []);

  useEffect(() => {
    setAnimationClass("hidden");
    const timer = setTimeout(() => {
      setVisibleCards(getFilteredCards());
      setAnimationClass("show");
    }, 500);

    return () => clearTimeout(timer);
  }, [filterConnects, allMeetData]);

  const handleFilter = (filter) => {
    setFilterConnects(filter);
  };

  const getFilteredCards = () => {
    switch (filterConnects) {
      case "All":
        return allMeetData;
      case "Job Referrals":
        return allMeetData.filter((card) => card.type === "Job Referral");
      case "1:1 Connect":
        return allMeetData.filter((card) => card.type === "1:1 Connect");
      case "Mock Interview":
        return allMeetData.filter((card) => card.type === "Mock Interview");
      default:
        return [];
    }
  };
  return (
    <div className="main-container-connect">
      <div>
        <h4 className="connect-txt">{compName}</h4>
      </div>

      <div className="filter-cards-btns">
        <button onClick={() => handleFilter("All")}>All</button>
        <button onClick={() => handleFilter("Job Referrals")}>
          Job Referrals
        </button>
        <button onClick={() => handleFilter("1:1 Connect")}>1:1 Connect</button>
        <button onClick={() => handleFilter("Mock Interview")}>
          Mock Interview
        </button>
      </div>

      {/* <div className={`connect-cards `}>
        <ConnectCards />
        <ConnectCards />
        <ConnectCards />
      </div> */}

      <div className={`connect-cards ${animationClass}`}>
        {visibleCards.map((card) => (
          <ConnectCards
            key={card._id}
            id={card._id}
            title={card.title}
            desc={card.description}
            duration={card.duration}
            price={card.price}
            type={card.type}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <div className="button-container">
          <span className="view-btn">View more</span>
          <div className="icon-container">
            <img
              src="/chevro-right.svg"
              alt="Chevron"
              className="chevron-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWithUs;
