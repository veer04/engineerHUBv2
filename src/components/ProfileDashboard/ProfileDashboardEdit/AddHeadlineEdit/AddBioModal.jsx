import React, { useState } from "react";
import "./addbiomodal.css";
import { IoMdClose } from "react-icons/io";

const AddBioModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    bio: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.achievementHeading.trim())
      newErrors.achievementHeading = "This is required.";

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Form Submitted:", formData);
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
    setFormData({
      bio: "",
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="Bio-modal-overlay">
        <div className="Bio-modal">
          <div className="modal-header">
            <button className="close-btn" onClick={handleClose}>
              <IoMdClose />
            </button>
          </div>
          <div className="modal-content">
            <h3 className="modal-title"> Add Bio</h3>
            <p className="modal-subtitle"> Add Bio</p>

            <div className="form-div-modal">
              <div className="bio-div-inner-project">
                <div className="mb-4">
                  <label
                    htmlFor="bioHeading"
                    className="label-css block text-sm font-medium"
                  >
                    Add Bio
                  </label>
                  <span className="required-indicator">*</span>
                  <input
                    type="text"
                    id="bioHeading"
                    value={formData.bio}
                    onChange={(e) =>
                      handleChange("achievementHeading", e.target.value)
                    }
                    className={`input-css-title-link mt-1 ${
                      errors.bio ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Add your achievement heading"
                  />
                  {errors.bio && (
                    <p className="mt-1 error-p text-sm text-red-500">
                      {errors.bio}
                    </p>
                  )}
                </div>

                <div className="modal-button-div">
                  <button className="cancel-modal-btn" onClick={handleClose}>
                    Cancel
                  </button>
                  <button className="save-modal-btn" onClick={handleSubmit}>
                    Save
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

export default AddBioModal;
