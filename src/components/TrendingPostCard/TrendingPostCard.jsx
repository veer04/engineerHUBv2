import "./TrendingPostCard.css";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { isUserLoggedIn } from "../../features/User/UserDetails";
import useGlobalSnackbar from "../../hooks/useGlobalSnackbar";
import {
  followClub,
  likePost,
  savePost,
  unLikePost,
  unSavePost,
} from "../../services/APIConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";

export default function TrendingPostCard({ post, updatePost }) {
  const navigate = useNavigate();
  const isLoggedIn = isUserLoggedIn();
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } =
    useGlobalSnackbar();
  const [followResponse, setFollowResponse] = useState({});
  const [likeResponse, setLikeResponse] = useState({});
  const [unlikeResponse, setUnlikeResponse] = useState({});
  const [saveResponse, setSaveResponse] = useState({});
  const [unsaveResponse, setUnsaveResponse] = useState({});

  useEffect(() => {
    // console.log(followResponse);
    if (Object.keys(followResponse).length !== 0) {
      if (followResponse?.data?.success) {
        updatePost(post._id);
        setSnackbarSeverity("success");
        setSnackbarMessage(`You are now following ${post?.club[0]?.name}`);
        setSnackbarOpen(true);
      } else {
        if (followResponse?.data?.message === "Already Followed.") {
          setSnackbarSeverity("warning");
          setSnackbarMessage(
            `You are already following ${post?.club[0]?.name}`
          );
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage(`Something went wrong.`);
        }
        setSnackbarOpen(true);
      }
    }
  }, [followResponse]);

  useEffect(() => {
    if (Object.keys(likeResponse).length !== 0) {
      if (likeResponse?.data?.success) {
        updatePost(post._id);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage(`Something went wrong.`);
        setSnackbarOpen(true);
      }
    }
  }, [likeResponse]);

  useEffect(() => {
    if (Object.keys(unlikeResponse).length !== 0) {
      console.log(unlikeResponse);
      if (unlikeResponse?.data?.success) {
        updatePost(post._id);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage(`Something went wrong.`);
        setSnackbarOpen(true);
      }
    }
  }, [unlikeResponse]);

  useEffect(() => {
    if (Object.keys(saveResponse).length !== 0) {
      console.log("s", saveResponse);
      if (saveResponse?.data?.success) {
        updatePost(post._id);
        setSnackbarSeverity("success");
        setSnackbarMessage(`Post saved`);
        setSnackbarOpen(true);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage(`Something went wrong.`);
        setSnackbarOpen(true);
      }
    }
  }, [saveResponse]);

  useEffect(() => {
    if (Object.keys(unsaveResponse).length !== 0) {
      console.log("us", unsaveResponse);
      if (unsaveResponse?.data?.success) {
        updatePost(post._id);
        setSnackbarSeverity("success");
        setSnackbarMessage(`Post unsaved`);
        setSnackbarOpen(true);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage(`Something went wrong.`);
        setSnackbarOpen(true);
      }
    }
  }, [unsaveResponse]);

  function handleFollow(clubName, clubId) {
    if (!isLoggedIn) {
      setSnackbarSeverity("error");
      setSnackbarMessage("You need to login to follow a club");
      setSnackbarOpen(true);
    } else {
      followClub(clubId, setFollowResponse);
    }
  }

  function handleLike() {
    if (!isLoggedIn) {
      setSnackbarSeverity("error");
      setSnackbarMessage("You need to login to like a post");
      setSnackbarOpen(true);
    } else {
      if (post?.isLike) unLikePost(post._id, setUnlikeResponse);
      else likePost(post._id, setLikeResponse);
    }
  }

  function handleSave() {
    if (!isLoggedIn) {
      setSnackbarSeverity("error");
      setSnackbarMessage("You need to login to save a post");
      setSnackbarOpen(true);
    } else {
      if (post?.isSaved) unSavePost(post._id, setUnsaveResponse);
      else savePost(post._id, setSaveResponse);
    }
  }

  function handleShare() {}

  return (
    <div className="post-card-container">
      <div className="header">
        <div className="details">
          <div className="logo">
            <img loading="lazy" src={post?.club[0]?.image} alt="logo" />
          </div>
          <div className="name">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/profile/club/${post.clubId}`)}
            >
              {post?.club[0]?.name}
            </span>
          </div>
        </div>
        <div className="follow-btn">
          {!(isLoggedIn && post?.isFollow) && (
            <button
              onClick={() => handleFollow(post?.club[0]?.name, post?.clubId)}
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <div className="post-image-container">
        <img src={post?.postLogo} alt="" />
      </div>
      <div className="impressions-container">
        <div className="left">
          <div className="heart">
            {!(isLoggedIn && post?.isLike) ? (
              <FaRegHeart onClick={() => handleLike()} />
            ) : (
              <FaHeart onClick={() => handleLike()} />
            )}
          </div>
          <div className="share">
            <FiShare2 onClick={() => handleShare()} />
          </div>
        </div>
        <div className="right">
          <div className="save">
            {!(isLoggedIn && post?.isSaved) ? (
              <FaRegBookmark onClick={() => handleSave()} />
            ) : (
              <FaBookmark onClick={() => handleSave()} />
            )}
          </div>
        </div>
      </div>
      <div className="likes">
        <span>{post.totalLikes} likes</span>
      </div>
      <span className={`caption ${`text-crop-1`}`}>{post.description}</span>
    </div>
  );
}
