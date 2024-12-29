import React, { useState } from "react";
import "./profilewithfollowandmail.css";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

import { FaThumbsUp } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../../../services/APIUtils";
import { getUserId } from "../../../../features/User/UserDetails";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAccessToken } from "../../../../features/getCookieValues";

const ProfileWithFollowAndMail = ({ DashboardAdminData }) => {
  console.log(DashboardAdminData, "dashboardadim");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isFollowActive, setFollowActive] = useState(false);
  const [isMailActive, setMailActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewResume = () => {
    if (DashboardAdminData) {
      window.open(DashboardAdminData.resume, "_blank");
    } else {
      toast.error("Resume not available yet!");
    }
  };

  const likesPrint =
    DashboardAdminData &&
    DashboardAdminData.length > 0 &&
    DashboardAdminData.likes;

  const handleMailClick = () => {
    setMailActive(!isMailActive);
    window.location.href = `mailto:${DashboardAdminData.email}`;
  };

  const handleThumbsUpClick = () => {
    setIsLiked(true);
    setLikeCount(likeCount + 1);
  };

  const handleFollowClick = async () => {
    const userId = getUserId();
    const token = getAccessToken();

    if (!token) {
      console.log("No access token found!");
      toast.error("🚨 Access token not found. Please log in again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    const config = {
      headers: {
        accesstoken: token,
      },
    };

    setIsLoading(true);

    try {
      console.log("Config", config);

      if (isFollowActive) {
        await axios.post(
          `${API_URL}api/v1/userDashboard/unfollow/${userId}`,
          {},
          config
        );
        setFollowActive(false);
        toast("❌ You have unfollowed the user!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        await axios.post(
          `${API_URL}api/v1/userDashboard/follow/${userId}`,
          {},
          config
        );
        setFollowActive(true);
        toast("🥳 You are now following the user!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("🚨 Something went wrong. Please try again!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.error("Error following/unfollowing user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-profile-with-follow-and-mail">
      <div className="img-share-div">
        {!DashboardAdminData ? (
          <div className="loader-main-div">
            <span className="loader-new-saif1"></span>
          </div>
        ) : (
          <img
            src={(DashboardAdminData && DashboardAdminData.image) || "/g2.svg"}
            className="g2-img"
            alt="g2_img"
          />
        )}

        <div>
          <div className="img-thumbsup-div">
            {/* {isLiked ? (
              <FaThumbsUp
                className="thumbs-up-icon animate"
                color="#128381"
                size={22}
              />
            ) : (
              <FaRegThumbsUp
                className="thumbs-up-icon animate"
                color="#128381"
                size={22}
              />
            )} */}

            <FaThumbsUp
              className="thumbs-up-icon animate"
              color="#128381"
              size={22}
            />
          </div>
          <h4
            style={{
              fontSize: 12,
              marginTop: 5,
              color: "white",
              fontWeight: 400,
              textAlign: "center",
            }}
          >
            {/* {likeCount} {likeCount === 1 ? "Like" : "Likes"} */}
            <p>{DashboardAdminData?.likes || 0} likes</p>
          </h4>
        </div>
      </div>

      <div className="name-desc-div">
        <h3 className="g-3-text">
          {" "}
          {DashboardAdminData
            ? `${DashboardAdminData.firstName} ${DashboardAdminData.lastName}`
            : "Your Name"}
        </h3>
        <h2
          style={{
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "22px",
            color: "#f3f3f3",
          }}
        >
          {DashboardAdminData?.aboutMe ||
            "Associate Software engineer at company name"}
        </h2>
      </div>

      {DashboardAdminData && DashboardAdminData.educationDetails.length > 0 && (
        <div style={{ marginTop: 10 }} className="icon-div">
          <div>
            <FaGraduationCap size={22} color="white" />
          </div>
          <div>
            <h3
              style={{
                fontWeight: 400,
                fontSize: 14,

                lineHeight: "22px",
                color: "#f3f3f3",
                marginBottom: 0,
              }}
            >
              {DashboardAdminData.educationDetails[0].collegeId.collegeName ||
                " Ajay Kumar Garg Engineering College"}
            </h3>
          </div>
        </div>
      )}

      {DashboardAdminData &&
        DashboardAdminData.experienceDetails.length > 0 && (
          <div style={{ marginTop: 5 }} className="icon-div">
            <div>
              <HiOutlineBuildingOffice2 size={22} color="white" />
            </div>
            <div>
              <h3
                style={{
                  fontWeight: 400,
                  fontSize: 14,

                  lineHeight: "22px",
                  color: "#f3f3f3",
                  marginBottom: 0,
                }}
              >
                {DashboardAdminData.experienceDetails[0].organisationName ||
                  "engineerHub"}
              </h3>
            </div>
          </div>
        )}

      <div className="btn-siv-edit-post-share">
        <button
          onClick={handleFollowClick}
          className={isFollowActive ? "btn-active" : "btn-default"}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="loader"></div>
          ) : isFollowActive ? (
            "Following"
          ) : (
            "Follow"
          )}
        </button>
        <button
          onClick={handleMailClick}
          className={isMailActive ? "btn-active" : "btn-default"}
        >
          {isMailActive ? "Mailing" : "Mail"}
        </button>
      </div>

      <div className="score-update-view">
        <div
          style={{
            display: "flex ",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: 16,
                marginLeft: 4,
                marginBottom: 0,
                fontWeight: 600,
              }}
            >
              Resume
            </h3>
          </div>
          <div
            style={{
              backgroundColor: "#F7D77F",
              padding: "4px 6px",
              borderRadius: 8,
            }}
          >
            <h3 style={{ fontSize: 12, marginBottom: 0, fontWeight: 500 }}>
              ATS Score: 70%
            </h3>
          </div>
          <div className="update-view-trash-download">
            <div className="update-view-btn">
              <button onClick={handleViewResume}>View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWithFollowAndMail;
