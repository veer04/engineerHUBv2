import React from "react";
import "./PostModal.css";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { controller, getPostById } from "../../services/APIConfig";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import { RWebShare } from "react-web-share";
import { FRONTEND_URL } from "../../services/APIUtils";

export default function PostModal() {
  const { postId, collegeId, clubId } = useParams();

  const [post, setPost] = useState(
    sessionStorage.getItem(`post details ${postId}`)
      ? JSON.parse(sessionStorage.getItem(`post details ${postId}`))
      : {}
  );
  const [isLiked, setIsLiked] = useState(
    sessionStorage.getItem(`${postId} isLiked`) !== null
      ? JSON.parse(sessionStorage.getItem(`${postId} isLiked`))
      : false
  );
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
    getPostById(setPost, postId);

    return () => {
      controller.abort();
    };
  }, [postId]);

  useEffect(() => {
    sessionStorage.setItem(`post details ${postId}`, JSON.stringify(post));
  }, [post]);

  return ReactDOM.createPortal(
    <div
      style={{
        top: getScrollPosition().top,
        left: getScrollPosition().left,
      }}
      id="post-modal-container"
    >
      {post.description ? (
        <div className="post-container">
          <div
            style={{
              backgroundImage: `url(${post.postLogo})`,
            }}
            className="post-image"
          ></div>
          <div className="post-details-container">
            <div className="club-details">
              <div
                style={{
                  backgroundImage: `url(${post.clubId.image})`,
                }}
                className="club-logo"
              ></div>
              <div className="club-name text-crop-1">{post.clubId.name}</div>
            </div>
            <div className="description">{post.description}</div>
            <div className="options-container">
              <div className="likes">
                Liked by {isLiked ? post.likes + 1 : post.likes}
              </div>
              <div className="options">
                <div
                  onClick={() => {
                    const currentStatus = isLiked;
                    setIsLiked(!currentStatus);
                    sessionStorage.setItem(
                      `${postId} isLiked`,
                      JSON.stringify(!currentStatus)
                    );
                  }}
                  style={{
                    backgroundColor: isLiked ? "#fec2cb" : "",
                  }}
                  className="like"
                >
                  <FaRegHeart />
                </div>
                <RWebShare
                  data={{
                    text: `Check out this post`,
                    url: `${FRONTEND_URL}campus/${collegeId}/technical-clubs/${clubId}/posts/${postId}`,
                    title: "Check out this post at engineerHUB",
                  }}
                >
                  <div className="share">
                    <GrShareOption />
                  </div>
                </RWebShare>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>,
    document.querySelector("#post-modal")
  );
}
