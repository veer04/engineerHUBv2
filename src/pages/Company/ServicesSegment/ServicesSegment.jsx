import React, { useCallback, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PAYMENT_API_URL } from "../../../services/APIUtils";
import PromoteConnectCard from "../Referrals/PromoteServices/PromoteConnectCard";
import DigitalCards from "../Referrals/DigitalProducts/DigitalCards";
import "./ServicesSegment.css";

const ServicesSegment = () => {
  const [courseData, setCourseData] = useState([]);
  const [allMeetData, setAllMeetData] = useState([]);
  const [combineData, setCombineData] = useState([]);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

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
      }
    } catch (error) {
      console.error("Error fetching meet data:", error);
    }
  };

  const getallProductData = async () => {
    try {
      const { data } = await axios.get(`${PAYMENT_API_URL}api/v1/course/open`);
      const filteredCourseData = data?.data.filter((item) =>
        mainTargetOrderForCarousal.includes(item.title)
      );
      setCourseData(filteredCourseData);
    } catch (error) {
      console.error("Error fetching course data:", error);
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

  return (
    <section className="services-segment">
      <div className="services-segment-header">
        <h2 className="segment-heading">Our Services</h2>
      </div>

      <div className="services-embla">
        <div 
          className="services-embla__container"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {combineData.map((card, index) => (
            card.duration ? (
              <div className="services-embla__slide" key={card._id}>
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
              <div className="services-embla__slide" key={card._id}>
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
            )
          ))}
        </div>
      </div>

      <div className="services-segment-footer">
        <Link to="/referrals" className="view-more-link">
          View more
        </Link>
      </div>
    </section>
  );
};

export default ServicesSegment; 