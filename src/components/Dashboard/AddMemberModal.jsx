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
  patchCoverImage,
  patchCoverImageUsingLink,
} from "../../services/APIConfig";

export default function AddMemberModal() {
  const [newCoverPhoto, setNewCoverPhoto] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const fileInput = useRef(null);
  const { organizationId } = useParams();
  const bucket = `${Bucket_URL}frontend/profile/dashboard/`;
  const [response, setResponse] = useState(null);
  const [errors, setErrors] = useState({ name: "", role: "" });

  const navigate = useNavigate();

  //function to find out window current scroll position
  function getScrollPosition() {
    var doc = document.documentElement;
    var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    return { top, left };
  }

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  function validateData() {
    let isValid = true;
    let newErrors = { name: "", role: "" };

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
    }
  }

  useEffect(() => {
    console.log(!!newCoverPhoto && name.length !== 0);
  }, [newCoverPhoto, name]);

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

          <label className="error-message">{errors.linkedin}</label>
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
            disabled={!(!!newCoverPhoto && name.length !== 0)}
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
