import React, { useState } from "react";
import "./addachievemodal.css";
import { IoMdClose } from "react-icons/io";
import { addUserAchievement } from "../../../../services/APIConfig";

const AddAchievementModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    achievementHeading: "",
    achievementDescription: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.achievementHeading.trim())
      newErrors.achievementHeading = "Achievement heading is required.";
    if (!formData.achievementDescription.trim())
      newErrors.achievementDescription = "About your achievement is required.";

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    addUserAchievement(formData)
      .then((response) => {
        console.log("Update successful:", response);
        setSnackbarMessage("Achievement Added successful");
        setSnackbarOpen(true);
        onClose();
      })
      .catch((error) => {
        console.error("Update failed:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClose = () => {
    setErrors({});
    onClose();
    setFormData({
      achievementHeading: "",
      achievementDescription: "",
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="achieve-modal-overlay">
        <div className="achieve-modal">
          <div className="modal-header">
            <button className="close-btn" onClick={handleClose}>
              <IoMdClose />
            </button>
          </div>
          <div className="modal-content">
            <h3 className="modal-title">Add Achievements</h3>
            <p className="modal-subtitle">Add Achievements</p>

            <div className="form-div-modal">
              <div className="modal-div-inner-achieve">
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor="achievementHeading"
                      className="label-css block text-sm font-medium"
                    >
                      Achievement Heading
                    </label>
                    <span className="required-indicator">*</span>
                    <input
                      type="text"
                      id="achievementHeading"
                      value={formData.achievementHeading}
                      onChange={(e) =>
                        handleChange("achievementHeading", e.target.value)
                      }
                      className={`input-css-title-link mt-1 ${
                        errors.achievementHeading
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Add your achievement heading"
                    />
                    {errors.achievementHeading && (
                      <p className="mt-1 error-p text-sm text-red-500">
                        {errors.achievementHeading}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="achievementDescription"
                      className="label-css block text-sm font-medium"
                    >
                      Write about your achievement
                    </label>
                    <span className="required-indicator">*</span>
                    <input
                      type="text"
                      id="achievementDescription"
                      value={formData.achievementDescription}
                      onChange={(e) =>
                        handleChange("achievementDescription", e.target.value)
                      }
                      className={`input-css-title-link mt-1 ${
                        errors.achievementDescription
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="About your achievement"
                    />
                    {errors.achievementDescription && (
                      <p className="mt-1 error-p text-sm text-red-500">
                        {errors.achievementDescription}
                      </p>
                    )}
                  </div>
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

export default AddAchievementModal;
