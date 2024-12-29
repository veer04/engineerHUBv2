import React, { useEffect, useState } from "react";
import "./addachievemodal.css";
import { IoMdClose } from "react-icons/io";
import { addUserAchievement } from "../../../../services/APIConfig";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAchievementModal = ({ isOpen, onClose, data, setProfileData }) => {
  const [formData, setFormData] = useState({
    achievementName: "",
    achievementDate: "",
    description: "",
    achievementUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [updateAchievementResponse, setUpdateAchievementResponse] = useState(
    {}
  );

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.achievementName.trim())
      newErrors.achievementName = "Achievement name is required.";

    return newErrors;
  };

  useEffect(() => {
    if (data) {
      setFormData({
        achievementName: data.achievementName,
        achievementDate: data.achievementDate
          ? new Date(data.achievementDate).toISOString().split("T")[0]
          : "",
        description: data.description,
        achievementUrl: data.achievementUrl,
      });
    }
  }, [data]);

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      addUserAchievement(formData, setUpdateAchievementResponse);

      const response = setUpdateAchievementResponse;

      if (response) {
        toast(
          data && data._id
            ? "✏️ Achievements has been updated successfully!"
            : "🥳 Achievements has been added successfully!",
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
          achievementDetails: [
            ...(prevData.achievementDetails || []),
            {
              _id: response._id,
              profile: response.profile,
              achievementDate: formData.achievementDate,
              achievementName: formData.achievementName,
              achievementUrl: formData.achievementUrl,
              description: formData.description,
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
      achievementName: "",
      achievementDate: "",
      description: "",
      achievementUrl: "",
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="achieve-modal-overlay">
        <div className="achieve-modal">
          <div className="modal-header">
            <button className="close-btn" onClick={handleClose}>
              <IoMdClose />
            </button>
          </div>
          <div className="modal-content">
            <h3 className="modal-title">Add Achievement</h3>

            <div className="form-div-modal">
              <div className="modal-div-inner-achieve">
                <div>
                  {/* Achievement Name */}
                  <div className="mb-4">
                    <label
                      htmlFor="achievementName"
                      className="label-css block text-sm font-medium"
                    >
                      Achievement Name
                    </label>
                    <span className="required-indicator">*</span>
                    <input
                      type="text"
                      id="achievementName"
                      value={formData.achievementName}
                      onChange={(e) =>
                        handleChange("achievementName", e.target.value)
                      }
                      className={`input-css-title-link mt-1 ${
                        errors.achievementName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter achievement name"
                    />
                    {errors.achievementName && (
                      <p className="mt-1 error-p text-sm text-red-500">
                        {errors.achievementName}
                      </p>
                    )}
                  </div>

                  {/* Achievement Date */}
                  <div className="mb-4">
                    <label
                      htmlFor="achievementDate"
                      className="label-css block text-sm font-medium"
                    >
                      Achievement Date
                    </label>
                    {/* <span className="required-indicator">*</span> */}
                    <input
                      type="date"
                      id="achievementDate"
                      value={formData.achievementDate}
                      onChange={(e) =>
                        handleChange("achievementDate", e.target.value)
                      }
                      className={`input-css-title-link mt-1 ${
                        errors.achievementDate
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.achievementDate && (
                      <p className="mt-1 error-p text-sm text-red-500">
                        {errors.achievementDate}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="label-css block text-sm font-medium"
                    >
                      Description
                    </label>
                    {/* <span className="required-indicator">*</span> */}
                    <textarea
                      rows={4}
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                      className={` mt-1 ${
                        errors.description
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Describe your achievement"
                    />
                    {errors.description && (
                      <p className="mt-1 error-p text-sm text-red-500">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {/* Achievement URL */}
                  <div className="mb-4">
                    <label
                      htmlFor="achievementUrl"
                      className="label-css block text-sm font-medium"
                    >
                      Achievement URL
                    </label>
                    {/* <span className="required-indicator">*</span> */}
                    <input
                      type="url"
                      id="achievementUrl"
                      value={formData.achievementUrl}
                      onChange={(e) =>
                        handleChange("achievementUrl", e.target.value)
                      }
                      className={`input-css-title-link mt-1 ${
                        errors.achievementUrl
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter a URL"
                    />
                    {errors.achievementUrl && (
                      <p className="mt-1 error-p text-sm text-red-500">
                        {errors.achievementUrl}
                      </p>
                    )}
                  </div>
                </div>

                <div className="modal-button-div">
                  <button className="cancel-modal-btn" onClick={handleClose}>
                    Cancel
                  </button>
                  <button
                    className="save-modal-btn"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {"Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAchievementModal;
