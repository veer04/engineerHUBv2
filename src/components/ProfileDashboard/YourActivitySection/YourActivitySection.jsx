import React, { useState, useRef } from "react";
import "./youractivitysection.css";
import { GoStopwatch } from "react-icons/go";
import ActivityCardsSaif from "./ActivityCardsSaif";
import PostCardActivity from "./PostCardActivity/PostCardActivity";
import JobCardForCompany from "../RecommendedSection/JobCardForCompany";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import StreakCard from "./StreakCard/StreakCard";
import Cookies from "js-cookie";

const YourActivitySection = ({
  streakData,
  jobData,
  internshipData,
  postData,
  isUserView = false, // true when viewing another user's profile
  userId = null, // userId when viewing another user's profile
}) => {
  const userRole = Cookies.get("role");
  const [actionButton, setActionButton] = useState("Streak");
  const [postPage, setPostPage] = useState(1);
  const scrollContainerRef = useRef(null);

  const itemsPerPage = 4;
  const maxItems = 100;
  const scrollAmount = 340;
  const CARDS_PER_ROW = 3;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const limitedPostData = postData?.slice(0, maxItems) || [];

  const paginatedPosts = limitedPostData.slice(
    (postPage - 1) * itemsPerPage,
    postPage * itemsPerPage
  );

  const handleButtonClick = (buttonName) => {
    setActionButton(buttonName);
  };

  // Limit job & internship data to 100 items
  const limitedJobData = jobData?.slice(0, maxItems) || [];
  const limitedInternshipData = internshipData?.slice(0, maxItems) || [];

  const showJobArrows = limitedJobData && limitedJobData.length > CARDS_PER_ROW * 2;
  const showInternshipArrows = limitedInternshipData && limitedInternshipData.length > CARDS_PER_ROW * 2;

  // Show Activities section for all users, but customize based on role

  return (
    <div className="your-activity-section-main">
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <GoStopwatch size={18} />
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#002B36" }}>
          {isUserView ? "Activities" : "Your Activities"}
        </h3>
      </div>

      <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
        {/* Streak button always first, then Jobs/Internships for Alumni */}
        {["Streak", ...(userRole === "Alumni" ? ["Jobs", "Internships"] : [])].map((buttonName) => (
          <button
            key={buttonName}
            onClick={() => handleButtonClick(buttonName)}
            style={{
              padding: "4px 16px",
              borderRadius: "10px",
              background: actionButton === buttonName ? "#138382" : "#f2f4f5",
              fontSize: 14,
              color: actionButton === buttonName ? "white" : "black",
              border: "none",
              cursor: "pointer",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.03)",
            }}
          >
            {buttonName}
          </button>
        ))}
      </div>

      {actionButton === "Streak" && (
        <div style={{ marginTop: 20, width: "100%" }}>
          <StreakCard streakData={streakData} userId={userId} />
        </div>
      )}

      {actionButton === "Posts" && (
        <>
          {paginatedPosts?.length > 0 ? (
            <>
              <div className="grid-post-card-activity">
                <PostCardActivity data={paginatedPosts} />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                <button
                  onClick={() => setPostPage((prev) => Math.max(prev - 1, 1))}
                  disabled={postPage === 1}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background: postPage === 1 ? "#f2f4f5" : "#138382",
                    color: postPage === 1 ? "#888" : "white",
                    border: "none",
                    cursor: postPage === 1 ? "default" : "pointer",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.03)",
                  }}
                >
                  Previous
                </button>

                <button
                  onClick={() =>
                    setPostPage((prev) =>
                      prev * itemsPerPage < limitedPostData.length
                        ? prev + 1
                        : prev
                    )
                  }
                  disabled={postPage * itemsPerPage >= limitedPostData.length}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background:
                      postPage * itemsPerPage >= limitedPostData.length
                        ? "#f2f4f5"
                        : "#138382",
                    color:
                      postPage * itemsPerPage >= limitedPostData.length
                        ? "#888"
                        : "white",
                    border: "none",
                    cursor:
                      postPage * itemsPerPage >= limitedPostData.length
                        ? "default"
                        : "pointer",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.03)",
                  }}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70px",
                // border: "1px solid black",
              }}
            >
              <p style={{ marginBottom: 0 }}>No Posts Added!</p>
            </div>
          )}
        </>
      )}

      {actionButton === "Jobs" && (
        <>
          {limitedJobData.length > 0 ? (
            <div className="carousel-wrapper" style={{ marginTop: 16 }}>
              {showJobArrows && (
                <button className="carousel-btn left" onClick={scrollLeft} aria-label="Scroll left">
                  <AiOutlineLeft size={20} />
                </button>
              )}
              <div className="carousel-grid" ref={scrollContainerRef}>
                <JobCardForCompany data={limitedJobData} adminView={!isUserView} />
              </div>
              {showJobArrows && (
                <button className="carousel-btn right" onClick={scrollRight} aria-label="Scroll right">
                  <AiOutlineRight size={20} />
                </button>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70px",
              }}
            >
              <p style={{ marginBottom: 0 }}>No Jobs Hosted!</p>
            </div>
          )}
        </>
      )}

      {actionButton === "Internships" && (
        <>
          {limitedInternshipData.length > 0 ? (
            <div className="carousel-wrapper" style={{ marginTop: 16 }}>
              {showInternshipArrows && (
                <button className="carousel-btn left" onClick={scrollLeft} aria-label="Scroll left">
                  <AiOutlineLeft size={20} />
                </button>
              )}
              <div className="carousel-grid" ref={scrollContainerRef}>
                <JobCardForCompany data={limitedInternshipData} adminView={!isUserView} />
              </div>
              {showInternshipArrows && (
                <button className="carousel-btn right" onClick={scrollRight} aria-label="Scroll right">
                  <AiOutlineRight size={20} />
                </button>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70px",
              }}
            >
              <p style={{ marginBottom: 0 }}>No Internships Hosted!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default YourActivitySection;
