import React, { useEffect, useState } from "react";
import "./uploadresumeedit.css";
import { API_URL, Bucket_URL } from "../../../../services/APIUtils";
import { getAccessToken } from "../../../../features/getCookieValues";
import axios from "axios";
import { FiDownload } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import moment from "moment/moment";

const UploadResumeEdit = ({ profileData, setProfileData }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadDate, setUploadDate] = useState("");

  useEffect(() => {
    const savedResumeUrl = localStorage.getItem("resumeUrl");
    const savedResumeName = localStorage.getItem("uploadedFileName");
    const savedUploadDate = localStorage.getItem("uploadDate");

    if (savedResumeUrl && savedResumeName && savedUploadDate) {
      setResumeUrl(savedResumeUrl);
      setUploadedFileName(savedResumeName);
      setUploadDate(savedUploadDate);
      setIsUploaded(true);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 5 * 1024 * 1024) {
        setResumeFile(file);
        setUploadMessage("");
      } else {
        setUploadMessage("File size exceeds the 5 MB limit.");
      }
    }
  };

  const handleAddUpdateResume = async () => {
    if (!resumeFile) {
      setUploadMessage("Please select a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const config = {
        headers: {
          accessToken: getAccessToken(),
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.patch(
        `${API_URL}api/v1/user/resumeUpdate`,
        formData,
        config
      );

      setResumeUrl(response.data.data);
      setUploadMessage("Resume uploaded successfully.");
      setIsUploaded(true);
      setUploadedFileName(resumeFile.name);
      setUploadDate(new Date().toLocaleDateString());
      console.log(response, "resumeData");

      localStorage.setItem("resumeUrl", response.data.data);
      localStorage.setItem("uploadedFileName", resumeFile.name);
      localStorage.setItem("uploadDate", new Date().toLocaleDateString());
    } catch (error) {
      console.error("Error uploading resume:", error);
      setUploadMessage("Failed to upload resume. Please try again.");
    }
  };

  // const download = async () => {
  //   if (loading) return; // Prevent multiple downloads
  //   setLoading(true); // Indicate loading
  //   setStatus("loading"); // Set status to loading

  //   try {
  //     const response = await axios({
  //       url: `${API_URL}api/v1/downloadPdf`, // API endpoint
  //       method: "POST",
  //       data: {
  //         title: uploadedFileName, // Use uploadedFileName instead of singleProductData?.title
  //         url: paymentData1?.coursePdf, // URL for the uploaded resume
  //       },
  //       responseType: "blob", // Expect a file in binary format
  //       onDownloadProgress: (progressEvent) => {
  //         let percentCompleted = Math.round(
  //           (progressEvent.loaded * 100) / progressEvent.total
  //         );
  //         setProgress(percentCompleted); // Update progress
  //       },
  //     });

  //     setProgress(100); // Download completed
  //     const blob = new Blob([response.data], {
  //       type: "application/pdf", // Ensure the correct file type
  //     });

  //     // Create a link element to trigger file download
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(blob);
  //     link.setAttribute("download", `${uploadedFileName || "resume"}.pdf`); // Use uploadedFileName for download name
  //     link.click();

  //     // Update the download state
  //     setDownloaded(true);
  //     setStatus("downloaded");
  //     setSnackbarMessage("Download successful!");
  //     setSnackbarOpen(true);
  //   } catch (err) {
  //     // Handle errors
  //     setStatus("failed");
  //     setSnackbarMessage(
  //       <>
  //         <span>Download failed</span>
  //         {err?.response?.data?.message && (
  //           <>
  //             <br />
  //             <span>Error: {err?.response?.data?.message}</span>
  //           </>
  //         )}
  //       </>
  //     );
  //     setSnackbarSeverity("error");
  //     setSnackbarDuration(5000);
  //     setSnackbarOpen(true);
  //     console.error(err);
  //   } finally {
  //     setLoading(false); // Reset loading state
  //     setProgress(0); // Reset progress state
  //   }
  // };

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
            <button onClick={handleAddUpdateResume}>Update</button>
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
                onClick={() =>
                  document.getElementById("hidden-file-input").click()
                }
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

            {uploadMessage && <p style={{ color: "red" }}>{uploadMessage}</p>}
          </div>
          <button
            className="book-a-session-btn"
            onClick={handleAddUpdateResume}
            style={{ marginTop: "20px" }}
          >
            Upload Resume
          </button>
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

            <button className="book-a-session-btn">Book a session</button>
          </div>
        </>
      )}
    </div>
  );
};

export default UploadResumeEdit;
