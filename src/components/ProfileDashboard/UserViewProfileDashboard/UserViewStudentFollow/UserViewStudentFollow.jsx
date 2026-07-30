import React, { useState, useEffect } from "react";
import "./userviewstudentfollow.css";
import { API_URL, Bucket_URL } from "../../../../services/APIUtils";

import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserId } from "../../../../features/User/UserDetails";
import { getAccessToken } from "../../../../features/getCookieValues";
import axios from "axios";

const UserViewStudentFollow = ({ title, fellowUsers }) => {
  const [followState, setFollowState] = useState({});
  const [sectionsToShow, setSectionsToShow] = useState(2);
  const [loadingState, setLoadingState] = useState({});
  const [fellowUsersId, setFellowUsersId] = useState([]);
  const [userFollowed, setUserFollowed] = useState([]);

  const handleViewMoreClick = () => {
    setSectionsToShow(sectionsToShow + 2);
  };

  const handleFollowClick = async (id) => {
    const userId = getUserId();

    const token = getAccessToken();
    if (!token) {
      toast.error("🚨 Access token not found. Please log in again.", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    setLoadingState((prev) => ({ ...prev, [id]: true }));

    const isAlreadyFollowed = followState[id] || false;
    setFollowState((prev) => ({ ...prev, [id]: !isAlreadyFollowed }));

    try {
      const config = { headers: { accessToken: token } };
      const url = `${API_URL}api/v1/userDashboard/${
        isAlreadyFollowed ? "unfollow" : "follow"
      }/${userId}`;

      await axios.post(url, {}, config);

      toast(
        isAlreadyFollowed
          ? "❌ You have unfollowed the user!"
          : "🥳 You are now following the user!",
        {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        }
      );
    } catch (error) {
      setFollowState((prev) => ({ ...prev, [id]: isAlreadyFollowed }));
      toast.error("🚨 Something went wrong. Please try again!", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
      console.error("Error following/unfollowing user:", error);
    } finally {
      setLoadingState((prev) => ({ ...prev, [id]: false }));
    }
  };

  useEffect(() => {
    if (fellowUsers?.students) {
      const ids = fellowUsers.students
        .map((user) => user?.profile?._id)
        .filter((id) => id); // Remove undefined values
      setFellowUsersId(ids);
    }
  }, [fellowUsers]);
  useEffect(() => {
    if (fellowUsersId.length > 0) {
      sendFollowRequest();
    }
  }, [fellowUsersId]);

  const sendFollowRequest = async () => {
    try {
      // Extract the access_token from cookies
      const config = {
        accessToken: getAccessToken(),
      };

      const response = await axios.post(
        `${API_URL}api/v1/userDashboard/likes-followings`,
        {
          usersData: fellowUsersId,
          type: "following",
        },
        {
          headers: config,
        }
      );

      setUserFollowed(response.data); // Updated state name
    } catch (error) {
      console.error(
        "Error sending follow request:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="user-view-student-follow-main-div">
      <h3
        style={{
          fontSize: 18,
          fontWeight: 600,
          lineHeight: "24px",
          color: "#002B36",
          marginBottom: 0,
          // textTransform: "uppercase",
        }}
      >
        {title}
      </h3>

      {fellowUsers &&
        fellowUsers?.students?.slice(0, sectionsToShow).map((user, index) => (
          <>
            <div key={index}>
              <div className="user-follow-section-with-img">
                <div className="user-follow-section-with-img-left">
                  <img
                    src={
                      user.profile?.image &&
                      user.profile?.image.includes("frontendehubbucket")
                        ? user.profile?.image
                        : `${Bucket_URL}UserViewDashboard/profile_follow.png`
                    }
                    className="profile-img-userfollow"
                    alt="img"
                    width={48}
                    height={48}
                  />
                </div>

                <div
                  className="
        user-follow-section-with-img-right"
                >
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      lineHeight: "24px",
                      color: "#002B36",
                      marginBottom: 0,
                    }}
                  >
                    {user.profile?.firstName} {user.profile?.lastName}
                  </h3>

                  <h5
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      lineHeight: "20px",
                      color: "#547178",
                      marginBottom: 10,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.profile?.aboutMe || "No about me available."}
                  </h5>

                  <button
                    onClick={() => handleFollowClick(user._id)}
                    className={
                      followState[user._id] ? "btn-active" : "btn-default"
                    }
                    disabled={loadingState[user._id]}
                  >
                    {loadingState[user._id] ? (
                      <div className="loader-0000"></div>
                    ) : followState[user._id] ? (
                      "Following"
                    ) : (
                      "Follow"
                    )}
                  </button>
                </div>
              </div>

              {index !== fellowUsers.students.length - 1 && (
                <div
                  style={{
                    background: "#D9D9D9",
                    height: "2px",
                    margin: "10px 0px",
                  }}
                ></div>
              )}
            </div>
          </>
        ))}

      {sectionsToShow < 6 && fellowUsers?.students?.length > 2 && (
        <div style={{ marginTop: 15, padding: "8px 16px" }}>
          <button
            onClick={handleViewMoreClick}
            style={{
              display: "flex",
              margin: "0 auto",
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 14,
              fontWeight: 700,
              lineHeight: "20px",
              color: "#138382",
            }}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default UserViewStudentFollow;
