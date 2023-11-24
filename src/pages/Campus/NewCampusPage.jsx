import TrendingListCollegeEvents from "../../components/TrendingList/TrendingListCollegeEvents";
import TrendingListWorkshops from "../../components/TrendingList/TrendingListWorkshops";
import TrendingListColleges from "../../components/TrendingList/TrendingListColleges";
import TrendingListClubs from "../../components/TrendingList/TrendingListClubs";
import TrendingListAlumni from "../../components/TrendingList/TrendingListAlumni";
import TrendingPostCard from "../../components/TrendingPostCard/TrendingPostCard";
import CampusSearchBox from "../../components/CampusSearchBox/CampusSearchBox";
import { useEffect, useState } from "react";
import { FiHome } from "react-icons/fi";
import { LuCalendar } from "react-icons/lu";
import { BiPlayCircle } from "react-icons/bi";
import { FaArrowTrendUp } from "react-icons/fa6";
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
    window.scrollTo(0, 0);
    if (sessionStorage.getItem("allCampuses"))
      setAllCampuses(JSON.parse(sessionStorage.getItem("allCampuses")));
    else getAllCampuses(setAllCampuses);
    if (!isLoggedIn) getTrendingActivities(setTrendingPosts);
    else getTrendingActivitiesInPrivateMode(setTrendingPosts);
    getFeaturedEvents(setTrendingEvents);
    getEventByMode(setTrendingWorkshops, "Workshop");

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (allCampuses.length !== 0)
      sessionStorage.setItem("allCampuses", JSON.stringify(allCampuses));
  }, [allCampuses]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollDistance = window.scrollY;
  //     const triggerPoint = 132; // The point where you want the sub navbar to stick

  //     // Check if scrolling down and past the trigger point
  //     if (scrollDistance > triggerPoint && prevScrollPos < scrollDistance) {
  //       setIsSticky(true);
  //     } else {
  //       setIsSticky(false);
  //     }

  //     // Update the previous scroll position
  //     setPrevScrollPos(scrollDistance);
  //   };

  // Attach the event listener when the component mounts
  // window.addEventListener('scroll', handleScroll);

  // Detach the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [prevScrollPos]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollDistance = window.scrollY;
  //     const triggerPoint = 200; // The point where you want the second column to start scrolling

  //     // Check if scrolling down or up
  //     const direction = scrollDistance > triggerPoint ? 'down' : 'up';

  //     // Update the scroll direction
  //     setScrollDirection(direction);

  //     // Check if the second column should be sticky
  //     setIsStickySide(scrollDistance > triggerPoint);
  //   };

  //   // Attach the event listener when the component mounts
  //   window.addEventListener('scroll', handleScroll);

  //   // Detach the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

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

  const renderTrendingPosts = trendingPosts.map((post) => (
    <TrendingPostCard key={post._id} post={post} updatePost={updatePost} />
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
        <div style={{ zIndex: "2" }} className="mobile-campus-subnavbar">
          <div
            className={
              isSticky
                ? "mobile-campus-subnavbar sticky"
                : "mobile-campus-subnavbar"
            }
          >
            <div
              style={{
                color: choice === 1 ? "#FFD600" : "#b0b0b0",
              }}
              className="option"
              onClick={() => setChoice(1)}
            >
              <span className="icon">
                <FiHome />
              </span>
              <span className="title">Feed</span>
            </div>
            <div
              style={{
                color: choice === 2 ? "#FFD600" : "#b0b0b0",
              }}
              className="option"
              onClick={() => setChoice(2)}
            >
              <span className="icon">
                <LuCalendar />
              </span>
              <span className="title">Events</span>
            </div>
            <div
              style={{
                color: choice === 3 ? "#FFD600" : "#b0b0b0",
              }}
              className="option"
              onClick={() => setChoice(3)}
            >
              <span className="icon">
                <BiPlayCircle />
              </span>
              <span className="title">Workshops</span>
            </div>
            <div
              style={{
                color: choice === 4 ? "#FFD600" : "#b0b0b0",
              }}
              className="option"
              onClick={() => setChoice(4)}
            >
              <span className="icon">
                <FaArrowTrendUp />
              </span>
              <span className="title">Trending</span>
            </div>
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
