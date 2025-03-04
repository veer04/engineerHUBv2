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
import {
  ApplicationManageIcon,
  AtsScoreIcon,
  BlogIcon,
  Card1ImageSvgProfileSidebar,
  Card2ImageSvgProfileSidebar,
  Card3ImageSvgProfileSidebar,
  DividerCompMain,
  ForHeadingComp,
  HackathonIcon,
  JobIcon,
  LogoutbtnIcon,
  NoteIcon,
  QuerybtnIcon,
  ResumeWritingIcon,
  WebinarIcon,
} from "../../SvgsIconsComps/SvgsComps";
import NewProfileConnectCard from "./NewProfileConnectCard";
import BelowHostComponent from "./BelowHostComponent";

export default function ProfilePopUp() {
  if (!isUserLoggedIn()) {
    return null;
  }
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  let role = getUserRole();
  // if (role === "Alumni") role = "User";
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
      label: "Jobs",
      icon: <JobIcon />,
      link: "/career/jobs?pageNo=1&limit=24",
    },
    {
      label: "Blogs",
      icon: <BlogIcon />,
      link: "/community/blogs/Data%20Structures%20%26%20Algorithms",
    },

    {
      label: "Notes",
      icon: <NoteIcon />,
      link: "/community/blogs/Data%20Structures%20%26%20Algorithms",
    },
    // {
    //   label: "Projects",
    //   icon: <AiOutlineCalendar />,
    //   link: "/career/projects",
    // },
    {
      label: "Internships",
      icon: <JobIcon />,
      link: "/career/internships?pageNo=1&limit=24",
    },

    {
      label: "Hackathons",
      icon: <HackathonIcon />,
      link: "/campus",
    },

    // {
    //   label: "Events",
    //   icon: <MdEmojiEvents />,
    //   link: "/campus",
    // },
    // {
    //   label: "Workshops",
    //   icon: <MdCastForEducation />,
    //   link: "/campus",
    // },
  ];

  const alumniHostPagesMenus = [
    {
      label: "Jobs",
      icon: <JobIcon />,
      link: "/career/jobs?pageNo=1&limit=24",
    },

    {
      label: "Internships",
      icon: <JobIcon />,
      link: "/career/internships?pageNo=1&limit=24",
    },

    {
      label: "Hackathons",
      icon: <HackathonIcon />,
      link: "/campus",
    },

    {
      label: "Host Webinar",
      icon: <WebinarIcon />,
      link: "/host/webinar",
    },
  ];

  const userCulturalAndTechnicalMenu = [
    {
      label: "Cultural Event",
      icon: <WebinarIcon />,
      link: "/host/cultural-event",
    },

    {
      label: "Technical Event",
      icon: <WebinarIcon />,
      link: "/host/technical-event",
    },
  ];

  const companyMenuItems = [
    {
      label: "Host Jobs",
      icon: <JobIcon />,
      link: "/host/job",
    },
    {
      label: "Host Webinar",
      icon: <WebinarIcon />,
      link: "/host/webinar",
    },
    {
      label: "Host Internships",
      icon: <JobIcon />,
      link: "/host/internship",
    },
    {
      label: "Host Hackathons",
      icon: <JobIcon />,
      link: "/host/hackathon",
    },
    {
      label: "Manage Applications",
      icon: <ApplicationManageIcon />,
      link: "/host/hackathon",
    },
    // {
    //   label: "Create Projects",
    //   icon: <AiOutlineCalendar />,
    //   link: "/host/project",
    // },
  ];

  const clubMenuItems = [
    {
      label: "Upload",
      icon: <RiSuitcase2Line />,
      link: "/host",
    },
    {
      label: "Get Sponsor",
      icon: <HiOutlineSquares2X2 />,
      link: "/under-maintenance",
    },
    {
      label: "Advertise your Club",
      icon: <AiOutlineFile />,
      link: "/get-featured",
    },
    {
      label: "Create Projects",
      icon: <AiOutlineCalendar />,
      link: "/host/project",
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

  const renderAlumniMenuItems = studentMenuItems.map((item, index) => {
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

  const renderHostPages = alumniHostPagesMenus.map((item, index) => {
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

  const renderTechnicalAndCulturalMenu = userCulturalAndTechnicalMenu.map(
    (item, index) => {
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
    }
  );

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

  const renderConnectWithUsHiringProcess = (
    <>
      <div style={{ marginBottom: 20 }}>
        <NewProfileConnectCard
          image={<Card1ImageSvgProfileSidebar />}
          bgColor={"#f7d77f"}
          title={
            <>
              Connect with us for <br />
              hiring process!
            </>
          }
          btnName={"Connect Now"}
          btnLink={`/employer`}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <NewProfileConnectCard
          image={<Card2ImageSvgProfileSidebar />}
          bgColor={"#e8ba98"}
          title={
            <>
              Share stories, job updates <br />& events
            </>
          }
          btnName={"Create Post"}
          btnLink={`/host`}
        />
      </div>
    </>
  );

  const renderLetTheCommunityKnow = (
    <div style={{ marginBottom: 10 }}>
      <NewProfileConnectCard
        image={<Card3ImageSvgProfileSidebar />}
        bgColor={"#8fc8e8"}
        title={
          <>
            Let the community know <br />
            what’s happening!
          </>
        }
        btnName={"Create Post"}
        btnLink={`/host`}
      />
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
          <h3
            style={{
              color: "#547178",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "20px",
            }}
          >
            {role}
          </h3>

          <div
            className="edit-profile-div"
            onClick={() => {
              const profileRoute =
                role === "User" || role === "Alumni"
                  ? "user"
                  : role.toLowerCase();
              navigate(`/profile/${profileRoute}/${getUserId()}`);
            }}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <div>
              <h3
                style={{
                  color: "#138382",
                  fontSize: 14,
                  fontWeight: 700,
                  lineHeight: "16px",
                  marginBottom: 0,
                  cursor: "pointer",
                }}
              >
                Edit Profile
              </h3>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 9 14"
              fill="none"
            >
              <path
                d="M1.71094 13L7.71094 7L1.71094 1"
                stroke="#128381"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          {/* <div className="sub-name">Software Development</div> */}
        </div>
      </div>
      <button
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        className="show-profile-btn redirect-btn"
        onClick={() => {
          const profileRoute =
            role === "User" || role === "Alumni" ? "user" : role.toLowerCase();
          navigate(`/profile/${profileRoute}/${getUserId()}`);
        }}
      >
        {`${profileProgress < 100 ? "Open Dashboard" : "View Dashboard"}`}
      </button>
      <DividerCompMain />

      {/* Main Content */}

      <ForHeadingComp title={"For You"} />
      <div className="items-list">
        {role === "User" && renderStudentMenuItems}
        {role === "Alumni" && renderAlumniMenuItems}
        {role === "Club" && renderClubMenuItems}
        {role === "Organization" && renderCompanyMenuItems}
      </div>
      {/* Promotional Content */}
      {/* {role === "Organization" && renderCompanyPromotionalContent} */}
      {role === "Alumni" && renderLetTheCommunityKnow}
      {role === "Organization" && renderConnectWithUsHiringProcess}
      {role === "Club" && renderClubPromotionalContent}

      <DividerCompMain />

      {role === "Alumni" && (
        <>
          <ForHeadingComp title={"Host"} />
          <div className="items-list">
            {role === "Alumni" && renderHostPages}
          </div>
          <DividerCompMain />
          <ForHeadingComp title={"1:1 Connect"} />

          <BelowHostComponent
            icon={<ResumeWritingIcon />}
            btnText={"Resume Writing"}
            btnLink={"/referrals"}
            tagBgColor={"#8FC8E826"}
            tagText={"Popular"}
            borderColor={"#8fc8e8"}
          />

          <BelowHostComponent
            icon={<ResumeWritingIcon />}
            btnText={"Referrals in MNC’s"}
            btnLink={"/referrals"}
            tagBgColor={"#B2E88726"}
            tagText={"Price Drop"}
            borderColor={"#B2E887"}
          />
          <DividerCompMain />

          <ForHeadingComp title={"Digital Products"} />

          <BelowHostComponent
            icon={<AtsScoreIcon />}
            btnText={"94% ATS Resume"}
            btnLink={"/referrals"}
            tagBgColor={"#8FC8E826"}
            tagText={"Popular"}
            borderColor={"#8fc8e8"}
          />

          <BelowHostComponent
            icon={<AtsScoreIcon />}
            btnText={"Complete DSA"}
            btnLink={"/referrals"}
            tagBgColor={"#E8BA981F"}
            tagText={"New"}
            borderColor={"#E8BA98"}
          />
          <DividerCompMain />
        </>
      )}

      {role === "User" && (
        <>
          <ForHeadingComp title={"Host"} />
          <div className="items-list">{renderTechnicalAndCulturalMenu}</div>
          <DividerCompMain />
          <ForHeadingComp title={"1:1 Connect"} />

          <BelowHostComponent
            icon={<ResumeWritingIcon />}
            btnText={"Resume Writing"}
            btnLink={"/referrals"}
            tagBgColor={"#8FC8E826"}
            tagText={"Popular"}
            borderColor={"#8fc8e8"}
          />

          <BelowHostComponent
            icon={<ResumeWritingIcon />}
            btnText={"Referrals in MNC’s"}
            btnLink={"/referrals"}
            tagBgColor={"#B2E88726"}
            tagText={"Price Drop"}
            borderColor={"#B2E887"}
          />
          <DividerCompMain />

          <ForHeadingComp title={"Digital Products"} />

          <BelowHostComponent
            icon={<AtsScoreIcon />}
            btnText={"94% ATS Resume"}
            btnLink={"/referrals"}
            tagBgColor={"#8FC8E826"}
            tagText={"Popular"}
            borderColor={"#8fc8e8"}
          />

          <BelowHostComponent
            icon={<AtsScoreIcon />}
            btnText={"Complete DSA"}
            btnLink={"/referrals"}
            tagBgColor={"#E8BA981F"}
            tagText={"New"}
            borderColor={"#E8BA98"}
          />
          <DividerCompMain />
        </>
      )}

      {/* <Link
        to={`/profile/${role.toLowerCase()}/${getUserId()}/#recent-activities`}
      > */}

      <div className="logout-main-div">
        <div className="btn-div-logout">
          <button className="log-btn" onClick={() => handleLogout()}>
            <LogoutbtnIcon />
            Logout
          </button>
        </div>

        <div className="query-btn-div">
          <button
            className="quer-btn"
            onClick={() =>
              (window.location.href = "mailto:info@engineerhub.in")
            }
          >
            <QuerybtnIcon />
            Raise Query
          </button>
        </div>
      </div>

      {/* <HashLink
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
      </button> */}
      {/* </Link> */}
    </aside>
  );
}
