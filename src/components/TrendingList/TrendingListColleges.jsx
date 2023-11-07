import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaArrowTrendUp } from "react-icons/fa6";
import "./TrendingList.css";
import { Fragment, useEffect, useState } from "react";
import { controller, getTrendingCampuses } from "../../services/APIConfig";
import { useNavigate } from "react-router-dom";

export default function TrendingListColleges() {
  const navigate = useNavigate();
  const [trendingList, setTrendingList] = useState([]);
  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    getTrendingCampuses(setTrendingList);

    return () => {
      controller.abort();
      setTrendingList([]);
    };
  }, []);

  return (
    <div className="trending-cards-container">
      <div
        style={{
          backgroundColor: "#B2E887",
        }}
        className="title"
      >
        <span>
          <FaArrowTrendUp /> Trending Colleges
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
              onClick={() => navigate(`/trending/campuses/${trending._id}`)}
              className="trending-card"
            >
              <div className="logo">
                <img src={trending.collegeLogo} alt="logo" />
              </div>
              <div className="content">
                <span className="name text-crop-2">{trending.collegeName}</span>
                <span className="subheading text-crop-2">
                  {`${trending.city}, ${trending.state}`}
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
