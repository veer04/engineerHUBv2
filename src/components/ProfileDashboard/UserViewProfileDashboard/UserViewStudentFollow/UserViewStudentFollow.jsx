import React, { useState } from "react";
import "./userviewstudentfollow.css";
import { Bucket_URL } from "../../../../services/APIUtils";

const UserViewStudentFollow = ({ title }) => {
  const [isFollowing, setIsFollowing] = useState(Array(8).fill(false));

  const [sectionsToShow, setSectionsToShow] = useState(2);

  const handleButtonClick = (index) => {
    const newState = [...isFollowing];
    newState[index] = !newState[index];
    setIsFollowing(newState);
  };

  const handleViewMoreClick = () => {
    setSectionsToShow(sectionsToShow + 2);
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
    <div className="user-view-student-follow-main-div">
      <h3
        style={{
          fontSize: 18,
          fontWeight: 600,
          lineHeight: "24px",
          color: "#002B36",
          marginBottom: 0,
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
                    marginBottom: 0,
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
                  onClick={() => handleButtonClick(index)}
                  style={{
                    backgroundColor: isFollowing[index]
                      ? "rgba(19, 131, 130, 0.05)"
                      : "#128381",
                    borderRadius: 8,
                    color: isFollowing[index] ? "#138382" : "white",
                    marginTop: 5,
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: "20px",
                    padding: "4px 16px ",
                    border: isFollowing[index] ? "1px solid #138382" : "none",
                    outline: "none",
                    transition: "0.2s ease",
                  }}
                >
                  {isFollowing[index] ? "Following" : "Follow"}
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

export default UserViewStudentFollow;
