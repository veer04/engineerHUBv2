import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { BiPlayCircle } from "react-icons/bi";
import "./TrendingList.css";
import { Fragment, useEffect, useState } from "react";
import { controller, getEventByMode } from "../../services/APIConfig";
import { useNavigate } from "react-router-dom";
import defaultPoster from "../../assets/defaultPoster";

export default function TrendingListWorkshops() {
  const navigate = useNavigate();
  const [trendingList, setTrendingList] = useState([]);
  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("trendingWorkshops"))
      setTrendingList(JSON.parse(sessionStorage.getItem("trendingWorkshops")));
    else getEventByMode(setTrendingList, "Workshop");

    return () => {
      controller.abort();
      setTrendingList([]);
    };
  }, []);

  useEffect(() => {
    if (trendingList.length !== 0)
      sessionStorage.setItem("trendingWorkshops", JSON.stringify(trendingList));
  }, [trendingList]);

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
        .map((trending, index) => (
          <Fragment key={trending._id}>
            <div
              onClick={() => navigate(`/trending/workshops/${trending._id}`)}
              className="trending-card"
            >
              <div className="logo">
                <img
                  onError={(e) => {
                    e.target.src = defaultPoster;
                  }}
                  src={trending.eventPoster}
                  alt="logo"
                />
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
