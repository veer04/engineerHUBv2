import React, { useEffect, useState } from "react";
import "./BlogWindow.css";
import { RxCross1 } from "react-icons/rx";
import { getBlogById } from "../../services/APIConfig";

export default function BlogWindow({ projectOpened, setIsProjectOpen }) {
  const [blog, setBlog] = useState({});

  useEffect(() => {
    getBlogById(setBlog, projectOpened);
  }, [projectOpened]);

  console.log(blog.createdAt);
  const date = blog.createdAt ? new Date(blog.createdAt) : new Date();
  return (
    <div className="project__window">
      <div className="project__window__title blog__window__title">
        <div className="detail">
          <div className="title">{blog.title}</div>
        </div>
        <div onClick={() => setIsProjectOpen(false)} className="link">
          <RxCross1 />
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${blog.postIcon})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "15rem",
          backgroundColor: "var(--main-background-color)",
          border: "1px solid lightgrey",
          borderRadius: ".5rem",
        }}
        className="project_window__poster"
      ></div>
      <div className="project__window__description">
        {/* <div className="heading">Description</div> */}
        <div className="description">{blog.postArea}</div>
      </div>
      <div className="blog__window__details">
        <div className="author">
          by {blog.authorsName && blog.authorsName[0]}
        </div>
        <div className="date">
          {blog.createdAt &&
            new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(date)}
        </div>
      </div>
    </div>
  );
}
