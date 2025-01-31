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
import { RWebShare } from "react-web-share";
import { Bucket_URL, FRONTEND_URL } from "../../services/APIUtils";

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
  const [isShownMore, setIsShownMore] = useState(false);
  const [localPost, setLocalPost] = useState(post);

  useEffect(() => {
    // console.log(followResponse);
    if (Object.keys(followResponse).length !== 0) {
      if (followResponse?.data?.success) {
        // updatePost(post._id);
        setSnackbarSeverity("success");
        setSnackbarMessage(`You are now following ${post?.creator?.name}`);
        setSnackbarOpen(true);
      } else {
        if (followResponse?.data?.message === "Already Followed.") {
          setSnackbarSeverity("warning");
          setSnackbarMessage(
            `You are already following ${post?.creator?.name}`
          );
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage(`Something went wrong.`);
        }
        setSnackbarOpen(true);
      }
    }
  }, [followResponse]);

  // useEffect(() => {
  //   if (Object.keys(likeResponse).length !== 0) {
  //     if (likeResponse?.data?.success) {
  //       updatePost(post._id);
  //     } else {
  //       setSnackbarSeverity("error");
  //       setSnackbarMessage(`Something went wrong.`);
  //       setSnackbarOpen(true);
  //     }
  //   }
  // }, [likeResponse]);

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
      return;
    }

    setLocalPost((prevPost) => {
      const isLiked = prevPost.isLike;
      return {
        ...prevPost,
        isLike: !isLiked,
        totalLikes: isLiked ? prevPost.totalLikes - 1 : prevPost.totalLikes + 1,
      };
    });

    if (localPost.isLike) {
      unLikePost(post._id, () => {}); // Call API but UI updates instantly
    } else {
      likePost(post._id, () => {}); // Call API but UI updates instantly
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

  useEffect(() => {
    console.log("Updated post:", post);
  }, [post]);

  return (
    <div className="post-card-container">
      <div className="header">
        <div className="details">
          <div className="logo">
            <img
              loading="lazy"
              src={
                post?.creator?.image
                  ? post?.creator?.image
                  : `${Bucket_URL}UserViewDashboard/profile_follow.png`
              }
              alt="logo"
            />
          </div>
          <div className="name">
            <span
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(
                  `/profile/${post?.creatorRole?.toLowerCase()}/${
                    post.creatorId
                  }`
                )
              }
              className="text-crop-1"
            >
              {post?.creator?.name ||
                `${post?.creator?.firstName} ${post?.creator?.lastName}`}
            </span>
          </div>
        </div>
        {/* <div className="follow-btn">
          {!(isLoggedIn && post?.isFollow) && (
            <button
              onClick={() => handleFollow(post?.creator?.name, post?.creatorId)}
            >
              Follow
            </button>
          )}
        </div> */}
      </div>
      <div className="post-image-container">
        <img src={post?.postLogo} alt="" />
      </div>
      <div className="impressions-container">
        <div className="left">
          <div className="heart" onClick={handleLike}>
            {!(isLoggedIn && localPost.isLike) ? (
              <FaRegHeart style={{ cursor: "pointer" }} />
            ) : (
              <FaHeart style={{ color: "red", cursor: "pointer" }} />
            )}
          </div>
          <div className="share">
            <RWebShare
              data={{
                text: `Check out this post`,
                url: `${FRONTEND_URL}profile/club/${post?.creatorId}/posts/${post?._id}`,
                title: "Check out this post at engineerHUB",
              }}
            >
              <FiShare2 />
            </RWebShare>
          </div>
        </div>
        {/* <div className="right">
          <div className="save">
            {!(isLoggedIn && post?.isSaved) ? (
              <FaRegBookmark onClick={() => handleSave()} />
            ) : (
              <FaBookmark
                style={{ color: "grey" }}
                onClick={() => handleSave()}
              />
            )}
          </div>
        </div> */}
      </div>
      <div className="likes">
        <span>{localPost.totalLikes} likes</span>
      </div>
      <span
        style={{
          cursor: "default",
          wordBreak: "break-word",
        }}
        className={`caption ${isShownMore ? "no-text-crop" : "text-crop-1"} `}
      >
        {post.description}
      </span>
      {!!post.description && !isShownMore && (
        <div
          style={{ fontSize: ".75rem", cursor: "pointer" }}
          onClick={() => setIsShownMore(true)}
          className="see-more"
        >
          See More
        </div>
      )}
    </div>
  );
}
