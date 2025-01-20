import React, { useEffect, useState } from "react";
import "./addprojectsmodal.css";
import { IoMdClose } from "react-icons/io";
import {
  addUserProject,
  deleteUserProject,
  updateUserProject,
} from "../../../../services/APIConfig";
import useGlobalSnackbar from "../../../../hooks/useGlobalSnackbar";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQueryClient } from "@tanstack/react-query";

const AddProjectsModal = ({ isOpen, onClose, data, setProfileData }) => {
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectLink: "",
    startYear: "",
    endYear: "",
    projectDescription: "",
  });
  console.log(data, "data");
  const queryClient = useQueryClient();

  const [updateProjectResponse, setUpdateProjectResponse] = useState({});
  const [response, setResponse] = useState(null);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        _id: data._id,
        projectTitle: data.projectTitle || "",
        projectLink: data.projectLink || "",
        projectDescription: data.projectDescription || "",
        startYear: data.startYear
          ? new Date(data.startYear).toISOString().split("T")[0]
          : "",
        endYear: data.endYear
          ? new Date(data.endYear).toISOString().split("T")[0]
          : "",
      });
    }
  }, [data]);

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

      const response = updateProjectResponse;
      console.log("updateprojectres", updateProjectResponse);
      console.log("responsebelow", response);
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

        // queryClient.invalidateQueries({ queryKey: ["profileData"] });

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

  const handleUpdateProject = async () => {
    const result = await updateUserProject(
      { projectId: data._id, body: formData },
      setResponse
    );

    if (result.status === 200) {
      toast("👌 Project Updated Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      setProfileData((prevData) => ({
        ...prevData,
        projectDetails: prevData.projectDetails.map((exp) =>
          exp._id === result.data.data._id ? result.data.data : exp
        ),
      }));

      onClose();
    } else {
      toast(`✖️ ${"Error Updating Project"}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
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

  const handleDeleteProject = async () => {
    if (!data || !data._id) {
      toast.error("No project selected for deletion.");
      return;
    }
    try {
      await deleteUserProject(data?._id, setResponse);

      if (response) {
        toast.success("Project deleted successfully!");
        setProfileData((prevData) => ({
          ...prevData,
          projectDetails: prevData?.projectDetails.filter(
            (pro) => pro._id !== data._id
          ),
        }));

        onClose();
      } else {
        toast.error(response?.message || "Failed to delete Project.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
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

          <div className="modal-delete-sav-cancel-main-div-pro">
            <div
              onClick={() => handleDeleteProject()}
              style={{
                cursor: "pointer",
                backgroundColor: "#FF58581A",
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19.5 5.49609L18.8803 15.5212C18.7219 18.0825 18.6428 19.3632 18.0008 20.284C17.6833 20.7392 17.2747 21.1234 16.8007 21.4121C15.8421 21.9961 14.559 21.9961 11.9927 21.9961C9.42312 21.9961 8.1383 21.9961 7.17905 21.411C6.7048 21.1218 6.296 20.7369 5.97868 20.2809C5.33688 19.3587 5.25945 18.0762 5.10461 15.5113L4.5 5.49609"
                  stroke="#FF3737"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M3 5.50391H21M16.0557 5.50391L15.3731 4.09564C14.9196 3.16017 14.6928 2.69243 14.3017 2.40072C14.215 2.33601 14.1231 2.27845 14.027 2.22861C13.5939 2.00391 13.0741 2.00391 12.0345 2.00391C10.9688 2.00391 10.436 2.00391 9.99568 2.23803C9.8981 2.28992 9.80498 2.34981 9.71729 2.41708C9.32164 2.72061 9.10063 3.20546 8.65861 4.17517L8.05292 5.50391"
                  stroke="#FF3737"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M9.5 16.5V10.5"
                  stroke="#FF3737"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M14.5 16.5V10.5"
                  stroke="#FF3737"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div className="modal-button-div">
              <button className="cancel-modal-btn" onClick={handleClose}>
                Cancel
              </button>
              <button
                className="save-modal-btn"
                onClick={
                  data && Object.keys(data).length > 0 && data._id
                    ? handleUpdateProject
                    : handleSubmit
                }
              >
                {data && Object.keys(data).length > 0 && data.profile
                  ? "Update"
                  : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectsModal;
