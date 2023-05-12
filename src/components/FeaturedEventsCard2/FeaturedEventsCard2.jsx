import React, { useEffect, useState } from "react";
import "./FeaturedEventsCard2.css";

export default function FeaturedEventsCard2({
  eventPoster,
  eventName,
  description,
  hashtags,
  stars,
  views,
  eventDate,
  color,
}) {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: color,
      }}
      className="featured-events-card2"
    >
      <div>
        <div
          style={{
            backgroundImage: `url(${eventPoster})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            borderRadius: "0.5rem",
            overflow: "hidden",
          }}
          className="poster"
        ></div>
      </div>
      <div className="content">
        <div className="title">{eventName}</div>
        <div className="description">{description}</div>
        <div className="hashtags">
          {hashtags &&
            hashtags.map((hashtag) => (
              <div key={hashtag.name} className="hashtag">
                #{hashtag.name}
              </div>
            ))}
        </div>
        <div className="stats">
          <div className="stars">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 1L11.472 5.93691L17 6.73344L13 10.5741L13.944 16L9 13.4369L4.056 16L5 10.5741L1 6.73344L6.528 5.93691L9 1Z"
                stroke="#002B36"
                strokeOpacity="0.94"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {stars}
          </div>
          <svg
            width="2"
            height="27"
            viewBox="0 0 2 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="2" height="27" fill="#EDEDED" />
          </svg>

          <div className="views">
            <svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 10C11.1046 10 12 9.10457 12 8C12 6.89543 11.1046 6 10 6C8.89543 6 8 6.89543 8 8C8 9.10457 8.89543 10 10 10Z"
                stroke="#002B36"
                strokeOpacity="0.94"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 8C1 8 4.27273 1 10 1C15.7273 1 19 8 19 8C19 8 15.7273 15 10 15C4.27273 15 1 8 1 8Z"
                stroke="#002B36"
                strokeOpacity="0.94"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {views} Views
          </div>
          <svg
            width="2"
            height="27"
            viewBox="0 0 2 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="2" height="27" fill="#EDEDED" />
          </svg>

          <div className="time">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 4V7.75L10 9"
                stroke="#002B36"
                strokeOpacity="0.94"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 14C11.0899 14 14 11.0899 14 7.5C14 3.91015 11.0899 1 7.5 1C3.91015 1 1 3.91015 1 7.5C1 11.0899 3.91015 14 7.5 14Z"
                stroke="#002B36"
                strokeOpacity="0.94"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {eventDate} Days Left
          </div>
        </div>
      </div>
    </div>
  );
}
