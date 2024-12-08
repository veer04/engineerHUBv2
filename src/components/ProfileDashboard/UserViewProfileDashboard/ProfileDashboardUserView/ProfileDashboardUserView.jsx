import React, { useEffect, useState } from "react";
import "./profiledashboarduserview.css";
import ProfileWithFollowAndMail from "../ProfileWithFollowAndMail/ProfileWithFollowAndMail";
import UserStatsSection from "../UserStatsSection/UserStatsSection";
import UserProfileAboutDesc from "../UserProfileAboutDesc/UserProfileAboutDesc";
import UserViewStudentFollow from "../UserViewStudentFollow/UserViewStudentFollow";

import AchievementsResume from "../AchievementsResume/AchievementsResume";
import CertificationsResume from "../CertificationsResume/CertificationsResume";
import ProjectsResume from "../ProjectsResume/ProjectsResume";
import YourActivitySection from "../../YourActivitySection/YourActivitySection";
import MoreAboutYourCollegeSection from "../MoreAboutYourCollegeSection/MoreAboutYourCollegeSection";
import EducationResume from "../EducationResume/EducationResume";
import ExperienceResume from "../ExperienceResume/ExperienceResume";
import SkillsResume from "../SkillsResume/SkillsResume";
import { getUserId } from "../../../../features/User/UserDetails";
import axios from "axios";
import { API_URL } from "../../../../services/APIUtils";

const ProfileDashboardUserView = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);
  const [DashboardAdminData, setDashboardAdminData] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 520);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getPublicDashboardData = async () => {
    const userId = getUserId();

    try {
      const response = await axios.get(
        `${API_URL}api/v1/userDashboard/public/${userId}`
      );

      if (response.status === 200) {
        console.log(response.data, "Public Admin Data");

        const data = response.data;
        setDashboardAdminData(data.data.data);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error(
        "Error fetching profile data:",
        error.response || error.message
      );
    }
  };

  useEffect(() => {
    getPublicDashboardData();
  }, []);

  return (
    <>
      <main className="profile-dashboard-user-view-main">
        <div className="left-profile-dashboard-user">
          <ProfileWithFollowAndMail DashboardAdminData={DashboardAdminData} />

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
                  fontSize: 20,
                  fontWeight: 600,
                  lineHeight: "24px",
                  color: "#002B36",
                  marginBottom: 0,
                }}
              >
                {`${DashboardAdminData?.firstName}'s Profile`}
              </h3>
            </div>
            <UserProfileAboutDesc />
            <div className="profile-dashboard-resume-grid">
              <div className="profile-dashboard-resume-grid-left">
                <EducationResume DashboardAdminData={DashboardAdminData} />
                <SkillsResume DashboardAdminData={DashboardAdminData} />
                <AchievementsResume />
                <CertificationsResume />
              </div>
              <div className="profile-dashboard-resume-grid-right">
                <ExperienceResume DashboardAdminData={DashboardAdminData} />
                <ProjectsResume DashboardAdminData={DashboardAdminData} />
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
      </main>
    </>
  );
};

export default ProfileDashboardUserView;
