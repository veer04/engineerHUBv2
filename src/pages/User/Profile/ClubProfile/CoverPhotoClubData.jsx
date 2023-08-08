import React from "react";
import "../StudentProfile/StudentProfilePage.css";
import { useOutletContext, useParams } from "react-router-dom";
import { useState } from "react";
import CustomSnackbar from "../../Login/CustomSnackbar";
import ClubCoverPhoto from "../../../../components/ClubCoverPhoto/ClubCoverPhoto";
import { useRef } from "react";
import { getAccessToken } from "../../../../features/getCookieValues";
import axios from "axios";
import { API_URL } from "../../../../services/APIUtils";

export default function CoverPhotoClubData() {
  const [profile] = useOutletContext();
  const [snackbarValues, setSnackbarValues] = useState({
    severity: "success",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const fileInput = useRef(null);
  const [newCoverPhotos, setNewCoverPhotos] = useState([]);
  const [uploadedCoverPhotos, setUploadedCoverPhotos] = useState([]);
  const [coverPhotosCopy, setCoverPhotosCopy] = useState(profile?.clubPhoto);

  // !IMPORTANT: Below two APIs may run twice under StrictMode. Use StrictMode accordingly. Do not delete this comment.

  function handleDelete(index, setStatus) {
    console.log("delete");
    axios
      .delete(`${API_URL}api/v1/club/deleteClubPhotos`, {
        data: { index: index },
        headers: { accessToken: getAccessToken() },
      })
      .then((res) => {
        console.log(res);
        setStatus("success");
        let oldLength = coverPhotosCopy.length;
        setCoverPhotosCopy((prev) =>
          prev?.filter((item, index2) => index2 !== index)
        );
        setUploadedCoverPhotos((prev) =>
          prev?.filter((item, index2) => index2 + oldLength !== index)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpload(image, setStatus) {
    console.log("upload");
    let file = new FormData();
    file.append("clubPhotos", image);
    const config = {
      headers: {
        accessToken: getAccessToken(),
      },
    };
    axios
      .patch(`${API_URL}api/v1/club/updateClubPhotos`, file, config)
      .then((res) => {
        console.log(res);
        setStatus("success");
        setUploadedCoverPhotos((prev) => [...prev, res.data.data]);
        setNewCoverPhotos((prev) => prev?.filter((item) => item !== image));
      })
      .catch((err) => {
        console.log(err);
        if (axios.isCancel(err)) {
          console.log("req cancel");
        } else {
          console.log("req performed");
        }
        setStatus("failed");
      });
  }

  function handleInput(e) {
    //check if the file is an image
    if (e.target.files[0]) {
      if (e.target.files[0].type.includes("image")) {
        setNewCoverPhotos((prev) => [...prev, e.target.files[0]]);
      } else {
        alert("Please upload an image file");
      }
    }
  }

  return (
    <>
      <p>Change Cover Photos</p>
      <div className="profile-picture-container cover-photo-container">
        <input
          style={{ display: "none" }}
          type="file"
          onChange={handleInput}
          ref={fileInput}
        />
        <div>
          {coverPhotosCopy?.map((photo, index) => {
            return (
              <ClubCoverPhoto
                key={index}
                index={index}
                handleDelete={handleDelete}
                handleUpload={handleUpload}
                imageUrl={photo}
              />
            );
          })}
        </div>
        <div>
          {uploadedCoverPhotos?.map((photo, index) => {
            return (
              <ClubCoverPhoto
                key={index}
                index={coverPhotosCopy.length + index}
                handleDelete={handleDelete}
                handleUpload={handleUpload}
                imageUrl={photo}
              />
            );
          })}
        </div>
        <div>
          {newCoverPhotos?.map((photo, index) => {
            return (
              <div key={index}>
                <ClubCoverPhoto
                  addOption
                  index={
                    coverPhotosCopy.length + uploadedCoverPhotos?.length + index
                  }
                  handleDelete={handleDelete}
                  handleUpload={handleUpload}
                  imageUrl={photo}
                />
              </div>
            );
          })}
        </div>
        <div>
          <div
            onClick={() => {
              fileInput.current.click();
            }}
            className="cover-photo-edit-container add-option"
          >
            +
          </div>
        </div>
      </div>
      {snackbarValues.severity === "success" && (
        <CustomSnackbar
          setOpen={setOpen}
          open={open}
          message={snackbarValues.message}
          severity={snackbarValues.severity}
        />
      )}
    </>
  );
}
