import React from "react";
import "./projectsresume.css";

const ProjectsResume = () => {
  return (
    <div className="projects-resume-main-div">
      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          lineHeight: "24px",
          color: "#002B36",
          marginBottom: 0,
        }}
      >
        Projects
      </h3>

      <div style={{ marginTop: 15 }}>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            lineHeight: "24px",
            color: "#002B36",
            marginBottom: 0,
          }}
        >
          UX Project (Solving for that 1%)
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
            Jun 20 - Aug 20
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

        <h3
          style={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "20px",
            color: "#547178",
            marginBottom: 0,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Result-oriented and confident professional with over 3 years of
          hands-on experience in PHP, CakePHP, and Laravel frameworks. My aim is
          to leverage my technical expertise and strong problem-solving skills
          to contribute effectively to a dynamic organization.
        </h3>
      </div>

      {/* Border */}
      <div
        style={{
          height: "2px",
          background: "#D1D1D1",
          borderRadius: "26px",
          marginTop: 12,
        }}
      ></div>

      <div style={{ marginTop: 15 }}>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            lineHeight: "24px",
            color: "#002B36",
            marginBottom: 0,
          }}
        >
          UX Project (Solving for that 1%)
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
            Jun 20 - Aug 20
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

        <h3
          style={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "20px",
            color: "#547178",
            marginBottom: 0,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Result-oriented and confident professional with over 3 years of
          hands-on experience in PHP, CakePHP, and Laravel frameworks. My aim is
          to leverage my technical expertise and strong problem-solving skills
          to contribute effectively to a dynamic organization.
        </h3>
      </div>
    </div>
  );
};

export default ProjectsResume;
