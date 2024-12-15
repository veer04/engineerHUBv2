import React, { useState } from "react";
import "./UserViewStudentFollowAlsoFollow.css";
import { Bucket_URL } from "../../../../services/APIUtils";
import "react-toastify/dist/ReactToastify.css";
import { getAccessToken } from "../../../../features/getCookieValues";
import axios from "axios";

const UserViewStudentFollowAlsoFollow = ({ title, followUsers }) => {
  const [followState, setFollowState] = useState({});
  const [loadingState, setLoadingState] = useState({});
  const [sectionsToShow, setSectionsToShow] = useState(2);

  const handleButtonClick = (index) => {
    const newState = [...isFollowing];
    newState[index] = !newState[index];
    setIsFollowing(newState);
  };

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

  const users = [
    {
      name: "Hema Priya U",
      description:
        "Top UX Design Voice| UI UX designer l Talks about products, design, human psychology and AI",
    },
    {
      name: "Asmita Biswas",
      description:
        "Top UX Design Voice| UI UX designer l Talks about products, design, human psychology and AI",
    },
    {
      name: "John Doe",
      description:
        "Product Manager | Passionate about leadership, strategy, and innovation",
    },
    {
      name: "Jane Smith",
      description:
        "UX Researcher | Enthusiastic about human-centered design and digital products",
    },
    {
      name: "Hema Priya U",
      description:
        "Top UX Design Voice| UI UX designer l Talks about products, design, human psychology and AI",
    },
    {
      name: "Asmita Biswas",
      description:
        "Top UX Design Voice| UI UX designer l Talks about products, design, human psychology and AI",
    },
    {
      name: "John Doe",
      description:
        "Product Manager | Passionate about leadership, strategy, and innovation",
    },
    {
      name: "Jane Smith",
      description:
        "UX Researcher | Enthusiastic about human-centered design and digital products",
    },
  ];

  return (
    <div className="user-view-student-follow-main-div-also-follow">
      <h3
        style={{
          fontSize: 18,
          fontWeight: 600,
          lineHeight: "24px",
          color: "#002B36",
          marginBottom: 0,
          textTransform: "uppercase",
        }}
      >
        {title}
      </h3>

      {users.slice(0, sectionsToShow).map((user, index) => (
        <>
          <div key={index}>
            <div className="user-follow-section-with-img">
              <div className="user-follow-section-with-img-left">
                <img
                  src={`${Bucket_URL}UserViewDashboard/profile_follow.png`}
                  alt="profile_img"
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
                  {user.name}
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
                  {user.description}
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
            <div
              style={{
                background: "#D9D9D9",
                height: "2px",
                margin: "10px 0px",
              }}
            ></div>
          </div>
        </>
      ))}

      {sectionsToShow < users.length && (
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
