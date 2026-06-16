import React from "react";
import "./CoverImageModal.css";
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
import useGlobalSnackbar from "../../hooks/useGlobalSnackbar";

export default function CoverImageModal({}) {
  const [newCoverPhoto, setNewCoverPhoto] = useState(null);
  const fileInput = useRef(null);
  const { organizationId } = useParams();
  const bucket = `${Bucket_URL}frontend/profile/dashboard/`;
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } =
    useGlobalSnackbar();

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

  useEffect(() => {
    if (Object.keys(response).length > 0) {
      setLoading(false);
      if (response.status >= 200 && response.status < 300) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Cover Image Updated Successfully");
        setSnackbarOpen(true);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error in updating cover image");
        setSnackbarOpen(true);
      }
      setResponse({});
      navigate(-1);
    }
  }, [response]);

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
    if (newCoverPhoto instanceof File) {
      const file = new FormData();
      file.append("backgroundPoster", newCoverPhoto);
      setLoading(true);
      patchCoverImage(file, setResponse);
    } else {
      setLoading(true);
      patchCoverImageUsingLink(newCoverPhoto, setResponse);
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
        <div className="modal-container modal-padding">
          <div
            onClick={() => {
              navigate(-1);
            }}
            className="modal-cancel-button-container"
          >
            <RxCross2 className="modal-cancel-button" />
          </div>
          <h2 className="modal-header">Choose your Profile Banner</h2>
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
            className="upload-img-container"
          >
            {!!!newCoverPhoto ? (
              <>
                <div className="upload-icon">
                  <BsUpload />
                </div>
                <span>Choose an image file to upload</span>
                <span className="hint">Recommended Dimensions (1120x250)</span>
                <span className="hint">{`Recommended Size less than < 2 MB`}</span>
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
          {/* --- Default image selection (commented out) ---
          <div className="divider">
            <div className="line"></div>
            <span>or</span>
            <div className="line"></div>
          </div>
          <h2 className="modal-header">Choose from default image</h2>
          <div className="choice-gallery">
            <img
              onClick={() => setNewCoverPhoto(`${bucket}cover-image-1.png`)}
              src={`${bucket}cover-image-1.png`}
              loading="lazy"
              alt="logo"
            />
            <img
              onClick={() => setNewCoverPhoto(`${bucket}cover-image-2.png`)}
              src={`${bucket}cover-image-2.png`}
              loading="lazy"
              alt="logo"
            />
            <img
              onClick={() => setNewCoverPhoto(`${bucket}cover-image-3.png`)}
              src={`${bucket}cover-image-3.png`}
              loading="lazy"
              alt="logo"
            />
          </div>
          --- End of default image selection --- */}
          <button
            disabled={loading || !!!newCoverPhoto}
            onClick={() => handleUpload()}
            className="submit-button"
          >
            {loading ? (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              >
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
