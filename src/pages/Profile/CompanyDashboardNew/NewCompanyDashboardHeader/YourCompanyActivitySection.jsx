  import React, { useEffect, useRef, useState } from "react";
import "./yourcompanyactivitysection.css";
import { GoStopwatch } from "react-icons/go";
import NewCompanyPostCard from "./NewCompanyPostCard";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FiBriefcase, FiAward, FiFileText, FiCalendar } from "react-icons/fi";
import ProjectCards from "../../../Company/Projects/ProjectCards";
import JobCardForCompany from "../../../../components/ProfileDashboard/RecommendedSection/JobCardForCompany";
import JobCardsNew from "../../../Company/Jobs/JobCardsNew";
import InternshipCardNew from "../../../Company/Internship/InternshipCardNew";
import NewEventCard from "../../../../components/NewEventCard/NewEventCard";
import { useNavigate } from "react-router-dom";
import { checkJobPostingAccess } from "../../../../utils/checkJobPostingAccess";

const CARDS_PER_ROW = 3; // max visible cards in a row before needing to scroll

const getEmptyIcon = (type) => {
  switch (type) {
    case "Jobs":
      return <FiBriefcase />;
    case "Internships":
      return <FiAward />;
    case "Posts":
      return <FiFileText />;
    case "Hackathons":
      return <FiCalendar />;
    default:
      return <FiBriefcase />;
  }
};

const getEmptyMessage = (type, isAdmin) => {
  if (isAdmin) {
    switch (type) {
      case "Jobs":
        return "No jobs posted yet. Host a job to see your activity here.";
      case "Internships":
        return "No internships posted yet. Create an internship to get started.";
      case "Posts":
        return "No posts created yet.";
      case "Hackathons":
        return "No hackathons hosted yet.";
      default:
        return `No ${type} to show`;
    }
  } else {
    switch (type) {
      case "Jobs":
        return "No open job positions right now. Check back later for new opportunities!";
      case "Internships":
        return "No open internship positions right now. Check back later for new opportunities!";
      case "Posts":
        return "No posts published yet.";
      case "Hackathons":
        return "No active hackathons at the moment.";
      default:
        return `No ${type} available right now.`;
    }
  }
};

const YourCompanyActivitySection = ({
  posts,
  showAll,
  showAll1,
  setShowAll1,
  jobs,
  setJobs,
  isActivityPresent,
  hackathons,
  isUserAdmin,
  organization,
  projects,
  internships,
  onLoadMore,
  loadingMore,
  hasMoreJobs,
  hasMoreInternships,
}) => {
  const [actionButton, setActionButton] = useState("Jobs");
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const scrollAmount = 340;

  // Determine if current tab has more data to load
  const hasMore = actionButton === "Jobs" ? hasMoreJobs :
                  actionButton === "Internships" ? hasMoreInternships : false;

  const checkAndTriggerLoadMore = () => {
    if (!scrollContainerRef.current || !onLoadMore || loadingMore || !hasMore) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    if (scrollLeft + clientWidth >= scrollWidth - 300) {
      onLoadMore(actionButton);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      checkAndTriggerLoadMore();
      setTimeout(checkAndTriggerLoadMore, 200);
      setTimeout(checkAndTriggerLoadMore, 400);
    }
  };

  const handleButtonClick = (buttonName) => {
    setActionButton((prev) => {
      const next = prev === buttonName ? null : buttonName;
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = 0;
      }
      return next;
    });
  };

  // Infinite scroll: detect when user scrolls near the right edge
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !onLoadMore) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      if (scrollLeft + clientWidth >= scrollWidth - 300 && !loadingMore && hasMore) {
        onLoadMore(actionButton);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [onLoadMore, loadingMore, hasMore, actionButton]);

  const currentData = (() => {
    switch (actionButton) {
      case "Posts":     return posts;
      case "Jobs":      return jobs;
      case "Internships": return internships;
      case "Hackathons":  return hackathons;
      default:          return [];
    }
  })();

  // Show slider arrows only when there are more cards than fit in 2 rows
  const showArrows = currentData && currentData.length > CARDS_PER_ROW * 2;

  return (
    <div className="your-company-activity-section">
      {/* Header */}
      <div className="title-main-div">
        <GoStopwatch size={18} />
        <h3 className="h3-act">Activities</h3>
      </div>

      {/* Tab buttons */}
      <div className="main-btn-divs">
        {["Jobs", "Internships"].map((buttonName) => (
          <button
            key={buttonName}
            onClick={() => handleButtonClick(buttonName)}
            className={`act-tab-btn ${actionButton === buttonName ? "act-tab-btn--active" : ""}`}
          >
            {buttonName}
          </button>
        ))}
      </div>

      {/* Content */}
      {currentData && currentData.length > 0 ? (
        <div className="carousel-wrapper">
          {/* Scroll Left */}
          {showArrows && (
            <button className="carousel-btn left" onClick={scrollLeft} aria-label="Scroll left">
              <AiOutlineLeft size={20} />
            </button>
          )}

          {/* Card grid — 2 rows max, then scrolls horizontally */}
          <div className="carousel-grid" ref={scrollContainerRef}>
            {actionButton === "Posts" &&
              posts.map((jobDetail, index) => (
                <NewCompanyPostCard key={index} {...jobDetail} />
              ))}

            {(actionButton === "Jobs" || actionButton === "Internships") && (
              isUserAdmin ? (
                <JobCardForCompany
                  data={currentData}
                  adminView={isUserAdmin}
                />
              ) : (
                currentData.map((item, index) => (
                  actionButton === "Jobs" ? (
                    <JobCardsNew key={index} details={item} />
                  ) : (
                    <InternshipCardNew key={index} details={item} />
                  )
                ))
              )
            )}

            {actionButton === "Hackathons" &&
              isActivityPresent &&
              hackathons.map((item, index) => (
                <NewEventCard data={item} key={index} eventHiring={true} />
              ))}

            {actionButton === "Projects" &&
              projects.map((jobDetail, index) => (
                <ProjectCards
                  key={index}
                  data={jobDetail}
                  className="scroll-card no-hover-scale"
                  adminView={isUserAdmin}
                  filterByCompany={true}
                  filterName={organization?.name}
                />
              ))}

            {/* Loading spinner for infinite scroll */}
            {loadingMore && (
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "200px",
                padding: "20px",
                gap: "8px",
              }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  border: "3px solid #e0e0e0",
                  borderTopColor: "#138382",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }} />
                <span style={{ fontSize: "13px", color: "#547178" }}>Loading more...</span>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}
          </div>

          {/* Scroll Right */}
          {showArrows && (
            <button className="carousel-btn right" onClick={scrollRight} aria-label="Scroll right">
              <AiOutlineRight size={20} />
            </button>
          )}
        </div>
      ) : (
        /* Empty / Fallback state */
        <div className="act-empty-state">
          <div className="act-empty-icon">
            {getEmptyIcon(actionButton)}
          </div>
          <p className="act-empty-msg">
            {getEmptyMessage(actionButton, isUserAdmin)}
          </p>
          {(actionButton === "Jobs") && isUserAdmin && (
            <button
              className="act-empty-cta"
              onClick={async () => {
                const allowed = await checkJobPostingAccess(navigate);
                if (allowed) navigate("/host/job");
              }}
            >
              Host a Job →
            </button>
          )}
          {(actionButton === "Internships") && isUserAdmin && (
            <button
              className="act-empty-cta"
              onClick={async () => {
                const allowed = await checkJobPostingAccess(navigate);
                if (allowed) navigate("/host/internship");
              }}
            >
              Host an Internship →
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default YourCompanyActivitySection;
