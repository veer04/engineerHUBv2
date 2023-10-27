import "./TrendingPostCard.css";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { isUserLoggedIn } from "../../features/User/UserDetails";
import useGlobalSnackbar from "../../hooks/useGlobalSnackbar";

export default function TrendingPostCard({ post }) {
  const isLoggedIn = isUserLoggedIn();
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } =
    useGlobalSnackbar();
    

  function handleFollow(clubName) {
    if (!isLoggedIn) {
      setSnackbarSeverity("error");
      setSnackbarMessage("You need to login to follow a club");
      setSnackbarOpen(true);
    } else {
      setSnackbarSeverity("success");
      setSnackbarMessage(`You are now following ${clubName}`);
      setSnackbarOpen(true);

    }
  }

  function handleLike() {
    if (!isLoggedIn) {
      setSnackbarSeverity("error");
      setSnackbarMessage("You need to login to like a post");
      setSnackbarOpen(true);
    } else {
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
            <img loading="lazy" src={post?.clubData[0]?.image} alt="logo" />
          </div>
          <div className="name">
            <span>{post?.clubData[0]?.name}</span>
          </div>
        </div>
        <div className="follow-btn">
          <button onClick={() => handleFollow(post?.clubData[0]?.name)}>
            Follow
          </button>
        </div>
      </div>
      <div className="post-image-container">
        <img src={post?.postLogo} alt="" />
      </div>
      <div className="impressions-container">
        <div className="left">
          <div className="heart">
            <FaRegHeart onClick={() => handleLike()} />
            {/* <FaHeart /> */}
          </div>
          <div className="share">
            <FiShare2 onClick={() => handleShare()}/>
          </div>
        </div>
        <div className="right">
          <div className="save">
            <FaRegBookmark onClick={() => handleSave()} />
            {/* <FaBookmark /> */}
          </div>
        </div>
      </div>
      <div className="likes">
        <span>{post.likes} likes</span>
      </div>
      <span className={`caption ${`text-crop-1`}`}>{post.description}</span>
    </div>
  );
}
