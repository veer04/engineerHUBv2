import React from "react";
import "./BlogCard.css";
import { useNavigate, useParams } from "react-router-dom";
import { IoPeopleOutline } from "react-icons/io5";
import useSidebar from "../../hooks/use-sidebar";
import defaultPoster from "../../assets/defaultPoster";
import { useEffect } from "react";

export default function BlogCard({
  postIcon,
  creatorId,
  _id,
  title,
  postArea,
  domainName,
  setBlogOpened,
  setIsBlogOpen,
  createdAt,
}) {
  const navigate = useNavigate();
  const { id, blogId } = useParams();
  const { setIsCollapsed } = useSidebar();
  // useEffect(() => {
  //   document.getElementById(`blog-card-description-${_id}`).innerHTML =
  //     postArea.slice(0,120);
  // }, [postArea]);

  return (
    <div
      onClick={() => {
        navigate(`/community/blogs/${id}/${blogId}`);
      }}
      className="project__list__item blog__list__item card-hover"
    >
      {
        <div
          style={{
            width: "100%",
            height: "12rem",
            backgroundImage: `url(${postIcon ? postIcon : defaultPoster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgb(238,255,255)",
            backgroundRepeat: "no-repeat",
          }}
          className="poster"
        ></div>
      }
      <div className="sub-title">
        <div className="date">
          {createdAt &&
            new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(createdAt ? new Date(createdAt) : new Date())}
        </div>
      </div>
      <div className="title text-crop-2">{title}</div>
      <div className="description">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </div>
      <div className="row">
        <div className="col-2">
          <img src="" alt="" />
        </div>
        <div className="col-1"></div>
        <div className="col-8">
          Created By
          <div
            className="author "
            style={{
              fontSize: "1.1rem",
              fontWeight: "500",
            }}
          >
            {!!creatorId?.name ? `by ${creatorId?.name}` : "@engineerHUB"}
          </div>
        </div>
      </div>
      {/* <div className="topic">{domainName}</div> */}
    </div>
  );
}
