import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { LuCalendar } from "react-icons/lu";
import "./TrendingList.css";
import { useEffect, useState } from "react";
import { controller, getFeaturedEvents } from "../../services/APIConfig";

export default function TrendingListCollegeEvents() {
  const [trendingList, setTrendingList] = useState([]);
  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    getFeaturedEvents(setTrendingList);

    return () => {
      controller.abort();
      setTrendingList([]);
    };
  }, []);

  return (
    <div className="trending-cards-container">
      <div
        style={{
          backgroundColor: "#8fc8e8",
        }}
        className="title"
      >
        <span>
          <LuCalendar /> College Events
        </span>
      </div>
      {trendingList.length === 0 && (
        <div className="loading-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {trendingList
        .slice(0, viewMore ? trendingList.length : 3)
        .map((trendingListCollegeEvent) => (
          <>
            <div className="trending-card">
              <div className="logo">
                <img src={trendingListCollegeEvent.eventPoster} alt="logo" />
              </div>
              <div className="content">
                <span className="name text-crop-2">
                  {trendingListCollegeEvent.eventName}
                </span>
                <span className="subheading text-crop-2">
                  {trendingListCollegeEvent.description}
                </span>
              </div>
            </div>
            <hr />
          </>
        ))}
      {trendingList.length > 3 && !viewMore && (
        <div className="view-more">
          <button onClick={() => setViewMore(true)}>
            <BsChevronDown />
            View More
          </button>
        </div>
      )}
      {viewMore && (
        <div className="view-more">
          <button onClick={() => setViewMore(false)}>
            <BsChevronUp />
            View Less
          </button>
        </div>
      )}
    </div>
  );
}
