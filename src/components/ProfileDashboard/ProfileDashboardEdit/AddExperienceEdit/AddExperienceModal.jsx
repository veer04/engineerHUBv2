import React, { useState } from "react";
import "./addexperiencemodal.css";
import { IoMdClose } from "react-icons/io";
import { Bucket_URL } from "../../../../services/APIUtils";
import { addUserExperience } from "../../../../services/APIConfig";

const AddExperienceModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    experienceType: "",
    role: "",
    startYear: "",
    endYear: "",
    organizationName: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.experienceType.trim())
      newErrors.experienceType = "Experience type is required.";
    if (!formData.role.trim()) newErrors.role = "Role is required.";
    if (!formData.startYear.trim())
      newErrors.startYear = "Start year is required.";
    if (!formData.endYear.trim()) newErrors.endYear = "End year is required.";
    if (!formData.organizationName.trim())
      newErrors.organizationName = "Organization/Company name is required.";

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);

    addUserExperience(formData)
      .then((response) => {
        console.log("Update successful:", response);

        setFormData({
          experienceType: "",
          role: "",
          startYear: "",
          endYear: "",
          organizationName: "",
        });
        setSnackbarMessage("Experience Added successful");
        setSnackbarOpen(true);
        onClose();
      })
      .catch((error) => {
        setSnackbarMessage("Failed to add Experience. Please try again.");
        setSnackbarOpen(true);
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
      experienceType: "",
      role: "",
      startYear: "",
      endYear: "",
      organizationName: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="experience-modal-overlay">
      <div className="exp-modal">
        <div className="modal-header">
          <button className="close-btn" onClick={handleClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="modal-content">
          <h3 className="modal-title">Add Experience</h3>
          <p className="modal-subtitle">Add Experience</p>

          <div className="form-div-modal">
            <div className="modal-div-inner-project">
              <div className="mb-2">
                <label
                  htmlFor="experienceType"
                  className="label-css block text-sm font-medium"
                >
                  Experience Type
                </label>
                <select
                  id="experienceType"
                  value={formData.experienceType}
                  onChange={(e) =>
                    handleChange("experienceType", e.target.value)
                  }
                  className={`select-hover mt-1 ${
                    errors.experienceType ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option
                    className="option-select-css"
                    value=""
                    disabled
                    hidden
                  >
                    Select your experience type
                  </option>
                  <option className="option-select-css" value="Fresher">
                    Full Time
                  </option>
                  <option className="option-select-css" value="Senior">
                    Part Time
                  </option>
                  <option className="option-select-css" value="Manager">
                    Self-employed
                  </option>
                  <option className="option-select-css" value="Manager">
                    Freelance
                  </option>
                  <option className="option-select-css" value="Manager">
                    Internship
                  </option>
                  <option className="option-select-css" value="Manager">
                    Trainee
                  </option>
                </select>
                {errors.experienceType && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.experienceType}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="role"
                  className="label-css block text-sm font-medium"
                >
                  Type your Role
                </label>
                <span className="required-indicator">*</span>
                <input
                  type="text"
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  className={`input-css-title-link mt-1 ${
                    errors.role ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your Role"
                />
                {errors.role && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.role}
                  </p>
                )}
              </div>

              <div className="modal-div-inner" style={{ marginBottom: 10 }}>
                <div
                  className={`mb-2 relative-start-date image-input-main-div ${
                    errors.startYear ? "error" : ""
                  }`}
                >
                  <label
                    htmlFor="startYear"
                    className="label-css block text-sm font-medium"
                  >
                    Start Year
                  </label>
                  <span className="required-indicator">*</span>
                  <input
                    type="date"
                    id="startYear"
                    value={formData.startYear}
                    onChange={(e) => handleChange("startYear", e.target.value)}
                    className={`input-css mt-1 ${
                      errors.startYear ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter start year"
                  />
                  {/* <img
                    src={`${Bucket_URL}UserViewDashboard/Calendar.svg`}
                    alt=""
                    className="img-calendar-project"
                  /> */}
                  {errors.startYear && (
                    <p className="mt-1 error-p text-sm text-red-500">
                      {errors.startYear}
                    </p>
                  )}
                </div>
                <div
                  className={`mb-2 relative-end-date image-input-main-div ${
                    errors.endYear ? "error" : ""
                  }`}
                >
                  <label
                    htmlFor="endYear"
                    className="label-css block text-sm font-medium"
                  >
                    End Year
                  </label>
                  <span className="required-indicator">*</span>
                  <input
                    type="date"
                    id="endYear"
                    value={formData.endYear}
                    onChange={(e) => handleChange("endYear", e.target.value)}
                    className={`input-css mt-1 ${
                      errors.endYear ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter end year"
                  />
                  {/* <img
                    src={`${Bucket_URL}UserViewDashboard/Calendar.svg`}
                    alt=""
                    className="img-calendar-project"
                  /> */}
                  {errors.endYear && (
                    <p className="mt-1 error-p text-sm text-red-500">
                      {errors.endYear}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="organizationName"
                  className="label-css block text-sm font-medium"
                >
                  Organization/Company Name
                </label>
                <span className="required-indicator">*</span>
                <input
                  type="text"
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) =>
                    handleChange("organizationName", e.target.value)
                  }
                  className={`input-css-title-link mt-1 ${
                    errors.organizationName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Add your organization/company name"
                />
                {errors.organizationName && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.organizationName}
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
  );
};

export default AddExperienceModal;
