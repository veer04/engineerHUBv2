import React, { useRef, useState } from "react";
import "./yourcompanyactivitysection.css";
import { GoStopwatch } from "react-icons/go";
import NewCompanyPostCard from "./NewCompanyPostCard";
import { BsArrowRight, BsArrowUp } from "react-icons/bs";
import RecommendationCard2Activity from "../../../../components/ProfileDashboard/RecommendedSection/RecommendationCard2Activity";
import HackathonCard from "../../../Company/Events/EventsChoices/HackathonCards";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ProjectCards from "../../../Company/Projects/ProjectCards";
import JobCardForCompany from "../../../../components/ProfileDashboard/RecommendedSection/JobCardForCompany";

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
}) => {
  const [actionButton, setActionButton] = useState("Posts");
  const scrollContainerRef = useRef(null);
  const scrollAmount = 300;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleButtonClick = (buttonName) => {
    setActionButton((prev) => (prev === buttonName ? null : buttonName));
  };

  const currentData = (() => {
    switch (actionButton) {
      case "Posts":
        return posts;
      case "Jobs":
        return jobs;
      case "Internships":
        return internships;
      case "Hackathons":
        return hackathons;
      case "Projects":
        return projects;

      default:
        return [];
    }
  })();

  return (
    <div className="your-company-activity-section">
      <div className="title-main-div">
        <GoStopwatch size={18} />
        <h3 className="h3-act">Activities</h3>
      </div>

      <div className="main-btn-divs">
        {["Posts", "Jobs", "Internships", "Hackathons", "Projects"].map(
          (buttonName) => (
            <button
              key={buttonName}
              onClick={() => handleButtonClick(buttonName)}
              style={{
                padding: "4px 16px",
                borderRadius: "10px",
                background: actionButton === buttonName ? "#138382" : "#f2f4f5",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                color: actionButton === buttonName ? "white" : "black",
                border: "none",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.03)",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
            >
              {buttonName}
            </button>
          )
        )}
      </div>

      {currentData && currentData.length > 0 ? (
        <div className="carousel-container">
          <button className="carousel-btn left" onClick={scrollLeft}>
            <AiOutlineLeft size={24} />
          </button>

          <div className="carousel" ref={scrollContainerRef}>
            {actionButton === "Posts" &&
              posts.map((jobDetail, index) => (
                <NewCompanyPostCard key={index} {...jobDetail} />
              ))}

            {actionButton === "Jobs" && (
              <JobCardForCompany data={jobs} adminView={isUserAdmin} />
            )}

            {actionButton === "Internships" && (
              <JobCardForCompany data={internships} adminView={isUserAdmin} />
            )}

            {actionButton === "Hackathons" &&
              isActivityPresent &&
              hackathons.map((jobDetail, index) => (
                <HackathonCard
                  key={index}
                  {...jobDetail}
                  className="scroll-card no-hover-scale"
                  adminView={isUserAdmin}
                  filterByCompany={true}
                  filterName={organization?.name}
                />
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
          </div>

          <button className="carousel-btn right" onClick={scrollRight}>
            <AiOutlineRight size={24} />
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p style={{ color: "grey" }}>{`No ${actionButton} to show`}</p>
        </div>
      )}
    </div>
  );
};

export default YourCompanyActivitySection;
