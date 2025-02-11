import React, { useEffect, useState } from "react";
import "./addexperiencemodal.css";
import { IoMdClose } from "react-icons/io";
import { Bucket_URL } from "../../../../services/APIUtils";
import {
  addUserExperience,
  deleteUserExperience,
  updateUserExperience,
} from "../../../../services/APIConfig";

import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddExperienceModal = ({ isOpen, onClose, data, setProfileData }) => {
  const [formData, setFormData] = useState({
    empType: "",
    designation: "",
    startYear: "",
    endYear: "",
    organisationName: "",
    country: "IN",
    state: "rajasthan",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const [updateExperienceResponse, setUpdateExperienceResponse] = useState({});

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  useEffect(() => {
    if (data) {
      setFormData({
        empType: data.empType,
        designation: data.designation,
        startYear: data.startYear
          ? new Date(data.startYear).toISOString().split("T")[0]
          : "",
        endYear: data.endYear
          ? new Date(data.endYear).toISOString().split("T")[0]
          : "",
        organisationName: data.organisationName,
      });
    }
  }, [data]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.empType.trim())
      newErrors.empType = "Experience type is required.";
    if (!formData.designation.trim())
      newErrors.designation = "designation is required.";
    if (!formData.startYear.trim())
      newErrors.startYear = "Start year is required.";
    if (!formData.endYear.trim()) newErrors.endYear = "End year is required.";
    if (!formData.organisationName.trim())
      newErrors.organisationName = "Organization/Company name is required.";

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
      addUserExperience(formData, setUpdateExperienceResponse);

      const response = setUpdateExperienceResponse;
      if (response) {
        toast(
          data && data._id
            ? "✏️ Experience has been updated successfully!"
            : "🥳 Experience has been added successfully!",
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
          experienceDetails: [
            ...(prevData.experienceDetails || []),
            {
              _id: response._id,
              profile: response.profile,
              country: formData.country,
              designation: formData.designation,
              empType: formData.empType,
              startYear: formData.startYear,
              endYear: formData.endYear,
              organisationName: formData.organisationName,
              state: formData.state,
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
      empType: "",
      designation: "",
      startYear: "",
      endYear: "",
      organisationName: "",
    });
  };

  const handleDeleteExperience = async () => {
    try {
      await deleteUserExperience(data._id, setResponse);

      if (response && response?.data?.success) {
        console.log(response, "saif");
        toast.success("Experience deleted successfully!");

        setProfileData((prevData) => ({
          ...prevData,
          experienceDetails: prevData.experienceDetails.filter(
            (exp) => exp._id !== data._id
          ),
        }));

        onClose();
      } else {
        toast.error(response?.data?.message || "Failed to delete experience.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const handleUpdateExperience = async () => {
    const result = await updateUserExperience(
      { experienceId: data?._id, body: formData },
      setResponse
    );

    if (result.status === 200) {
      toast("👌 Experience Updated Successfully!", {
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
        experienceDetails: prevData.experienceDetails.map((exp) =>
          exp._id === result.data.data._id ? result.data.data : exp
        ),
      }));

      onClose();
    } else {
      toast(`✖️ ${"Error Updating Education"}`, {
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
          <h3 className="modal-title">
            {data && Object.keys(data).length > 0 && data.profile
              ? "Update Experience"
              : "Add Experience"}
          </h3>

          <p className="modal-subtitle">
            {data && Object.keys(data).length > 0 && data.profile
              ? "Update th details of your experience"
              : "Add Experience"}
          </p>

          <div className="form-div-modal">
            <div className="modal-div-inner-project">
              <div className="mb-2">
                <label
                  htmlFor="empType"
                  className="label-css block text-sm font-medium"
                >
                  Experience Type
                </label>
                <select
                  id="empType"
                  value={formData.empType}
                  onChange={(e) => handleChange("empType", e.target.value)}
                  className={`select-hover mt-1 ${
                    errors.empType ? "border-red-500" : "border-gray-300"
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
                  <option className="option-select-css" value="Full-time">
                    Full-time
                  </option>
                  <option className="option-select-css" value="Part-time">
                    Part-time
                  </option>
                  <option className="option-select-css" value="Self-employed">
                    Self-employed
                  </option>
                  <option className="option-select-css" value="Freelance">
                    Freelance
                  </option>
                  <option className="option-select-css" value="Internship">
                    Internship
                  </option>
                  <option className="option-select-css" value="Trainee">
                    Trainee
                  </option>
                  <option className="option-select-css" value="Contractual">
                    Contractual
                  </option>
                </select>
                {errors.empType && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.empType}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="designation"
                  className="label-css block text-sm font-medium"
                >
                  Type your designation
                </label>
                <span className="required-indicator">*</span>
                <input
                  type="text"
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => handleChange("designation", e.target.value)}
                  className={`input-css-title-link mt-1 ${
                    errors.designation ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your designation"
                />
                {errors.designation && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.designation}
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
                  htmlFor="organisationName"
                  className="label-css block text-sm font-medium"
                >
                  Organization/Company Name
                </label>
                <span className="required-indicator">*</span>
                <input
                  type="text"
                  id="organisationName"
                  value={formData.organisationName}
                  onChange={(e) =>
                    handleChange("organisationName", e.target.value)
                  }
                  className={`input-css-title-link mt-1 ${
                    errors.organisationName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Add your organization/company name"
                />
                {errors.organisationName && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.organisationName}
                  </p>
                )}
              </div>

              <div className="modal-delete-sav-cancel-main-div-exp">
                <div
                  onClick={() => handleDeleteExperience()}
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
                        ? handleUpdateExperience
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
      </div>
    </div>
  );
};

export default AddExperienceModal;
