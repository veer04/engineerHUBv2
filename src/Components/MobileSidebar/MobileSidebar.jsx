import React from "react";
import "./MobileSidebar.css";
import { RiChat3Line } from "react-icons/ri";
import { CiViewList } from "react-icons/ci";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { TbFileText } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";

export default function MobileSidebar({ path }) {
  const { id } = useParams();

  return (
    <div className="mobile-sidebar">
      <Link to={`/community/chat/${id}`}>
        <div className={`${path === "chat" ? "is-active" : ""}`}>
          <RiChat3Line className="svg" />
          Chat
        </div>
      </Link>
      <Link to={`/community/projects/${id}`}>
        <div className={`${path === "projects" ? "is-active" : ""}`}>
          <CiViewList className="svg" />
          Projects
        </div>
      </Link>
      <Link to={`/community/events/${id}`}>
        <div className={`${path === "events" ? "is-active" : ""}`}>
          <MdOutlineCalendarMonth className="svg" />
          Events
        </div>
      </Link>
      <Link to={`/community/blogs/${id}`}>
        <div className={`${path === "blogs" ? "is-active" : ""}`}>
          <TbFileText className="svg" />
          Blogs
        </div>
      </Link>
    </div>
  );
}
