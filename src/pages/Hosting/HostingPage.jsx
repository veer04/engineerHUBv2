import { useEffect, useState } from "react";
import "./HostingPage.css";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdArrowForward } from "react-icons/io";
import { Bucket_URL } from "../../services/APIUtils";
import useNavbar from "../../hooks/use-navbar";
import { getUserRole, isUserLoggedIn } from "../../features/User/UserDetails";
import { redirectToAuth } from "../../features/redirectToAuth";
import useGlobalSnackbar from "../../hooks/useGlobalSnackbar";
import AddPostModal from "../../components/Dashboard/AddPostModal";
import InfoModal from "./InfoModal";
import { FaArrowRight } from "react-icons/fa";
export default function HostingPage() {
  const { setSelectedPageNavbar } = useNavbar();
  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();
  const [showPostModal, setShowPostModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Host an Opportunity | engineerHUB";
    setSelectedPageNavbar("host");
  }, []);

  const navigate = useNavigate();
  const bucket = `${Bucket_URL}frontend/hosting/`;

  function handleCreatePost() {
    if (!isUserLoggedIn()) {
      redirectToAuth("/login");
      return;
    }
    if (getUserRole() === "User") {
      setShowInfoModal(true);
      return;
    }
    setShowPostModal(true);
  }

  function handleNavigation(path) {
    if (!isUserLoggedIn()) {
      redirectToAuth("/login", `/host/${path}`);
      return;
    }

    if (getUserRole() === "User" || getUserRole() === "Club") {
      if (
        path === "cultural-event" ||
        path === "technical-event" ||
        path === "hackathon" ||
        path === "webinar"
      ) {
        navigate(`${path}`);
        return;
      } else {
        setSnackbarMessage(
          `You are not authorized to host ${
            path === "job" || path === "project" ? "a" : "an"
          } ${path}`
        );
        setSnackbarSeverity("error");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
        return;
      }
    }

    navigate(`${path}`);
  }

  const HOSTING_ITEMS_1 = [
    {
      id: 1,
      heading: "Jobs",
      subHeading: "Create Jobs",
      description:
        "Unlock career opportunities! Connect young talent with exciting professionals.",
      image: "job-poster-small.png",
      onClick: () => handleNavigation("job"),
    },
    {
      id: 2,
      heading: "Internships",
      subHeading: "Create Internships",
      description:
        "Engage with aspiring talent. Showcase internship opportunities on our platform.",
      image: "internship-poster-small.png",
      onClick: () => handleNavigation("internship"),
    },
    // {
    //   id: 3,
    //   heading: "Projects",
    //   subHeading: "Create Projects",
    //   description:
    //     "Collaborate, innovate, and showcase your skills by working on impactful projects.",
    //   image: "project-poster-small.png",
    //   onClick: () => handleNavigation("project"),
    // },
    {
      id: 4,
      heading: "Event Hiring",
      subHeading: "Hire Talent",
      description:
        "Find the perfect talent for your events with our Event Hiring!.",
      image: "event-hiring-poster-small.png",
      onClick: () => handleNavigation("event-hiring"),
    },
  ];

  const HOSTING_ITEMS_2 = [
    {
      id: 1,
      heading: "Cultural Event",
      subHeading: "Create Cultural Event",
      description:
        "Host cultural events, unleash creativity and celebrate uniqueness with us.",
      image: "cultural-event-poster-small.png",
      onClick: () => handleNavigation("cultural-event"),
    },
    {
      id: 2,
      heading: "Technical Event",
      subHeading: "Create Technical Event",
      description:
        "Bring innovation to the forefront by hosting technical events on our platform.",
      image: "technical-event-poster-small.png",
      onClick: () => handleNavigation("technical-event"),
    },
    {
      id: 3,
      heading: "Hackathon",
      subHeading: "Create Hackathon",
      description:
        "Organize hackathons, where minds converge to solve real-world challenges.",
      image: "hackathon-poster-small.png",
      onClick: () => handleNavigation("hackathon"),
    },
    {
      id: 4,
      heading: "Webinar",
      subHeading: "Create Webinar",
      description:
        "Organize webinars, where industry experts and thought leaders converge.",
      image: "webinar-poster-small.png",
      onClick: () => handleNavigation("webinar"),
    },
  ];

  return (
    <>
      <main className="hosting-page">
        <section className="header">
          <div className="left">
            <h1>
              Create post as a
              <div className="animation">
                <div className="first">
                  <div>Alma</div>
                </div>
                <div className="second">
                  <div>Club</div>
                </div>
                <div className="third">
                  <div>Company</div>
                </div>
              </div>
            </h1>
            <h2>
              Share event updates, posts, competitions and your experience with
              us!
            </h2>
            <div className="button-box">
              <button onClick={() => handleCreatePost()}>
                <AiOutlinePlus />
                Create post
              </button>
              <button className="feed" onClick={() => navigate("/campus")}>
                Explore Feed <FaArrowRight />
              </button>
            </div>
            {showPostModal && (
              <AddPostModal hostPage={true} setCloseModal={setShowPostModal} />
            )}
            {showInfoModal && <InfoModal setState={setShowInfoModal} />}
          </div>
          <video
            src={`${bucket}host-page-animation.mp4`}
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </section>
        <section className="tiles-container">
          <h3>Hire Talent</h3>
          <div className="tiles">
            {HOSTING_ITEMS_1.map((item) => (
              <article key={item.id} onClick={item.onClick} className="tile">
                <img src={`${bucket}${item.image}`} alt="job-hosting-poster" />
                <span className="heading">{item.heading}</span>
                <span className="sub-heading">
                  {item.subHeading}
                  <IoMdArrowForward />
                </span>
                <span className="description">{item.description}</span>
              </article>
            ))}
          </div>
        </section>
        <section className="tiles-container">
          <h3 id="create-events">Create Events</h3>
          <div className="tiles">
            {HOSTING_ITEMS_2.map((item) => (
              <article key={item.id} onClick={item.onClick} className="tile">
                <img src={`${bucket}${item.image}`} alt="job-hosting-poster" />
                <span className="heading">{item.heading}</span>
                <span className="sub-heading">
                  {item.subHeading}
                  <IoMdArrowForward />
                </span>
                <span className="description">{item.description}</span>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
