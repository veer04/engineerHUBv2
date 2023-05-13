import React, { useEffect, useState } from "react";
import "./BlogWindow.css";
import { RxCross1 } from "react-icons/rx";
import { GiCancel} from "react-icons/gi"
import { getBlogById } from "../../services/APIConfig";
import useSidebar from "../../hooks/use-sidebar";
import Cancel from "./cancel.svg";

export default function BlogWindow({ blogOpened, setIsBlogOpen }) {
  const [blog, setBlog] = useState({});
  const { isCollapsed } = useSidebar();

  useEffect(() => {
    if (isCollapsed === false) setIsBlogOpen(false);
  }, [isCollapsed]);
  useEffect(() => {
    console.log(blogOpened);
    getBlogById(setBlog, blogOpened);
  }, [blogOpened]);
  useEffect(() => {
    console.log(blog);
  }, [blog]);
//a
  const date = blog.createdAt ? new Date(blog.createdAt) : new Date();
  return (
    <div className="project__window">
      <div className="project__window__title blog__window__title">
        <div className="detail">
          <div className="title">{blog.title}</div>
        </div>
        <div onClick={() => setIsBlogOpen(false)} className="link">
          <RxCross1/>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${blog.postIcon})`,
          backgroundSize: "cover",
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
        <div className="description">{blog.postArea}</div>
      </div>
      <div className="blog__window__details">
        {blog.creator && (
          <div className="author">{`by ${blog.creator[0].name}`}</div>
        )}
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
