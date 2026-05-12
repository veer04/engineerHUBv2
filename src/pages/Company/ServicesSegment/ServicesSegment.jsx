import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAccessToken } from "../../../features/getCookieValues";
import { PAYMENT_API_URL } from "../../../services/APIUtils";
import PromoteConnectCard from "../Referrals/PromoteServices/PromoteConnectCard";
import DigitalCards from "../Referrals/DigitalProducts/DigitalCards";
import "./ServicesSegment.css";

/** Same order as referrals `ConnectWithUs.jsx` */
const MEET_CUSTOM_ORDER = [
  "Professional Resume Writing",
  "Resume + Career Guidance | Referral (Exp: 0-2 years)",
  "Referral for Abroad Careers",
  "Resume + Career Guidance | Referral (Exp: 2+ years)",
  "Personalized Projects for Your Target Role",
  "Ask Anything Related to Engineering",
  "Internship / Job Search & Strategy Guide",
  "1:1 Consultation Calls for Freelancers",
  "Placement Preparation Roadmap for 2025",
  "Career Support Program | 0-2 YOE",
  "Career Support Program | 2-5 YOE",
  "Career Support Program | 5+ YOE",
];

const MEET_EXCLUDED_ID = "67a107c89d57a46e99582bd1";

/** Same order as referrals `DigitalProducts.jsx` */
const DIGITAL_CUSTOM_ORDER = [
  "Editable Resume Template – 94% ATS Score",
  "Company-Wise Complete Preparation Guide",
  "Last 2 Years' Startup & Mid-Company Tech Interview Ques",
  "ATS-Friendly Templates for Frontend, Backend, and Full-Stack Roles",
  "FAANG Equivalent Companies - Top 100",
  "Complete DSA Resources for Interview Preparation",
  "A Complete Package for Data Science Students",
];

function sortMeetsByReferralsOrder(data) {
  return [...data].sort((a, b) => {
    const indexA = MEET_CUSTOM_ORDER.indexOf(a.title);
    const indexB = MEET_CUSTOM_ORDER.indexOf(b.title);
    return (
      (indexA === -1 ? data.length : indexA) -
      (indexB === -1 ? data.length : indexB)
    );
  });
}

function sortDigitalByReferralsOrder(data) {
  return [...data].sort((a, b) => {
    const indexA = DIGITAL_CUSTOM_ORDER.indexOf(a.title);
    const indexB = DIGITAL_CUSTOM_ORDER.indexOf(b.title);
    return (
      (indexA === -1 ? data.length : indexA) -
      (indexB === -1 ? data.length : indexB)
    );
  });
}

const ServicesSegment = () => {
  const [courseData, setCourseData] = useState([]);
  const [allMeetData, setAllMeetData] = useState([]);

  const getAllOpenMeet = async () => {
    try {
      const response = await fetch(`${PAYMENT_API_URL}payment/meet/open`);
      if (response.ok) {
        const data = await response.json();
        const filteredData = data?.data?.filter(
          (item) => item._id !== MEET_EXCLUDED_ID
        );
        setAllMeetData(sortMeetsByReferralsOrder(filteredData || []));
      }
    } catch (error) {
      console.error("Error fetching meet data:", error);
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
        `${PAYMENT_API_URL}payment/course/open`,
        config
      );
      setCourseData(sortDigitalByReferralsOrder(data?.data || []));
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  useEffect(() => {
    getAllOpenMeet();
    getallProductData();
  }, []);

  const meetCards = useMemo(() => allMeetData.slice(0, 3), [allMeetData]);

  const digitalCards = useMemo(() => courseData.slice(0, 3), [courseData]);

  const rating = [5, 4.5, 4.5];
  const popular = ["Popular", "Popular", "", "Popular", ""];

  return (
    <section className="services-segment">
      <div className="services-segment-header">
        <h2 className="segment-heading">Our Services</h2>
      </div>

      <div className="services-grid">
        <div
          className="services-grid__row services-grid__row--meets"
          aria-label="Connect with us sessions"
        >
          {meetCards.map((card, index) => (
            <div className="services-grid__cell" key={card._id}>
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
          ))}
        </div>

        <div
          className="services-grid__row services-grid__row--digital"
          aria-label="Digital products"
        >
          {digitalCards.map((card, index) => (
            <div className="services-grid__cell" key={card._id}>
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
