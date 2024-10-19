import TrendingListCollegeEvents from "../../components/TrendingList/TrendingListCollegeEvents";
import TrendingListWorkshops from "../../components/TrendingList/TrendingListWorkshops";
import TrendingListColleges from "../../components/TrendingList/TrendingListColleges";
import TrendingListClubs from "../../components/TrendingList/TrendingListClubs";
import TrendingListAlumni from "../../components/TrendingList/TrendingListAlumni";
import TrendingPostCard from "../../components/TrendingPostCard/TrendingPostCard";
import CampusSearchBox from "../../components/CampusSearchBox/CampusSearchBox";
import { Fragment, useEffect, useState } from "react";
import { FiHome } from "react-icons/fi";
import { LuCalendar } from "react-icons/lu";
import { BiPlayCircle } from "react-icons/bi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { RiChat3Line } from "react-icons/ri";
import { CiViewList } from "react-icons/ci";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { TbFileText } from "react-icons/tb";

import {
  getAllCampuses,
  getEventByMode,
  getFeaturedEvents,
  getPostByIdPrivateMode,
  getTrendingActivities,
  getTrendingActivitiesInPrivateMode,
} from "../../services/APIConfig";
import { useNavigate } from "react-router";
import "./NewCampusPage.css";
import { isUserLoggedIn } from "../../features/User/UserDetails";
import { set } from "react-hook-form";
import NewEventCard from "../../components/NewEventCard/NewEventCard";
import { useScrollDirection } from "../../features/scrollDirection";

