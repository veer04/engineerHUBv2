import React, { useEffect, useState } from "react";
import "./socialLinksModal.css";
import { IoMdClose } from "react-icons/io";
import { API_URL } from "../../../../services/APIUtils";
import { getAccessToken } from "../../../../features/getCookieValues";

const SocialLinksModal = ({ isOpen, onClose }) => {
  const [socialMedia, setSocialMedia] = useState([]);
  const [formData, setFormData] = useState({
    linkedin: "",
    github: "",
    portfolio: "",
    cpLink: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.linkedin.trim())
      newErrors.linkedin = "LinkedIn profile is required.";
    if (!formData.github.trim()) newErrors.github = "GitHub link is required.";
    if (!formData.portfolio.trim())
      newErrors.portfolio = "Personal portfolio is required.";
    if (!formData.cpLink.trim()) newErrors.cpLink = "CP link is required.";

    return newErrors;
  };

  const handleSubmit = async () => {
    // const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }

    const socialMediaData = [
      { mediaLink: formData.linkedin, type: "LinkedIn" },
      { mediaLink: formData.github, type: "GitHub" },
      { mediaLink: formData.portfolio, type: "Portfolio" },
      { mediaLink: formData.cpLink, type: "CP" },
    ];

    try {
      const response = await fetch(`${API_URL}api/v1/add/socialMedia`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accessToken: getAccessToken(),
        },
        body: JSON.stringify({
          socialMedia: socialMediaData,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        onClose(); // Close the modal on success
      }
    } catch (error) {
      console.error("Error adding the social data", error);
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
    setFormData({});
  };

  if (!isOpen) return null;

  return (
    <div className="social-modal-overlay">
      <div className="social-modal">
        <div className="modal-header">
          <button className="close-btn" onClick={handleClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="modal-content">
          <h3 className="modal-title">Social Links</h3>
          <p className="modal-subtitle">Add your social links</p>
          <div className="form-div-modal">
            <div className="modal-div-inner">
              <div className="mb-2">
                <label
                  htmlFor="linkedin"
                  className="label-css block text-sm font-medium"
                >
                  Add your Linkedin Profile
                </label>
                <span className="required-indicator">*</span>
                <input
                  type="text"
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => handleChange("linkedin", e.target.value)}
                  className={`input-css mt-1 ${
                    errors.linkedin ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Add your LinkedIn Profile"
                />
                {errors.linkedin && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.linkedin}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="github"
                  className="label-css block text-sm font-medium"
                >
                  Add your Github link
                </label>
                <span className="required-indicator">*</span>
                <input
                  type="text"
                  id="github"
                  value={formData.github}
                  onChange={(e) => handleChange("github", e.target.value)}
                  className={`input-css mt-1 ${
                    errors.github ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Add your GitHub Link"
                />
                {errors.github && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.github}
                  </p>
                )}
              </div>
            </div>
            <div className="modal-div-inner">
              <div className="mb-2">
                <label
                  htmlFor="portfolio"
                  className="label-css block text-sm font-medium"
                >
                  Enter your Personal Portfolio
                </label>
                <span className="required-indicator">*</span>
                <input
                  type="text"
                  id="portfolio"
                  value={formData.portfolio}
                  onChange={(e) => handleChange("portfolio", e.target.value)}
                  className={`input-css mt-1 ${
                    errors.portfolio ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your Personal Portfolio"
                />
                {errors.portfolio && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.portfolio}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="cpLink"
                  className="label-css block text-sm font-medium"
                >
                  Enter your CP Link
                </label>
                <span className="required-indicator">*</span>
                <input
                  type="text"
                  id="cpLink"
                  value={formData.cpLink}
                  onChange={(e) => handleChange("cpLink", e.target.value)}
                  className={`input-css mt-1 ${
                    errors.cpLink ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your CP Link"
                />
                {errors.cpLink && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.cpLink}
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

export default SocialLinksModal;
