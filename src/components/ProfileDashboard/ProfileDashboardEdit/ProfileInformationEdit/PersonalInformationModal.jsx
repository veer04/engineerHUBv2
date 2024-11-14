import React, { useState } from "react";
import "./personalinformationmodal.css";
import { IoMdClose } from "react-icons/io";
import { Bucket_URL } from "../../../../services/APIUtils";
import { updateUserDetails } from "../../../../services/APIConfig";
import useGlobalSnackbar from "../../../../hooks/useGlobalSnackbar";

const PersonalInformationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    aboutMe: "",
    mobile: "",
    gender: "",
  });

  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";
    if (!formData.dateOfBirth.trim())
      newErrors.dateOfBirth = "Date of Birth is required.";
    if (!formData.aboutMe.trim()) newErrors.aboutMe = "About Me is required.";
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile Number is required.";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile Number must be 10 digits.";
    }
    if (!formData.gender.trim()) newErrors.gender = "Gender is required.";

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    updateUserDetails(formData)
      .then((response) => {
        console.log("Update successful:", response);
        setSnackbarMessage("Update successful");
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
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      aboutMe: "",
      mobile: "",
      gender: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="modal-header">
          <button className="close-btn" onClick={handleClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="modal-content">
          <h3 className="modal-title">Personal Information</h3>
          <p className="modal-subtitle">
            Add a summary of your resume to introduce yourself to recruiters
          </p>
          <div className="form-div-modal">
            <div className="modal-div-inner">
              <div className="mb-2">
                <label
                  htmlFor="firstName"
                  className="label-css block text-sm font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className={`input-css mt-1 ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Your First Name"
                />
                {errors.firstName && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="lastName"
                  className="label-css block text-sm font-medium"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className={`input-css mt-1 ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Your Last Name"
                />
                {errors.lastName && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="modal-div-inner">
              <div className="mb-2">
                <label
                  htmlFor="mobile"
                  className="label-css block text-sm font-medium"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => handleChange("mobile", e.target.value)}
                  className={`mt-1 input-css ${
                    errors.mobile ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Your Phone Number"
                />
                {errors.mobile && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.mobile}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="gender"
                  className="label-css block text-sm font-medium"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className={`mt-1 input-css ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.gender}
                  </p>
                )}
              </div>
            </div>

            <div className="modal-div-inner">
              <div
                className={`mb-2 image-input-main-div ${
                  errors.dateOfBirth ? "error" : ""
                }`}
              >
                <label
                  htmlFor="dateOfBirth"
                  className="label-css block text-sm font-medium"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  className={`mt-1 input-css ${
                    errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="error-p mt-1 text-sm text-red-500">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="aboutMe"
                  className="label-css block text-sm font-medium"
                >
                  About Me
                </label>
                <textarea
                  id="aboutMe"
                  value={formData.aboutMe}
                  onChange={(e) => handleChange("aboutMe", e.target.value)}
                  className={`mt-1 input-css ${
                    errors.aboutMe ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Tell something about yourself"
                />
                {errors.aboutMe && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.aboutMe}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="modal-button-div">
            <button className="cancel-modal-btn" onClick={handleClose}>
              Cancel
            </button>
            <button
              className="save-modal-btn"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationModal;
