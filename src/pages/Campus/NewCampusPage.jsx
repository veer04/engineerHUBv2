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
  getTrendingActivities,
} from "../../services/APIConfig";
import { useNavigate } from "react-router";
import "./NewCampusPage.css";

export default function NewCampusPage() {
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [choice, setChoice] = useState(1);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [allCampuses, setAllCampuses] = useState([]);
  const [output, setOutput] = useState("");

  useEffect(() => {
    getAllCampuses(setAllCampuses);
    getTrendingActivities(setTrendingPosts);

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   console.log(trendingPosts);
  // }, [trendingPosts]);

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

  const renderTrendingPosts = trendingPosts.map((post) => (
    <TrendingPostCard key={post._id} post={post} />
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
            placeholder="You are looking for which Campus?"
            searchParams={["collegeName"]}
            listLength={4}
            setOutput={setOutput}
          />
        </div>
      </div>
      {width <= 910 && (
        <div className="mobile-campus-subnavbar">
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
            <span className="title">Almas</span>
          </div>
        </div>
      )}
      <div className="campus-page-container">
        <section className="column column-1 ">
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
        <section className="column column-2">
          {choice === 1 && renderTrendingPosts}
          {choice === 2 && <TrendingListCollegeEvents />}
          {choice === 3 && <TrendingListWorkshops />}
          {choice === 4 && (
            <>
              <TrendingListColleges />
              <TrendingListClubs />
              <TrendingListAlumni />
            </>
          )}
        </section>
        <section className="column column-3">
          <TrendingListColleges />
          <TrendingListClubs />
          <TrendingListAlumni />
        </section>
      </div>
    </main>
  );
}
