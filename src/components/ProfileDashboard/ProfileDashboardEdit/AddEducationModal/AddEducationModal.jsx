import React, { useState } from "react";
import "./addeducationmodal.css";
import { IoMdClose } from "react-icons/io";
import { Bucket_URL } from "../../../../services/APIUtils";

const AddEducationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    collegeName: "",
    specialization: "",
    startYear: "",
    endYear: "",
    cgpa: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.collegeName.trim())
      newErrors.collegeName = "College name is required.";
    if (!formData.specialization.trim())
      newErrors.specialization = "Specialization is required.";
    if (!formData.startYear.trim())
      newErrors.startYear = "Start year is required.";
    if (!formData.endYear.trim()) newErrors.endYear = "End year is required.";
    if (!formData.cgpa.trim()) newErrors.cgpa = "CGPA is required.";

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
      collegeName: "",
      specialization: "",
      startYear: "",
      endYear: "",
      cgpa: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="education-modal-overlay">
      <div className="edu-modal">
        <div className="modal-header">
          <button className="close-btn" onClick={handleClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="modal-content">
          <h3 className="modal-title">Add Education</h3>
          <p className="modal-subtitle">Add Education</p>

          <div className="form-div-modal">
            <div className="modal-div-inner-project">
              <div className="mb-2">
                <label
                  htmlFor="collegeName"
                  className="label-css block text-sm font-medium"
                >
                  College Name
                </label>
                <span className="required-indicator">*</span>
                <select
                  id="collegeName"
                  value={formData.collegeName}
                  onChange={(e) => handleChange("collegeName", e.target.value)}
                  className={`select-hover  mt-1 ${errors.collegeName}`}
                >
                  <option
                    className="option-select-css"
                    value=""
                    disabled
                    hidden
                  >
                    Select your college name
                  </option>
                  <option
                    className="option-select-css"
                    value="Harvard University"
                  >
                    Harvard University
                  </option>
                  <option
                    className="option-select-css"
                    value="Stanford University"
                  >
                    Stanford University
                  </option>
                  <option className="option-select-css" value="MIT">
                    Massachusetts Institute of Technology (MIT)
                  </option>
                  <option
                    className="option-select-css"
                    value="Oxford University"
                  >
                    University of Oxford
                  </option>
                  <option
                    className="option-select-css"
                    value="Cambridge University"
                  >
                    University of Cambridge
                  </option>
                </select>
                {errors.collegeName && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.collegeName}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="specialization"
                  className="label-css block text-sm font-medium"
                >
                  Specialization
                </label>
                <span className="required-indicator">*</span>
                <select
                  id="specialization"
                  value={formData.collegeName}
                  onChange={(e) => handleChange("collegeName", e.target.value)}
                  className={`select-hover  mt-1 ${errors.collegeName}`}
                >
                  <option
                    className="option-select-css"
                    value=""
                    disabled
                    hidden
                  >
                    Specialization
                  </option>
                  <option
                    className="option-select-css"
                    value="Harvard University"
                  >
                    CSE
                  </option>
                  <option
                    className="option-select-css"
                    value="Stanford University"
                  >
                    CSBS
                  </option>
                  <option className="option-select-css" value="MIT">
                    Massachusetts Institute of Technology (MIT)
                  </option>
                  <option
                    className="option-select-css"
                    value="Oxford University"
                  >
                    IT
                  </option>
                  <option
                    className="option-select-css"
                    value="Cambridge University"
                  >
                    CIVIL
                  </option>
                </select>
                {errors.specialization && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.specialization}
                  </p>
                )}
              </div>

              <div className="modal-div-inner" style={{ marginBottom: 20 }}>
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
                    type="text"
                    id="startYear"
                    value={formData.startYear}
                    onChange={(e) => handleChange("startYear", e.target.value)}
                    className={`input-css mt-1 ${
                      errors.startYear ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter start year"
                  />
                  <img
                    src={`${Bucket_URL}UserViewDashboard/Calendar.svg`}
                    alt=""
                    className="img-calendar-project"
                  />
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
                    type="text"
                    id="endYear"
                    value={formData.endYear}
                    onChange={(e) => handleChange("endYear", e.target.value)}
                    className={`input-css mt-1 ${
                      errors.endYear ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter end year"
                  />
                  <img
                    src={`${Bucket_URL}UserViewDashboard/Calendar.svg`}
                    alt=""
                    className="img-calendar-project"
                  />
                  {errors.endYear && (
                    <p className="mt-1 error-p text-sm text-red-500">
                      {errors.endYear}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="cgpa"
                  className="label-css block text-sm font-medium"
                >
                  CGPA
                </label>
                <span className="required-indicator">*</span>
                <input
                  type="text"
                  id="cgpa"
                  value={formData.cgpa}
                  onChange={(e) => handleChange("cgpa", e.target.value)}
                  className={`input-css-title-link mt-1 ${
                    errors.cgpa ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your CGPA"
                />
                {errors.cgpa && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.cgpa}
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

export default AddEducationModal;
