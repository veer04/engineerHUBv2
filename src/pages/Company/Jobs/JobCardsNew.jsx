import React from "react";
import "./JobCardsNew.css";
import { MdLocationOn } from "react-icons/md";
import { BsBriefcase } from "react-icons/bs";
import { BiRupee } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

export default function JobCardsNew({ details }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    // Prevent default only if the link isn't working
    if (e.defaultPrevented) {
      e.preventDefault();
      navigate(`/career/jobs/${details?._id}`);
    }
  };

  const getStatusTag = () => {
    if (details?.isServiceOff) {
      return <span className="status-tag expired">Expired</span>;
    }
    if (!details?.applyLink) {
      return <span className="status-tag easy-apply">Easy Apply</span>;
    }
    return <span className="status-tag hiring-now">Hiring Now</span>;
  };

  const getFormattedSalary = () => {
    // If salary should not be shown, return the disclosure message
    if (!details?.showSalary) {
      return details?.salaryDisclosure || "Not Disclosed";
    }

    // Handle Range type salary
    if (details?.salaryType === "Range" && details?.minRange && details?.maxRange) {
      return `${details.minRange}-${details.maxRange} ${details?.salaryUnit || "LPA"}`;
    }

    // Handle Fixed type salary
    if (details?.salaryType === "Fixed" && details?.salaryAmount) {
      return `${details.salaryAmount} ${details?.salaryUnit || "LPA"}`;
    }

    // Handle direct amount
    if (details?.amount && details?.amount !== "N/A") {
      // Remove any "CTC" text and clean up the amount
      const cleanAmount = details.amount.replace(/CTC|ctc/g, "").trim();
      return cleanAmount;
    }

    // Default fallback
    return details?.salaryDisclosure || "Not Disclosed";
  };

  const getFormattedExperience = () => {
    // Check for freshers position
    if (details?.isForFreshers === true) {
      return "Freshers";
    }
    
    // Handle experience range
    if (details?.minExperience !== undefined && details?.maxExperience !== undefined) {
      if (details.minExperience === details.maxExperience) {
        return `${details.minExperience} Yrs`;
      }
      return `${details.minExperience}-${details.maxExperience} Yrs`;
    }

    return "Experience not specified";
  };

  const getFormattedLocation = () => {
    // Handle remote/WFH
    if (details?.opportunityLocation === "WFH") {
      return "Work From Home";
    }

    // Handle hybrid with city
    if (details?.opportunityLocation === "Hybrid") {
      return details?.city ? `Hybrid - ${details.city}` : "Hybrid";
    }

    // Handle on-site with city
    if (details?.opportunityLocation === "On-Site") {
      return details?.city || "On-Site";
    }

    // Default location display with city fallback
    return details?.city || details?.opportunityLocation || "Location not specified";
  };

  return (
    <Link 
      to={`/career/jobs/${details?._id}`} 
      className="job-card-link"
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className="job-card-new">
        <div className="company-info">
          <h3 className="company-name">{details?.organisationName}</h3>
          <h2 className="job-title">{details?.opportunityName}</h2>
        </div>

        <div className="job-details">
          <div className="detail-row">
            <div className="detail-item">
              <MdLocationOn className="icon" />
              <span>{getFormattedLocation()}</span>
            </div>
            <div className="detail-item">
              <BiRupee className="icon" />
              <span>{getFormattedSalary()}</span>
            </div>
            <div className="detail-item">
              <BsBriefcase className="icon" />
              <span>{getFormattedExperience()}</span>
            </div>
          </div>
        </div>

        <div className="card-footer">
          {getStatusTag()}
          <span className="end-date">
            End by: {new Date(details?.applicationEndTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </span>
        </div>

        <div className="company-logo">
          <img 
            src={details?.organisationLogo} 
            alt={`${details?.organisationName} logo`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/frontend/profile/dashboard/default_company_logo.png";
            }}
          />
        </div>
      </div>
    </Link>
  );
}