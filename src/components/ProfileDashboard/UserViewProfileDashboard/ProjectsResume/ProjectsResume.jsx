import React from "react";
import "./projectsresume.css";
import { Link } from "react-router-dom";

const ProjectsResume = ({ DashboardAdminData }) => {
  const hasProjectDetails =
    DashboardAdminData &&
    DashboardAdminData.projectDetails &&
    DashboardAdminData.projectDetails.length > 0;

  return (
    <div className="projects-resume-main-div">
      <h3
        style={{
          fontSize: 18,
          fontWeight: 600,
          lineHeight: "24px",
          color: "#002B36",
          marginBottom: 0,
        }}
      >
        Projects
      </h3>
      {!hasProjectDetails ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            margin: 0,
          }}
        >
          <p style={{ margin: 0 }}>No Projects Added.</p>
        </div>
      ) : (
        <>
          {DashboardAdminData &&
            DashboardAdminData.projectDetails.map((projects, index) => (
              <>
                <div style={{ marginTop: 15 }}>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      lineHeight: "24px",
                      color: "#002B36",
                      marginBottom: 0,
                    }}
                  >
                    {projects.projectTitle}
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
                      {new Date(projects.startYear).getFullYear()} -{" "}
                      {new Date(projects.endYear).getFullYear()}
                    </h4>
                    <div
                      style={{
                        width: "1.4px",
                        height: "16px",
                        background: "#547178",
                      }}
                    ></div>
                    <Link
                      to={projects.projectLink || ""}
                      target="_blank"
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        lineHeight: "20px",
                        color: "#2100EC",
                        marginBottom: 0,
                      }}
                    >
                      Link to certificate
                    </Link>
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
                    {projects.projectDescription}
                  </h3>
                </div>

                {/* Border */}
                {index !== DashboardAdminData.projectDetails.length - 1 && (
                  <div
                    style={{
                      height: "2px",
                      background: "#D1D1D1",
                      borderRadius: "26px",
                      marginTop: 12,
                    }}
                  ></div>
                )}
              </>
            ))}
        </>
      )}
    </div>
  );
};

export default ProjectsResume;
