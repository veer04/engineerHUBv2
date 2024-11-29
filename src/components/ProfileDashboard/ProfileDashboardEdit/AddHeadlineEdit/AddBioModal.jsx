import React, { useEffect, useState } from "react";
import "./addbiomodal.css";
import { IoMdClose } from "react-icons/io";
import { updateUserDetails } from "../../../../services/APIConfig";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBioModal = ({ isOpen, onClose, data, setProfileData }) => {
  const [formData, setFormData] = useState({
    bio: "",
  });
  const [updateUserResponse, setUpdateUserResponse] = useState({});

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

  const handleSubmit = async () => {
    // const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }
    setLoading(true);

    try {
      await updateUserDetails(formData, setUpdateUserResponse);

      const response = setUpdateUserResponse;

      if (response) {
        toast(
          data && data.bio
            ? "✏️ Bio has been updated successfully!"
            : "🥳 Bio has been added successfully!",
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
          bio: formData.bio,
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
