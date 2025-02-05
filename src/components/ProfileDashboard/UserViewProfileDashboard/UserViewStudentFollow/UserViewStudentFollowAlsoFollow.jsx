import React, { useState } from "react";
import "./UserViewStudentFollowAlsoFollow.css";
import { API_URL, Bucket_URL } from "../../../../services/APIUtils";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { getAccessToken } from "../../../../features/getCookieValues";
import { getUserId } from "../../../../features/User/UserDetails";

const UserViewStudentFollowAlsoFollow = ({ title, followUsers }) => {
  const [followState, setFollowState] = useState({});
  const [loadingState, setLoadingState] = useState({});
  const [sectionsToShow, setSectionsToShow] = useState(2);

  console.log(followUsers, "followusers");

  const handleViewMoreClick = () => {
    setSectionsToShow(sectionsToShow + 2);
  };

  const handleFollowClick = async (id) => {
    const userId = getUserId();

    if (loadingState[id]) return;

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

  return (
    <div className="user-view-student-follow-main-div-also-follow">
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

      {followUsers?.followings
        ?.slice(0, sectionsToShow)
        .map((followingItem, index) =>
          followingItem.following.map((user, userIndex) => (
            <div key={`${index}-${userIndex}`}>
              <div className="user-follow-section-with-img">
                <div className="user-follow-section-with-img-left">
                  <img
                    className="user-follows-saif"
                    src={
                      user?.image && user?.image.includes("frontendehubbucket")
                        ? user?.image
                        : `${Bucket_URL}UserViewDashboard/profile_follow.png`
                    }
                    alt="profile_img"
                    width={48}
                    height={48}
                  />
                </div>

                <div className="user-follow-section-with-img-right">
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      lineHeight: "24px",
                      color: "#002B36",
                      marginBottom: 0,
                    }}
                  >
                    {user.firstName} {user.lastName}
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
                    {user?.aboutMe || "No about me available."}
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

              {userIndex !== followingItem.following.length - 1 && (
                <div
                  style={{
                    background: "#D9D9D9",
                    height: "2px",
                    margin: "10px 0px",
                  }}
                ></div>
              )}
            </div>
          ))
        )}

      {sectionsToShow <
        followUsers?.followings?.reduce(
          (acc, followingItem) => acc + followingItem.following.length,
          0
        ) && (
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

export default UserViewStudentFollowAlsoFollow;
