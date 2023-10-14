import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { BiPlayCircle } from "react-icons/bi";
import "./TrendingList.css";
import { Fragment, useEffect, useState } from "react";
import { controller, getEventByMode } from "../../services/APIConfig";

export default function TrendingListWorkshops() {
  const [trendingList, setTrendingList] = useState([]);
  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    getEventByMode(setTrendingList, "Workshop");

    return () => {
      controller.abort();
      setTrendingList([]);
    };
  }, []);

  return (
    <div className="trending-cards-container">
      <div
        style={{
          backgroundColor: "#F7D77F",
        }}
        className="title"
      >
        <span>
          <BiPlayCircle /> Workshops
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
        .map((trending) => (
          <Fragment key={trending._id}>
            <div className="trending-card">
              <div className="logo">
                <img src={trending.eventPoster} alt="logo" />
              </div>
              <div className="content">
                <span className="name text-crop-2">{trending.eventName}</span>
                <span className="subheading text-crop-2">
                  {trending.description}
                </span>
              </div>
            </div>
            <hr />
          </Fragment>
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
