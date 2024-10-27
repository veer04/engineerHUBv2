import React, { useState } from "react";
import "./personalinformationmodal.css";
import { IoMdClose } from "react-icons/io";
import { Bucket_URL } from "../../../../services/APIUtils";

const PersonalInformationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    mobile: "",
  });
  console.log(formData, "jh");

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.dob.trim()) newErrors.dob = "Date of Birth is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile Number is required.";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile Number must be 10 digits.";
    }

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
    setFormData({});
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
                  htmlFor="name"
                  className="label-css block text-sm font-medium"
                >
                  Name
                </label>
                <span
                  style={{
                    alignSelf: "stretch",
                    color: "#FF3737",
                    marginLeft: 2,
                  }}
                >
                  *
                </span>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`input-css mt-1  ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Your Name"
                />
                {errors.name && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>
              <div
                className={`mb-2 image-input-main-div ${
                  errors.dob ? "error" : ""
                }`}
              >
                <label
                  htmlFor="dob"
                  className="label-css block text-sm font-medium"
                >
                  Date of Birth
                </label>
                <span
                  style={{
                    alignSelf: "stretch",
                    color: "#FF3737",
                    marginLeft: 2,
                  }}
                >
                  *
                </span>
                <input
                  type="text"
                  id="dob"
                  value={formData.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className={`mt-1 input-css ${
                    errors.dob ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Your DOB"
                />
                <img
                  src={`${Bucket_URL}UserViewDashboard/Calendar.svg`}
                  alt=""
                  className="img-calendar"
                />
                {errors.dob && (
                  <p className="error-p mt-1 text-sm text-red-500">
                    {errors.dob}
                  </p>
                )}
              </div>
            </div>
            <div className="modal-div-inner">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="label-css block text-sm font-medium"
                >
                  Email
                </label>
                <span
                  style={{
                    alignSelf: "stretch",
                    color: "#FF3737",
                    marginLeft: 2,
                  }}
                >
                  *
                </span>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`mt-1 input-css  ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Your Email"
                />
                {errors.email && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="mobile"
                  className="label-css block text-sm font-medium"
                >
                  Phone Number
                </label>
                <span
                  style={{
                    alignSelf: "stretch",
                    color: "#FF3737",
                    marginLeft: 2,
                  }}
                >
                  *
                </span>
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

export default PersonalInformationModal;
