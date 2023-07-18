import React from "react";
import "./MobileSidebar.css";
import { RiChat3Line } from "react-icons/ri";
import { CiViewList } from "react-icons/ci";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { TbFileText } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import useSidebar from "../../hooks/use-sidebar";
import getCookie, { getAccessToken } from "../../features/getCookieValues";

export default function MobileSidebar({ path }) {
  const { id } = useParams();
  const { isCollapsed, setIsCollapsed, selectedItem, setSelectedItem } =
    useSidebar();
  const isClubOrOrganisation = !getAccessToken()
    ? false
    : getCookie("role")[2] === "Club" ||
      getCookie("role")[2] === "Organization";

  return (
    <div className="mobile-sidebar">
      {!isClubOrOrganisation && (
        <Link
          onClick={() => setSelectedItem("chat")}
          to={`/community/chat/${encodeURIComponent(id)}`}
        >
          <div className={`${path === "chat" ? "is-active" : ""}`}>
            <RiChat3Line className="svg" />
            Chat
          </div>
        </Link>
      )}
      <Link
        onClick={() => setSelectedItem("projects")}
        to={`/community/projects/${encodeURIComponent(id)}`}
      >
        <div className={`${path === "projects" ? "is-active" : ""}`}>
          <CiViewList className="svg" />
          Projects
        </div>
      </Link>
      <Link
        onClick={() => setSelectedItem("events")}
        to={`/community/events/${encodeURIComponent(id)}`}
      >
        <div className={`${path === "events" ? "is-active" : ""}`}>
          <MdOutlineCalendarMonth className="svg" />
          Events
        </div>
      </Link>
      <Link
        onClick={() => setSelectedItem("blogs")}
        to={`/community/blogs/${encodeURIComponent(id)}`}
      >
        <div className={`${path === "blogs" ? "is-active" : ""}`}>
          <TbFileText className="svg" />
          Blogs
        </div>
      </Link>
    </div>
  );
}
