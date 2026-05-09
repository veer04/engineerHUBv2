import React, { useEffect, useState } from "react";
import "./InternshipCardNew.css";
import { MdLocationOn } from "react-icons/md";
import { BsBriefcase } from "react-icons/bs";
import { BiRupee } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const InternshipCardNew = ({ details }) => {
  const logoUrl =
    typeof details?.organisationLogo === "string"
      ? details.organisationLogo.trim()
      : "";
  const hasLogoUrl =
    Boolean(logoUrl) && logoUrl !== "undefined" && logoUrl !== "null";
  const [showLogo, setShowLogo] = useState(hasLogoUrl);

  useEffect(() => {
    setShowLogo(hasLogoUrl);
  }, [hasLogoUrl, logoUrl]);

  const getStatusTag = () => {
    if (details?.isServiceOff) {
      return <span className="status-tag expired">Expired</span>;
    }
    if (!details?.applyLink) {
      return <span className="status-tag easy-apply">Easy Apply</span>;
    }
    return <span className="status-tag hiring-now">Hiring Now</span>;
  };

  const getFormattedStipend = () => {
    // If it's a Campus Ambassador position with bonus
    if (details?.featuredArray?.includes("CampusAmbassador")) {
      return "Bonus";
    }

    // If it's an unpaid internship
    if (!details?.isPaid) {
      return "Unpaid";
    }

    // If salary should not be shown, return the disclosure message
    if (!details?.showSalary) {
      return details?.salaryDisclosure || "Not Disclosed";
    }

    // Handle Market Standard amount
    if (details?.amount === "MARKET STANDARD") {
      return "Market Standard";
    }

    // Handle Range type stipend
    if (details?.salaryType === "Range" && details?.minRange && details?.maxRange) {
      return `${details.minRange}-${details.maxRange} ${"/Month"}`;
    }

    // Handle Fixed type stipend
    if (details?.salaryType === "Fixed" && details?.salaryAmount) {
      return `₹${details.salaryAmount}${"/Month"}`;
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

  const getFormattedDuration = () => {
    // Handle single duration
    if (details?.duration) {
      return details.duration === 1 ? "1 Month" : `${details.duration} Months`;
    }
    
    // Handle range duration
    if (details?.minDuration && details?.maxDuration) {
      if (details.minDuration === details.maxDuration) {
        return details.minDuration === 1 ? "1 Month" : `${details.minDuration} Months`;
      }
      return `${details.minDuration} - ${details.maxDuration} Months`;
    }
    
    // Default case
    return "Duration not specified";
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
    <Link to={`/career/internships/${details?._id}`} className="job-card-link">
      <div className="job-card-new">
        <div className={`company-info ${showLogo ? "has-logo" : ""}`}>
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
              <span>{getFormattedStipend()}</span>
            </div>
            <div className="detail-item">
              <BsBriefcase className="icon" />
              <span>{getFormattedDuration()}</span>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <div className="status-section">
            {getStatusTag()}
            <span className="views-capsule">
              <BsEyeFill className="eye-icon" />
              <span className="views-count">{details?.views || 0}</span>
            </span>
          </div>
          <span className="end-date">
            Ends : {new Date(details?.applicationEndTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </span>
        </div>

        {showLogo && (
          <div className="company-logo">
            <img
              src={logoUrl}
              alt={`${details?.organisationName} logo`}
              loading="lazy"
              onError={() => {
                setShowLogo(false);
              }}
            />
          </div>
        )}
      </div>
    </Link>
  );
};

export default InternshipCardNew;
