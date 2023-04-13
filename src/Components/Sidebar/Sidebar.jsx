import React, { useState } from "react";
import "./Sidebar.css";
import SidebarItem from "./SidebarItem";
import { RiChat3Line } from "react-icons/ri";
import { CiViewList } from "react-icons/ci";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { TbFileText } from "react-icons/tb";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedItem, setSelectedItem] = useState(1);

  const items = [
    {
      id: 1,
      svg: <RiChat3Line />,
      title: "CHAT",
    },
    {
      id: 2,
      svg: <CiViewList />,
      title: "PROJECTS",
    },
    {
      id: 3,
      svg: <MdOutlineCalendarMonth />,
      title: "EVENTS",
    },
    {
      id: 4,
      svg: <TbFileText />,
      title: "BLOGS",
    },
  ];

  return (
    <div className={`sidebar ${isCollapsed && "sidebar--collapsed"}`}>
      <div
        className={`sidebar__main ${isCollapsed && "sidebar__main--collapsed"}`}
      >
        <div className="sidebar__header">{!isCollapsed && "DASHBOARD"}</div>
        <div className="sidebar__items">
          {items.map((item) => (
            <SidebarItem
              setSelectedItem={setSelectedItem}
              key={item.id}
              isCollapsed={isCollapsed}
              selectedItem={selectedItem}
              id={item.id}
              svg={item.svg}
              title={item.title}
            />
          ))}
        </div>
      </div>
      <div className="sidebar__collapse">
        <div
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="sidebar__collapse__arrow"
        >
          {!isCollapsed && (
            <svg
              width="10"
              height="18"
              viewBox="0 0 10 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 17L1 9L9 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}

          {isCollapsed && (
            <svg
              width="10"
              height="18"
              viewBox="0 0 10 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 0.999999L9 9L1 17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
