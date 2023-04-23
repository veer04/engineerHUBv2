import React from "react";
import "./CampusPage.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import CampusEventCard from "../../components/CampusEventCard/CampusEventCard";
import EventCard from "../../components/EventCard/EventCard";
import { useEffect, useState } from "react";
import { controller, getEvents } from "../../services/APIConfig";
import CampusEventTab from "../../components/CampusEventTab/CampusEventTab";

export default function CampusPage() {
  const colors = ["#F7D77F", "#8FC8E8", "#B2E887", "#E8BA98"];

  const CampusEvents = [
    {
      _id: 1,
      title: "INTER - COLLEGE EVENTS",
      studentActivity: "230+",
      ongoingEvents: "100",
      color: colors[0],
      link: "/campus/inter-college",
    },
    {
      _id: 2,
      title: "INTRA - COLLEGE EVENTS",
      studentActivity: "20+",
      ongoingEvents: "12",
      color: colors[1],
      link: "/campus/intra-college",
    },
    {
      _id: 3,
      title: "WORKSHOPS",
      studentActivity: "2.1k",
      ongoingEvents: "108",
      color: colors[2],
      link: "/campus/workshop",
    },
  ];

  const eventTypes = [
    {
      _id: 1,
      title: "Trending Events",
    },
    {
      _id: 2,
      title: "Tech Events",
    },
    {
      _id: 3,
      title: "Cultural Events",
    },
    {
      _id: 4,
      title: "Upcoming Events",
    },
  ];

  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents(setEvents, "App Development");
    window.scrollTo(0, 0);

    return () => {
      controller.abort();
    };
  }, []);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="campus-page">
      <h1 className="heading-3">Campus</h1>
      <h2 className="subheading-1">
        Lorem ipsum dolor sit amet consectetur. Vitae diam facilisi libero
        mauris mauris quam elit. Convallis nunc accumsan sit cum. Vitae diam eu
        enim dignissim donec ultrices dis amet ipsum.
      </h2>
      <div className="search-bar__container">
        <div>
          <SearchBar
            hasFiltration={false}
            placeholder="You are looking for which Campus?"
            type="text"
          />
        </div>
      </div>
      <div className="campus-events-section">
        {CampusEvents.map((event) => (
          <CampusEventCard
            link={event.link}
            key={event._id}
            title={event.title}
            studentActivity={event.studentActivity}
            ongoingEvents={event.ongoingEvents}
            color={event.color}
          />
        ))}
      </div>
      <div className="campus-featured-events-section">
        <h2>Featured Events</h2>
        <div className="events">
          {events.slice(0, 3).map((event) => (
            <EventCard
              key={event._id}
              description={event.description}
              eventPoster={event.eventPoster}
              setEventOpened={event.setEventOpened}
              setIsProjectOpen={event.setIsProjectOpen}
              eventName={event.eventName}
              eventType={event.eventType}
            />
          ))}
        </div>
      </div>
      {width > 750 && (
        <div className="campus-events-tabs">
          {eventTypes.map((event, index) => (
            <CampusEventTab
              key={event._id}
              title={event.title}
              color={colors[index]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
