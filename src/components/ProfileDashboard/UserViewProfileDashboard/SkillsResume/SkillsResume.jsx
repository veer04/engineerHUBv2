import React from "react";
import "./skillsresume.css";

const SkillsResume = ({ DashboardAdminData }) => {
  const hasSkillsDetails =
    DashboardAdminData &&
    DashboardAdminData.skillsDetails &&
    DashboardAdminData.skillsDetails.length > 0;

  return (
    <div className="skills-resume-main-div">
      <h3
        style={{
          fontSize: 18,
          fontWeight: 600,
          lineHeight: "24px",
          color: "#002B36",
          marginBottom: 0,
        }}
      >
        Skills
      </h3>

      {!hasSkillsDetails ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            margin: 0,
          }}
        >
          <p style={{ margin: 0 }}>No Skills Added.</p>
        </div>
      ) : (
        <div className="skills-box-main">
          {DashboardAdminData &&
            DashboardAdminData?.skillsDetails?.map((skill, index) => {
              const skillList = skill.skills.split(",");
              return skillList?.map((singleSkill, skillIndex) =>
                singleSkill && singleSkill !== "" ? (
                  <span key={`${index}-${skillIndex}`} className="skills-box">
                    {singleSkill}
                  </span>
                ) : null
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SkillsResume;
