import React from "react";
import "./Workshops.css";
import "../CampusPage.css";
import { useEffect, useState } from "react";
import { controller, getEventByType } from "../../../services/APIConfig";
import FeaturedEventsCard2 from "../../../components/FeaturedEventsCard2/FeaturedEventsCard2";
import CategoryBar from "../../../components/CategoryBar/CategoryBar";
import EventCard from "../../../components/EventCard/EventCard";
import CampusEventTab from "../../../components/CampusEventTab/CampusEventTab";
import useNavbar from "../../../hooks/use-navbar";

export default function Workshops() {
  const { setSelectedPageNavbar } = useNavbar();

  const [events, setEvents] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    getEventByType(setEvents, "Workshops");
    window.scrollTo(0, 0);
    setSelectedPageNavbar("campus");

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    };
  }, []);

  const eventTypes = [
    {
      _id: 1,
      title: "Online",
    },
    {
      _id: 2,
      title: "Offline",
    },
    {
      _id: 3,
      title: "Nearby",
    },
    {
      _id: 4,
      title: "Free",
    },
  ];
  const colors = ["#B2E887", "#F7D77F", "#E8BA98", "#8FC8E8"];

  const [current, setCurrent] = useState(1);

  const renderedUpcoming = "";

  const renderedOngoing = "";

  const renderedAll = events.map((event) => (
    <EventCard key={event._id} {...event} />
  ));

  return (
    <div className="intra-college-page">
      <h1 className="heading-3">Workshops</h1>
      <h2 className="subheading-1">
        Lorem ipsum dolor sit amet consectetur. Vitae diam facilisi libero
        mauris mauris quam elit. Convallis nunc accumsan sit cum. Vitae diam eu
        enim dignissim donec ultrices dis amet ipsum.
      </h2>
      <div className="featured-events">
        <h2>Featured Events</h2>
        <div className="events">
          {events.slice(0, 2).map((event, index) => (
            <FeaturedEventsCard2
              key={event._id}
              {...event}
              color={colors[index % 2]}
              hashtags={[
                {
                  _id: 1,
                  name: "Competition",
                },
                {
                  _id: 2,
                  name: "Hackathon",
                },
                {
                  _id: 3,
                  name: "Coding",
                },
              ]}
              stars={4}
              views={1056}
              time={5}
            />
          ))}
        </div>
      </div>
      {/* <CategoryBar
        categories={[
          {
            id: 1,
            title: "All",
          },
          {
            id: 2,
            title: "Upcoming",
          },
          {
            id: 3,
            title: "On-going",
          },
        ]}
        current={current}
        setCurrent={setCurrent}
      /> */}
      <div className="campus-content-section">
        {current === 1 && renderedAll}
        {current === 2 && renderedUpcoming}
        {current === 3 && renderedOngoing}
      </div>
      {width > 750 && (
        <div className="campus-events-tabs">
          <div>
            {eventTypes.map((event, index) => (
              <CampusEventTab
                key={event._id}
                title={event.title}
                color={colors[index]}
              />
            ))}
          </div>
          <div className="coming-soon">Coming Soon</div>
        </div>
      )}
    </div>
  );
}
