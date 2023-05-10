import React from "react";
import "./BlogCard.css";
import { IoPeopleOutline } from "react-icons/io5";
import useSidebar from "../../hooks/use-sidebar";
import defaultPoster from "../../assets/defaultPoster";

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
  console.log();
  const { setIsCollapsed } = useSidebar();

  return (
    <div
      onClick={() => {
        console.log(_id);
        setBlogOpened(_id);
        setIsBlogOpen(true);
        setIsCollapsed(true);
      }}
      className="project__list__item blog__list__item"
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
        <div className="author">{`by ${creatorId.name}`}</div>
        <div className="date">
          {createdAt &&
            new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(createdAt ? new Date(createdAt) : new Date())}
        </div>
      </div>
      <div className="title">{title}</div>
      <div className="description">{postArea}</div>
      <div className="topic">{domainName}</div>
    </div>
  );
}