export default function NewCampusPage() {
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [choice, setChoice] = useState(1);
  const [isSticky, setIsSticky] = useState(false);
  const [isStickySide, setIsStickySide] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [allCampuses, setAllCampuses] = useState([]);
  const [output, setOutput] = useState("");
  const isLoggedIn = isUserLoggedIn();
  const [trendingEvents, setTrendingEvents] = useState([]);
  const [trendingWorkshops, setTrendingWorkshops] = useState([]);

  useEffect(() => {
    document.title = `Campus | engineerHUB`;
    window.scrollTo(0, 0);
    getAllCampuses(setAllCampuses);
    if (!isLoggedIn) getTrendingActivities(setTrendingPosts);
    else getTrendingActivitiesInPrivateMode(setTrendingPosts);
    getFeaturedEvents(setTrendingEvents);
    getEventByMode(setTrendingWorkshops, "Workshop");

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollDistance = window.scrollY;
      const triggerPoint = 132; // The point where you want the sub navbar to stick

      // Check if scrolling down and past the trigger point
      if (scrollDistance > triggerPoint && prevScrollPos < scrollDistance) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Update the previous scroll position
      setPrevScrollPos(scrollDistance);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    if (width > 910) {
      setChoice(1);
    }
  }, [width]);

  useEffect(() => {
    if (output) {
      navigate(`/campus/search/${output}`);
    }
  }, [output]);

  const [updatedPost, setUpdatedPost] = useState({});

  useEffect(() => {
    // console.log(updatedPost);
    if (Object.keys(updatedPost).length !== 0) {
      const index = trendingPosts.findIndex(
        (post) => post._id === updatedPost.data.data._id
      );
      if (index !== -1) {
        const newTrendingPosts = [...trendingPosts];
        newTrendingPosts[index] = updatedPost.data.data;
        setTrendingPosts(newTrendingPosts);
      }
    }
  }, [updatedPost]);

  function updatePost(postId) {
    getPostByIdPrivateMode(setUpdatedPost, postId);
  }

  const renderTrendingPosts = trendingPosts.map((post, index) => (
    <Fragment key={post._id}>
      <TrendingPostCard post={post} updatePost={updatePost} />
      {index >= 1 && (index + 1) % 6 === 0 && (
        <>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8474972598474156"
            crossOrigin="anonymous"
          ></script>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-format="fluid"
            data-ad-layout-key="-6t+ed+2i-1n-4w"
            data-ad-client="ca-pub-8474972598474156"
            data-ad-slot="1548911694"
          ></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </>
      )}
    </Fragment>
  ));

  const renderTrendingEventsMobile = trendingEvents.map((event) => (
    <NewEventCard key={event._id} data={event} />
  ));

  const renderTrendingWorkshopsMobile = trendingWorkshops.map((event) => (
    <NewEventCard key={event._id} data={event} />
  ));

  return (
    <main className="campus-page">
      <h1 className="heading-3">Campus</h1>
      <h2 className="subheading-1">
        What's happening inside is no more hidden now !
        <strong> Explore--Network--Participate--Host</strong>
      </h2>
      <div className="search-bar__container">
        <div>
          <CampusSearchBox
            data={allCampuses}
            placeholder="Search any Campus, Clubs or Alumni"
            searchParams={["collegeName"]}
            listLength={4}
            setOutput={setOutput}
          />
        </div>
      </div>
      {width < 910 && (
        <div
          style={{
            height: useScrollDirection() === "down" ? 0 : "66.55px",
            transition: "height 0.2s ease-in-out",
            padding:
              useScrollDirection() === "down" ? "0 .5rem" : "0.75rem 0.5rem",
          }}
          id="campus-sidebar-mobile"
          className="options"
        >
          <div
            style={{
              color: choice === 1 ? "#FFD600" : "#b0b0b0",
            }}
            onClick={() => setChoice(1)}
            className="option"
          >
            <FiHome />
            <span
              style={{
                fontWeight: choice === 1 ? "600" : "400",
              }}
            >
              Feed
            </span>
          </div>
          <div
            style={{
              color: choice === 2 ? "#FFD600" : "#b0b0b0",
            }}
            onClick={() => setChoice(2)}
            className="option"
          >
            <LuCalendar />
            <span
              style={{
                fontWeight: choice === 2 ? "600" : "400",
              }}
            >
              Events
            </span>
          </div>
          <div
            style={{
              color: choice === 3 ? "#FFD600" : "#b0b0b0",
            }}
            onClick={() => setChoice(3)}
            className="option"
          >
            <BiPlayCircle />
            <span
              style={{
                fontWeight: choice === 3 ? "600" : "400",
              }}
            >
              Workshops
            </span>
          </div>
          <div
            style={{
              color: choice === 4 ? "#FFD600" : "#b0b0b0",
            }}
            onClick={() => setChoice(4)}
            className="option"
          >
            <FaArrowTrendUp />
            <span
              style={{
                fontWeight: choice === 4 ? "600" : "400",
              }}
            >
              Trending
            </span>
          </div>
        </div>
      )}
      <div className={`campus-page-container ${isStickySide ? "sticky" : ""}`}>
        <section
          className={`column column-1 ${
            isStickySide && scrollDirection === "down" ? "sticky" : ""
          }`}
        >
          <TrendingListCollegeEvents />
          <TrendingListWorkshops />
          {width <= 1320 && (
            <>
              <TrendingListColleges />
              <TrendingListClubs />
              <TrendingListAlumni />
            </>
          )}
        </section>
        <section
          className={`column column-2 ${isStickySide ? "scrollable" : ""}`}
        >
          {choice === 1 && renderTrendingPosts}
          {choice === 2 && width < 910 && renderTrendingEventsMobile}
          {choice === 2 && width >= 910 && <TrendingListCollegeEvents />}
          {choice === 3 && width < 910 && renderTrendingWorkshopsMobile}
          {choice === 3 && width >= 910 && <TrendingListWorkshops />}
          {choice === 4 && (
            <>
              <TrendingListColleges />
              <TrendingListClubs />
              <TrendingListAlumni />
            </>
          )}
        </section>
        <section
          className={`column column-3 ${
            isStickySide && scrollDirection === "down" ? "sticky" : ""
          }`}
        >
          <TrendingListColleges />
          <TrendingListClubs />
          <TrendingListAlumni />
        </section>
      </div>
    </main>
  );
}
