import React, { useEffect, useState } from "react";
import "./addcertificatemodal.css";
import { IoMdClose } from "react-icons/io";
import { Bucket_URL } from "../../../../services/APIUtils";
import useGlobalSnackbar from "../../../../hooks/useGlobalSnackbar";
import {
  addUserCertification,
  updateUserCertification,
} from "../../../../services/APIConfig";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCertificationsModal = ({ isOpen, onClose, data, setProfileData }) => {
  const [formData, setFormData] = useState({
    certificationName: "",
    certificateUrl: "",
    issuedDate: "",
    issuedBy: "",
  });
  const [errors, setErrors] = useState({});
  const [updateCertificationResponse, setUpdateCertificationResponse] =
    useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.certificationName.trim())
      newErrors.certificationName = "Certificate name is required.";

    return newErrors;
  };

  useEffect(() => {
    if (data) {
      setFormData({
        certificationName: data.certificationName,
        certificateUrl: data.certificateUrl,
        issuedDate: data.issuedDate
          ? new Date(data.issuedDate).toISOString().split("T")[0]
          : "",
        issuedBy: data.issuedBy
          ? new Date(data.issuedBy).toISOString().split("T")[0]
          : "",
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
      addUserCertification(formData, setUpdateCertificationResponse);

      const response = setUpdateCertificationResponse;

      if (response) {
        toast(
          data && data._id
            ? "✏️ licenceDetails has been updated successfully!"
            : "🥳 licenceDetails has been added successfully!",
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
          licenceDetails: [
            ...(prevData.licenceDetails || []),
            {
              _id: response._id,
              profile: response.profile,
              certificateUrl: formData.certificateUrl,
              certificationName: formData.certificationName,
              issuedBy: formData.issuedBy,
              issuedDate: formData.issuedDate,
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

  const handleUpdateCertificate = async () => {
    const result = await updateUserCertification(
      {
        licenceId: data._id,
        body: formData,
      },
      setResponse
    );

    if (result.status === 200) {
      toast("👌 Certificate Updated Successfully!", {
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
        licenceDetails: prevData.licenceDetails.map((cert) =>
          cert._id === result.data.data._id ? result.data.data : cert
        ),
      }));

      onClose();
    } else {
      toast(`✖️ ${"Error Updating Certificate"}`, {
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
      certificationName: "",
      certificateUrl: "",
      issuedDate: "",
      issuedBy: "",
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="certificate-modal-overlay">
        <div className="certi-modal">
          <div className="modal-header">
            <button className="close-btn" onClick={handleClose}>
              <IoMdClose />
            </button>
          </div>
          <div className="modal-content">
            <h3 className="modal-title">Add Certificates</h3>
            <p className="modal-subtitle">Add Certificates</p>

            <div className="form-div-modal">
              <div className="modal-div-inner-certi">
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor="certificationName"
                      className="label-css block text-sm font-medium"
                    >
                      Certificate Name
                    </label>
                    <span className="required-indicator">*</span>
                    <input
                      type="text"
                      id="certificationName"
                      value={formData.certificationName}
                      onChange={(e) =>
                        handleChange("certificationName", e.target.value)
                      }
                      className={`input-css-title-link mt-1 ${
                        errors.certificationName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Add certificate name"
                    />
                    {errors.certificationName && (
                      <p className="mt-1 error-p text-sm text-red-500">
                        {errors.certificationName}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="certificationName"
                      className="label-css block text-sm font-medium"
                    >
                      Certificate URL
                    </label>
                    {/* <span className="required-indicator">*</span> */}
                    <input
                      type="text"
                      id="certificateUrl"
                      value={formData.certificateUrl}
                      onChange={(e) =>
                        handleChange("certificateUrl", e.target.value)
                      }
                      className={`input-css-title-link mt-1 ${
                        errors.certificateUrl
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Add certificate Url"
                    />
                    {errors.certificateUrl && (
                      <p className="mt-1 error-p text-sm text-red-500">
                        {errors.certificateUrl}
                      </p>
                    )}
                  </div>

                  <div className="modal-div-inner">
                    <div
                      className={`mb-2 relative-start-date image-input-main-div ${
                        errors.issuedDate ? "error" : ""
                      }`}
                    >
                      <label
                        htmlFor="issuedDate"
                        className="label-css block text-sm font-medium"
                      >
                        Issue Date
                      </label>
                      {/* <span className="required-indicator">*</span> */}
                      <input
                        type="date"
                        id="issuedDate"
                        value={formData.issuedDate}
                        onChange={(e) =>
                          handleChange("issuedDate", e.target.value)
                        }
                        className={`input-css mt-1 ${
                          errors.issuedDate
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Add issued date"
                      />
                      {/* <img
                        src={`${Bucket_URL}UserViewDashboard/Calendar.svg`}
                        alt=""
                        className="img-calendar-project"
                      /> */}
                      {errors.issuedDate && (
                        <p className="mt-1 error-p text-sm text-red-500">
                          {errors.issuedDate}
                        </p>
                      )}
                    </div>
                    <div
                      className={`mb-2 relative-end-date image-input-main-div ${
                        errors.issuedBy ? "error" : ""
                      }`}
                    >
                      <label
                        htmlFor="issuedBy"
                        className="label-css block text-sm font-medium"
                      >
                        Issued By
                      </label>
                      {/* <span className="required-indicator">*</span> */}
                      <input
                        type="date"
                        id="issuedBy"
                        value={formData.issuedBy}
                        onChange={(e) =>
                          handleChange("issuedBy", e.target.value)
                        }
                        className={`input-css mt-1 ${
                          errors.issuedBy ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Issued by organization"
                      />
                      {errors.issuedBy && (
                        <p className="mt-1 error-p text-sm text-red-500">
                          {errors.issuedBy}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="modal-delete-sav-cancel-main-div-cert">
                  <div
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
                          ? handleUpdateCertificate
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
    </>
  );
};

export default AddCertificationsModal;
