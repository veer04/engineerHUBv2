import React, { useState } from "react";
import "./addcertificatemodal.css";
import { IoMdClose } from "react-icons/io";
import { Bucket_URL } from "../../../../services/APIUtils";
import useGlobalSnackbar from "../../../../hooks/useGlobalSnackbar";
import { addUserCertification } from "../../../../services/APIConfig";

const AddCertificationsModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    certificateName: "",
    certificateUrl: "",
    issueDate: "",
    issuedBy: "",
  });
  const [errors, setErrors] = useState({});
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

    if (!formData.certificateName.trim())
      newErrors.certificateName = "Certificate name is required.";
    if (!formData.certificateUrl.trim())
      newErrors.certificateUrl = "Certificate Url is required.";
    if (!formData.issueDate.trim())
      newErrors.issueDate = "Issue date is required.";
    if (!formData.issuedBy.trim())
      newErrors.issuedBy = "Issuing organization is required.";

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    addUserCertification(formData)
      .then((response) => {
        console.log("Certificate successful:", response);
        setSnackbarMessage("Certificate Added successful");
        setSnackbarOpen(true);
        onClose();
      })
      .catch((error) => {
        console.error("Addition of certificate  failed:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClose = () => {
    setErrors({});
    onClose();
    setFormData({
      certificateName: "",
      certificateUrl: "",
      issueDate: "",
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
                      htmlFor="certificateName"
                      className="label-css block text-sm font-medium"
                    >
                      Certificate Name
                    </label>
                    <span className="required-indicator">*</span>
                    <input
                      type="text"
                      id="certificateName"
                      value={formData.certificateName}
                      onChange={(e) =>
                        handleChange("certificateName", e.target.value)
                      }
                      className={`input-css-title-link mt-1 ${
                        errors.certificateName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Add certificate name"
                    />
                    {errors.certificateName && (
                      <p className="mt-1 error-p text-sm text-red-500">
                        {errors.certificateName}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="certificateName"
                      className="label-css block text-sm font-medium"
                    >
                      Certificate URL
                    </label>
                    <span className="required-indicator">*</span>
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
                        errors.issueDate ? "error" : ""
                      }`}
                    >
                      <label
                        htmlFor="issueDate"
                        className="label-css block text-sm font-medium"
                      >
                        Issue Date
                      </label>
                      <span className="required-indicator">*</span>
                      <input
                        type="date"
                        id="issueDate"
                        value={formData.issueDate}
                        onChange={(e) =>
                          handleChange("issueDate", e.target.value)
                        }
                        className={`input-css mt-1 ${
                          errors.issueDate
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
                      {errors.issueDate && (
                        <p className="mt-1 error-p text-sm text-red-500">
                          {errors.issueDate}
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
                      <span className="required-indicator">*</span>
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
