import "./TrendingPostCard.css";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { isUserLoggedIn } from "../../features/User/UserDetails";
import useGlobalSnackbar from "../../hooks/useGlobalSnackbar";
import { followClub, likePost, unLikePost } from "../../services/APIConfig";
import { useEffect, useState } from "react";

export default function TrendingPostCard({ post }) {
  const isLoggedIn = isUserLoggedIn();
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } =
    useGlobalSnackbar();
  const [followResponse, setFollowResponse] = useState({});
  const [likeResponse, setLikeResponse] = useState({});
  const [unlikeResponse, setUnlikeResponse] = useState({});
  const [saveResponse, setSaveResponse] = useState({});
  const [unsaveResponse, setUnsaveResponse] = useState({});

  useEffect(() => {
    console.log(followResponse);
    if (Object.keys(followResponse).length !== 0) {
      if (followResponse?.data?.success) {
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
    console.log(likeResponse);
    if (Object.keys(likeResponse).length !== 0) {
      if (likeResponse?.data?.success) {
        setSnackbarSeverity("success");
        setSnackbarMessage(`Post liked`);
        setSnackbarOpen(true);
      } else {
        if (likeResponse?.data?.message === "Already Liked.") {
          setSnackbarSeverity("warning");
          setSnackbarMessage(`Post already liked`);
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage(`Something went wrong.`);
        }
        setSnackbarOpen(true);
      }
    }
  }, [likeResponse]);

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
      setSnackbarSeverity("success");
      setSnackbarMessage(`Post saved`);
      setSnackbarOpen(true);
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
            <span>{post?.club[0]?.name}</span>
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
              <FaHeart />
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
              <FaBookmark />
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
