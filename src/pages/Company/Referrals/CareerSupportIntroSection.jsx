import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PAYMENT_API_URL } from "../../../services/APIUtils";
import "./CareerSupportIntroSection.css";

const CareerSupportIntroSection = () => {
  const [freshersMeetId, setFreshersMeetId] = useState(null);
  const [midLevelMeetId, setMidLevelMeetId] = useState(null);
  const [seniorMeetId, setSeniorMeetId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getAllMeetIds = async () => {
      try {
        const response = await fetch(`${PAYMENT_API_URL}payment/meet/open`);

        if (response.ok) {
          const data = await response.json();
          const excludedId = "67a107c89d57a46e99582bd1";
          const filteredData = data?.data?.filter(
            (item) => item._id !== excludedId
          );
          
          // Find the meet with title "Career Support Program | 0-2 YOE" or variations
          const freshersMeet = filteredData?.find(
            (item) => {
              const title = item.title || "";
              return (
                title === "Career Support Program | 0-2 YOE" ||
                title === "Career Support Program | 0 - 2 YOE" ||
                (title.includes("Career Support Program") && 
                 (title.includes("0-2") || title.includes("0 - 2") || title.includes("0 to 2")))
              );
            }
          );
          
          // Find the meet with title "Career Support Program | 2-5 YOE" or variations
          const midLevelMeet = filteredData?.find(
            (item) => {
              const title = item.title || "";
              return (
                title === "Career Support Program | 2-5 YOE" ||
                title === "Career Support Program | 2 - 5 YOE" ||
                (title.includes("Career Support Program") && 
                 (title.includes("2-5") || title.includes("2 - 5") || title.includes("2 to 5")))
              );
            }
          );
          
          // Find the meet with title "Career Support Program | 5+ YOE" or variations
          const seniorMeet = filteredData?.find(
            (item) => {
              const title = item.title || "";
              return (
                title === "Career Support Program | 5+ YOE" ||
                title === "Career Support Program | 5 + YOE" ||
                title === "Career Support Program | 5+YOE" ||
                (title.includes("Career Support Program") && 
                 (title.includes("5+") || title.includes("5 +") || title.includes("5+YOE")))
              );
            }
          );
          
          if (freshersMeet) {
            setFreshersMeetId(freshersMeet._id);
          }
          if (midLevelMeet) {
            setMidLevelMeetId(midLevelMeet._id);
          }
          if (seniorMeet) {
            setSeniorMeetId(seniorMeet._id);
          }
          
          // Log available titles for debugging if any service is not found
          if (!freshersMeet || !midLevelMeet || !seniorMeet) {
            console.log("Available meet titles:", filteredData?.map(item => item.title));
          }
        }
      } catch (error) {
        console.error("Error fetching meet data:", error);
      }
    };

    getAllMeetIds();
  }, []);

  const handleFreshersClick = (e) => {
    if (freshersMeetId) {
      e.preventDefault();
      navigate(
        `/referrals/book-now/${freshersMeetId}${
          location.search.includes("ref")
            ? `?ref=${location?.search?.split("ref=")[1]?.split("&")[0]}`
            : ``
        }`
      );
    }
  };

  const handleMidLevelClick = (e) => {
    if (midLevelMeetId) {
      e.preventDefault();
      navigate(
        `/referrals/book-now/${midLevelMeetId}${
          location.search.includes("ref")
            ? `?ref=${location?.search?.split("ref=")[1]?.split("&")[0]}`
            : ``
        }`
      );
    }
  };

  const handleSeniorClick = (e) => {
    if (seniorMeetId) {
      e.preventDefault();
      navigate(
        `/referrals/book-now/${seniorMeetId}${
          location.search.includes("ref")
            ? `?ref=${location?.search?.split("ref=")[1]?.split("&")[0]}`
            : ``
        }`
      );
    }
  };

  return (
    <section className="career-support-intro-section">
      <div className="career-support-content">
        <div className="limited-chip">Limited</div>
        <h2 className="career-support-tagline">
          Career Support Program - Guaranteed Placement 
        </h2>
        <h3 className="career-support-subheading">
          Your complete pathway to getting shortlisted & hired faster.
        </h3>
        <p className="career-support-intro">
          Most candidates struggle to get interview calls because of weak
          resumes, irrelevant projects, and low visibility. This program fixes
          all three so companies notice you.
        </p>

        <div className="highlights-video-container">
          <div className="highlights-section">
            <h3 className="career-support-subheading">
              What you get
            </h3>
            <ul className="career-support-highlights">
              <svg className="curved-path-svg" viewBox="0 0 10 600" preserveAspectRatio="none">
                <path
                  className="curved-path-line"
                  d="M 5 0 Q 7 50 5 100 Q 3 150 5 200 Q 7 250 5 300 Q 3 350 5 400 Q 7 450 5 500 Q 3 550 5 600"
                  fill="none"
                  stroke="rgba(19, 131, 130, 0.3)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <li className="highlight-item">
                <span className="highlight-text">Industry-Standard Resume(90+ ATS Score)</span>
              </li>
              <li className="highlight-item">
                <span className="highlight-text">Profile Directly Shared with Top Companies HRs & Technical Recruiters</span>
              </li>
              <li className="highlight-item">
                <span className="highlight-text">Guaranteed Referral Support (5–7)</span>
              </li>
              <li className="highlight-item">
                <span className="highlight-text">Project Roadmap & Guidance ( If required )</span>
              </li>
              <li className="highlight-item">
                <span className="highlight-text">Focused Interview Preparation Material & Mock Interviews</span>
              </li>
              <li className="highlight-item highlight-item-last highlight-item-hired">
                <span className="highlight-text">Hired</span>
                <div className="success-animation">✨</div>
                <div className="winning-celebration">
                  <span className="celebration-star">⭐</span>
                  <span className="celebration-star">⭐</span>
                  <span className="celebration-star">⭐</span>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Career Growth Video */}
          <video
            className="career-growth-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="https://frontendehubbucket.s3.ap-south-1.amazonaws.com/video_groww.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="career-support-cta-container">
          <h3 className="cta-section-title">Choose Your Experience Level</h3>
          <p className="cta-section-subtitle">Select the program that matches your experience</p>
          <div className="experience-segments">
            <Link 
              to={freshersMeetId ? `/referrals/book-now/${freshersMeetId}` : "/career-support/freshers"}
              onClick={handleFreshersClick}
              className="experience-segment segment-1"
            >
              <div className="segment-icon">🎓</div>
              <div className="segment-content">
                <h4 className="segment-title">Freshers to 2 YOE</h4>
                <p className="segment-description">Perfect for recent graduates and early career professionals</p>
              </div>
            </Link>
            
            <Link 
              to={midLevelMeetId ? `/referrals/book-now/${midLevelMeetId}` : "/career-support/mid-level"}
              onClick={handleMidLevelClick}
              className="experience-segment segment-2"
            >
              <div className="segment-icon">🚀</div>
              <div className="segment-content">
                <h4 className="segment-title">2-5 YOE</h4>
                <p className="segment-description">Designed for mid-level professionals seeking for switch and hike</p>
              </div>
            </Link>
            
            <Link 
              to={seniorMeetId ? `/referrals/book-now/${seniorMeetId}` : "/career-support/senior"}
              onClick={handleSeniorClick}
              className="experience-segment segment-3"
            >
              <div className="segment-icon">💼</div>
              <div className="segment-content">
                <h4 className="segment-title">5+ YOE</h4>
                <p className="segment-description">Advanced program for senior professionals</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerSupportIntroSection;

