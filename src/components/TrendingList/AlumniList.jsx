import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaArrowTrendUp } from "react-icons/fa6";
import "./TrendingList.css";
import { Fragment, useEffect, useState } from "react";
import { controller, getTrendingAlumni } from "../../services/APIConfig";
import { useNavigate } from "react-router-dom";
import defaultPoster from "../../assets/defaultPoster";

export default function AlumniList({ data }) {
  const navigate = useNavigate();
  const [trendingList, setTrendingList] = useState(data || []);
  const [viewMore, setViewMore] = useState(false);

  // useEffect(() => {
  //   getTrendingAlumni(setTrendingList);

  //   return () => {
  //     controller.abort();
  //     setTrendingList([]);
  //   };
  // }, []);

  return (
    <div className="trending-cards-container">
      <div
        style={{
          backgroundColor: "#F7D77F",
        }}
        className="title"
      >
        <span>Alumni</span>
      </div>
      {trendingList?.length === 0 && (
        <div className="loading-container">
          <span>No Alumni found</span>
        </div>
      )}
      {trendingList
        ?.slice(0, viewMore ? trendingList?.length : 3)
        .map((trending, index) => (
          <Fragment key={trending._id}>
            <div
              onClick={() => navigate(`/profile/user/${trending._id}`)}
              className="trending-card"
            >
              <div className="logo">
                <img
                  onError={(e) => {
                    e.target.src = defaultPoster;
                  }}
                  src={trending.image}
                  alt="logo"
                />
              </div>
              <div className="content">
                <span className="name text-crop-2">
                  {trending?.name
                    ? trending?.name
                    : `${trending.firstName} ${trending.lastName}`}
                </span>
                <span className="subheading text-crop-2">
                  {trending?.experience &&
                    (!!Object.keys(trending?.experience).length
                      ? `${trending?.experience?.designation} | ${trending?.experience?.organisationName}`
                      : "")}
                </span>
              </div>
            </div>
            <hr />
          </Fragment>
        ))}
      {trendingList?.length > 3 && !viewMore && (
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
