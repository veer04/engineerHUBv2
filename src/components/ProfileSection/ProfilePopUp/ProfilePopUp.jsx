import { useEffect, useState } from "react";
import "./ProfilePopUp.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { RiSuitcase2Line } from "react-icons/ri";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { AiOutlineFile } from "react-icons/ai";
import { AiOutlineCalendar } from "react-icons/ai";
import { HiOutlineLightningBolt } from "react-icons/hi";
import {
  getUserFullName,
  getUserId,
  getUserImage,
  getUserRole,
} from "../../../features/User/UserDetails";
import { useNavigate } from "react-router-dom";

export default function ProfilePopUp() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const role = getUserRole();
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
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17 6H23V12"
        stroke="#8A9DA3"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
  const studentMenuItems = [
    {
      label:"Internship",
      icon: <HiOutlineSquares2X2 />,
      link:"/internship",
    },
    {
      label:"Jobs",
      icon: <RiSuitcase2Line />,
      link:"/jobs",
    },
    {
    label:"Projects",
    icon: <AiOutlineCalendar />,
    link:"/projects",

    }, 
    // {
    //   label:"Blogs",
    //   icon: "",
    //   link:"",
  
    //   },
      
      // {
      //   label:"Events",
      //   icon: "",
      //   link:"",
    
      //   },
      //  {
      //     label:"Webinars",
      //     icon: "",
      //     link:"",
      
      //     }
  ]
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
      link: "/hostevent",
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

  const renderStudentMenuItems = studentMenuItems.map((item,index)=>{
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
      <button
        onClick={() => {
          navigate("/under-maintenance");
        }}
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        className="company-ad"
      >
        <div className="icon">
          <HiOutlineLightningBolt />
        </div>
        <div className="label">Boost your company profile</div>
      </button>
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
          <Box
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
            >
              <img className="image" src={userImage}
               alt="Profile Picture" />
            </Box>
          </Box>
          <div className="progress-counter">{`${progress}%`}</div>
        </div>
        <div className="personal-details">
          <div className="name">{userFullName}</div>
          <div className="sub-name">Software Development</div>
        </div>
      </div>
      <button
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        className="show-profile-btn redirect-btn"
        onClick={() => {
        
       
            navigate(`/profile/${role}/${getUserId()}`);
          
          
        }}
      >
        {`${profileProgress < 100 ? "Complete Profile" : "View Profile"}`}
      </button>
      <div className="divider"></div>
      {/* Main Content */}
      <div className="items-list">
        {role === "user" && renderStudentMenuItems}
        {role === "Alumni" && renderAlumniMenuItems}
        {role === "Club" && renderClubMenuItems}
        {role === "Organization" && renderCompanyMenuItems}
      </div>
      {/* Promotional Content */}
      {role === "Organization" && renderCompanyPromotionalContent}
      {role === "Club" && renderClubPromotionalContent}
      <button
        onClick={() => {
          navigate("/under-maintenance");
        }}
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        className="recent-activities-btn redirect-btn"
      >
        Recent Activities
      </button>
    </aside>
  );
}
