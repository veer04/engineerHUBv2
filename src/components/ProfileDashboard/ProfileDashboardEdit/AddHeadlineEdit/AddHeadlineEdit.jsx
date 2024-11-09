import React, { useState } from "react";
import "./addheadlineedit.css";
import AddBioModal from "./AddBioModal";

const AddHeadlineEdit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <AddBioModal isOpen={isModalOpen} onClose={closeModal} />
      <div className="add-headline-main-div">
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
              Add headline
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
              Add a summary of your resume to introduce yourself to recruiters
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

export default AddHeadlineEdit;
