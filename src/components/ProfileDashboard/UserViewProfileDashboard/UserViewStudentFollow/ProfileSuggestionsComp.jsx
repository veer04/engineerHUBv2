import React from "react";
import "./profilesuggestions.css";

const ProfileSuggestionsComp = () => {
  return (
    <>
      <div className="profile-suggestions-main-div">
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
          Profile Suggestions
        </h3>

        {/* {fellowUsers &&
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
        )} */}
      </div>
    </>
  );
};

export default ProfileSuggestionsComp;
