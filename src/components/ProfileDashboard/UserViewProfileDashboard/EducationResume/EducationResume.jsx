import React from "react";
import "./educationresume.css";
const EducationResume = () => {
  return (
    <div className="education-resume-main-div">
      <h3
        style={{
          fontSize: 18,
          fontWeight: 600,
          lineHeight: "24px",
          color: "#002B36",
          marginBottom: 0,
        }}
      >
        Education
      </h3>

      <div className="degree">
        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            lineHeight: "24px",
            color: "#002B36",
            marginBottom: 0,
          }}
        >
          Computer Science
        </h3>
        <h3
          style={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "20px",
            color: "#002B36",
            marginBottom: 0,
          }}
        >
          Ajay Kumar Garg College of Engineering
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
              color: "#547178",
              marginBottom: 0,
            }}
          >
            2016-2020
          </h4>
          <div
            style={{ width: "1.4px", height: "16px", background: "#547178" }}
          ></div>
          <h4
            style={{
              fontSize: 14,
              fontWeight: 400,
              lineHeight: "20px",
              color: "#547178",
              marginBottom: 0,
            }}
          >
            CGPA : 8.0
          </h4>
        </div>
      </div>

      <div
        style={{
          height: "2px",
          background: "#D1D1D1",
          borderRadius: "26px",
          marginTop: 12,
        }}
      ></div>

      <div className="degree">
        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            lineHeight: "24px",
            color: "#002B36",
            marginBottom: 0,
          }}
        >
          Computer Science
        </h3>
        <h3
          style={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "20px",
            color: "#002B36",
            marginBottom: 0,
          }}
        >
          Ajay Kumar Garg College of Engineering
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
              color: "#547178",
              marginBottom: 0,
            }}
          >
            2016-2020
          </h4>
          <div
            style={{ width: "1.4px", height: "16px", background: "#547178" }}
          ></div>
          <h4
            style={{
              fontSize: 14,
              fontWeight: 400,
              lineHeight: "20px",
              color: "#547178",
              marginBottom: 0,
            }}
          >
            CGPA : 8.0
          </h4>
        </div>
      </div>
    </div>
  );
};

export default EducationResume;
