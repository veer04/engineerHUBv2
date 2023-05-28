import React from "react";
import "./InterCollege.css";
import "../CampusPage.css";
import { useEffect, useState } from "react";
import { controller, getEventByMode } from "../../../services/APIConfig";
import FeaturedEventsCard2 from "../../../components/FeaturedEventsCard2/FeaturedEventsCard2";
import CategoryBar from "../../../components/CategoryBar/CategoryBar";
import CampusEventTab from "../../../components/CampusEventTab/CampusEventTab";
import InterCollegeCard from "../../../components/InterCollegeCard/InterCollegeCard";
import useNavbar from "../../../hooks/use-navbar";
import LoadingPage from "../../../components/Loader/LoadingPage";

export default function InterCollege() {
  const { setSelectedPageNavbar } = useNavbar();

  const [events, setEvents] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    getEventByMode(setEvents, "InterCollege");
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
    <InterCollegeCard key={event._id} {...event} />
  ));

  const intraCollegePage = (
    <div className="intra-college-page">
      <h1 className="heading-3">Inter-College Events</h1>
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
      <div className="inter-college-events">
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

  return events.length !== 0 ? intraCollegePage : <LoadingPage />;
}
