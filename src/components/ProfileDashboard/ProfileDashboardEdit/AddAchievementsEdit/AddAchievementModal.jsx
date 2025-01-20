import React, { useEffect, useState } from "react";
import "./addachievemodal.css";
import { IoMdClose } from "react-icons/io";
import {
  addUserAchievement,
  deleteUserAchievement,
  updateUserAchievement,
} from "../../../../services/APIConfig";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAchievementModal = ({ isOpen, onClose, data, setProfileData }) => {
  const [formData, setFormData] = useState({
    achievementName: "",
    achievementDate: "",
    description: "",
    achievementUrl: "",
  });
  console.log(data, "achievementData");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [updateAchievementResponse, setUpdateAchievementResponse] = useState(
    {}
  );
  const [response, setResponse] = useState(null);

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

      const response = updateAchievementResponse;

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

  const handleUpdateAchievement = async () => {
    const result = await updateUserAchievement(
      { achievementId: data?._id, body: formData },
      setResponse
    );

    if (result.status === 200) {
      toast("👌 Achievement Updated Successfully!", {
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
        achievementDetails: prevData.achievementDetails.map((exp) =>
          exp._id === result.data.data._id ? result.data.data : exp
        ),
      }));

      onClose();
    } else {
      toast(`✖️ ${"Error Updating Achievement"}`, {
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

  const handleDeleteAchievement = async () => {
    try {
      await deleteUserAchievement(data._id, setResponse);

      if (response) {
        toast.success("Achievement deleted successfully!");

        setProfileData((prevData) => ({
          ...prevData,
          achievementDetails: prevData.achievementDetails.filter(
            (achi) => achi._id !== achi._id
          ),
        }));

        onClose();
      } else {
        toast.error(response?.data?.message || "Failed to delete Achievement.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
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

                <div className="modal-delete-sav-cancel-main-div-achi">
                  <div
                    onClick={() => handleDeleteAchievement()}
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
                          ? handleUpdateAchievement
                          : handleSubmit
                      }
                      disabled={loading}
                    >
                      {data && Object.keys(data).length > 0 && data._id
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
    </>
  );
};

export default AddAchievementModal;
