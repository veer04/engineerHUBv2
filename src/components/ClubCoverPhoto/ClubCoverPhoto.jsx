import axios from "axios";
import "./ClubCoverPhoto.css";
import { MdDelete } from "react-icons/md";
import { HiUpload } from "react-icons/hi";
import { getAccessToken } from "../../features/getCookieValues";
import { API_URL } from "../../services/APIUtils";
import { useState } from "react";
import { useEffect } from "react";
export default function ClubCoverPhoto({
  addOption,
  imageUrl,
  index,
  handleUpload,
  handleDelete,
}) {
  const [status, setStatus] = useState("selected");
  if (addOption) {
    if (status === "selected") {
      return (
        <div
          style={{
            backgroundImage: `url(${URL.createObjectURL(imageUrl)})`,
          }}
          className="cover-photo-edit-container"
        >
          <div
            onClick={() => {
              setStatus("uploading");
              handleUpload(imageUrl, setStatus);
            }}
            className="delete-option"
          >
            <HiUpload />
          </div>
        </div>
      );
    }
    if (status === "uploading") {
      return (
        <div
          style={{
            backgroundImage: `url(${URL.createObjectURL(imageUrl)})`,
          }}
          className="cover-photo-edit-container cover-photo-edit-container--no-hover"
        >
          <div className="loading-container">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      );
    }

    if (status === "success") {
      return (
        <div
          style={{
            backgroundImage: `url(${URL.createObjectURL(imageUrl)})`,
          }}
          className="cover-photo-edit-container"
        >
          <div
            onClick={() => {
              setStatus("deleting");
              handleDelete(index, setStatus);
            }}
            className="delete-option"
          >
            <MdDelete />
          </div>
        </div>
      );
    }

    if (status === "deleting") {
      return (
        <div
          style={{
            backgroundImage: `url(${URL.createObjectURL(imageUrl)})`,
          }}
          className="cover-photo-edit-container cover-photo-edit-container--no-hover"
        >
          <div className="loading-container">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      );
    }

    if (status === "failed") {
      return (
        <div
          style={{
            backgroundImage: `url(${URL.createObjectURL(imageUrl)})`,
          }}
          className="cover-photo-edit-container cover-photo-edit-container--no-hover cover-photo-edit-container--failed"
        >
          <div
            onClick={() => {
              setStatus("uploading");
              handleUpload(imageUrl, setStatus);
            }}
            className="loading-container"
          >
            <div className="text-danger" role="status">
              <span className="user-select-none">Retry</span>
            </div>
          </div>
        </div>
      );
    }
  }
  if (status === "deleting") {
    return (
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        className="cover-photo-edit-container cover-photo-edit-container--no-hover"
      >
        <div className="loading-container">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
      className="cover-photo-edit-container"
    >
      <div
        onClick={() => {
          setStatus("deleting");
          handleDelete(index, setStatus);
        }}
        className="delete-option"
      >
        <MdDelete />
      </div>
    </div>
  );
}
