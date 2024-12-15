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
import { getAccessToken } from "../../../../features/getCookieValues";
import UserViewStudentFollowAlsoFollow from "../UserViewStudentFollow/UserViewStudentFollowAlsoFollow";

const ProfileDashboardUserView = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);
  const [DashboardAdminData, setDashboardAdminData] = useState(null);
  const [recommendationData, setRecommendationData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [fellowUsers, setFellowUsers] = useState([]);
  const [followUsers, setFollowUsers] = useState([]);
  const [aboutData, setAboutData] = useState(null);
  const [clubData, setClubData] = useState(null);
  const [almaData, setAlmaData] = useState(null);

  const [loading, setLoading] = useState(false);

  const userId = getUserId();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 520);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getCollegeDetails = async (collegeId, section) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}api/v1/userDashboard/college-details?collegeId=${collegeId}&section=${section}`
      );
      if (response.status === 200) {
        if (section === "about") {
          setAboutData(response.data.data);
        } else if (section === "club") {
          setClubData(response.data.data);
        } else if (section === "almas") {
          setAlmaData(response.data.data);
        }
      } else {
        setError("Unexpected response status.");
      }
    } catch (err) {
      setError("Error fetching College data.");
    } finally {
      setLoading(false);
    }
  };

  const getPublicDashboardData = async () => {
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

  //follow users data
  const getFollowUsersData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}api/v1/userDashboard/followings?userId=${userId}&limit=${limit}&page=${page}`
      );
      if (response.data) {
        console.log(response.data);
        console.log(response.data, "followuser data");
        setFollowUsers(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching followuser  data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFollowUsersData();
  }, [userId]);

  //fellow users data

  const getFellowUsersData = async (collegeId) => {
    try {
      if (collegeId) {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}api/v1/userDashboard/fellow-users?collegeId=${collegeId}&limit=${limit}&page=${page}`
        );
        if (response.data) {
          console.log(response.data);
          setFellowUsers(response.data.data);
          setLoading(false);
        }
      } else {
        console.log("No collegeId found in DashboardAdminData");
      }
    } catch (error) {
      console.error("Error fetching fellow users data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (DashboardAdminData) {
      const collegeId =
        DashboardAdminData?.educationDetails?.[0]?.collegeId?._id;
      if (collegeId) {
        getFellowUsersData(collegeId);
        getCollegeDetails(collegeId, "about");
        getCollegeDetails(collegeId, "club");
        getCollegeDetails(collegeId, "almas");
      }
    }
  }, [DashboardAdminData, limit, page]);

  const fetchRecommendationData = async () => {
    try {
      const response = await fetch(
        `${API_URL}api/v1/userDashboard/recommendation-area`,
        {
          method: "GET",
          headers: {
            accesstoken: getAccessToken(),
          },
        }
      );

      const data = await response.json();
      // console.log(data.data, "responsedatarecommended");
      setRecommendationData(data.data);
    } catch (error) {
      console.error("Error getting the data", error);
      setRecommendationData([]);
    }
  };

  useEffect(() => {
    getPublicDashboardData();
    fetchRecommendationData();
  }, []);

  return (
    <>
      <main className="profile-dashboard-user-view-main">
        <div className="left-profile-dashboard-user">
          <ProfileWithFollowAndMail DashboardAdminData={DashboardAdminData} />

          <div style={{ marginTop: 10 }}>
            <UserStatsSection DashboardAdminData={DashboardAdminData} />
          </div>

          {/* //in desktop yeh dikhega */}

          {isMobile ? null : (
            <>
              <div style={{ marginTop: 10 }}>
                <UserViewStudentFollow
                  fellowUsers={fellowUsers}
                  title={`Other students from ${
                    DashboardAdminData &&
                    DashboardAdminData.educationDetails &&
                    DashboardAdminData?.educationDetails[0].collegeId
                      .collegeName
                  }`}
                />
              </div>
              <div style={{ marginTop: 10 }}>
                <UserViewStudentFollowAlsoFollow
                  followUsers={followUsers}
                  title={`${
                    DashboardAdminData && DashboardAdminData.firstName
                  } also follows`}
                />
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
            <UserProfileAboutDesc DashboardAdminData={DashboardAdminData} />
            <div className="profile-dashboard-resume-grid">
              <div className="profile-dashboard-resume-grid-left">
                <EducationResume DashboardAdminData={DashboardAdminData} />
                <SkillsResume DashboardAdminData={DashboardAdminData} />
                <AchievementsResume DashboardAdminData={DashboardAdminData} />
                <CertificationsResume DashboardAdminData={DashboardAdminData} />
              </div>
              <div className="profile-dashboard-resume-grid-right">
                <ExperienceResume DashboardAdminData={DashboardAdminData} />
                <ProjectsResume DashboardAdminData={DashboardAdminData} />
              </div>
            </div>
            <div style={{ marginTop: 15 }}>
              <YourActivitySection recommendationData={recommendationData} />
            </div>
            <MoreAboutYourCollegeSection
              aboutData={aboutData}
              clubData={clubData}
              almaData={almaData}
              DashboardAdminData={DashboardAdminData}
            />

            {/* //in mobile yeh dikhega */}
            {isMobile ? (
              <>
                <div style={{ marginTop: 10 }}>
                  <UserViewStudentFollow
                    fellowUsers={fellowUsers}
                    title={`Other students from ${
                      DashboardAdminData &&
                      DashboardAdminData.educationDetails &&
                      DashboardAdminData?.educationDetails[0].collegeId
                        .collegeName
                    }`}
                  />
                </div>

                <div style={{ marginTop: 10 }}>
                  <UserViewStudentFollowAlsoFollow
                    followUsers={followUsers}
                    title={`${
                      DashboardAdminData && DashboardAdminData.firstName
                    } also follows`}
                  />
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
