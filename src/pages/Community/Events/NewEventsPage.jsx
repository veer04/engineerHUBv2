import React, { useEffect, useState, useMemo } from "react";
import "./NewEventsPage.css";
import { useParams, useSearchParams } from "react-router-dom";
import { controller, getEvents } from "../../../services/APIConfig";
import useNavbar from "../../../hooks/use-navbar";
import { Outlet } from "react-router-dom";
import NewSidebar from "../../../components/NewSidebar/NewSidebar";
import Loading from "../../../components/Loader/Loading";
import NewSidebarMobile from "../../../components/NewSidebarMobile/NewSidebarMobile";
import DomainSwitcher from "../../../components/DomainSwitcher/DomainSwitcher";
import DomainSwitcherMobile from "../../../components/DomainSwitcher/DomainSwitcherMobile";
import useSidebar from "../../../hooks/use-sidebar";
import NewEventCard from "../../../components/NewEventCard/NewEventCard";

export default function NewEventsPage() {
  const { setSelectedPageNavbar } = useNavbar();
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q");
  const { id, eventId } = useParams();
  const [isEventOpen, setIsEventOpen] = useState(!!eventId);
  const [eventsData, setEventsData] = useState({});
  const [events, setEvents] = useState(
    // sessionStorage.getItem(`${id} events`)
    //   ? JSON.parse(sessionStorage.getItem(`${id} events`))
    //   :
    []
  );
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchedEvents, setSearchedEvents] = useState([]);
  const { setSelectedItem } = useSidebar();

  useEffect(() => {
    window.scrollTo(0, 0);
    getEvents(setEventsData, id);
    setSelectedPageNavbar("community");
    setSelectedItem("events");

    return () => {
      controller.abort();
      setEventsData({});
    };
  }, [id]);

  useEffect(() => {
    if (!!Object.keys(eventsData).length) {
      setEvents(eventsData?.data?.data || []);
    }
  }, [eventsData]);

  useEffect(() => {
    setIsEventOpen(!!eventId);
  }, [eventId]);

  useEffect(() => {
    if (searchedEvents.length > 0) {
      setFilteredEvents(searchedEvents);
    } else {
      setFilteredEvents([]);
    }
  }, [searchedEvents]);

  const filteredData = useMemo(() => {
    return events.filter((value) => {
      return (
        value.eventName?.toLowerCase()?.includes(q?.toLowerCase()) ||
        value.tags?.some((tag) =>
          tag.toLowerCase().includes(q?.toLowerCase())
        ) ||
        value.eventType?.toLowerCase()?.includes(q?.toLowerCase()) ||
        value.domainName?.toLowerCase()?.includes(q?.toLowerCase())
      );
    });
  }, [events, q]);

  useEffect(() => {
    setSearchedEvents(filteredData);
  }, [q, filteredData]);

  function handleHeight() {
    setTimeout(() => {
      document.getElementById("event-list").style.height = `${
        document.getElementById("event-window").offsetHeight
      }px`;
    }, 100);
  }

  const renderContentContainer = (
    <>
      <div
        id="event-list"
        className={`event-list ${isEventOpen ? "--flip-direction" : "h-100"}`}
      >
        {filteredEvents.length === 0 && (
          <div
            style={{ minHeight: "30vh" }}
            className="d-flex justify-content-center align-items-center flex-column w-100"
          >
            <h4>No Events found</h4>
          </div>
        )}
        {filteredEvents.map((event) => (
          <NewEventCard key={event._id} data={event} community />
        ))}
      </div>
      <Outlet context={[handleHeight]} />
    </>
  );

  return (
    <>
      <DomainSwitcherMobile />
      <NewSidebarMobile />
      <main className="events-page">
        {/* <div className="heading">
          <span>Events</span>
        </div> */}
        <div className="project__searchbar__container company_searchbar_container">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={q}
              onChange={(e) => {
                setSearchParams(
                  (prev) => {
                    prev.set("q", e.target.value);
                    return prev;
                  },
                  { replace: true }
                );
              }}
            />

            <span className="input-group-text" id="basic-addon2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.53223 14.0332C8.92969 14.0332 10.2393 13.6113 11.3291 12.8906L15.1787 16.749C15.4336 16.9951 15.7588 17.1182 16.1104 17.1182C16.8398 17.1182 17.376 16.5469 17.376 15.8262C17.376 15.4922 17.2617 15.167 17.0156 14.9209L13.1924 11.0801C13.9834 9.95508 14.4492 8.59277 14.4492 7.11621C14.4492 3.31055 11.3379 0.199219 7.53223 0.199219C3.73535 0.199219 0.615234 3.31055 0.615234 7.11621C0.615234 10.9219 3.72656 14.0332 7.53223 14.0332ZM7.53223 12.1875C4.74609 12.1875 2.46094 9.90234 2.46094 7.11621C2.46094 4.33008 4.74609 2.04492 7.53223 2.04492C10.3184 2.04492 12.6035 4.33008 12.6035 7.11621C12.6035 9.90234 10.3184 12.1875 7.53223 12.1875Z"
                  fill="#3C3C43"
                  fillOpacity="0.6"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="main-container">
          {!isEventOpen && (
            <aside className="options-container">
              <DomainSwitcher />
              <NewSidebar />
            </aside>
          )}
          <div className="content-container">
            {Object.keys(eventsData).length === 0 && (
              <div
                style={{ minHeight: "30vh" }}
                className="d-flex justify-content-center align-items-center w-100"
              >
                <Loading />
              </div>
            )}
            {Object.keys(eventsData).length !== 0 && (
              <>
                {eventsData?.status === 200 ? (
                  events.length === 0 ? (
                    <div
                      style={{ minHeight: "30vh" }}
                      className="d-flex justify-content-center align-items-center flex-column w-100"
                    >
                      <h4>No Events found</h4>
                    </div>
                  ) : (
                    renderContentContainer
                  )
                ) : (
                  <div
                    style={{ minHeight: "30vh" }}
                    className="d-flex justify-content-center align-items-center flex-column w-100"
                  >
                    <h4>No Events found</h4>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
