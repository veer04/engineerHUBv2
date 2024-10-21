import React from "react";
import "./certificationsresume.css";

const CertificationsResume = () => {
  return (
    <div className="certifications-resume-main-div">
      <h3
        style={{
          fontSize: 18,
          fontWeight: 600,
          lineHeight: "24px",
          color: "#002B36",
          marginBottom: 0,
        }}
      >
        Certifications
      </h3>

      <div style={{ marginTop: 10 }}>
        <h4
          style={{
            fontSize: 16,
            fontWeight: 600,
            lineHeight: "24px",
            color: "#002B36",
            marginBottom: 0,
          }}
        >
          Foundations of UX Design
        </h4>

        <h3
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
          IxDF
        </h3>

        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginTop: 3,
          }}
        >
          <h4
            style={{
              fontSize: 14,
              fontWeight: 400,
              lineHeight: "20px",
              color: "#002B36",
              marginBottom: 0,
            }}
          >
            Aug 19
          </h4>
          <div
            style={{ width: "1.4px", height: "16px", background: "#547178" }}
          ></div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 400,
              lineHeight: "20px",
              color: "#2100EC",
              marginBottom: 0,
            }}
          >
            Link to certificate
          </span>
        </div>
      </div>
    </div>
  );
};

export default CertificationsResume;
