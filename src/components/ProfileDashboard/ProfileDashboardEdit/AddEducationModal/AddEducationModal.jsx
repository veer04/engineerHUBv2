import React, { useEffect, useState } from "react";
import "./addeducationmodal.css";
import { IoMdClose } from "react-icons/io";
import { API_URL, Bucket_URL } from "../../../../services/APIUtils";
import {
  addUserEducation,
  deleteUserEducation,
  getAllBranches,
  getAllCampuses,
  updateEducation,
  updateUserDetails,
} from "../../../../services/APIConfig";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../ModalUpdatedAndDeleted/DeleteModal";
import { getUserId } from "../../../../features/User/UserDetails";
import { getAccessToken } from "../../../../features/getCookieValues";

const AddEducationModal = ({ isOpen, onClose, data, setProfileData }) => {
  const [campus, setCampus] = useState([]);
  const [branches, setBranches] = useState([]);

  const [formData, setFormData] = useState({
    collegeId: "",
    collegeName: "",
    specialization: "",
    startYear: "",
    endYear: "",
    marks: "",
    country: "IN",
    state: "rajasthan",
    degree: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const userId = getUserId();

  const degreeData = [{ degree: "B.Tech" }, { degree: "M.Tech" }];

  useEffect(() => {
    if (data) {
      setFormData({
        collegeId: data.collegeId?._id || "",
        collegeName: data?.collegeId?.collegeName || "",
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
        degree: data.degree || "",
      });
    }
  }, [data]);

  useEffect(() => {
    getAllCampuses(setCampus);
    getAllBranches(setBranches);
  }, []);

  const handleChange = (field, value) => {
    let updatedData = { ...formData, [field]: value };

    if (field === "collegeId") {
      const selectedCollege = campus.find((college) => college._id === value);
      updatedData.collegeName = selectedCollege
        ? selectedCollege.collegeName
        : "";
    }

    setFormData(updatedData);

    // Inline validation
    let errorMessage = "";
    switch (field) {
      case "collegeId":
        if (!value?.trim()) errorMessage = "College name is required.";
        break;
      case "specialization":
        if (!value.trim()) errorMessage = "Specialization is required.";
        break;
      case "startYear":
        if (!value.trim()) {
          errorMessage = "Start year is required.";
        } else if (
          updatedData.endYear &&
          new Date(value).getFullYear() + 3 >
            new Date(updatedData.endYear).getFullYear()
        ) {
          errorMessage =
            "There must be a gap of at least 3 years between start and end years.";
        }
        break;
      case "endYear":
        if (!value.trim()) {
          errorMessage = "End year is required.";
        } else if (
          updatedData.startYear &&
          new Date(updatedData.startYear).getFullYear() + 3 >
            new Date(value).getFullYear()
        ) {
          errorMessage =
            "There must be a gap of at least 3 years between start and end years.";
        }
        break;
      case "marks":
        if (!value.trim()) errorMessage = "Marks are required.";
        break;
      default:
        break;
    }

    if (errorMessage) {
      alert(errorMessage);
      setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // College Name
    if (!formData.collegeId?.trim()) {
      newErrors.collegeId = "College name is required.";
    }

    // Specialization
    if (!formData.specialization?.trim()) {
      newErrors.specialization = "Specialization is required.";
    }
    if (!formData.degree?.trim()) {
      newErrors.degree = "Degree is required.";
    }

    // Start Year
    if (!formData.startYear?.trim()) {
      newErrors.startYear = "Start year is required.";
    }

    // End Year
    if (!formData.endYear?.trim()) {
      newErrors.endYear = "End year is required.";
    } else if (
      formData.startYear &&
      new Date(formData.startYear).getFullYear() + 3 >
        new Date(formData.endYear).getFullYear()
    ) {
      newErrors.endYear =
        "There must be a gap of at least 3 years between start and end years.";
    }

    // Marks
    if (
      !formData.marks ||
      (typeof formData.marks === "string" && !formData.marks.trim())
    ) {
      newErrors.marks = "Marks are required.";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      const errorMessages = Object.values(validationErrors).join("\n");
      alert(errorMessages);
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const dataRes = await addUserEducation(formData);
      console.log(dataRes, "Datares");

      if (dataRes && dataRes._id) {
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

        setProfileData((prevData) => {
          const selectedCollege = campus.find(
            (college) => college._id === formData.collegeId
          );
          return {
            ...prevData,
            educationDetails: [
              ...(prevData.educationDetails || []).filter(
                (item) => item._id !== dataRes._id
              ),
              {
                _id: dataRes._id,
                profile: dataRes.profile,
                degree: formData.degree,
                startYear: formData.startYear,
                endYear: formData.endYear,
                marks: formData.marks,
                specialization: formData.specialization,
                collegeId: formData.collegeId,
                collegeName: selectedCollege ? selectedCollege.collegeName : "",
                country: formData.country,
                state: formData.state,
              },
            ],
          };
        });

        setFormData(null);
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

  const handleUpdateEducation = async () => {
    const result = await updateEducation(
      { educationId: data?._id, user: { _id: userId }, body: formData },
      setResponse
    );
    if (result.status === 200) {
      console.log(result.data.data, "res");
      toast("👌 Education Updated Successfully!", {
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
        educationDetails: prevData.educationDetails.map((edu) =>
          edu._id === result.data.data._id ? result.data.data : edu
        ),
      }));

      onClose();
    } else {
      toast(`✖️ ${"Error Updating Education"}`, {
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

  const handleDeleteEducation = async () => {
    try {
      const response = await fetch(
        `${API_URL}api/v1/delete/education/${data._id}`,
        {
          method: "DELETE",
          headers: {
            accessToken: getAccessToken(),
          },
        }
      );

      if (response.ok) {
        toast.success("Education deleted successfully!");
        setProfileData((prevData) => ({
          ...prevData,
          educationDetails: prevData.educationDetails.filter(
            (edu) => edu._id !== data._id
          ),
        }));

        setFormData(null);
        onClose();
      } else {
        toast.error(response?.message || "Failed to delete education.");
      }
    } catch (error) {
      console.error(error, "Error updating the education");
      toast.error(response?.message || "Failed to delete education.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
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
                    value={formData?.collegeId}
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
                  {/* {errors.collegeId && (
                    <p className="mt-1 error-p text-sm text-red-500">
                      {errors.collegeId}
                    </p>
                  )} */}
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
                    value={formData?.specialization}
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
                  {/* {errors.specialization && (
                    <p className="mt-1 error-p text-sm text-red-500">
                      {errors.specialization}
                    </p>
                  )} */}
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="degree"
                    className="label-css block text-sm font-medium"
                  >
                    Degree
                  </label>
                  <span className="required-indicator">*</span>
                  <select
                    id="degree"
                    value={formData?.degree}
                    onChange={(e) => handleChange("degree", e.target.value)}
                    className={`select-hover mt-1 ${
                      errors.degree ? "border-red-500" : ""
                    }`}
                  >
                    <option value="" disabled>
                      Select Degree
                    </option>
                    {degreeData.map((item, index) => (
                      <option
                        key={index}
                        className="option-select-css"
                        value={item.degree}
                      >
                        {item.degree}
                      </option>
                    ))}
                  </select>
                  {/* {errors.degree && (
                    <p className="mt-1 error-p text-sm text-red-500">
                      {errors.degree}
                    </p>
                  )} */}
                </div>

                <div className="modal-div-inner" style={{ marginBottom: 0 }}>
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
                      value={formData?.startYear ?? ""}
                      onChange={(e) =>
                        handleChange("startYear", e.target.value)
                      }
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
                    {/* {errors.startYear && (
                      <p className="mt-1 error-p text-sm text-red-500">
                        {errors.startYear}
                      </p>
                    )} */}
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
                      value={formData?.endYear ?? ""}
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
                    {/* {errors.endYear && (
                      <p className="mt-1 error-p text-sm text-red-500">
                        {errors.endYear}
                      </p>
                    )} */}
                  </div>
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="marks"
                    className="label-css block text-sm font-medium"
                  >
                    CGPA
                  </label>
                  <span className="required-indicator">*</span>
                  <input
                    type="text"
                    id="marks"
                    value={formData?.marks}
                    onChange={(e) => handleChange("marks", e.target.value)}
                    className={`input-css-title-link mt-1 ${
                      errors.marks ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your marks"
                  />
                  {/* {errors.marks && (
                    <p className="mt-1 error-p text-sm text-red-500">
                      {errors.marks}
                    </p>
                  )} */}
                </div>

                <div
                  className="modal-delete-sav-cancel-main-div"
                  style={{
                    justifyContent: data && data._id ? "space-between" : "end",
                  }}
                >
                  {data && data._id && (
                    <div
                      onClick={() => handleDeleteEducation()}
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
                  )}
                  <div className="modal-button-div">
                    <button className="cancel-modal-btn" onClick={handleClose}>
                      Cancel
                    </button>
                    <button
                      className="save-modal-btn"
                      onClick={
                        data && Object.keys(data).length > 0 && data.collegeId
                          ? handleUpdateEducation
                          : handleSubmit
                      }
                    >
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
      </div>
    </>
  );
};

export default AddEducationModal;
