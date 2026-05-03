import React, { useEffect, useState } from "react";
import "./Connect.css";
import ConnectCards from "./ConnectCards/ConnectCards";
import { API_URL, PAYMENT_API_URL } from "../../../services/APIUtils";
import { useParams } from "react-router-dom";

const ConnectWithUs = ({ compName }) => {
  const [filterConnects, setFilterConnects] = useState("All");
  const [visibleCards, setVisibleCards] = useState([]);
  const [animationClass, setAnimationClass] = useState("show");
  const [allMeetData, setAllMeetData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  const customOrder = [
    "Professional Resume Writing",
     "Resume + Career Guidance | Referral (Exp: 0-2 years)",
    "Referral for Abroad Careers",
    "Resume + Career Guidance | Referral (Exp: 2+ years)",
    "Personalized Projects for Your Target Role",
    "Ask Anything Related to Engineering",
    "Internship / Job Search & Strategy Guide",
    "1:1 Consultation Calls for Freelancers",
    "Placement Preparation Roadmap for 2025",
    "Internship / Job Search & Strategy Guide",
    "Career Support Program | 0-2 YOE",
    "Career Support Program | 2-5 YOE",
    "Career Support Program | 5+ YOE",
  ];

  const sortDataByCustomOrder = (data) => {
    return data.sort((a, b) => {
      const indexA = customOrder.indexOf(a.title);
      const indexB = customOrder.indexOf(b.title);

      return (
        (indexA === -1 ? data.length : indexA) -
        (indexB === -1 ? data.length : indexB)
      );
    });
  };

  const getAllOpenMeet = async () => {
    try {
      const response = await fetch(`${PAYMENT_API_URL}payment/meet/open`);

      if (response.ok) {
        const data = await response.json();
        const excludedId = "67a107c89d57a46e99582bd1";
        // Filter out the data with the excluded ID
        console.log(data.data, "All meets");
        const filteredData = data?.data?.filter(
          (item) => item._id !== excludedId
        );
        console.log(filteredData);
        const sortedData = sortDataByCustomOrder(filteredData);
        setAllMeetData(sortedData);
        // console.log(data, "getallmeetdata");
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

  const rating = [5, 5, 4.5, 5, 4.7];
  const popular = ["Popular", "Popular", "", "Popular", ""];

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
    setActiveFilter(filter);
  };

  const getFilteredCards = () => {
    switch (filterConnects) {
      case "All":
        return allMeetData;
      // case "Job Referrals":
      //   return allMeetData.filter((card) => card.type === "Job Referral");
      case "Referrals":
        return allMeetData.filter(
          (card) =>
            card.title ===
              "Resume + Career Guidance | Referral (Exp: 0-2 years)" ||
            card.title === "Resume + Career Guidance | Referral (Exp: 2+ years)"
        );
      case "1:1 Connect":
        return allMeetData.filter((card) => card.type === "1:1 Connect");
      case "Mock Interview":
        return allMeetData.filter((card) => card.type === "Mock Interview");
      default:
        return [];
    }
  };
  return (
    <div id="referral-section" className="main-container-connect">
      <div>
        <h4 className="connect-txt">{compName}</h4>
      </div>

      <div className="filter-cards-btns">
        <button
          style={{
            backgroundColor: activeFilter === "All" ? "#138382" : "#f2f4f5",
            color: activeFilter === "All" ? "white" : "#002b36",
            padding: "4px 16px",
            borderRadius: "10px",
            border: "none",
            marginRight: "10px",
            marginBottom: "10px",
          }}
          onClick={() => handleFilter("All")}
        >
          All
        </button>
        {/* <button
          style={{
            backgroundColor:
              activeFilter === "Job Referrals" ? "#138382" : "#f2f4f5",
            color: activeFilter === "Job Referrals" ? "white" : "#002b36",
            padding: "4px 16px",
            borderRadius: "10px",
            border: "none",
            marginRight: "10px",
            marginBottom: "10px",
          }}
          onClick={() => handleFilter("Job Referrals")}
        >
          Job Referrals
        </button> */}
        <button
          style={{
            backgroundColor:
              activeFilter === "Referrals" ? "#138382" : "#f2f4f5",
            color: activeFilter === "Referrals" ? "white" : "#002b36",
            padding: "4px 16px",
            borderRadius: "10px",
            border: "none",
            marginRight: "10px",
            marginBottom: "10px",
          }}
          onClick={() => handleFilter("Referrals")}
        >
          Referrals
        </button>
        <button
          style={{
            backgroundColor:
              activeFilter === "1:1 Connect" ? "#138382" : "#f2f4f5",
            color: activeFilter === "1:1 Connect" ? "white" : "#002b36",
            padding: "4px 16px",
            borderRadius: "10px",
            border: "none",
            marginRight: "10px",
            marginBottom: "10px",
          }}
          onClick={() => handleFilter("1:1 Connect")}
        >
          1:1 Connect
        </button>
        {/* <button
          style={{
            backgroundColor:
              activeFilter === "Mock Interview" ? "#138382" : "#f2f4f5",
            color: activeFilter === "Mock Interview" ? "white" : "#002b36",
            padding: "4px 16px",
            borderRadius: "10px",
            border: "none",
            marginRight: "10px",
            marginBottom: "10px",
          }}
          onClick={() => handleFilter("Mock Interview")}
        >
          Mock Interview
        </button> */}
      </div>

      {/* <div className={`connect-cards `}>
        <ConnectCards />
        <ConnectCards />
        <ConnectCards />
      </div> */}

      <div className={`connect-cards ${animationClass}`}>
        {visibleCards.map((card, index) => (
          <ConnectCards
            key={card._id}
            id={card._id}
            title={card.title}
            desc={card.description}
            duration={card.duration}
            price={card.price}
            mrp={card.mrp}
            type={card.type}
            rating={rating[index % rating.length]}
            popular={popular[index % popular.length]}
          />
        ))}
      </div>
      {!allMeetData.length === 3 > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <div className="button-container">
            <>
              <span className="view-btn">View more</span>

              <div className="icon-container">
                <img
                  src="/chevro-right.svg"
                  alt="Chevron"
                  className="chevron-icon"
                />
              </div>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWithUs;
