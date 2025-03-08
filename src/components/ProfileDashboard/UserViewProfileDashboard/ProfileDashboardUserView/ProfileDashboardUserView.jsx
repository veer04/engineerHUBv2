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
import { API_URL, Bucket_URL } from "../../../../services/APIUtils";
import { getAccessToken } from "../../../../features/getCookieValues";
import UserViewStudentFollowAlsoFollow from "../UserViewStudentFollow/UserViewStudentFollowAlsoFollow";
import { useParams } from "react-router-dom";

const ProfileDashboardUserView = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);
  const [DashboardAdminData, setDashboardAdminData] = useState(null);
  const [recommendationData, setRecommendationData] = useState([]);
  const [fellowUsers, setFellowUsers] = useState([]);
  const [followUsers, setFollowUsers] = useState([]);
  const [aboutData, setAboutData] = useState(null);
  const [clubData, setClubData] = useState(null);
  const [almaData, setAlmaData] = useState(null);
  const [streakData, setStreakData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [internshipData, setInternshipData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useParams();

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
    try {
      const response = await axios.get(`${API_URL}api/v1/userDashboard/public/${userId}`);
      if (response.status === 200) {
        setDashboardAdminData(response.data.data.data);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    getPublicDashboardData();
  }, [userId]); // Run only when userId changes

  useEffect(() => {
    if (!DashboardAdminData) return;

    const collegeId = DashboardAdminData?.educationDetails?.[0]?.collegeId?._id;
    if (collegeId) {
      getFellowUsersData(collegeId);
      getCollegeDetails(collegeId, "about");
      getCollegeDetails(collegeId, "club");
      getCollegeDetails(collegeId, "almas");
    }

    if (userId) {
      getActivityData(userId, "streak");
      getActivityData(userId, "job");
      getActivityData(userId, "internship");
      getActivityData(userId, "post");
    }
  }, [DashboardAdminData, userId]); // Runs only when `DashboardAdminData` or `userId` changes

  const getActivityData = async (userId, section) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}api/v1/userDashboard/activity-area`, {
        params: { userId, section, limit: 10, page: 1 },
      });

      if (response.status === 200) {
        const { data } = response.data;
        switch (section) {
          case "streak":
            setStreakData(data);
            break;
          case "job":
            setJobData(data.applications);
            break;
          case "internship":
            setInternshipData(data.applications);
            break;
          case "post":
            setPostData(data.applications);
            break;
          default:
            setError("Invalid section provided.");
        }
      }
    } catch (error) {
      console.error("Error fetching activity data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCollegeDetails = async (collegeId, section) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}api/v1/userDashboard/college-details`, {
        params: { collegeId, section },
      });
      if (response.status === 200) {
        switch (section) {
          case "about":
            setAboutData(response.data.data);
            break;
          case "club":
            setClubData(response.data.data);
            break;
          case "almas":
            setAlmaData(response.data.data);
            break;
          default:
            setError("Invalid section.");
        }
      }
    } catch (error) {
      console.error("Error fetching college details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFellowUsersData = async (collegeId) => {
    if (!collegeId) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}api/v1/userDashboard/fellow-users`, {
        params: { collegeId, limit: 10, page: 1 },
      });
      if (response.data) setFellowUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching fellow users:", error);
    } finally {
      setLoading(false);
    }
  };

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
              {DashboardAdminData &&
                DashboardAdminData.educationDetails.length > 0 && (
                  <div style={{ marginTop: 10 }}>
                    <UserViewStudentFollow
                      fellowUsers={fellowUsers}
                      title={`Other students from ${
                        DashboardAdminData &&
                        DashboardAdminData?.educationDetails &&
                        DashboardAdminData?.educationDetails?.[0]?.collegeId
                          .collegeName
                      }`}
                    />
                  </div>
                )}

              {followUsers.followings && (
                <div style={{ marginTop: 10 }}>
                  <UserViewStudentFollowAlsoFollow
                    followUsers={followUsers}
                    DashboardAdminData={DashboardAdminData}
                    title={`${
                      DashboardAdminData && DashboardAdminData.firstName
                    } also follows`}
                  />
                </div>
              )}

              <div style={{ marginTop: 10 }}>
                <img
                  className="user-view-img"
                  style={{ borderRadius: 8 }}
                  src={`${Bucket_URL}UserViewDashboard/rectangle-img.png`}
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
              <YourActivitySection
                streakData={streakData}
                jobData={jobData}
                internshipData={internshipData}
                postData={postData}
              />
            </div>
            {DashboardAdminData &&
              DashboardAdminData.educationDetails.length > 0 && (
                <MoreAboutYourCollegeSection
                  aboutData={aboutData}
                  clubData={clubData}
                  almaData={fellowUsers}
                  DashboardAdminData={DashboardAdminData}
                />
              )}

            {/* //in mobile yeh dikhega */}
            {isMobile ? (
              <>
                <div style={{ marginTop: 10 }}>
                  <UserViewStudentFollow
                    fellowUsers={fellowUsers}
                    title={`Other students from ${
                      DashboardAdminData &&
                      DashboardAdminData.educationDetails &&
                      DashboardAdminData?.educationDetails?.[0]?.collegeId
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
