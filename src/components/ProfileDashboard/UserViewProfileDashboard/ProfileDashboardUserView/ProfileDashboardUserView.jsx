import React, { useEffect, useState } from "react";
import "./profiledashboarduserview.css";
import ProfileWithFollowAndMail from "../ProfileWithFollowAndMail/ProfileWithFollowAndMail";
import UserStatsSection from "../UserStatsSection/UserStatsSection";
import UserProfileAboutDesc from "../UserProfileAboutDesc/UserProfileAboutDesc";
import UserViewStudentFollow from "../UserViewStudentFollow/UserViewStudentFollow";
import EducationResume from "../EducationResume/EducationResume";
import ExperienceResume from "../ExperienceResume/ExperienceResume";
import SkillsResume from "../SkillsResume/SkillsResume";
import AchievementsResume from "../AchievementsResume/AchievementsResume";
import CertificationsResume from "../CertificationsResume/CertificationsResume";
import ProjectsResume from "../ProjectsResume/ProjectsResume";
import YourActivitySection from "../../YourActivitySection/YourActivitySection";
import MoreAboutYourCollegeSection from "../MoreAboutYourCollegeSection/MoreAboutYourCollegeSection";

const ProfileDashboardUserView = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 520);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="profile-dashboard-user-view-main">
        <div className="left-profile-dashboard-user">
          <ProfileWithFollowAndMail />

          <div style={{ marginTop: 10 }}>
            <UserStatsSection />
          </div>

          {/* //in desktop yeh dikhega */}

          {isMobile ? null : (
            <>
              <div style={{ marginTop: 10 }}>
                <UserViewStudentFollow title={"Other students from AKGCE"} />
              </div>
              <div style={{ marginTop: 10 }}>
                <UserViewStudentFollow title={"“Girish” also follows"} />
              </div>

              <div style={{ marginTop: 10 }}>
                <img
                  className="user-view-img"
                  style={{ borderRadius: 8 }}
                  src="./rectangle-img.png"
                />
              </div>
            </>
          )}
        </div>

        <div className="right-profile-dashboard-user">
          <div style={{ marginTop: 0 }}>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  lineHeight: "24px",
                  color: "#002B36",
                  marginBottom: 0,
                }}
              >
                Girish's Profile
              </h3>
            </div>
            <UserProfileAboutDesc />
            <div className="profile-dashboard-resume-grid">
              <div className="profile-dashboard-resume-grid-left">
                <EducationResume />
                <SkillsResume />
                <AchievementsResume />
                <CertificationsResume />
              </div>
              <div className="profile-dashboard-resume-grid-right">
                <ExperienceResume />
                <ProjectsResume />
              </div>
            </div>
            <div style={{ marginTop: 15 }}>
              <YourActivitySection />
            </div>
            <MoreAboutYourCollegeSection />

            {/* //in mobile yeh dikhega */}
            {isMobile ? (
              <>
                <div style={{ marginTop: 10 }}>
                  <UserViewStudentFollow title={"Other students from AKGCE"} />
                </div>

                <div style={{ marginTop: 10 }}>
                  <UserViewStudentFollow title={"Other students from AKGCE"} />
                </div>

                <div style={{ marginTop: 10 }}>
                  <img
                    className="user1-view-img"
                    style={{ borderRadius: 8 }}
                    src="./rectangle-img.png"
                  />
                </div>
              </>
            ) : null}

            {/* //in mobile yeh dikhega */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDashboardUserView;
