import React, { useEffect, useState } from "react";
import "./promoteservices.css";

import axios from "axios";
import { getAccessToken } from "../../../../features/getCookieValues";

import DigitalCards from "../DigitalProducts/DigitalCards";
import { PAYMENT_API_URL } from "../../../../services/APIUtils";
import PromoteConnectCard from "./PromoteConnectCard";

const PromoteServices = ({ compName }) => {
  const [filterDigitalProducts, setFilterDigitalProducts] = useState("All");
  const [visibleCards, setVisibleCards] = useState([]);
  const [animationClass, setAnimationClass] = useState("show");
  const [courseData, setCourseData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [allMeetData, setAllMeetData] = useState([]);

  const getAllOpenMeet = async () => {
    try {
      const response = await fetch(`${PAYMENT_API_URL}api/v1/meet/open`);

      if (response.ok) {
        const data = await response.json();

        // Filter the data to only show the desired item
        const filteredData = data?.data.filter(
          (item) =>
            item.title ===
            "Resume + Career Guidance | Referral (Exp: 0-2 years)"
        );

        setAllMeetData(filteredData);

        console.log(filteredData, "filtered meet data");
      } else {
        throw new Error("error getting the data");
      }
    } catch (error) {
      console.error("error getting the data", error);
    }
  };

  useEffect(() => {
    getAllOpenMeet();
  }, []);

  const shuffleArrayData = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1 + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const customOrder = [
    "Editable Resume Template – 94% ATS Score",
    "Company-Wise Complete Preparation Guide",
    "ATS-Friendly Templates for Frontend, Backend, and Full-Stack Roles",
    "FAANG Equivalent Companies - Top 100",
    "Complete DSA Resources for Interview Preparation",
    "A Complete Package for Data Science Students",
  ];

  const filterData = (data) => {
    const filteredTitles = [
      "Company-Wise Complete Preparation Guide",
      "Editable Resume Template – 94% ATS Score",
    ];

    return data.filter((item) => filteredTitles.includes(item.title));
  };

  const sortDataByCustomOrder = (data) => {
    return data.sort((a, b) => {
      const indexA = customOrder.indexOf(a.title);
      const indexB = customOrder.indexOf(b.title);

      // If the title is not found in the custom order, push it to the end
      return (
        (indexA === -1 ? data.length : indexA) -
        (indexB === -1 ? data.length : indexB)
      );
    });
  };

  const getallProductData = async () => {
    try {
      const config = {
        headers: {
          accesstoken: getAccessToken(),
        },
      };

      const { data } = await axios.get(
        `${PAYMENT_API_URL}api/v1/course/open`,
        config
      );

      console.log(data, "productData");

      const filteredData = filterData(data.data);
      const sortedData = sortDataByCustomOrder(filteredData);
      setCourseData(sortedData);
    } catch (error) {
      console.log(error);
    }
  };

  const rating = [5, 4.5, 4.5];
  const popular = ["Popular", "Popular", "", "Popular", ""];

  useEffect(() => {
    getallProductData();
  }, []);

  useEffect(() => {
    setAnimationClass("hidden");
    const timer = setTimeout(() => {
      setVisibleCards(getFilterCards());
      setAnimationClass("show");
    }, 500);

    return () => clearTimeout(timer);
  }, [filterDigitalProducts, courseData]);

  const handleFilterChange = (filter) => {
    setFilterDigitalProducts(filter);
    setActiveFilter(filter);
  };

  const getFilterCards = () => {
    switch (filterDigitalProducts) {
      case "Cheatsheets":
        return courseData.filter((card) => card.type === "Cheatsheet");
      case "Notes":
        return courseData.filter((card) => card.type === "Notes");
      case "All":
        return courseData;
      default:
        return [];
    }
  };
  return (
    <div id="digital-product" className="promote-main-container-prdoucts">
      <div>
        <h4 className="promote-txt">{compName}</h4>
      </div>

      {/* <div className="filter-cards-btns">
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
          onClick={() => handleFilterChange("All")}
        >
          All
        </button>
        <button
          style={{
            backgroundColor:
              activeFilter === "Cheatsheets" ? "#138382" : "#f2f4f5",
            color: activeFilter === "Cheatsheets" ? "white" : "#002b36",
            padding: "4px 16px",
            borderRadius: "10px",
            border: "none",
            marginRight: "10px",
            marginBottom: "10px",
          }}
          onClick={() => handleFilterChange("Cheatsheets")}
        >
          Cheatsheet
        </button>
        <button
          style={{
            backgroundColor: activeFilter === "Notes" ? "#138382" : "#f2f4f5",
            color: activeFilter === "Notes" ? "white" : "#002b36",
            padding: "4px 16px",
            borderRadius: "10px",
            border: "none",
            marginRight: "10px",
            marginBottom: "10px",
          }}
          onClick={() => handleFilterChange("Notes")}
        >
          Notes
        </button>
      </div> */}

      <div className="promote-flex-div">
        <div className="digital-cards">
          {allMeetData.map((card, index) => (
            <PromoteConnectCard
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
        <div
          style={{ marginTop: 20 }}
          className={`digital-cards ${animationClass}`}
        >
          {courseData.map((card, index) => (
            <DigitalCards
              key={card._id}
              id={card._id}
              discount={card.discount}
              price={card.price}
              mrp={card.mrp}
              thumbnail={card.thumbnail}
              title={card.title}
              subTitle={card.subTitle}
              desc={card.description}
              type={card.type}
              rating={rating[index % rating.length]}
              popular={popular[index % popular.length]}
            />
          ))}
        </div>
      </div>

      {visibleCards?.length > 3 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          {/* <div className="button-container">
            <span className="view-btn">View more</span>
            <div className="icon-container">
              <img
                src="/chevro-right.svg"
                alt="Chevron"
                className="chevron-icon"
              />
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default PromoteServices;
