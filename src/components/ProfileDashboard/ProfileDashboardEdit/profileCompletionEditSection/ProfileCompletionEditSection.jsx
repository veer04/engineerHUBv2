import React, { useEffect, useRef, useState } from "react";
import "./profileCompletionEditSection.css";
import SocialLinksModal from "../SocialLinksProfile/SocialLinksModal";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ProfileCompletionEditSection = ({ privateDashboardData }) => {
  const [profileCompletion, setProfileCompletion] = useState(100);

  console.log(privateDashboardData, "privateDashboardData");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const handleRedirectAndScroll = (id) => {
    navigate(`#${id}`);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (privateDashboardData) {
      const {
        achievementDetails = 0,
        educationDetails = 0,
        experienceDetails = 0,
        licenceDetails = 0,
        projectDetails = 0,
        resume = 0,
        skillsDetails = 0,
        socialMediaDetails = 0,
      } = privateDashboardData;

      const totalCompletion =
        achievementDetails +
        educationDetails +
        experienceDetails +
        licenceDetails +
        projectDetails +
        resume +
        skillsDetails +
        socialMediaDetails;

      const totalFields = 8;

      const averageCompletion = totalCompletion / totalFields;

      setProfileCompletion(totalCompletion);
    }
  }, [privateDashboardData]);
  return (
    <>
      <div className="profile-completion-edit-main-section">
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            lineHeight: "24px",
            fontStyle: "normal",
            color: "#002B36",
          }}
        >
          Profile Completion{" "}
        </h3>

        <div className="percentage-and-completed-section">
          <h3
            style={{
              fontSize: 24,
              fontWeight: 600,
              lineHeight: "20px",
              fontStyle: "normal",
              color: "#002B36",
              marginBottom: 0,
              // color: "#DA1E28",
              textAlign: "center",
              marginTop: 5,
            }}
          >
            {profileCompletion ? `${profileCompletion.toFixed(1)} %` : "0 %"}
          </h3>

          <div>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              Profile Completed
            </h3>

            <h3
              style={{
                fontSize: 12,
                fontWeight: 400,
                lineHeight: "16px",
                fontStyle: "normal",
                color: "#002B36",
              }}
            >
              Recruiters Notice you from 70%
            </h3>
          </div>
        </div>

        <div className="progress-container-main">
          <div
            className="progress-bar-sub"
            style={{
              width: `${profileCompletion}%`,
              backgroundColor: profileCompletion > 70 ? "#08E045" : "#DA1E28",
            }}
          ></div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex" }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              Achievement
            </h3>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#39D353",
                marginBottom: 0,
                marginLeft: 10,
              }}
            >
              {(privateDashboardData &&
                privateDashboardData.achievementDetails) ||
                0}
              %
            </h4>
          </div>

          <div onClick={() => handleRedirectAndScroll("add-achievements")}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#138382",
                marginBottom: 0,
                cursor: "pointer",
              }}
            >
              Add
            </h3>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex" }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              Education
            </h3>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#39D353",
                marginBottom: 0,
                marginLeft: 10,
              }}
            >
              {(privateDashboardData &&
                privateDashboardData?.educationDetails) ||
                0}
              %
            </h4>
          </div>

          <div onClick={() => handleRedirectAndScroll("add-education")}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#138382",
                marginBottom: 0,
                cursor: "pointer",
              }}
            >
              Add
            </h3>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex" }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              Experience
            </h3>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#39D353",
                marginBottom: 0,
                marginLeft: 10,
              }}
            >
              {(privateDashboardData &&
                privateDashboardData?.experienceDetails) ||
                0}
              %
            </h4>
          </div>

          <div onClick={() => handleRedirectAndScroll("add-experience")}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#138382",
                marginBottom: 0,
                cursor: "pointer",
              }}
            >
              Add
            </h3>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex" }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              Certificate
            </h3>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#39D353",
                marginBottom: 0,
                marginLeft: 10,
              }}
            >
              {(privateDashboardData && privateDashboardData?.licenceDetails) ||
                0}
              %
            </h4>
          </div>

          <div onClick={() => handleRedirectAndScroll("add-certifications")}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#138382",
                marginBottom: 0,
                cursor: "pointer",
              }}
            >
              Add
            </h3>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex" }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              Skills
            </h3>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#39D353",
                marginBottom: 0,
                marginLeft: 10,
              }}
            >
              {(privateDashboardData && privateDashboardData?.skillsDetails) ||
                0}
              %
            </h4>
          </div>

          <div onClick={() => handleRedirectAndScroll("add-skills")}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#138382",
                marginBottom: 0,
                cursor: "pointer",
              }}
            >
              Add
            </h3>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex" }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              Resume
            </h3>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#39D353",
                marginBottom: 0,
                marginLeft: 10,
              }}
            >
              {(privateDashboardData && privateDashboardData?.resume) || 0}%
            </h4>
          </div>

          <div onClick={() => handleRedirectAndScroll("upload-resume")}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#138382",
                marginBottom: 0,
                cursor: "pointer",
              }}
            >
              Upload
            </h3>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex" }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              Social Media
            </h3>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#39D353",
                marginBottom: 0,
                marginLeft: 10,
              }}
            >
              {(privateDashboardData &&
                privateDashboardData?.socialMediaDetails) ||
                0}
              %
            </h4>
          </div>

          <div onClick={() => handleRedirectAndScroll("add-social-links")}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                fontStyle: "normal",
                color: "#138382",
                marginBottom: 0,
                cursor: "pointer",
              }}
            >
              Add
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCompletionEditSection;
