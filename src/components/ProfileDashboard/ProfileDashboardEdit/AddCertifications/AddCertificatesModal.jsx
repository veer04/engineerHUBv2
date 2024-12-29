import React, { useEffect, useState } from "react";
import "./addcertificatemodal.css";
import { IoMdClose } from "react-icons/io";
import { Bucket_URL } from "../../../../services/APIUtils";
import useGlobalSnackbar from "../../../../hooks/useGlobalSnackbar";
import { addUserCertification } from "../../../../services/APIConfig";
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
        </div>
      </div>
    </>
  );
};

export default AddCertificationsModal;
