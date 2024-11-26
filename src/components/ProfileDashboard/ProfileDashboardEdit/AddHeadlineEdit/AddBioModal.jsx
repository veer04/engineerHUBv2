import React, { useEffect, useState } from "react";
import "./addbiomodal.css";
import { IoMdClose } from "react-icons/io";
import { updateUserDetails } from "../../../../services/APIConfig";

const AddBioModal = ({ isOpen, onClose, data }) => {
  const [formData, setFormData] = useState({
    bio: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.achievementHeading)
      newErrors.achievementHeading = "This is required.";

    return newErrors;
  };

  useEffect(() => {
    if (isOpen && data) {
      setFormData({
        bio: data.bio,
      });
    }
  }, [isOpen, data]);

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
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        onClose();
      })
      .catch((error) => {
        console.error("Update failed:", error);
        setSnackbarMessage("Update failed");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClose = () => {
    setErrors({});
    onClose();
    setFormData({
      bio: "",
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="Bio-modal-overlay">
        <div className="Bio-modal">
          <div className="modal-header">
            <button className="close-btn" onClick={handleClose}>
              <IoMdClose />
            </button>
          </div>
          <div className="modal-content">
            <h3 className="modal-title"> Add Bio</h3>
            <p className="modal-subtitle"> Add Bio</p>

            <div className="form-div-modal">
              <div className="bio-div-inner-project">
                <div className="mb-4">
                  <label
                    htmlFor="bioHeading"
                    className="label-css block text-sm font-medium"
                  >
                    Add Bio
                  </label>
                  <span className="required-indicator">*</span>
                  <input
                    type="text"
                    id="bioHeading"
                    value={formData.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    className={`input-css-title-link mt-1 ${
                      errors.bio ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Add your bio"
                  />
                  {errors.bio && (
                    <p className="mt-1 error-p text-sm text-red-500">
                      {errors.bio}
                    </p>
                  )}
                </div>

                <div className="modal-button-div">
                  <button className="cancel-modal-btn" onClick={handleClose}>
                    Cancel
                  </button>
                  <button className="save-modal-btn" onClick={handleSubmit}>
                    {loading ? "Saving..." : "Save"}
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

export default AddBioModal;
