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
import { API_URL, Bucket_URL } from "../../services/APIUtils";
import axios from "axios";
import { getAccessToken } from "../../features/getCookieValues";
import { useParams } from "react-router-dom";
import ProfileDashboardUserView from "./UserViewProfileDashboard/ProfileDashboardUserView/ProfileDashboardUserView";

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
  const currentUserId = getUserId();
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();
  // console.log(userId, "kjhgf");

  if (userId && userId != currentUserId) {
    return <ProfileDashboardUserView />;
  }

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
        // console.log(response.data, "Private Admin Data");

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

  const getActivityData = async (currentUserId, section) => {
    setLoading(true);
    let currentPage = 1; // Start from page 1
    const pageLimit = 10; // Fetch data in chunks
    let allData = [];

    try {
      while (true) {
        const response = await axios.get(
          `${API_URL}api/v1/userDashboard/activity-area?userId=${currentUserId}&section=${section}&limit=${pageLimit}&page=${currentPage}`
        );

        if (response.status === 200 && response.data.data) {
          let newData = [];

          if (section === "streak") {
            newData = Array.isArray(response.data.data)
              ? response.data.data
              : [];
            setStreakData((prevData) => [...(prevData || []), ...newData]);
          } else if (section === "job") {
            newData = Array.isArray(response.data.data.applications)
              ? response.data.data.applications
              : [];

            setJobData((prevData) => {
              const updatedData = [...(prevData || []), ...newData];
              return updatedData.slice(0, 100); // Ensure jobData never exceeds 100 items
            });

            if (allData.length + newData.length >= 100) break; // Stop fetching if 100 items are reached
          } else if (section === "internship") {
            newData = Array.isArray(response.data.data.applications)
              ? response.data.data.applications
              : [];
            setInternshipData((prevData) => [...(prevData || []), ...newData]);
          } else if (section === "post") {
            newData = Array.isArray(response.data.data.applications)
              ? response.data.data.applications
              : [];
            setPostData((prevData) => [...(prevData || []), ...newData]);
          } else {
            setError("Unexpected response format.");
            break;
          }

          if (newData.length === 0) break; // Stop fetching if no new data

          allData = [...allData, ...newData];
          currentPage++; // Increment page

          if (section === "job" && allData.length >= 100) break; // Stop fetching jobData beyond 100 items
        } else {
          break;
        }
      }
    } catch (error) {
      console.log("Error getting the data:", error);
      setError("Error fetching Activity data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (privateDashboardData && currentUserId) {
      getActivityData(currentUserId, "streak");
      getActivityData(currentUserId, "job");
      getActivityData(currentUserId, "internship");
      getActivityData(currentUserId, "post");
    }
  }, [privateDashboardData]);

  const handleRedirect = () => {
    window.open(`https://collegele.com/application`, "_blank");
  };

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
              onClick={handleRedirect}
              className="profile-dashboard-rectangle-img-1"
              style={{ marginTop: 20, borderRadius: 8, cursor: "pointer" }}
              src={`${Bucket_URL}13404898.png`}
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
          onClick={handleRedirect}
          style={{
            marginTop: 20,
            // padding: "10px",
            borderRadius: 8,
            marginBottom: 80,
            cursor: "pointer",
          }}
          className="profile-dashboard-rectangle-img-2"
          src={`${Bucket_URL}13404898.png`}
          alt="We are live poster"
        />
      </main>
    </>
  );
};

export default ProfileDashboard;
