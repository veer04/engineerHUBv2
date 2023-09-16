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

export default function AddPostModal() {
  const [newCoverPhoto, setNewCoverPhoto] = useState(null);
  const [caption, setCaption] = useState("");
  const fileInput = useRef(null);
  const { organizationId } = useParams();
  const bucket = `${Bucket_URL}frontend/profile/dashboard/`;
  const [response, setResponse] = useState(null);

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

  useEffect(() => {
    if (response) {
      navigate(-1);
      setResponse(null);
    }
  }, [response]);

  function handleUpload() {
    const formData = new FormData();
    formData.append("description", caption);
    formData.append("postLogo", newCoverPhoto);
    uploadNewPost(formData, setResponse);
  }

  useEffect(() => {
    console.log(!!newCoverPhoto && caption.length !== 0);
  }, [newCoverPhoto, caption]);

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
          <button
            disabled={!(!!newCoverPhoto && caption.length !== 0)}
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
