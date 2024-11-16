import React, { useState } from "react";
import "./addachievementedit.css";
import AddAchievementModal from "./AddAchievementModal";

const AddAchievements = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <AddAchievementModal isOpen={isModalOpen} onClose={closeModal} />
      <div className="add-achievementss-main-div">
        <div className="add-headline-sub-div">
          <div className="add-headlline-sub-left">
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                lineHeight: "24px",
                marginBottom: 0,
                color: "#002B36",
              }}
            >
              Add Achievements
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
              Add Achievements
            </h4>
          </div>

          <div className="add-headline-sub-right">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAchievements;
