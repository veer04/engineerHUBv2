import React, { useState } from "react";
import "./profilewithposteditshare.css";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";

import { FaGraduationCap } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FiDownload } from "react-icons/fi";
import { GoTrash } from "react-icons/go";

const ProfileWithPostEditShare = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleThumbsUpClick = () => {
    setIsLiked(true);
    setLikeCount(likeCount + 1);
  };
  return (
    <div className="main-profile-with-post-share">
      <div className="img-share-div">
        <img src="/g2.svg" className="g2-img" alt="g2_img" />

        <div>
          <div onClick={handleThumbsUpClick} className="img-thumbsup-div">
            {isLiked ? (
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
            )}
          </div>
          <h4
            style={{
              fontSize: 12,
              marginTop: 5,
              color: "white",
              fontWeight: 400,
              marginLeft: 3,
            }}
          >
            {likeCount} {likeCount === 1 ? "Like" : "Likes"}
          </h4>
        </div>
      </div>

      <div className="name-desc-div">
        <h3 className="g-3-text">Girish Shedge</h3>
        <h2
          style={{
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "22px",
            color: "#f3f3f3",
          }}
        >
          Associate Software engineer at company name
        </h2>
      </div>

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
            Ajay Kumar Garg Engineering College
          </h3>
        </div>
      </div>

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
            engineerHub
          </h3>
        </div>
      </div>

      <div className="btn-siv-edit-post-share">
        <button>Edit</button>
        <button>Post</button>
        <button>Share</button>
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
              johndoersume24.pdf
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
              ATS Score: 80%
            </h3>
          </div>
        </div>

        <div className="update-view-trash-download">
          <div className="update-view-btn">
            <button>Update</button>
            <button>View</button>
          </div>

          <div className="download-trash-icon">
            <div
              style={{
                backgroundColor: "#1383821a",
                padding: "8px 10px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FiDownload color="#138382" size={22} />
            </div>

            <div
              style={{
                backgroundColor: "#FF58581A",
                padding: "8px 10px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GoTrash color="red" style={{}} size={22} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWithPostEditShare;
