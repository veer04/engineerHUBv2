import React, { useEffect, useState } from "react";
import "./FeaturedEvents.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { getAllEvents, controller } from "../../services/APIConfig";
import defaultPoster from "../../assets/defaultPoster";
import { Bucket_URL } from "../../services/APIUtils";

export default function FeaturedEvents() {
  const [events, setEvents] = useState([]);
  const bucket = `${Bucket_URL}frontend/homepage/featuredevents/`;
  const headingImage1 = `${bucket}featuredEventsHeadingImage1.png`;
  const headingImage2 = `${bucket}featuredEventsHeadingImage2.png`;
  const colorCycle = [
    "rgb(255,203,165,.9)  /* #ffcba5 */",
    "rgb(156,219,255,.9) /*#9cdbff*/",
    "rgb(195,255,147,.9)  /* #c3ff93 */",
  ];

  useEffect(() => {
    getAllEvents(setEvents);
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const autoScroller = setInterval(() => {
      const cards = document.querySelector(".events-section-cards");
      cards.scrollLeft += 320;
    }, 5000);
    return () => {
      clearInterval(autoScroller);
    };
  }, []);

  const scrollLeft = () => {
    const cards = document.querySelector(".events-section-cards");
    cards.scrollLeft -= 320;
  };
  const scrollRight = () => {
    const cards = document.querySelector(".events-section-cards");
    cards.scrollLeft += 320;
  };
  const renderedEvents =
    events.length > 0
      ? events.slice(0, 6).map((event, index) => {
          return (
            <div
              key={event._id}
              style={{
                backgroundImage: `url(${
                  event.eventPoster ? event.eventPoster : defaultPoster
                })`,
              }}
              className="events-section-card-bg"
            >
              <div
                style={{
                  backgroundColor: colorCycle[index % colorCycle.length],
                }}
                className="events-section-card-content"
              >
                <h3 className="events-section-card-heading">
                  {event.eventName}
                </h3>
                <h4 className="events-section-card-subheading">
                  {event.description}
                </h4>
              </div>
            </div>
          );
        })
      : "";
  const marquee = (image) => {
    return (
      <div
        className="events-section-marquee"
        style={{
          backgroundImage: `url(${image})`,
          height: "4.7rem",
          minHeight: "4.7rem",
          maxHeight: "4.7rem",
          width: "100%",
          backgroundSize: "contain",
          backgroundRepeat: "repeat-x",
          backgroundPositionY: "center",
          margin: ".5rem 0",
        }}
      ></div>
    );
  };

  return (
    <div className="events-section-container">
      {marquee(headingImage1)}
      <div className="events-section-content-container">
        <div className="events-section-cards-container">
          <div className="events-section-cards">{renderedEvents}</div>
          <div className="events-section-scroller">
            <div onClick={scrollLeft} className="events-section-card-scroller">
              <FiArrowLeft />
            </div>
            <div onClick={scrollRight} className="events-section-card-scroller">
              <FiArrowRight />
            </div>
          </div>
        </div>
      </div>
      {marquee(headingImage2)}
    </div>
  );
}
