import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaArrowTrendUp } from "react-icons/fa6";
import defaultPoster from "../../assets/defaultPoster";
import "./TrendingList.css";
import { useEffect, useState } from "react";
import { controller } from "../../services/APIConfig";

export default function TrendingListAlmas() {
  //   const [trendingList, setTrendingList] = useState([]);
  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    // call fetch api here

    return () => {
      controller.abort();
    };
  }, []);

  const trendingList = [
    {
      id: 1,
      name: "Bharati Vidyapeeth College of Engineering, Deemed to be University Navi Mumbai",
      subheading:
        "UI Designer at engineerHUB | Madan Mohan Malvi UI Designer at engineerHUB | Madan Mohan Malvi UI Designer at engineerHUB | Madan Mohan Malvi",
      logo: defaultPoster,
    },
    {
      id: 2,
      name: "Bharati Vidyapeeth College of Engineering, Deemed to be University Navi Mumbai",
      subheading:
        "UI Designer at engineerHUB | Madan Mohan Malvi UI Designer at engineerHUB | Madan Mohan Malvi UI Designer at engineerHUB | Madan Mohan Malvi",
      logo: defaultPoster,
    },
    {
      id: 3,
      name: "Bharati Vidyapeeth College of Engineering, Deemed to be University Navi Mumbai",
      subheading:
        "UI Designer at engineerHUB | Madan Mohan Malvi UI Designer at engineerHUB | Madan Mohan Malvi UI Designer at engineerHUB | Madan Mohan Malvi",
      logo: defaultPoster,
    },
    {
      id: 4,
      name: "Bharati Vidyapeeth College of Engineering, Deemed to be University Navi Mumbai",
      subheading:
        "UI Designer at engineerHUB | Madan Mohan Malvi UI Designer at engineerHUB | Madan Mohan Malvi UI Designer at engineerHUB | Madan Mohan Malvi",
      logo: defaultPoster,
    },
    {
      id: 5,
      name: "Bharati Vidyapeeth College of Engineering, Deemed to be University Navi Mumbai",
      subheading:
        "UI Designer at engineerHUB | Madan Mohan Malvi UI Designer at engineerHUB | Madan Mohan Malvi UI Designer at engineerHUB | Madan Mohan Malvi",
      logo: defaultPoster,
    },
  ];

  return (
    <div className="trending-cards-container">
      <div
        style={{
          backgroundColor: "#F7D77F",
        }}
        className="title"
      >
        <span>
          <FaArrowTrendUp /> Trending Almas
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
                <img src={trendingListCollegeEvent.logo} alt="logo" />
              </div>
              <div className="content">
                <span className="name text-crop-2">
                  {trendingListCollegeEvent.name}
                </span>
                <span className="subheading text-crop-2">
                  {trendingListCollegeEvent.subheading}
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
