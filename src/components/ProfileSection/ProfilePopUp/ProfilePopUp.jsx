import { useEffect, useState } from "react";
import "./ProfilePopUp.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { RiSuitcase2Line } from "react-icons/ri";
import { FaBlogger } from "react-icons/fa";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { AiOutlineFile } from "react-icons/ai";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdEmojiEvents } from "react-icons/md";
import { MdCastForEducation } from "react-icons/md";
import BookIcon from "@mui/icons-material/Book";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { HiOutlineLightningBolt } from "react-icons/hi";
import {
  getUserFullName,
  getUserId,
  getUserImage,
  getUserRole,
  isUserLoggedIn,
} from "../../../features/User/UserDetails";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../../../features/logout";
import { CgLogOut } from "react-icons/cg";
import { HashLink } from "react-router-hash-link";

export default function ProfilePopUp() {
  if (!isUserLoggedIn()) {
    return null;
  }
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  let role = getUserRole();
  if (role === "Alumni") role = "User";
  const userFullName = getUserFullName();
  const userImage = getUserImage();
  const [profileProgress, setProfileProgress] = useState(75);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= profileProgress ? profileProgress : prevProgress + 2
      );
    }, 60);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const promotionalSvg = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23 6L13.5 15.5L8.5 10.5L1 18"
        stroke="#8A9DA3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 6H23V12"
        stroke="#8A9DA3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const studentMenuItems = [
    {
      label: "Internship",
      icon: <HiOutlineSquares2X2 />,
      link: "/company/internships",
    },
    {
      label: "Jobs",
      icon: <RiSuitcase2Line />,
      link: "/company/jobs",
    },
    {
      label: "Projects",
      icon: <AiOutlineCalendar />,
      link: "/company/projects",
    },
    {
      label: "Blogs",
      icon: <FaBlogger />,
      link: "/community/blogs/Data%20Structures%20%26%20Algorithms",
    },

    {
      label: "Events",
      icon: <MdEmojiEvents />,
      link: "/campus/intra-college",
    },
    {
      label: "Workshops",
      icon: <MdCastForEducation />,
      link: "/campus/workshop",
    },
  ];
  const companyMenuItems = [
    {
      label: "Create Jobs",
      icon: <RiSuitcase2Line />,
      link: "/host/job",
    },
    {
      label: "Create Internships",
      icon: <HiOutlineSquares2X2 />,
      link: "/host/internship",
    },
    {
      label: "Create Hackathons",
      icon: <AiOutlineFile />,
      link: "/host/event",
    },
    {
      label: "Create Projects",
      icon: <AiOutlineCalendar />,
      link: "/host/project",
    },
  ];

  const clubMenuItems = [
    {
      label: "Upload",
      icon: <RiSuitcase2Line />,
      link: "/under-maintenance",
    },
    {
      label: "Get Sponsor",
      icon: <HiOutlineSquares2X2 />,
      link: "/under-maintenance",
    },
    {
      label: "Advertise your Club",
      icon: <AiOutlineFile />,
      link: "/under-maintenance",
    },
    {
      label: "Create Projects",
      icon: <AiOutlineCalendar />,
      link: "/under-maintenance",
    },
  ];

  const clubPromotionalList = [
    {
      label: "Clubs",
      icon: promotionalSvg,
      link: "/under-maintenance",
      tag: "Trending",
    },
    {
      label: "Colleges",
      icon: promotionalSvg,
      link: "/under-maintenance",
      tag: "Trending",
    },
    {
      label: "Almas",
      icon: promotionalSvg,
      link: "/under-maintenance",
      tag: "Trending",
    },
  ];

  const renderStudentMenuItems = studentMenuItems.map((item, index) => {
    return (
      <button
        key={index}
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        className="item"
        onClick={() => {
          navigate(item.link);
        }}
      >
        <div className="icon">{item.icon}</div>
        <div className="label">{item.label}</div>
      </button>
    );
  });

  const renderAlumniMenuItems = <div>Alumni Menu Items</div>;

  const renderClubMenuItems = clubMenuItems.map((item, index) => (
    <button
      key={index}
      data-bs-dismiss="offcanvas"
      aria-label="Close"
      className="item"
      onClick={() => {
        navigate(item.link);
      }}
    >
      <div className="icon">{item.icon}</div>
      <div className="label">{item.label}</div>
    </button>
  ));

  const renderCompanyMenuItems = companyMenuItems.map((item, index) => (
    <button
      key={index}
      data-bs-dismiss="offcanvas"
      aria-label="Close"
      className="item"
      onClick={() => {
        navigate(item.link);
      }}
    >
      <div className="icon">{item.icon}</div>
      <div className="label">{item.label}</div>
    </button>
  ));

  const renderClubPromotionalContent = (
    <div className="promotion">
      <div className="items-list">
        {clubPromotionalList.map((item, index) => (
          <button
            key={index}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            className="item"
            onClick={() => {
              navigate(item.link);
            }}
          >
            <div className="icon">{item.icon}</div>
            <div className="label">{item.label}</div>
            <div className="tag">{item.tag}</div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderCompanyPromotionalContent = (
    <div className="promotion">
      <HashLink
        to={`/profile/organization/${getUserId()}/#sponsor`}
        className="item"
      >
        <button
          // onClick={() => {
          //   navigate("/under-maintenance");
          // }}
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          className="company-ad"
        >
          <div className="icon">
            <HiOutlineLightningBolt />
          </div>
          <div className="label">Boost your company profile</div>
        </button>
      </HashLink>
    </div>
  );

  return (
    // I named it as "profile-menu" because we already have a old component named "profile"
    <aside
      className="profile-menu offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="header">
        <h1>Profile</h1>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="user-details">
        <div className="profile-picture">
          {/* <Box                      // !To be used later, do not delete
            sx={{
              position: "relative",
              display: "inline-flex",
              width: "5rem",
              height: "5rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              className="progress-bar"
              sx={{
                color: "rgba(8, 224, 69, 1)",
              }}
              variant="determinate"
              value={progress}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            > */}
          <img className="image" src={userImage} alt="Profile Picture" />
          {/* </Box>
          </Box>
          <div className="progress-counter">{`${progress}%`}</div> */}
        </div>
        <div className="personal-details">
          <div className="name">{userFullName}</div>
          {/* <div className="sub-name">Software Development</div> */}
        </div>
      </div>
      <button
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        className="show-profile-btn redirect-btn"
        onClick={() => {
          navigate(`/profile/${role.toLowerCase()}/${getUserId()}`);
        }}
      >
        {`${profileProgress < 100 ? "Complete Profile" : "View Profile"}`}
      </button>
      <div className="divider"></div>
      {/* Main Content */}
      <div className="items-list">
        {role === "User" && renderStudentMenuItems}
        {role === "Alumni" && renderAlumniMenuItems}
        {role === "Club" && renderClubMenuItems}
        {role === "Organization" && renderCompanyMenuItems}
      </div>
      {/* Promotional Content */}
      {role === "Organization" && renderCompanyPromotionalContent}
      {role === "Club" && renderClubPromotionalContent}
      {/* <Link
        to={`/profile/${role.toLowerCase()}/${getUserId()}/#recent-activities`}
      > */}
      <HashLink
        to={`/profile/${role.toLowerCase()}/${getUserId()}/#recent-activities`}
      >
        <button
          style={{
            minHeight: "3.8125rem",
            borderRadius: "0.3125rem",
          }}
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          className="recent-activities-btn redirect-btn"
        >
          Recent Activities
        </button>
      </HashLink>
      <button
        style={{
          width: "100%",
          minHeight: "3.8125rem",
          display: "flex",
          alignItems: "center",
          padding: "0 1.69rem",
          borderRadius: "0.3125rem",
          fontWeight: "500",
          borderWidth: "1px",
          gap: "0.125rem",
          justifyContent: "center",
          borderColor: "#ff0000",
          marginTop: "1rem",
        }}
        onClick={() => handleLogout()}
        className="logout-button"
      >
        <CgLogOut /> <span>Logout</span>
      </button>
      {/* </Link> */}
    </aside>
  );
}
