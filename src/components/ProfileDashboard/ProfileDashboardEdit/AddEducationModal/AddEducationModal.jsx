import React, { useEffect, useState } from "react";
import "./addeducationmodal.css";
import { IoMdClose } from "react-icons/io";
import { API_URL, Bucket_URL } from "../../../../services/APIUtils";
import {
  addUserEducation,
  getAllBranches,
  getAllCampuses,
  updateUserDetails,
} from "../../../../services/APIConfig";
import { getAccessToken } from "../../../../features/getCookieValues";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEducationModal = ({ isOpen, onClose, data, setProfileData }) => {
  // console.log(data, "darasaif");
  const [campus, setCampus] = useState([]);
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({
    collegeId: "",
    specialization: "",
    startYear: "",
    endYear: "",
    marks: "",
    country: "IN",
    state: "rajasthan",
    degree: "Btech",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [updateEducationResponse, setUpdateEducationResponse] = useState({});

  useEffect(() => {
    if (data) {
      setFormData({
        collegeId: data.collegeId || "",
        // collegeName: data.collegeName || "",
        specialization: data.specialization || "",
        startYear: data.startYear
          ? new Date(data.startYear).toISOString().split("T")[0]
          : "",
        endYear: data.endYear
          ? new Date(data.endYear).toISOString().split("T")[0]
          : "",
        marks: data.marks || "",
        country: "IN",
        state: "rajasthan",
        degree: "btech",
      });
    }
  }, [data]);

  useEffect(() => {
    getAllCampuses(setCampus);
    getAllBranches(setBranches);
  }, []);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.collegeId?.collegeName?.trim()) {
      newErrors.collegeId = "College name is required.";
    }

    if (!formData.specialization.trim()) {
      newErrors.specialization = "Specialization is required.";
    }

    if (!formData.startYear.trim()) {
      newErrors.startYear = "Start year is required.";
    }

    if (!formData.endYear.trim()) {
      newErrors.endYear = "End year is required.";
    }

    if (
      !formData.marks ||
      (typeof formData.marks === "string" && !formData.marks.trim())
    ) {
      newErrors.marks = "Marks are required.";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    // const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }

    setLoading(true);

    try {
      addUserEducation(formData, setUpdateEducationResponse);

      const response = setUpdateEducationResponse;
      if (response) {
        toast(
          data && data._id
            ? "✏️ Education has been updated successfully!"
            : "🥳 Education has been added successfully!",
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
          educationDetails: [
            ...(prevData.educationDetails || []),
            {
              _id: response._id,
              profile: response.profile,
              degree: formData.degree,
              startYear: formData.startYear,
              endYear: formData.endYear,
              marks: formData.marks,
              specialization: formData.specialization,
              collegeId: {
                _id: formData.collegeId._id,
                collegeName: formData.collegeId.collegeName,
                collegeLogo: formData.collegeId.collegeLogo,
              },
              country: formData.country,
              state: formData.state,
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
      collegeId: "",
      specialization: "",
      startYear: "",
      endYear: "",
      marks: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="education-modal-overlay">
      <div className="edu-modal">
        <div className="modal-header">
          <button className="close-btn" onClick={handleClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="modal-content">
          <h3 className="modal-title">
            {data && Object.keys(data).length > 0 && data.collegeId
              ? "Update Education"
              : "Add Education"}
          </h3>
          <p className="modal-subtitle">
            {" "}
            {data && Object.keys(data).length > 0 && data.collegeId
              ? "Update the details of your education"
              : "Add new education details"}
          </p>

          <div className="form-div-modal">
            <div className="modal-div-inner-project">
              <div className="mb-2">
                <label
                  htmlFor="collegeId"
                  className="label-css block text-sm font-medium"
                >
                  College Name
                </label>
                <span className="required-indicator">*</span>
                <select
                  id="collegeId"
                  value={formData.collegeId}
                  onChange={(e) => handleChange("collegeId", e.target.value)}
                  className={`select-hover  mt-1 ${errors.collegeId}`}
                >
                  <option
                    className="option-select-css"
                    value=""
                    disabled
                    hidden
                  >
                    Select your college name
                  </option>
                  {campus &&
                    campus.map((college) => (
                      <option
                        key={college._id}
                        className="option-select-css"
                        value={college._id}
                      >
                        {college.collegeName}
                      </option>
                    ))}
                </select>
                {errors.collegeId && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.collegeId}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="specialization"
                  className="label-css block text-sm font-medium"
                >
                  Specialization
                </label>
                <span className="required-indicator">*</span>
                <select
                  id="specialization"
                  value={formData.specialization}
                  onChange={(e) =>
                    handleChange("specialization", e.target.value)
                  }
                  className={`select-hover  mt-1 ${errors.specialization}`}
                >
                  {branches &&
                    branches.map((branch, index) => (
                      <option
                        key={branch}
                        className="option-select-css"
                        value={branch}
                      >
                        {branch}
                      </option>
                    ))}
                </select>
                {errors.specialization && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.specialization}
                  </p>
                )}
              </div>

              <div className="modal-div-inner" style={{ marginBottom: 20 }}>
                <div
                  className={`mb-2 relative-start-date image-input-main-div ${
                    errors.startYear ? "error" : ""
                  }`}
                >
                  <label
                    htmlFor="startYear"
                    className="label-css block text-sm font-medium"
                  >
                    Start Year
                  </label>
                  <span className="required-indicator">*</span>
                  <input
                    type="date"
                    id="startYear"
                    value={formData.startYear}
                    onChange={(e) => handleChange("startYear", e.target.value)}
                    className={`input-css mt-1 ${
                      errors.startYear ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter start year"
                  />
                  {/* <img
                    src={`${Bucket_URL}UserViewDashboard/Calendar.svg`}
                    alt=""
                    className="img-calendar-project"
                  /> */}
                  {errors.startYear && (
                    <p className="mt-1 error-p text-sm text-red-500">
                      {errors.startYear}
                    </p>
                  )}
                </div>
                <div
                  className={`mb-2 relative-end-date image-input-main-div ${
                    errors.endYear ? "error" : ""
                  }`}
                >
                  <label
                    htmlFor="endYear"
                    className="label-css block text-sm font-medium"
                  >
                    End Year
                  </label>
                  <span className="required-indicator">*</span>
                  <input
                    type="date"
                    id="endYear"
                    value={formData.endYear}
                    onChange={(e) => handleChange("endYear", e.target.value)}
                    className={`input-css mt-1 ${
                      errors.endYear ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter end year"
                  />
                  {/* <img
                    src={`${Bucket_URL}UserViewDashboard/Calendar.svg`}
                    alt=""
                    className="img-calendar-project"
                  /> */}
                  {errors.endYear && (
                    <p className="mt-1 error-p text-sm text-red-500">
                      {errors.endYear}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="marks"
                  className="label-css block text-sm font-medium"
                >
                  marks
                </label>
                <span className="required-indicator">*</span>
                <input
                  type="text"
                  id="marks"
                  value={formData.marks}
                  onChange={(e) => handleChange("marks", e.target.value)}
                  className={`input-css-title-link mt-1 ${
                    errors.marks ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your marks"
                />
                {errors.marks && (
                  <p className="mt-1 error-p text-sm text-red-500">
                    {errors.marks}
                  </p>
                )}
              </div>

              <div className="modal-button-div">
                <button className="cancel-modal-btn" onClick={handleClose}>
                  Cancel
                </button>
                <button className="save-modal-btn" onClick={handleSubmit}>
                  {data && Object.keys(data).length > 0 && data.collegeId
                    ? "Update"
                    : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEducationModal;
