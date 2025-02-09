import React, { useState } from "react";
import "./UserStudentFollowInMoreAbout.css";
import { API_URL, Bucket_URL } from "../../../../services/APIUtils";
import { getAccessToken } from "../../../../features/getCookieValues";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoDataCompBySaif from "./NoDataCompBySaif";
import { getUserId } from "../../../../features/User/UserDetails";

const UserStudentFollowInMoreAboutClubs = ({ title, clubData }) => {
  const [followState, setFollowState] = useState({});
  const [loadingState, setLoadingState] = useState({});

  const [sectionsToShow, setSectionsToShow] = useState(2);

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

  if (!clubData || !clubData.clubs || clubData.clubs.length === 0) {
    return <NoDataCompBySaif titleName={"Club"} />;
  }

  return (
    <>
      <div className="user-view-student-follow-main-div-more-about">
        {clubData?.clubs?.slice(0, sectionsToShow).map((user, index) => (
          <div key={index} className="user-follow-card">
            <div className="user-follow-section-with-img">
              <div className="user-follow-section-with-img-left">
                <img
                  className="profile-img-club"
                  src={
                    user.image && user?.image.includes("frontendehubbucket")
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
                    color: "#002B36",
                    marginBottom: 5,
                  }}
                >
                  {user?.name || "No Club name  available."}
                </h3>
                <h5
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#547178",
                    marginBottom: 5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {/* {user.name || "No Club name  available."} */}
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
          </div>
        ))}
      </div>

      {sectionsToShow < clubData && clubData?.club?.length && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            className="view-more-btn-clubs"
            onClick={handleViewMoreClick}
            style={{
              display: "flex",
              margin: "0 auto",
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 14,
              fontWeight: 700,
              color: "#138382",
            }}
          >
            View More
          </button>
        </div>
      )}
    </>
  );
};

export default UserStudentFollowInMoreAboutClubs;
