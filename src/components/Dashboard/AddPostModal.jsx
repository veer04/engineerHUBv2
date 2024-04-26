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
  uploadNewPost,
} from "../../services/APIConfig";
import { set } from "react-hook-form";
import useGlobalSnackbar from "../../hooks/useGlobalSnackbar";
import { Link } from "react-router-dom";
import { getUserId, getUserRole } from "../../features/User/UserDetails";

export default function AddPostModal({ hostPage, setCloseModal }) {
  const [newCoverPhoto, setNewCoverPhoto] = useState(null);
  const [caption, setCaption] = useState("");
  const fileInput = useRef(null);
  const { organizationId } = useParams();
  const bucket = `${Bucket_URL}frontend/profile/dashboard/`;
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ caption: "" });
  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();

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

  function validateData() {
    let isValid = true;
    let newErrors = { caption: "" };

    if (!!!caption) {
      newErrors.caption = "Please enter the caption";
      isValid = false;
    } else if (caption.length > 2000) {
      newErrors.caption = "Caption should be less than 2000 characters long";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  }

  useEffect(() => {
    if (Object.keys(response).length > 0) {
      setLoading(false);
      if (response.status >= 200 && response.status < 300) {
        setSnackbarSeverity("success");
        setSnackbarMessage(
          <>
            Post created successfully.{" "}
            <Link
              to={`/profile/${
                getUserRole() === "Alumni"
                  ? "user"
                  : getUserRole() === "Club"
                  ? "club"
                  : "organization"
              }/${getUserId()}/posts/${response?.data?.data?._id}`}
              style={{ color: "rgb(13, 110, 253)" }}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Click here
            </Link>{" "}
            to view
          </>
        );
        setSnackbarDuration(8000);
        setSnackbarOpen(true);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in creating post");
        setSnackbarDuration(8000);
        setSnackbarOpen(true);
      }
      setResponse({});
      if (!!hostPage) setCloseModal(false);
      else navigate(-1);
    }
  }, [response]);

  function handleUpload() {
    let isValid = true;
    isValid = validateData();
    if (isValid) {
      const formData = new FormData();
      formData.append("description", caption);
      formData.append("postLogo", newCoverPhoto);
      setLoading(true);
      uploadNewPost(formData, setResponse);
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
              if (!!hostPage) setCloseModal(false);
              else navigate(-1);
            }}
            className="modal-cancel-button-container"
          >
            <RxCross2 className="modal-cancel-button" />
          </div>
          <h2 className="modal-header">Add a new Post</h2>
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
          <h2 className="modal-header mt-3">Caption</h2>
          <textarea
            name="caption"
            className="input-field"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={5}
            placeholder="Enter your Caption"
          />
          <label className="error-message">{errors.caption}</label>
          <button
            disabled={loading || !(!!newCoverPhoto && caption.length !== 0)}
            onClick={() => handleUpload()}
            className="submit-button"
          >
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Upload"
            )}
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
