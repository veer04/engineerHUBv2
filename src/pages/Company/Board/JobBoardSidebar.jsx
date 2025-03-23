import React, { useEffect } from "react";
import "./JobBoardSidebar.css";
import {
  FiUsers,
  FiFileText,
  FiClipboard,
  FiUserCheck,
  FiUserPlus,
  FiMenu,
  FiArrowLeft,
} from "react-icons/fi";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getUserRole } from "../../../features/User/UserDetails";

export default function JobBoardSidebar({ isCollapsed, setIsCollapsed }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const userRole = getUserRole();

  // Handle escape key press to close sidebar on mobile
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && !isCollapsed && window.innerWidth <= 768) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isCollapsed, setIsCollapsed]);

  // Handle clicking outside the sidebar to close it on mobile
  const handleOverlayClick = () => {
    if (window.innerWidth <= 768) {
      setIsCollapsed(true);
    }
  };

  const menuItems = [
    {
      id: "job-response",
      title: "Job Response",
      icon: <FiUsers />,
      path: `/career/jobs/board/${id}`,
    },
    {
      id: "create-assessment",
      title: "Create Assessment",
      icon: <FiFileText />,
      path: `/career/jobs/assessment/create/${id}`,
    },
    {
      id: "assessment-response",
      title: "Assessment Response",
      icon: <FiClipboard />,
      path: `/career/jobs/assessment/responses/${id}`,
    },
    {
      id: "interview",
      title: "Interview",
      icon: <FiUserPlus />,
      path: `/career/jobs/assessment/Interview/${id}`,
    },
    {
      id: "hired-candidates",
      title: "Hired Candidates",
      icon: <FiUserCheck />,
      path: `/career/jobs/hired/${id}`,
    },
  ];

  return (
    <>
      {!isCollapsed && window.innerWidth <= 768 && (
        <div className="sidebar-overlay active" onClick={handleOverlayClick} />
      )}
      <div className={`job-board-sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          {!isCollapsed ? (
            <>
              <span className="header-title">Job Board</span>
              <button
                className="collapse-btn"
                onClick={() => setIsCollapsed(true)}
              >
                <FiArrowLeft />
              </button>
            </>
          ) : (
            <button
              className="sidebar-menu-toggle"
              onClick={() => setIsCollapsed(false)}
            >
              <FiMenu />
            </button>
          )}
        </div>
        <div className="sidebar-menu">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${
                location.pathname === item.path ? "selected" : ""
              }`}
              onClick={() => {
                navigate(item.path);
                if (window.innerWidth <= 768) {
                  setIsCollapsed(true);
                }
              }}
            >
              <span className="icon">{item.icon}</span>
              {!isCollapsed && <span className="title">{item.title}</span>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
