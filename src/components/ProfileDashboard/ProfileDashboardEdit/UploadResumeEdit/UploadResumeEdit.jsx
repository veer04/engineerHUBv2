import React, { useEffect, useState } from "react";
import "./uploadresumeedit.css";
import { API_URL, Bucket_URL } from "../../../../services/APIUtils";
import { getAccessToken } from "../../../../features/getCookieValues";
import axios from "axios";
import { FiDownload } from "react-icons/fi";
import moment from "moment/moment";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadResumeEdit = ({ profileData, setProfileData }) => {
  const [resume, setResume] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(profileData?.resume || "");
  const fileInputRef = React.useRef(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [isUploaded, setIsUploaded] = useState(!!profileData?.resume);
  const [uploadedFileName, setUploadedFileName] = useState(
    profileData?.resume ? profileData?.resume.split("/").pop() : ""
  );
  const [uploadDate, setUploadDate] = useState(
    profileData?.resume ? moment().format("YYYY-MM-DD") : ""
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (profileData?.resume) {
      setIsUploaded(true);
      setUploadedFileName(profileData?.resume.split("/").pop());
      setResumeUrl(profileData?.resume);
      setUploadDate(moment().format("YYYY-MM-DD"));
    }
  }, [profileData?.resume]);

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
          setIsUploaded(true);
          setUploadedFileName(file.name);
          setResumeUrl(response.data.data);
          setUploadDate(moment().format("YYYY-MM-DD"));
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

  const handleSessionBook = () => {
    window.open("/referrals", "_blank");
  };

  const downloadResume = async () => {
    try {
      const response = await axios({
        url: `${API_URL}api/v1/downloadPdf?title=${profileData?.resume}&url=${profileData?.resume}`,
        method: "POST",
        data: { title: resumeUrl, url: profileData?.resume },
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
      link.setAttribute("download", `${profileData?.resume}`);
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-resume-main-div">
      <div className="upload-resume-head-desc">
        <div>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              lineHeight: "24px",
              marginBottom: 0,
              color: "#002B36",
            }}
          >
            Upload Resume
          </h3>
          <h4
            style={{
              fontSize: 14,
              fontWeight: 400,
              lineHeight: "20px",
              marginBottom: 0,
              color: "#547178",
            }}
          >
            Upload your resume
          </h4>
        </div>

        {isUploaded && (
          <div className="update-resume-btn">
            <button onClick={handleResumeUploadClick}>Update</button>
            <input
              id="hidden-file-input"
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".pdf, .docx"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>

      {isUploaded && (
        <div className="after-upload-div">
          <div className="after-upload-div-sub">
            <div>
              <h3
                style={{
                  color: "#002B36",
                  fontSize: 16,
                  marginLeft: 4,
                  marginBottom: 0,
                  fontWeight: 600,
                  lineHeight: "24px",
                }}
              >
                {uploadedFileName}
              </h3>
              <h4
                style={{
                  color: "#547178",
                  fontSize: 14,
                  marginLeft: 4,
                  marginBottom: 0,
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Uploaded on {`${moment(uploadDate).format("DD/MM/YYYY")}`}
              </h4>
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

      {!isUploaded && (
        <>
          <div className="upload-resume-upload-img-div">
            <form onSubmit={(e) => e.preventDefault()}>
              <div
                className="upload-img-div"
                onClick={handleResumeUploadClick}
                style={{ cursor: "pointer" }}
              >
                <img
                  className="upload-img"
                  src={`${Bucket_URL}UserViewDashboard/file-upload.svg`}
                  alt=""
                />
              </div>
              <input
                id="hidden-file-input"
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".pdf, .docx"
                onChange={handleFileChange}
              />
            </form>

            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "20px",
                marginBottom: 0,
                color: "#138382",
                marginTop: 8,
              }}
            >
              Upload Resume
            </h3>

            <h3
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                marginBottom: 0,
                color: "#002B36",
              }}
            >
              Formats .pdf, .docx upto 5 MB
            </h3>

            {/* {uploadMessage && <p style={{ color: "red" }}>{uploadMessage}</p>} */}
          </div>

          <div className="book-session-div">
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: "24px",
                marginBottom: 0,
                color: "#002B36",
              }}
            >
              Don&#39;t have a perfect resume yet?
            </h3>

            <button className="book-a-session-btn" onClick={handleSessionBook}>
              Book a session
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UploadResumeEdit;
