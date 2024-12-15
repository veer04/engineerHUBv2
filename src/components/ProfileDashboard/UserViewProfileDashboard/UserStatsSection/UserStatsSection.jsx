import React, { useEffect, useState } from "react";
import "./userstats.css";
import { ImStatsBars2 } from "react-icons/im";
import axios from "axios";
import { API_URL } from "../../../../services/APIUtils";
import { getUserId } from "../../../../features/User/UserDetails";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserStatsSection = ({ DashboardAdminData }) => {
  const [statsData, setStatsData] = useState([]);

  const getStatsData = async () => {
    const userId = getUserId();
    try {
      const response = await axios.get(
        `${API_URL}api/v1/userDashboard/public-stats/${userId}`
      );

      if (response.data) {
        // console.log(response.data, "stats data");
        setStatsData(response.data?.data?.applicationStats);
      } else {
        console.error("Error getting the stats data");
      }
    } catch (error) {
      console.error("Error getting the stats data", error);
    }
  };

  useEffect(() => {
    getStatsData();
  }, []);

  // const totalApplications = statsData[0]?.total || 0;

  const totalApplications = statsData.reduce(
    (sum, stat) => sum + stat.total,
    0
  );

  return (
    <div className="main-user-stats-secttion">
      <div className="user-stats-title-section">
        <ImStatsBars2 />
        <h3
          style={{
            fontSize: 18,
            color: "#002B36",
            fontWeight: 600,
            lineHeight: "24px",
            marginBottom: 0,
          }}
        >
          {DashboardAdminData
            ? `${DashboardAdminData.firstName}'s Stats`
            : "Your Stats"}
        </h3>
      </div>

      <div className="jobs-events-projects-posts-div">
        <div className="jobs-box-div-1">
          <h3
            style={{
              fontSize: 24,
              color: "#002B36",
              fontWeight: 600,
              lineHeight: "28px",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            {totalApplications}
          </h3>

          <h3
            style={{
              fontSize: 14,
              color: "#002B36",
              fontWeight: 400,
              lineHeight: "20px",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            Opportunity Applied
          </h3>
        </div>
        {/* <div className="events-box-div-1">
          <h3
            style={{
              fontSize: 24,
              color: "#002B36",
              fontWeight: 600,
              lineHeight: "28px",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            98
          </h3>

          <h3
            style={{
              fontSize: 14,
              color: "#002B36",
              fontWeight: 400,
              lineHeight: "20px",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            Events Applied
          </h3>
        </div>
        <div className="projects-box-div-1">
          <h3
            style={{
              fontSize: 24,
              color: "#002B36",
              fontWeight: 600,
              lineHeight: "28px",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            98
          </h3>

          <h3
            style={{
              fontSize: 14,
              color: "#002B36",
              fontWeight: 400,
              lineHeight: "20px",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            Projects Completed
          </h3>
        </div>
        <div className="posts-box-div-1">
          <h3
            style={{
              fontSize: 24,
              color: "#002B36",
              fontWeight: 600,
              lineHeight: "28px",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            5
          </h3>

          <h3
            style={{
              fontSize: 14,
              color: "#002B36",
              fontWeight: 400,
              lineHeight: "20px",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            Posts
          </h3>
        </div> */}
      </div>
    </div>
  );
};

export default UserStatsSection;
