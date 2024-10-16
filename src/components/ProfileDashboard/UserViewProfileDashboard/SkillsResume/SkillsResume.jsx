import React from "react";
import "./skillsresume.css";

const SkillsResume = () => {
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

      <div className="skills-box-main">
        <span className="skills-box">Figma</span>
        <span className="skills-box">Framer</span>
        <span className="skills-box">Product Design</span>
        <span className="skills-box">Product Design</span>{" "}
        <span className="skills-box">Product Design</span>{" "}
        <span className="skills-box">Product Design</span>{" "}
        <span className="skills-box">Product Design</span>
      </div>
    </div>
  );
};

export default SkillsResume;
