import React, { useState } from "react";
import "./addskillmodal.css";
import { IoMdClose } from "react-icons/io";

const AddSkillModal = ({ isOpen, onClose, setProfileData }) => {
  const [formData, setFormData] = useState({
    skill: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    console.log("close");
    setErrors({});
    setFormData({
      skill: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="skill-modal-overlay">
        <div className="skill-modal">
          <div className="modal-header">
            <button className="close-btn" onClick={handleClose}>
              <IoMdClose />
            </button>
          </div>
          <div className="modal-content">
            <h3 className="modal-title"> Add Skill</h3>
            <p className="modal-subtitle"> Add Skill</p>

            <div className="form-div-modal">
              <div className="skill-div-inner-div">
                <div className="mb-4">
                  <label
                    htmlFor="skillHeading"
                    className="label-css-skill block text-sm font-medium"
                  >
                    Add Skills
                  </label>
                  <span className="required-indicator">*</span>

                  <div className="skill-input-div-main">
                    <input
                      type="text"
                      name="skill"
                      className="input-css-title-skill"
                    />

                    <button className="skill-add-btn">Add</button>
                  </div>
                </div>

                <div className="modal-button-div">
                  <button className="cancel-modal-btn" onClick={handleClose}>
                    Cancel
                  </button>
                  <button
                    className="save-modal-btn"
                    //    onClick={handleSubmit}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSkillModal;
