import React, { useState } from "react";
import "./addprojectsmodal.css";
import { IoMdClose } from "react-icons/io";
import { Bucket_URL } from "../../../../services/APIUtils";
import { addUserProject } from "../../../../services/APIConfig";
import useGlobalSnackbar from "../../../../hooks/useGlobalSnackbar";

const AddProjectsModal = ({ isOpen, onClose, data }) => {
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectLink: "",
    startDate: "",
    endDate: "",
    projectDescription: "",
  });

  console.log(formData, "formData");
  console.log(new Date(formData.startDate), "formData");
  console.log(formData.endDate, "formData");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.projectTitle.trim())
      newErrors.projectTitle = "Project title is required.";
    if (!formData.projectLink.trim())
      newErrors.projectLink = "Project link is required.";
    if (!formData.startDate.trim())
      newErrors.startDate = "Start date is required.";
    if (!formData.endDate.trim()) newErrors.endDate = "End date is required.";
    if (!formData.projectDescription.trim())
      newErrors.projectDescription = "Project description is required.";

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    addUserProject(formData)
      .then((response) => {
        console.log("Update successful:", response);

        setFormData({
          projectTitle: "",
          projectLink: "",
          startDate: "",
          endDate: "",
          projectDescription: "",
        });
        setSnackbarMessage("Project Added successful");
        setSnackbarOpen(true);
        onClose();
      })
      .catch((error) => {
        setSnackbarMessage("Failed to add project. Please try again.");
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
      projectTitle: "",
      projectLink: "",
      startDate: "",
      endDate: "",
      projectDescription: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="projects-modal-overlay">
      <div className="project-modal">
        <div className="modal-header">
          <button className="close-btn" onClick={handleClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="modal-content">
          <h3 className="modal-title">Add Projects</h3>
          <p className="modal-subtitle">Add Projects</p>
          <div className="form-div-modal">
            <div className="modal-div-inner-project">
              <div className="mb-2">
                <label
                  htmlFor="projectTitle"
                  className="label-css block text-sm font-medium"
                >
                  Project Title
                </label>
                <span className="required-indicator">*</span>
                <input
                  type="text"
                  id="projectTitle"
                  value={formData.projectTitle}
                  onChange={(e) => handleChange("projectTitle", e.target.value)}
                  className={`input-css-title-link mt-1 ${
                    errors.projectTitle ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Add your project title"
                />
                {errors.projectTitle && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.projectTitle}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="projectLink"
                  className="label-css block text-sm font-medium"
                >
                  Project Link
                </label>
                <span className="required-indicator">*</span>
                <input
                  type="text"
                  id="projectLink"
                  value={formData.projectLink}
                  onChange={(e) => handleChange("projectLink", e.target.value)}
                  className={`input-css-title-link mt-1 ${
                    errors.projectLink ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Add your project link"
                />
                {errors.projectLink && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.projectLink}
                  </p>
                )}
              </div>
            </div>
            <div className="modal-div-inner">
              <div
                className={`mb-2 relative-start-date image-input-main-div ${
                  errors.startDate ? "error" : ""
                }`}
              >
                <label
                  htmlFor="startDate"
                  className="label-css block text-sm font-medium"
                >
                  Start Date
                </label>
                <span className="required-indicator">*</span>
                <input
                  type="date"
                  id="startDate"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  className={`input-css mt-1 ${
                    errors.startDate ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Select Start Date"
                />
                {/* <img
                  src={`${Bucket_URL}UserViewDashboard/Calendar.svg`}
                  alt=""
                  className="img-calendar-project"
                /> */}
                {errors.startDate && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.startDate}
                  </p>
                )}
              </div>
              <div
                className={`mb-2 relative-end-date image-input-main-div ${
                  errors.endDate ? "error" : ""
                }`}
              >
                <label
                  htmlFor="endDate"
                  className="label-css block text-sm font-medium"
                >
                  End Date
                </label>
                <span className="required-indicator">*</span>
                <input
                  type="date"
                  id="endDate"
                  value={formData.startDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  className={`input-css mt-1 ${
                    errors.endDate ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Select End Date"
                />
                {/* <img
                  src={`${Bucket_URL}UserViewDashboard/Calendar.svg`}
                  alt=""
                  className="img-calendar-project"
                /> */}
                {errors.endDate && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.endDate}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-2 project-desc ">
              <label
                htmlFor="projectDescription"
                className="label-css block text-sm font-medium"
              >
                Project Description
              </label>
              <span className="required-indicator">*</span>
              <input
                type="text"
                id="projectDescription"
                value={formData.projectDescription}
                onChange={(e) =>
                  handleChange("projectDescription", e.target.value)
                }
                className={`input-css-title-link mt-1 ${
                  errors.projectDescription
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Add a short project description"
              />
              {errors.projectDescription && (
                <p className="mt-1 error-p text-sm text-red-500">
                  {errors.projectDescription}
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
  );
};

export default AddProjectsModal;
