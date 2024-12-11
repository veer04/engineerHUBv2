import React from "react";
import "./experienceresume.css";

const ExperienceResume = ({ DashboardAdminData }) => {
  return (
    <div className="experience-resume-main-div">
      <h3
        style={{
          fontSize: 18,
          fontWeight: 600,
          lineHeight: "24px",
          color: "#002B36",
          marginBottom: 0,
        }}
      >
        Experience
      </h3>

      {DashboardAdminData &&
        DashboardAdminData.experienceDetails.map((experience, index) => (
          <>
            <div className="experience">
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: "24px",
                  color: "#002B36",
                  marginBottom: 0,
                }}
              >
                {experience.designation}
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
                {experience.organisationName}
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
                  {experience.empType}
                </h4>
                <div
                  style={{
                    width: "1.4px",
                    height: "16px",
                    background: "#547178",
                  }}
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
                  {new Date(experience.startYear).getFullYear()} -{" "}
                  {new Date(experience.endYear).getFullYear()}
                </h4>
              </div>
            </div>

            {/* Border */}
            {index !== DashboardAdminData.experienceDetails.length - 1 && (
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

      {/* <div className="experience">
        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            lineHeight: "24px",
            color: "#002B36",
            marginBottom: 0,
          }}
        >
          Graphic Designer
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
          MonkStudios
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
            Internship
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
            Jun 18 - July 18
          </h4>
        </div>
      </div> */}
    </div>
  );
};

export default ExperienceResume;
