import React, { useState } from "react";
import "./addskill.css";
import AddSkillModal from "./AddSkillModal";

const AddSkill = ({ profileData, setProfileData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setselectedSkill(null);
  };

  return (
    <>
      <AddSkillModal
        isOpen={isModalOpen}
        onClose={closeModal}
        setProfileData={setProfileData}
        profileData={profileData}
      />
      <div className="add-skill-main-div" id="add-skills">
        <div className="add-skill-sub-div">
          <div className="add-skill-sub-left">
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                lineHeight: "24px",
                marginBottom: 0,
                color: "#002B36",
              }}
            >
              {!profileData?.skillsDetails?.length > 0
                ? "Add Skill"
                : "Add Skill"}
            </h3>
            {!profileData?.skillsDetails?.length > 0 ? (
              <h4
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: "20px",
                  marginBottom: 0,
                  color: "#547178",
                }}
              >
                Add a skills in which you are good at.
              </h4>
            ) : (
              <>
                <h4
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: "20px",
                    marginBottom: 0,
                    marginTop: 3,
                    color: "#547178",
                  }}
                >
                  Enter your relevant skill.
                </h4>
                <div className="skills-box-main">
                  {profileData &&
                    profileData?.skillsDetails?.map((skill, index) => {
                      const skillList = skill.skills.split(",");
                      return skillList?.map((singleSkill, skillIndex) =>
                        singleSkill && singleSkill !== "" ? (
                          <span
                            key={`${index}-${skillIndex}`}
                            className="skills-box"
                          >
                            {singleSkill}
                          </span>
                        ) : null
                      );
                    })}
                </div>
              </>
            )}
          </div>

          <div className="add-skill-sub-right">
            {profileData && profileData.skillsDetails.length > 0 ? (
              <div onClick={() => openModal()} style={{ cursor: "pointer" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M11.4106 4.48679L12.4619 3.43547C13.0425 2.85484 13.9839 2.85484 14.5645 3.43547C15.1451 4.0161 15.1451 4.95748 14.5645 5.53811L13.5132 6.58943M11.4106 4.48679L5.23517 10.6622C4.4512 11.4462 4.05919 11.8381 3.79228 12.3158C3.52535 12.7935 3.2568 13.9214 3 15C4.07857 14.7432 5.20649 14.4746 5.68417 14.2077C6.16184 13.9408 6.55383 13.5488 7.33781 12.7648L13.5132 6.58943M11.4106 4.48679L13.5132 6.58943"
                    stroke="#547178"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.25 15H12.75"
                    stroke="#547178"
                    stroke-width="1.2"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            ) : (
              <h3
                onClick={openModal}
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  lineHeight: "24px",
                  marginBottom: 0,
                  color: "#138382",
                  cursor: "pointer",
                }}
              >
                Add
              </h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSkill;
