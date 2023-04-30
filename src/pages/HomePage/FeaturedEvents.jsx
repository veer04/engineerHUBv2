import React from "react";
import "./FeaturedEvents.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import image from "./events.png";
import image2 from "./events_2.png";

export default function FeaturedEvents() {
  //fetch events from database
  const eventsList = [
    {
      id: 1,
      title: "Event 1",
      description: "Event 1 description",
      image: "https://source.unsplash.com/random",
    },
    {
      id: 2,
      title: "Event 2",
      description: "Event 2 description",
      image: "https://source.unsplash.com/random",
    },
    {
      id: 3,
      title: "Event 3",
      description: "Event 3 description",
      image: "https://source.unsplash.com/random",
    },
    {
      id: 4,
      title: "Event 4",
      description: "Event 4 description",
      image: "https://source.unsplash.com/random",
    },
  ];

  const colorCycle = [
    "rgb(255,203,165,.9)  /* #ffcba5 */",
    "rgb(156,219,255,.9) /*#9cdbff*/",
    "rgb(195,255,147,.9)  /* #c3ff93 */",
  ];

  const scrollLeft = () => {
    const cards = document.querySelector(".events-section-cards");
    cards.scrollLeft -= 320;
  };

  const scrollRight = () => {
    const cards = document.querySelector(".events-section-cards");
    cards.scrollLeft += 320;
  };

  const events = eventsList.map((event) => {
    return (
      <div
        key={event.id}
        style={{
          backgroundImage: `url(${event.image})`,
        }}
        className="events-section-card-bg"
      >
        <div
          style={{ backgroundColor: colorCycle[event.id % colorCycle.length] }}
          className="events-section-card-content"
        >
          <h3 className="events-section-card-heading">{event.title}</h3>
          <h4 className="events-section-card-subheading">
            {event.description}
          </h4>
        </div>
      </div>
    );
  });

  const marquee1 = (
    <div
      className="events-section-marquee"
      style={{
        margin: ".5rem 0",
        backgroundImage: `url(${image})`,
        height: "4.7rem",
        width: "100%",
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
        animation: "scroll 5s linear infinite",
      }}
    >
      {/* <img src={image} alt="" /> */}
    </div>
  );

  const marquee2 = (
    <div
      className="events-section-marquee"
      style={{
        margin: ".5rem 0",
        backgroundImage: `url(${image2})`,
        height: "4.7rem",
        width: "100%",
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
        animation: "scroll 5s linear infinite",
      }}
    >
      {/* <img src={image} alt="" /> */}
    </div>
  );

  return (
    <div className="events-section-container">
      {marquee1}
      <div className="events-section-content-container">
        <div className="events-section-cards-container">
          <div className="events-section-cards">{events}</div>
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
      {marquee2}
    </div>
  );
}
