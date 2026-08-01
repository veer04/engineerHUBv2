import React, { useEffect, useState } from "react";
import "./socialLinksModal.css";
import { IoMdClose } from "react-icons/io";
import { API_URL } from "../../../../services/APIUtils";
import { getAccessToken } from "../../../../features/getCookieValues";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SocialLinksModal = ({ isOpen, onClose, data, setProfileData }) => {
  const [socialMedia, setSocialMedia] = useState([]);
  const [formData, setFormData] = useState({
    linkedin: "",
    github: "",
    portfolio: "",
    cpLink: "",
  });

  useEffect(() => {
    if (isOpen && data) {
      setFormData({
        linkedin: data.linkedin || "",
        github: data.github || "",
        portfolio: data.portfolio || "",
        cpLink: data.cpLink || "",
      });
    }
  }, [isOpen, data]);

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    const newErrors = { ...errors };
    if (
      field === "linkedin" &&
      value &&
      !value.startsWith("https://www.linkedin.com")
    ) {
      newErrors.linkedin = "Linkedin URL is not valid!";
    } else {
      delete newErrors.linkedin;
    }

    if (
      field === "github" &&
      value &&
      !value.startsWith("https://github.com")
    ) {
      newErrors.github = "Github URL is not valid!";
    } else {
      delete newErrors.github;
    }

    if (
      field === "portfolio" &&
      value &&
      !(value.startsWith("https://") || value.startsWith("http://"))
    ) {
      newErrors.portfolio = " URL must starts with 'http://' or 'https://'";
    } else {
      delete newErrors.portfolio;
    }

    if (
      field === "cpLink" &&
      value &&
      !(value.startsWith("https://") || value.startsWith("http://"))
    ) {
      newErrors.cpLink = " URL must b a link starts with https or http";
    } else {
      delete newErrors.cpLink;
    }

    setErrors(newErrors);
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    const isValidUrl = (url) =>
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([\/\w \.-]*)*\/?$/.test(
        url
      );

    if (formData.linkedin) {
      if (
        !isValidUrl(formData.linkedin) ||
        !formData.linkedin.startsWith("https://www.linkedin.com")
      ) {
        newErrors.linkedin = "LinkedIn URL must start with 'linkedin.com'";
      }
    }

    if (formData.github) {
      if (
        !isValidUrl(formData.github) ||
        !formData.github.startsWith("https://github.com")
      ) {
        newErrors.github = "GitHub URL must start with 'https://github.com'";
      }
    }

    if (formData.portfolio) {
      if (
        !isValidUrl(formData.portfolio) ||
        !(
          formData.portfolio.startsWith("https://") ||
          formData.portfolio.startsWith("http://")
        )
      ) {
        newErrors.portfolio =
          "Portfolio URL must start with 'http://' or 'https://'.";
      }
    }

    if (formData.cpLink) {
      if (
        !isValidUrl(formData.cpLink) ||
        !(
          formData.cpLink.startsWith("https://") ||
          formData.cpLink.startsWith("http://")
        )
      ) {
        newErrors.cpLink = "CP URL must start with 'http://' or 'https://'.";
      }
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please add the input before submitting.", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }

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
      if (data.success) {
        toast("🥳 Social Links has been Added Successfully!", {
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

        const updatedSocialMediaDetails = socialMediaData.map((item) => ({
          mediaLink: item.mediaLink,
          type: item.type,
        }));

        setProfileData((prevData) => ({
          ...prevData,
          socialMediaDetails: updatedSocialMediaDetails,
        }));
        onClose();
      }
    } catch (error) {
      console.error("Error adding the social data", error);
      toast.error("Failed to update social links. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
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
                  placeholder="Link format https://your_link"
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
                  placeholder="Link format https://your_link"
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
                {/* <span className="required-indicator">*</span> */}
                <input
                  type="text"
                  id="portfolio"
                  value={formData.portfolio}
                  onChange={(e) => handleChange("portfolio", e.target.value)}
                  className={`input-css mt-1 ${
                    errors.portfolio ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Link format https://your_link"
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
                  Any Other Link
                </label>
                {/* <span className="required-indicator">*</span> */}
                <input
                  type="text"
                  id="cpLink"
                  value={formData.cpLink}
                  onChange={(e) => handleChange("cpLink", e.target.value)}
                  className={`input-css mt-1 ${
                    errors.cpLink ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Link format https://your_link"
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
