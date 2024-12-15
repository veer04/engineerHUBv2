import React, { useState } from "react";
import "./UserStudentFollowInMoreAbout.css";
import { API_URL, Bucket_URL } from "../../../../services/APIUtils";
import { getAccessToken } from "../../../../features/getCookieValues";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserStudentFollowInMoreAboutClubs = ({ title, clubData }) => {
  const [followState, setFollowState] = useState({});
  const [loadingState, setLoadingState] = useState({});

  const [sectionsToShow, setSectionsToShow] = useState(2);

  const handleViewMoreClick = () => {
    setSectionsToShow(sectionsToShow + 2);
  };

  const handleFollowClick = async (userId) => {
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

    setLoadingState((prevState) => ({
      ...prevState,
      [userId]: true,
    }));

    try {
      const isAlreadyFollowed = followState[userId] || false;
      if (isAlreadyFollowed) {
        await axios.post(
          `${API_URL}api/v1/userDashboard/unfollow/${userId}`,
          {},
          config
        );
        setFollowState((prevState) => ({ ...prevState, [userId]: false }));
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
        setFollowState((prevState) => ({ ...prevState, [userId]: true }));
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
      setLoadingState((prevState) => ({
        ...prevState,
        [userId]: false,
      }));
    }
  };

  return (
    <>
      <div className="user-view-student-follow-main-div-more-about">
        {clubData.clubs.slice(0, sectionsToShow).map((user, index) => (
          <div key={index} className="user-follow-card">
            <div className="user-follow-section-with-img">
              <div className="user-follow-section-with-img-left">
                <img
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
                  {user.firstName} {user.profile?.lastName}
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
                  {user.bio || "No about me available."}
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
