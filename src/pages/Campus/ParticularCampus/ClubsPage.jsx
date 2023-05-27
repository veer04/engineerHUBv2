import { useEffect, useState } from "react";
import "./ClubsPage.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ClubCard from "../../../components/ClubCard/ClubCard";
import ClubActivity from "../../../components/ClubActivity/ClubActivity";
import TrendingClubCard from "../../../components/TrendingClubCard/TrendingClubCard";
import {
  controller,
  getClubsByType,
  getTrendingActivities,
  getTrendingClubs,
} from "../../../services/APIConfig";
import { useParams } from "react-router-dom";
import defaultPoster from "../../../assets/defaultPoster";
import useNavbar from "../../../hooks/use-navbar";
import colorWheel from "../../../assets/colorWheel";

export default function ClubsPage({ type }) {
  const { setSelectedPageNavbar } = useNavbar();
  const [clubs, setClubs] = useState([]);
  const [trendingClubs, setTrendingClubs] = useState([]);
  const [trendingActivities, setTrendingActivities] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const { collegeId } = useParams();

  useEffect(() => {
    getTrendingClubs(setTrendingClubs);
    window.scroll(0, 0);
    setSelectedPageNavbar("campus");
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    getTrendingActivities(setTrendingActivities);

    return () => {
      window.removeEventListener("resize", handleResize);
      controller.abort();
    };
  }, []);

  useEffect(() => {
    getClubsByType(setClubs, type, collegeId);
    window.scrollTo(0, 0);

    return () => {
      controller.abort();
    };
  }, [type, collegeId]);

  const renderedSocietiesClubs = (
    <>
      <h2 className="title">Societies/Clubs</h2>
      <div className="list">
        {clubs.map((club) => {
          return <ClubCard key={club._id} {...club} />;
        })}
      </div>
    </>
  );

  const renderedTrendingActivities = (
    <>
      <h2 className="title">Trending Activities</h2>
      <div className="list">
        {trendingActivities.map((activity) => {
          return <ClubActivity key={activity._id} {...activity} />;
        })}
      </div>
    </>
  );

  const renderedTrendingClubs = (
    <>
      <h2 className="title">Trending Clubs</h2>
      <div className="list">
        {trendingClubs.map((club, index) => {
          return (
            <TrendingClubCard
              color={colorWheel[index % colorWheel.length]}
              key={club._id}
              {...club}
            />
          );
        })}
      </div>
    </>
  );

  const mobileRenderedTrendingClubs = (
    <>
      <h2 className="mobile-title">Trending Clubs</h2>
      <div className="mobile-list">
        {trendingClubs.map((club, index) => {
          return (
            <TrendingClubCard
              color={colorWheel[index % colorWheel.length]}
              key={club._id}
              {...club}
            />
          );
        })}
      </div>
    </>
  );

  return (
    <div className="clubs-page">
      {/* <div className="search-bar__container">
        <SearchBar placeholder="Search for a club" type="text" />
      </div> */}
      {width <= 1320 && mobileRenderedTrendingClubs}
      <div className="content">
        <div className="column column1">{renderedSocietiesClubs}</div>
        <div className="column column2">{renderedTrendingActivities}</div>
        {width > 1320 && (
          <div className="column column3">{renderedTrendingClubs}</div>
        )}
      </div>
    </div>
  );
}
