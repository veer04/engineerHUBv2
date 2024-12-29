import React, { useEffect, useState } from "react";
import "./profilewithposteditshare.css";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";

import { FaGraduationCap } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FiDownload } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { getAccessToken } from "../../../features/getCookieValues";
import axios from "axios";
import { API_URL } from "../../../services/APIUtils";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileWithPostEditShare = ({
  privateDashboardData,
  setPrivateDashboardData,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isResumeUploaded, setIsResumeUploaded] = useState(
    !!privateDashboardData?.resume
  );

  const [uploadedFileName, setUploadedFileName] = useState(
    privateDashboardData?.resume
      ? privateDashboardData?.resume.split("/").pop()
      : ""
  );
  const [resume, setResume] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const fileInputRef = React.useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (privateDashboardData?.resume) {
      setIsResumeUploaded(true);
      setUploadedFileName(privateDashboardData?.resume?.split("/").pop());
    }
  }, [privateDashboardData?.resume]);

  const handleResumeUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setResume(file);
      try {
        const formData = new FormData();
        formData.append("resume", file);

        const config = {
          headers: {
            accessToken: getAccessToken(),
          },
        };

        const response = await axios.patch(
          `${API_URL}api/v1/user/resumeUpdate`,
          formData,
          config
        );

        if (response.data) {
          setIsResumeUploaded(true);
          const newResumeUrl = response.data.data;
          setResumeUrl(newResumeUrl);

          setPrivateDashboardData((prevData) => ({
            ...prevData,
            resume: newResumeUrl,
          }));
          setUploadedFileName(newResumeUrl.split("/").pop());
          toast("🥳 Resume Added Successfully!", {
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
        console.log("Resume upload response:", response.data);
      } catch (error) {
        console.error(
          "Error uploading resume:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const handleEditPage = () => {
    window.open("/profiledashboardedit", "_blank");
  };

  const handlePostPage = () => {
    window.open("/host", "_blank");
  };

  const handleViewResume = () => {
    if (privateDashboardData?.resume) {
      window.open(privateDashboardData?.resume, "_blank");
    } else {
      toast.error("Resume URL not available yet!");
    }
  };

  const downloadResume = async () => {
    try {
      const response = await axios({
        url: `${API_URL}api/v1/downloadPdf?title=${privateDashboardData?.resume}&url=${privateDashboardData?.resume}`,
        method: "POST",
        data: { title: resumeUrl, url: privateDashboardData?.resume },
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      setProgress(100);
      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", `${privateDashboardData?.resume}`);
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  let cleanFileName =
    uploadedFileName.split("_")[0] + "_" + uploadedFileName.split("_")[2];

  const handleThumbsUpClick = () => {
    setIsLiked(true);
    setLikeCount(likeCount + 1);
  };

  return (
    <div className="main-profile-with-post-share">
      <div className="img-share-div">
        {!privateDashboardData ? (
          <div className="loader-main-div">
            <span className="loader-new-saif"></span>{" "}
          </div>
        ) : (
          <img
            src={privateDashboardData?.image || "/g2.svg"}
            className="g2-img"
            alt="g2_img"
          />
        )}

        <div>
          <div className="thumbs-up-and-follow-main-div">
            <div className="profile-img-follow-main-div">
              <div className="profile-img-follow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                    stroke="#138382"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                    stroke="#138382"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
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
                {`${
                  privateDashboardData && privateDashboardData.followers
                    ? privateDashboardData.followers
                    : "25"
                } Followers`}
              </h4>
            </div>
            <div className="img-thumsup-main-div">
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

                <FaRegThumbsUp
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

                <p>{privateDashboardData?.likes || 0} Likes</p>
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="name-desc-div">
        <h3 className="g-3-text">
          {" "}
          {privateDashboardData
            ? `${privateDashboardData.firstName} ${privateDashboardData.lastName}`
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
          {privateDashboardData?.aboutMe || "No Bio Added"}
        </h2>
      </div>

      {privateDashboardData &&
        privateDashboardData.educationDetails.length > 0 && (
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
                {privateDashboardData.educationDetails[0].collegeId
                  .collegeName || " Ajay Kumar Garg Engineering College"}
              </h3>
            </div>
          </div>
        )}

      {privateDashboardData &&
        privateDashboardData.educationDetails.length > 0 && (
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
                {privateDashboardData.experienceDetails[0].organisationName ||
                  "engineerHub"}
              </h3>
            </div>
          </div>
        )}

      <div className="btn-siv-edit-post-share">
        <button onClick={handleEditPage}>Edit</button>
        <button onClick={handlePostPage}>Post</button>
        <button>Share</button>
      </div>

      {isResumeUploaded ? (
        <div className="click-to-upload-your-resume">
          <div className="click-to-upload-your-resume-innner">
            <button
              onClick={handleResumeUploadClick}
              style={{
                fontWeight: 700,
                fontSize: 14,
                lineHeight: "20px",
                color: "#547178",
                marginBottom: 0,
              }}
            >
              Click to upload your resume
            </button>
          </div>
        </div>
      ) : (
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
                {cleanFileName || "johndoersume24.pdf"}
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
              <button onClick={handleResumeUploadClick}>Update</button>
              <button onClick={handleViewResume}>View</button>
            </div>

            <div className="download-trash-icon">
              <div
                onClick={downloadResume}
                style={{
                  backgroundColor: "#1383821a",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 14.5V4.5M12 14.5C11.2998 14.5 9.99153 12.5057 9.5 12M12 14.5C12.7002 14.5 14.0085 12.5057 14.5 12"
                    stroke="#138382"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5"
                    stroke="#138382"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <div
                style={{
                  backgroundColor: "#FF58581A",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                    stroke="#FF3737"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                    stroke="#FF3737"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M9.5 16.5V10.5"
                    stroke="#FF3737"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M14.5 16.5V10.5"
                    stroke="#FF3737"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".pdf,.docx,.xlsx"
      />
    </div>
  );
};

export default ProfileWithPostEditShare;
