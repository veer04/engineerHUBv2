import React, { useEffect, useState } from "react";
import "./profilewithposteditshare.css";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { FaGraduationCap } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FiDownload } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { getAccessToken } from "../../../features/getCookieValues";
import axios from "axios";
import { API_URL, FRONTEND_URL } from "../../../services/APIUtils";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RWebShare } from "react-web-share";
import { deleteResume } from "../../../services/APIConfig";
import { getUserId } from "../../../features/User/UserDetails";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileWithPostEditShare = ({
  privateDashboardData,
  setPrivateDashboardData,
}) => {
  const [isResumeUploaded, setIsResumeUploaded] = useState(
    !!privateDashboardData?.resume
  );
  const isChecked = useSelector((state) => state.resumeToggle.isVisible);
  // console.log(isChecked, "ghgg");

  const userId = getUserId();
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = Cookies.get("role");
    if (role) {
      setUserRole(role);
    }
  }, []);

  // console.log(userRole, "userRole");

  const [resume, setResume] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const fileInputRef = React.useRef(null);
  const [downloadProgress, setDownloadProgress] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [response, setResponse] = useState(null);
  const [uploadDate, setUploadDate] = useState(
    privateDashboardData?.resume ? moment().format("YYYY-MM-DD") : ""
  );
  const [isLoadingClickToUploadResume, setIsLoadingClickToUploadResume] =
    useState(false);

  // console.log("data", privateDashboardData);
  const navigate = useNavigate();

  useEffect(() => {
    if (privateDashboardData?.resume) {
      setIsResumeUploaded(true);
      const fullFileName = privateDashboardData?.resume.split("/").pop();
      const nameMatch = fullFileName.match(/([a-zA-Z0-9_-]+)\.pdf/i);
      const cleanFileName = nameMatch ? nameMatch[1] : "resume";
      setUploadedFileName(cleanFileName);
      setResumeUrl(privateDashboardData?.resume);
      setUploadDate(moment().format("YYYY-MM-DD"));
    }
  }, [privateDashboardData?.resume]);

  const handleResumeUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setResume(file);
      setIsLoadingClickToUploadResume(true);

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
          const uploadedUrl = response.data.data;
          const fullFileName = uploadedUrl.split("/").pop();
          const nameMatch = fullFileName.match(/([a-zA-Z0-9_-]+)\.pdf/i);
          const cleanFileName = nameMatch ? nameMatch[1] : "resume";

          setUploadedFileName(cleanFileName);
          setUploadDate(moment().format("YYYY-MM-DD"));
          setResumeUrl(uploadedUrl);
          setIsLoadingClickToUploadResume(false);

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
          setPrivateDashboardData((prevData) => ({
            ...prevData,
            resume: resumeUrl,
          }));
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
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
    } else {
      toast.error("Resume URL not available yet!");
    }
  };

  const downloadResume = async () => {
    try {
      setIsDownloading(true);
      setDownloadProgress(0);
      const response = await axios({
        url: `${API_URL}api/v1/downloadPdf?title=${uploadedFileName}`,
        method: "POST",
        data: { title: uploadedFileName, url: resumeUrl },
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setDownloadProgress(percentCompleted);
        },
      });

      const fullFileName = resumeUrl?.split("/").pop(); // Get last part of URL
      const nameMatch = fullFileName.match(/([a-zA-Z]+)\.pdf/i); // Extract name before ".pdf"
      const cleanFileName = nameMatch ? nameMatch[1] : "resume";

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", cleanFileName);
      link.click();

      if (downloadProgress === 100) {
        setIsDownloading(false); // Re-enable button when download is complete
      }

      setTimeout(() => {
        setDownloadProgress(null);
      }, 1000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDeleteResume = () => {
    deleteResume(userId, (res) => {
      console.log(res, "res");
      setResponse(res);
      if (res.status === 200) {
        setIsResumeUploaded(false);
        setUploadedFileName("");
        setResumeUrl("");
        setIsLoadingClickToUploadResume(false);
        toast("💀 Resume Delete Successfully!", {
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
        const errorMessage = res?.response?.data?.message;

        console.error("Error deleting the resume", errorMessage);
        toast(`✖️ ${errorMessage}`, {
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
    });
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
          {userRole}
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
                {privateDashboardData?.experienceDetails[0]?.organisationName ||
                  "engineerHub"}
              </h3>
            </div>
          </div>
        )}

      <div className="btn-siv-edit-post-share">
        <button onClick={() => navigate("edit-profile")}>Edit</button>
        <button onClick={handlePostPage}>Post</button>
        <RWebShare
          data={{
            text: `Check out this post`,
            url: `${FRONTEND_URL}profile/user/${userId}`,
            title: "Check out this post at engineerHUB",
          }}
        >
          <button>Share</button>
        </RWebShare>
      </div>

      {!isResumeUploaded ? (
        <div className="click-to-upload-your-resume">
          <div className="click-to-upload-your-resume-innner">
            <button
              onClick={() => {
                if (!isLoadingClickToUploadResume) {
                  handleResumeUploadClick();
                }
              }}
              style={{
                fontWeight: 700,
                fontSize: 14,
                lineHeight: "20px",
                color: "#547178",
                marginBottom: 0,
              }}
              disabled={isLoadingClickToUploadResume}
            >
              {isLoadingClickToUploadResume ? (
                <div className="loader-4"></div>
              ) : (
                "Click here to upload your resume"
              )}
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
                Resume
                {/* {uploadedFileName} */}
              </h3>
            </div>
            {/* <div
              style={{
                backgroundColor: "#F7D77F",
                padding: "4px 6px",
                borderRadius: 8,
              }}
            >
              <h3 style={{ fontSize: 12, marginBottom: 0, fontWeight: 500 }}>
                ATS Score: 80%
              </h3>
            </div> */}
          </div>

          <div className="update-view-trash-download">
            <div className="update-view-btn">
              <button onClick={handleResumeUploadClick}>Update</button>
              <button onClick={handleViewResume}>View</button>
            </div>

            <div className="download-trash-icon">
              <button
                onClick={downloadResume}
                disabled={isDownloading || downloadProgress === 100}
                style={{
                  backgroundColor: "#1383821a",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: isDownloading ? "not-allowed" : "pointer",
                  opacity: isDownloading ? 0.5 : 1,
                  border: "none",
                }}
              >
                {downloadProgress !== null ? (
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#138382",
                    }}
                  >
                    {downloadProgress}%
                  </span>
                ) : (
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
                )}
              </button>

              <div
                onClick={() => handleDeleteResume()}
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
          {isChecked ? (
            <div style={{ marginTop: 8 }}>
              <h3
                style={{
                  fontSize: 14,
                  marginLeft: 4,
                  marginBottom: 0,
                  fontWeight: 400,
                }}
              >
                Your Resume is Visible To Everyone. If you Want to hide it.{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    color: "#1300bf",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("edit-profile")}
                >
                  Click Here
                </span>
              </h3>
            </div>
          ) : (
            <div style={{ marginTop: 8 }}>
              <h3
                style={{
                  fontSize: 14,
                  marginLeft: 4,
                  marginBottom: 0,
                  fontWeight: 400,
                }}
              >
                Your Resume is Hidden From Everyone. If you want to make it
                visible click here.{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    color: "#1300bf",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("edit-profile")}
                >
                  Click Here
                </span>
              </h3>
            </div>
          )}
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
