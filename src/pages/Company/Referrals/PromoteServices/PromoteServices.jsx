import React, { useCallback, useEffect, useState } from "react";
import "./promoteservices.css";

import axios from "axios";
import { getAccessToken } from "../../../../features/getCookieValues";

import DigitalCards from "../DigitalProducts/DigitalCards";
import { PAYMENT_API_URL } from "../../../../services/APIUtils";
import PromoteConnectCard from "./PromoteConnectCard";
import useEmblaCarousel from "embla-carousel-react";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./emblaCarousalArrowButton";
import { Link } from "react-router-dom";

const PromoteServices = ({ compName }) => {
  const [filterDigitalProducts, setFilterDigitalProducts] = useState("All");
  const [visibleCards, setVisibleCards] = useState([]);
  const [animationClass, setAnimationClass] = useState("show");
  const [courseData, setCourseData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [allMeetData, setAllMeetData] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  const [combineData, setCombineData] = useState([]);

  const mainTargetOrderForCarousal = [
    "Resume + Career Guidance | Referral (Exp: 0-2 years)",
    "Editable Resume Template – 94% ATS Score",
    "Last 2 Years' Startup & Mid-Company Tech Interview Ques",
    "Personalized Projects for Your Target Role",
    "Company-Wise Complete Preparation Guide",
    "Internship / Job Search & Strategy Guide",
  ];

  const getAllOpenMeet = async () => {
    try {
      const response = await fetch(`${PAYMENT_API_URL}api/v1/meet/open`);

      if (response.ok) {
        const data = await response.json();

        const filteredData = data?.data.filter((item) =>
          mainTargetOrderForCarousal.includes(item.title)
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
      const filteredCourseData = data?.data.filter((item) =>
        mainTargetOrderForCarousal.includes(item.title)
      );

      setCourseData(filteredCourseData);
    } catch (error) {
      console.log(error);
    }
  };

  const mergeDataInOrder = useCallback(() => {
    const mergedData = [...allMeetData, ...courseData].sort((a, b) => {
      return (
        mainTargetOrderForCarousal.indexOf(a.title) -
        mainTargetOrderForCarousal.indexOf(b.title)
      );
    });
    setCombineData(mergedData);
  }, [allMeetData, courseData]);

  useEffect(() => {
    getAllOpenMeet();
    getallProductData();
  }, []);

  useEffect(() => {
    mergeDataInOrder();
  }, [allMeetData, courseData, mergeDataInOrder]);

  const rating = [5, 4.5, 4.5];
  const popular = ["Popular", "Popular", "", "Popular", ""];

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div>
          <h4 className="promote-txt">{compName}</h4>
        </div>

        {/* <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div> */}
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

      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {combineData.map((card, index) => {
            return card.duration ? (
              <div className="embla__slide" key={card._id}>
                <PromoteConnectCard
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
              </div>
            ) : (
              <div className="embla__slide" key={card._id}>
                <DigitalCards
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
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
          gap: 15,
        }}
      >
        <div>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </div>
        <Link
          to={"/referrals"}
          style={{
            background: "transparent",
            border: "1px solid #138283",
            display: "flex",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
            width: "120px",
            height: "40px",
            borderRadius: 10,
            color: "white",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontSize: 16,
              lineHeight: "20px",
              color: "#138382",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            View more
          </span>
          {/* <FaCircleChevronRight /> */}
        </Link>

        <div>
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default PromoteServices;
