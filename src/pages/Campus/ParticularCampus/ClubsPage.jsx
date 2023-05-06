import { useEffect, useState } from "react";
import "./ClubsPage.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ClubCard from "../../../components/ClubCard/ClubCard";
import ClubActivity from "../../../components/ClubActivity/ClubActivity";
import TrendingClubCard from "../../../components/TrendingClubCard/TrendingClubCard";
import {
  controller,
  getClubsByType,
  getTrendingClubs,
} from "../../../services/APIConfig";
import { useParams } from "react-router-dom";
import defaultPoster from "../../../assets/defaultPoster";

export default function ClubsPage({ type }) {
  const activities = [
    {
      _id: 1,
      postedBy: "GeeksForGeeks",
      logo: defaultPoster,
      poster: defaultPoster,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus assumenda beatae quae aliquid, ducimus sunt saepe accusamus, quod ea facere nesciunt molestias tempore quibusdam vel molestiae rem explicabo quam. Doloremque temporibus quod architecto esse minus nihil ut exercitationem pariatur magni!",
      shareLink: "https://www.google.com",
    },
    {
      _id: 2,
      postedBy: "GeeksForGeeks",
      logo: defaultPoster,
      poster: defaultPoster,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus assumenda beatae quae aliquid, ducimus sunt saepe accusamus, quod ea facere nesciunt molestias tempore quibusdam vel molestiae rem explicabo quam. Doloremque temporibus quod architecto esse minus nihil ut exercitationem pariatur magni!",
      shareLink: "https://www.google.com",
    },
    {
      _id: 3,
      postedBy: "GeeksForGeeks",
      logo: defaultPoster,
      poster: defaultPoster,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus assumenda beatae quae aliquid, ducimus sunt saepe accusamus, quod ea facere nesciunt molestias tempore quibusdam vel molestiae rem explicabo quam. Doloremque temporibus quod architecto esse minus nihil ut exercitationem pariatur magni!",
      shareLink: "https://www.google.com",
    },
    {
      _id: 4,
      postedBy: "GeeksForGeeks",
      logo: defaultPoster,
      poster: defaultPoster,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus assumenda beatae quae aliquid, ducimus sunt saepe accusamus, quod ea facere nesciunt molestias tempore quibusdam vel molestiae rem explicabo quam. Doloremque temporibus quod architecto esse minus nihil ut exercitationem pariatur magni!",
      shareLink: "https://www.google.com",
    },
  ];

  const [trendingClubs, setTrendingClubs] = useState([]);

  const [width, setWidth] = useState(window.innerWidth);

  const { collegeId } = useParams();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    getClubsByType(setClubs, type, collegeId);
    window.scrollTo(0, 0);

    return () => {
      controller.abort();
    };
  }, [type, collegeId]);

  useEffect(() => {
    getTrendingClubs(setTrendingClubs);
    window.scroll(0, 0);

    return () => {
      controller.abort();
    };
  }, []);

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
        {activities.map((activity) => {
          return <ClubActivity key={activity._id} {...activity} />;
        })}
      </div>
    </>
  );

  const renderedTrendingClubs = (
    <>
      <h2 className="title">Trending Clubs</h2>
      <div className="list">
        {trendingClubs.map((club) => {
          return <TrendingClubCard key={club._id} {...club} />;
        })}
      </div>
    </>
  );

  const mobileRenderedTrendingClubs = (
    <>
      <h2 className="mobile-title">Trending Clubs</h2>
      <div className="mobile-list">
        {trendingClubs.map((club) => {
          return <TrendingClubCard key={club._id} {...club} />;
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
