import React, { useEffect, useState } from "react";
import "./addprojectsmodal.css";
import { IoMdClose } from "react-icons/io";
import { Bucket_URL } from "../../../../services/APIUtils";
import { addUserProject } from "../../../../services/APIConfig";
import useGlobalSnackbar from "../../../../hooks/useGlobalSnackbar";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProjectsModal = ({ isOpen, onClose, data, setProfileData }) => {
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectLink: "",
    startYear: "",
    endYear: "",
    projectDescription: "",
  });

  // console.log(formData, "formData");
  // console.log(new Date(formData.startYear), "formData");
  // console.log(formData.endYear, "formData");
  const [updateProjectResponse, setUpdateProjectResponse] = useState({});

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        projectTitle: data.projectTitle,
        projectLink: data.projectLink,
        projectDescription: data.projectDescription,
      });
    }
  }, [data]);

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
    if (!formData.startYear.trim())
      newErrors.startYear = "Start date is required.";
    if (!formData.endYear.trim()) newErrors.endYear = "End date is required.";
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

    try {
      addUserProject(formData, setUpdateProjectResponse);

      const response = setUpdateProjectResponse;
      if (response) {
        toast(
          data && data._id
            ? "✏️ Projects has been updated successfully!"
            : "🥳 Projects has been added successfully!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          }
        );

        setProfileData((prevData) => ({
          ...prevData,
          projectDetails: [
            ...(prevData.projectDetails || []),
            {
              _id: response._id,
              profile: response.profile,
              projectTitle: formData.projectTitle,
              projectLink: formData.projectLink,
              projectDescription: formData.projectDescription,
              startYear: formData.startYear,
              endYear: formData.endYear,
            },
          ],
        }));

        onClose();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
    setFormData({
      projectTitle: "",
      projectLink: "",
      startYear: "",
      endYear: "",
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
                  errors.startYear ? "error" : ""
                }`}
              >
                <label
                  htmlFor="startYear"
                  className="label-css block text-sm font-medium"
                >
                  Start Date
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
                  placeholder="Select Start Date"
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
                  End Date
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
                  placeholder="Select End Date"
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
