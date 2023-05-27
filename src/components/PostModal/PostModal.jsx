import React from "react";
import "./PostModal.css";
import { MdCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  controller,
  getParticularEvent,
  getPostById,
} from "../../services/APIConfig";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";

export default function PostModal({ handleClose, setShowModal }) {
  const { postId } = useParams();
  const [post, setPost] = useState(
    sessionStorage.getItem(`post details ${postId}`)
      ? JSON.parse(sessionStorage.getItem(`post details ${postId}`))
      : {}
  );
  const navigate = useNavigate();
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
    <div id="post-modal-container">
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
            <div className="likes">Liked by {post.likes}</div>
            <div className="options">
              <div className="like">
                <FaRegHeart />
              </div>
              <div className="share">
                <GrShareOption />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {event.eventName ? (
        <></>
      ) : (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )} */}
    </div>,
    document.querySelector("#post-modal")
  );
}
