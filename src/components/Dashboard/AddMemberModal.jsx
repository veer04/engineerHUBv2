import React from "react";
import "./AddPostModal.css";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { BsUpload } from "react-icons/bs";
import { Bucket_URL } from "../../services/APIUtils";
import { RxCross2 } from "react-icons/rx";
import { useRef } from "react";
import {
  addClubMember,
  patchCoverImage,
  patchCoverImageUsingLink,
} from "../../services/APIConfig";
import useGlobalSnackbar from "../../hooks/useGlobalSnackbar";

export default function AddMemberModal() {
  const [newCoverPhoto, setNewCoverPhoto] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const fileInput = useRef(null);
  const { organizationId } = useParams();
  const bucket = `${Bucket_URL}frontend/profile/dashboard/`;
  const [response, setResponse] = useState({});
  const [errors, setErrors] = useState({ name: "", role: "", linkedin: "" });
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } =
    useGlobalSnackbar();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //function to find out window current scroll position
  function getScrollPosition() {
    var doc = document.documentElement;
    var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    return { top, left };
  }

  useEffect(() => {
    if (Object.keys(response).length > 0) {
      setLoading(false);
      if (response.status >= 200 && response.status < 300) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Member added successfully");
        setSnackbarOpen(true);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in adding member");
        setSnackbarOpen(true);
      }
      setResponse({});
      navigate(-1);
    }
  }, [response]);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  function validateData() {
    console.log("validate");
    let isValid = true;
    let newErrors = { name: "", role: "", linkedin: "" };

    if (!!!name) {
      newErrors.name = "Please enter the name of the member";
      isValid = false;
    } else if (name.length < 3) {
      newErrors.name = "Name should be atleast 3 characters long";
      isValid = false;
    } else if (name.length > 50) {
      newErrors.name = "Name should be less than 50 characters long";
      isValid = false;
    }

    if (!!!role) {
      newErrors.role = "Please enter the role of the member";
      isValid = false;
    } else if (role.length < 3) {
      newErrors.role = "Role should be atleast 3 characters long";
      isValid = false;
    } else if (role.length > 50) {
      newErrors.role = "Role should be less than 50 characters long";
      isValid = false;
    }

    if (!!!linkedin) {
      newErrors.role = "Please enter the linkedin URL of the member";
      isValid = false;
    } else if (
      !/^(ftp|http|https):\/\/[^ "]+$/.test(linkedin) ||
      !/^(ftp|http|https):\/\/(www.linkedin.com\/)/.test(linkedin)
    ) {
      newErrors.linkedin =
        "Invalid linkedin url! (URL Ex: https://www.linkedin.com/company/engineersummit)";
      isValid = false;
    }
    console.log("newErrors", newErrors);
    console.log("errors", errors);
    setErrors(newErrors);
    return isValid;
  }

  function handleInput(e) {
    //check if the file is an image
    if (e.target.files[0]) {
      if (e.target.files[0].type.includes("image")) {
        setNewCoverPhoto(e.target.files[0]);
      } else {
        alert("Please choose an image file only");
      }
    }
  }

  function handleUpload() {
    let isValid = false;
    isValid = validateData();
    if (isValid) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", newCoverPhoto);
      formData.append("linkedIn", linkedin);
      formData.append("designation", role);
      setLoading(true);
      addClubMember(formData, setResponse);
    }
  }

  return ReactDOM.createPortal(
    <div
      style={{
        top: getScrollPosition().top,
        left: getScrollPosition().left,
      }}
      id="edit-modal"
    >
      {true ? (
        <div className="modal-container modal-padding post-modal-container">
          <div
            onClick={() => {
              navigate(-1);
            }}
            className="modal-cancel-button-container"
          >
            <RxCross2 className="modal-cancel-button" />
          </div>
          <h2 className="modal-header">Add a new Member</h2>
          <input
            style={{ display: "none" }}
            type="file"
            onChange={handleInput}
            ref={fileInput}
          />
          <div
            onClick={() => {
              fileInput.current.click();
            }}
            style={{
              borderColor: !!!newCoverPhoto ? "#e6e6e6" : "#000",
            }}
            className="upload-img-container post-upload-img-container"
          >
            {!!!newCoverPhoto ? (
              <>
                <div className="upload-icon">
                  <BsUpload />
                </div>
                <span>Choose an image file to upload</span>
                <span className="hint">Recommended Dimensions (500x500)</span>
              </>
            ) : (
              <img
                className="uploaded-img"
                src={
                  typeof newCoverPhoto === "string"
                    ? newCoverPhoto
                    : URL.createObjectURL(newCoverPhoto)
                }
                loading="lazy"
                alt="logo"
              />
            )}
          </div>
          <h2 className="modal-header mt-3">Full Name</h2>
          <input
            name="name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the full name of the member"
          />
          <label className="error-message">{errors.name}</label>
          <h2 className="modal-header mt-3">Role of the Member</h2>
          <input
            name="name"
            className="input-field"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter the role in the club"
          />
          <label className="error-message">{errors.role}</label>

          <h2 className="modal-header mt-3">Linkedin</h2>
          <input
            name="name"
            className="input-field"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="Enter the role in the club"
          />
          <label className="error-message">{errors.linkedin}</label>

          <button
            disabled={
              loading || !(!!newCoverPhoto && !!name && !!role && !!linkedin)
            }
            onClick={() => handleUpload()}
            className="submit-button"
          >
            Upload
          </button>
        </div>
      ) : (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>,
    document.querySelector("#modal")
  );
}
