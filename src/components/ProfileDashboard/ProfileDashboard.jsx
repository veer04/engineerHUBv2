import React, { useEffect, useState } from "react";
import "./profiledashboard.css";
import ProfileWithPostEditShare from "./ProfileWithPostEditShare/ProfileWithPostEditShare";
import ProfileCompletionSection from "./ProfileCompletionSection/ProfileCompletionSection";
import RecommendedSection from "./RecommendedSection/RecommendedSection";
import PerformanceSection from "./PerformanceSection/PerformanceSection";
import HostPageForProfileDashboard from "./HostpageForProfileDashboard/HostPageForProfileDashboard";
import YourActivitySection from "./YourActivitySection/YourActivitySection";
import ProfileWithFollowAndMail from "./UserViewProfileDashboard/ProfileWithFollowAndMail/ProfileWithFollowAndMail";
import UserStatsSection from "./UserViewProfileDashboard/UserStatsSection/UserStatsSection";
import { getUserId } from "../../features/User/UserDetails";
import { API_URL } from "../../services/APIUtils";
import axios from "axios";
import { getAccessToken } from "../../features/getCookieValues";

const ProfileDashboard = () => {
  const [privateDashboardData, setPrivateDashboardData] = useState(null);

  const getPrivateDashboardData = async () => {
    try {
      const config = {
        accessToken: getAccessToken(),
      };
      const response = await axios.get(
        `${API_URL}api/v1/userDashboard/private`,
        {
          headers: config,
        }
      );

      if (response.status === 200) {
        console.log(response.data, "Private Admin Data");

        const data = response.data;
        setPrivateDashboardData(data.data.data);
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
    getPrivateDashboardData();
  }, []);

  return (
    <>
      <main className="main-profile-dashboard">
        <div className="main-profile-dashboard-panel">
          <div className="main-profile-dashboard-left">
            <ProfileWithPostEditShare
              privateDashboardData={privateDashboardData}
              setPrivateDashboardData={setPrivateDashboardData}
            />
            <div style={{ marginTop: 20 }}>
              <ProfileCompletionSection />
            </div>
            <img
              className="profile-dashboard-rectangle-img-1"
              style={{ marginTop: 20, borderRadius: 8 }}
              src="./rectangle-img.png"
              alt="We are live poster"
            />
          </div>

          <div className="main-profile-dashboard-right">
            <RecommendedSection />
            <div style={{ marginTop: 15 }}>
              <PerformanceSection />
            </div>

            <div style={{ marginTop: 15 }}>
              <HostPageForProfileDashboard />
            </div>

            <div style={{ marginTop: 15 }}>
              <YourActivitySection />
            </div>
          </div>
        </div>

        <img
          style={{
            marginTop: 20,
            padding: "10px",
            borderRadius: 8,
            marginBottom: 20,
          }}
          className="profile-dashboard-rectangle-img-2"
          src="./rectangle-img.png"
          alt="We are live poster"
        />
      </main>
    </>
  );
};

export default ProfileDashboard;
