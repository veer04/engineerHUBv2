import React from "react";
import "./uploadresumeedit.css";
import { Bucket_URL } from "../../../../services/APIUtils";

const UploadResumeEdit = () => {
  return (
    <div className="upload-resume-main-div">
      <div className="upload-resume-head-desc">
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

      <div className="upload-resume-upload-img-div">
        <form action="">
          <div
            className="upload-img-div"
            onClick={() => document.getElementById("hidden-file-input").click()}
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
            onChange={(e) => {
              console.log(e.target.files[0]);
            }}
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

        <button className="book-a-session-btn">Book a session</button>
      </div>
    </div>
  );
};

export default UploadResumeEdit;
