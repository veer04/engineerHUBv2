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
  const [privateDashboardDataForComp, setPrivateDashboardDataForComp] =
    useState(null);

  const [streakData, setStreakData] = useState(null);
  const [jobData, setJobData] = useState(null);
  const [internshipData, setInternshipData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const userId = getUserId();
  const [loading, setLoading] = useState(false);

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
        setPrivateDashboardDataForComp(data.data.profileStatus);
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

  const getActivityData = async (userId, section) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}api/v1/userDashboard/activity-area?userId=${userId}&section=${section}&limit=${limit}&page=${page}`
      );

      if (response.status === 200) {
        if (section === "streak") {
          setStreakData(response.data.data);
        } else if (section === "job") {
          setJobData(response.data.data.applications);
        } else if (section === "internship") {
          setInternshipData(response.data.data.applications);
        } else if (section === "post") {
          setPostData(response.data.data);
        } else {
          setError("Unexpected response status.");
        }
      }
    } catch (error) {
      console.log("Error getting the data");
      setError("Error fetching Activity data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (privateDashboardData) {
      if (userId) {
        getActivityData(userId, "streak");
        getActivityData(userId, "job");
        getActivityData(userId, "internship");
        getActivityData(userId, "post");
      }
    }
  }, [privateDashboardData, limit, page]);

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
              <ProfileCompletionSection
                privateDashboardData={privateDashboardDataForComp}
              />
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
              <YourActivitySection
                streakData={streakData}
                jobData={jobData}
                internshipData={internshipData}
                postData={postData}
              />
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
