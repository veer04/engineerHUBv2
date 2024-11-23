import React, { useEffect, useState } from "react";
import "./addeducationmodal.css";
import { IoMdClose } from "react-icons/io";
import { API_URL, Bucket_URL } from "../../../../services/APIUtils";
import {
  addUserEducation,
  getAllBranches,
  getAllCampuses,
} from "../../../../services/APIConfig";

const AddEducationModal = ({ isOpen, onClose }) => {
  const [campus, setCampus] = useState([]);
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({
    collegeName: "",
    specialization: "",
    startYear: "",
    endYear: "",
    marks: "",
    country: "IN",
    state: "rajasthan",
    degree: "btech",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCampuses(setCampus);
    getAllBranches(setBranches);
  }, []);

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
    if (!formData.marks.trim()) newErrors.marks = "marks is required.";

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    addUserEducation(formData)
      .then((response) => {
        console.log("Update successful:", response);

        setFormData({
          collegeName: "",
          specialization: "",
          startYear: "",
          endYear: "",
          marks: "",
        });
        setSnackbarMessage("Education Added successful");
        setSnackbarOpen(true);
        onClose();
      })
      .catch((error) => {
        setSnackbarMessage("Failed to add education. Please try again.");
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
      collegeName: "",
      specialization: "",
      startYear: "",
      endYear: "",
      marks: "",
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
                  {campus &&
                    campus.map((college) => (
                      <option
                        key={college._id}
                        className="option-select-css"
                        value={college._id}
                      >
                        {college.collegeName}
                      </option>
                    ))}
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
                  value={formData.specialization}
                  onChange={(e) =>
                    handleChange("specialization", e.target.value)
                  }
                  className={`select-hover  mt-1 ${errors.specialization}`}
                >
                  {branches &&
                    branches.map((branch, index) => (
                      <option
                        key={branch}
                        className="option-select-css"
                        value={branch}
                      >
                        {branch}
                      </option>
                    ))}
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
                  htmlFor="marks"
                  className="label-css block text-sm font-medium"
                >
                  marks
                </label>
                <span className="required-indicator">*</span>
                <input
                  type="text"
                  id="marks"
                  value={formData.marks}
                  onChange={(e) => handleChange("marks", e.target.value)}
                  className={`input-css-title-link mt-1 ${
                    errors.marks ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your marks"
                />
                {errors.marks && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.marks}
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
