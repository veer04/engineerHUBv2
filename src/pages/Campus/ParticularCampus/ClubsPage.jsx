import React from "react";
import "./ClubsPage.css";
import SearchBar from "../../../components/SearchBar/SearchBar";

export default function TechnicalClubs() {
  const renderedSocietiesClubs = <>
    <h2 className="title">Societies/Clubs</h2>
    <div className="list">
      {}
    </div>
  </>;

  const renderedTrendingActivities = <>
    <h2 className="title">Trending Activities</h2>
    <div className="list">
      {}
    </div>
  </>;

  const renderedTrendingClubs = <>
    <h2 className="title">Trending Clubs</h2>
    <div className="list">
      {}
    </div>
  </>;

  return (
    <div className="clubs-page">
      <div className="search-bar__container">
        <SearchBar placeholder="Search for a club" type="text" />
      </div>
      <div className="content">
        <div className="column column1">{renderedSocietiesClubs}</div>
        <div className="column column2">{renderedTrendingActivities}</div>
        <div className="column column3">{renderedTrendingClubs}</div>
      </div>
    </div>
  );
}
