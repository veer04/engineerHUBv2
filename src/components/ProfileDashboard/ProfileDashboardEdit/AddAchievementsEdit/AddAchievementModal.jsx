import React, { useState } from "react";
import "./addachievemodal.css";
import { IoMdClose } from "react-icons/io";
import { addUserAchievement } from "../../../../services/APIConfig";

const AddAchievementModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    achievementName: "",
    achievementDate: "",
    description: "",
    achievementUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.achievementName.trim())
      newErrors.achievementName = "Achievement name is required.";
    if (!formData.achievementDate.trim())
      newErrors.achievementDate = "Achievement date is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.achievementUrl.trim())
      newErrors.achievementUrl = "Achievement URL is required.";

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
      achievementName: "",
      achievementDate: "",
      description: "",
      achievementUrl: "",
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
            <h3 className="modal-title">Add Achievement</h3>

            <div className="form-div-modal">
              <div className="modal-div-inner-achieve">
                <div>
                  {/* Achievement Name */}
                  <div className="mb-4">
                    <label
                      htmlFor="achievementName"
                      className="label-css block text-sm font-medium"
                    >
                      Achievement Name
                    </label>
                    <span className="required-indicator">*</span>
                    <input
                      type="text"
                      id="achievementName"
                      value={formData.achievementName}
                      onChange={(e) =>
                        handleChange("achievementName", e.target.value)
                      }
                      className={`input-css-title-link mt-1 ${
                        errors.achievementName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter achievement name"
                    />
                    {errors.achievementName && (
                      <p className="mt-1 error-p text-sm text-red-500">
                        {errors.achievementName}
                      </p>
                    )}
                  </div>

                  {/* Achievement Date */}
                  <div className="mb-4">
                    <label
                      htmlFor="achievementDate"
                      className="label-css block text-sm font-medium"
                    >
                      Achievement Date
                    </label>
                    <span className="required-indicator">*</span>
                    <input
                      type="date"
                      id="achievementDate"
                      value={formData.achievementDate}
                      onChange={(e) =>
                        handleChange("achievementDate", e.target.value)
                      }
                      className={`input-css-title-link mt-1 ${
                        errors.achievementDate
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.achievementDate && (
                      <p className="mt-1 error-p text-sm text-red-500">
                        {errors.achievementDate}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="label-css block text-sm font-medium"
                    >
                      Description
                    </label>
                    <span className="required-indicator">*</span>
                    <textarea
                      rows={4}
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                      className={` mt-1 ${
                        errors.description
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Describe your achievement"
                    />
                    {errors.description && (
                      <p className="mt-1 error-p text-sm text-red-500">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {/* Achievement URL */}
                  <div className="mb-4">
                    <label
                      htmlFor="achievementUrl"
                      className="label-css block text-sm font-medium"
                    >
                      Achievement URL
                    </label>
                    <span className="required-indicator">*</span>
                    <input
                      type="url"
                      id="achievementUrl"
                      value={formData.achievementUrl}
                      onChange={(e) =>
                        handleChange("achievementUrl", e.target.value)
                      }
                      className={`input-css-title-link mt-1 ${
                        errors.achievementUrl
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter a URL"
                    />
                    {errors.achievementUrl && (
                      <p className="mt-1 error-p text-sm text-red-500">
                        {errors.achievementUrl}
                      </p>
                    )}
                  </div>
                </div>

                <div className="modal-button-div">
                  <button className="cancel-modal-btn" onClick={handleClose}>
                    Cancel
                  </button>
                  <button
                    className="save-modal-btn"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {"Save"}
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
