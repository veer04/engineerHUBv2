import React from "react";
import "./BlogCard.css";
import { IoPeopleOutline } from "react-icons/io5";

export default function BlogCard({
  postIcon,
  authorsName,
  _id,
  title,
  postArea,
  domainName,
  setProjectOpened,
  setIsProjectOpen,
  createdAt,
}) {
  console.log();

  return (
    <div
      onClick={() => {
        setProjectOpened(_id), setIsProjectOpen(true);
      }}
      className="project__list__item blog__list__item"
    >
      {
        <div
          style={{
            width: "100%",
            height: "12rem",
            backgroundImage: `url(${postIcon})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundColor: "var(--primary-color-green)",
          }}
          className="poster"
        ></div>
      }
      <div className="sub-title">
        <div className="author">by {authorsName[0]}</div>
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
