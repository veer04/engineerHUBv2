import { useEffect } from "react";
import "../StudentProfile/StudentProfilePage.css";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { useState } from "react";
import CustomSnackbar from "../../Login/CustomSnackbar";
import ClubCoverPhoto from "../../../../components/ClubCoverPhoto/ClubCoverPhoto";
import { useRef } from "react";
import { getAccessToken } from "../../../../features/getCookieValues";
import axios from "axios";
import { API_URL } from "../../../../services/APIUtils";
import { getAllPosts, getClubById } from "../../../../services/APIConfig";
import ClubPostCard from "../../../../components/ClubPostCard/ClubPostCard";
import ClubPostCard2 from "../../../../components/ClubPostCard2/ClubPostCard2";
import { TextField } from "@mui/material";
import { RxCross1 } from "react-icons/rx";

export default function ManagePostsClubData() {
  const [profile] = useOutletContext();
  const [snackbarValues, setSnackbarValues] = useState({
    severity: "success",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postCopy, setPostCopy] = useState([]);
  const [uploadedPosts, setUploadedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileInput = useRef(null);
  const [newPostImage, setNewPostImage] = useState(null);
  const [newPostDescription, setNewPostDescription] = useState("");
  const [errors, setErrors] = useState({
    newPostDescription: "",
  });

  useEffect(() => {
    getAllPosts(setPosts, profile?._id);
  }, [profile]);

  useEffect(() => {
    setPostCopy([...posts].reverse());
  }, [posts]);

  // useEffect(() => {
  //   console.log("profile", profile);
  //   console.log("posts", posts);
  // }, [profile, posts]);

  function handleDelete(_id, setStatus) {
    console.log("delete");
    console.log(_id);
    axios
      .delete(`${API_URL}api/v1/club/deleteClubPost/${_id}`, {
        headers: { accessToken: getAccessToken() },
      })
      .then((res) => {
        console.log(res);
        setStatus("deleted");
        setSnackbarValues({
          severity: "success",
          message: `Post Deleted Successfully`,
        });
        setOpen(true);
        setUploadedPosts((prev) => prev?.filter((item) => item._id !== _id));
        setPostCopy((prev) => prev?.filter((item) => item._id !== _id));
      })
      .catch((err) => {
        setStatus("failed");
        console.log(err);
        setSnackbarValues({
          severity: "error",
          message: `Failed to delete post, Retry!`,
        });
        setOpen(true);
      });
  }

  function validate() {
    let newPostDescriptionError = "";
    if (!newPostDescription.trim()) {
      newPostDescriptionError = "Description cannot be empty";
    } else if (newPostDescription.trim().length < 30) {
      newPostDescriptionError = "Description must be atleast 30 characters";
    } else if (newPostDescription.trim().length > 600) {
      newPostDescriptionError = "Description cannot exceed 600 characters";
    }
    setErrors({
      newPostDescription: newPostDescriptionError,
    });
    if (newPostDescriptionError) {
      return false;
    }
    return true;
  }

  function handleUpload() {
    if (!validate()) {
      setIsLoading(false);
      return;
    }
    console.log("upload");
    let formData = new FormData();
    formData.append("postLogo", newPostImage);
    formData.append("description", newPostDescription);
    const config = {
      headers: {
        accessToken: getAccessToken(),
      },
    };
    console.log("formData", formData);
    console.log(typeof formData);
    console.log(typeof formData.get("postLogo"));
    console.log(typeof formData.get("description"));
    axios
      .post(`${API_URL}api/v1/club/addPost`, formData, config)
      .then((res) => {
        setIsLoading(false);
        // setStatus("success");
        setUploadedPosts((prev) => [res.data.data, ...prev]);
        setNewPostImage(null);
        setNewPostDescription("");
        setSnackbarValues({
          severity: "success",
          message: `New Post Uploaded`,
        });
        setOpen(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setSnackbarValues({
          severity: "error",
          message: `Failed to upload new post, Retry!`,
        });
        setOpen(true);

        if (axios.isCancel(err)) {
          console.log("req cancel");
        } else {
          console.log("req performed");
        }
      });
  }

  function handleInput(e) {
    //check if the file is an image
    if (e.target.files[0]) {
      if (e.target.files[0].type.includes("image")) {
        setNewPostImage(e.target.files[0]);
      } else {
        alert("Please upload an image file");
      }
    }
  }

  return (
    <>
      <p>Add a new post</p>
      <div className="profile-picture-container cover-photo-container manage-posts-container">
        {/* <div> */}
        <div
          // onClick={() =>
          //   navigate(`/profile/club/${clubId}/manage-posts/${_id}`)
          // }
          className="club-post-card-2 club-post-card-2-input"
        >
          <input
            ref={fileInput}
            type="file"
            name="post"
            onChange={handleInput}
            id="input-post-image"
            style={{ display: "none" }}
          />
          {!!newPostImage && (
            <div
              className="club-post-input-image"
              style={{
                backgroundImage: `url(${URL.createObjectURL(newPostImage)})`,
                minWidth: "387.2px",
                aspectRatio: "1/1",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                border: "1px solid #bdbdbd",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
              }}
            >
              {!isLoading && (
                <div
                  onClick={() => setNewPostImage(null)}
                  className="club-post-input-image-delete"
                >
                  <RxCross1 />
                </div>
              )}
            </div>
          )}
          {!!!newPostImage && (
            <div
              onClick={() => fileInput.current.click()}
              className="club-post-input-image-button"
            >
              Add Image
            </div>
          )}
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            placeholder="Enter the description"
            value={newPostDescription}
            multiline
            minRows={3}
            maxRows={15}
            onChange={(e) => setNewPostDescription(e.target.value)}
            onBlur={(e) => setNewPostDescription(e.target.value.trim())}
            fullWidth
            margin="normal"
            error={!!errors.newPostDescription}
            helperText={errors.newPostDescription}
          />
          <div className="post-submit-container">
            {!isLoading && (
              <button
                disabled={!!!newPostImage || newPostDescription.trim() === ""}
                onClick={() => {
                  setIsLoading(true);
                  handleUpload();
                }}
              >
                Post
              </button>
            )}
            {isLoading && (
              <button>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </button>
            )}
          </div>
        </div>
        {/* </div> */}
        <p
          style={{
            fontSize: "1.25rem",
            marginTop: "0",
            marginBottom: "0.125rem",
            fontWeight: "600",
          }}
        >
          View your posts
        </p>
        {uploadedPosts?.length === 0 && postCopy?.length === 0 && (
          <p
            style={{
              marginTop: "0",
              marginBottom: "0.125rem",
              height: "10rem",
              width: "100%",
              fontSize: "1.15rem",
              fontWeight: "600",
              color: "var(--text-color-green)",
            }}
          >
            No posts to show
          </p>
        )}
        {uploadedPosts?.map((post, index) => {
          return (
            <div key={index}>
              <ClubPostCard2
                index={index}
                {...post}
                handleDelete={handleDelete}
              />
            </div>
          );
        })}
        {!!postCopy &&
          postCopy?.map((post, index) => {
            return (
              <div key={index}>
                <ClubPostCard2
                  index={index}
                  {...post}
                  handleDelete={handleDelete}
                />
              </div>
            );
          })}
        {/* <input
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
        </div> */}
      </div>
      {snackbarValues.severity === "success" && (
        <CustomSnackbar
          setOpen={setOpen}
          open={open}
          message={snackbarValues.message}
          severity={snackbarValues.severity}
        />
      )}
      <Outlet />
    </>
  );
}
