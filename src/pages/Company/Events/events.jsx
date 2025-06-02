/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import "./events.css";
import AdsenseComp from "../../../components/AdsenseComp/AdsenseComp";
import {
  controller,
  getAllEvents,
  getAllEvents2,
  getEventByType,
} from "../../../services/APIConfig";

import { useSearchParams } from "react-router-dom";
import PaginationBar from "../../../components/PaginationBar/PaginationBar";
import Loading from "../../../components/Loader/Loading";
import { changeDocumentTitle } from "../../../features/changeDocumentTitle";
import NewEventCard from "../../../components/NewEventCard/NewEventCard";

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q");
  const [eventData, setEventData] = useState({});
  const [event, setEvent] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchedProjects, setSearchedProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(21);
  const [pageCount, setPageCount] = useState(1);

  changeDocumentTitle("Events | Career | engineerHUB");

  useEffect(() => {
    window.scrollTo(0, 0);
    getEventByType(setEventData, "eventHiring", currentPage, limit);
    return () => {
      controller.abort();
    };
  }, [window.location.pathname, currentPage, limit]);

  useEffect(() => {
    if (Object.keys(eventData).length > 0) {
      if (eventData?.status >= 200 && eventData?.status < 300) {
        setEvent(eventData?.data?.data);
        setPageCount(Math.ceil((eventData?.data?.pageSize || 1) / limit));
      } else {
        setEvent([]);
        setPageCount(1);
      }
    }
  }, [eventData, limit]);

  useEffect(() => {
    if (searchedProjects.length > 0) {
      setFilteredProjects(searchedProjects);
    } else {
      setFilteredProjects([]);
    }
  }, [searchedProjects]);

  const filteredData = useMemo(() => {
    return event.filter((value) => {
      return (
        value.opportunityName?.toLowerCase().includes(q.toLowerCase()) ||
        value.opportunityLocation?.toLowerCase().includes(q.toLowerCase()) ||
        value.domainName?.toLowerCase().includes(q.toLowerCase()) ||
        value.skillsRequired?.some((tag) =>
          tag.toLowerCase().includes(q.toLowerCase())
        ) ||
        value.organisationName?.toLowerCase().includes(q.toLowerCase())
      );
    });
  }, [event, q]);

  useEffect(() => {
    setSearchedProjects(filteredData);
  }, [q, filteredData]);

  return (
    <div className="CompanyEvent">
      <h2>Event Hiring</h2>
      {/*
      <p className="temp-text">
        Participate in the events directly conducted by the companies to
        highlight your profile.
      </p>
      */}

      {/* AD-5 */}
      {/*
      <div className="d-flex justify-content-center mb-3">
        <AdsenseComp adSlot="8908232121" />
      </div>
      <div className="project__searchbar__container company_searchbar_container mb-3">
        <div className="input-group">
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
      */}
      {/* <PaginationBar
        pages={pageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      /> */}
      <div className="ChoicesSelection">
        <div className="Hackathons">
          <div className="hackathonTiles">
            {filteredProjects.map((item, index) => {
              return <NewEventCard data={item} key={index} eventHiring={true} />;
            })}
            {event.length === 0 &&
              eventData?.status >= 200 &&
              eventData?.status < 300 && (
                <div style={{ marginTop: "25dvh" }}>
                  <Loading />
                </div>
              )}
            {event.length === 0 && Object.keys(eventData).length === 0 && (
              <div style={{ marginTop: "25dvh" }}>
                <Loading />
              </div>
            )}
            {event.length === 0 &&
              Object.keys(eventData).length !== 0 &&
              !(eventData?.status >= 200 && eventData?.status < 300) && (
                <div
                  style={{
                    marginTop: "25dvh",
                    textAlign: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#3C3C43",
                    opacity: "0.6",
                  }}
                >
                  Something went wrong. Please try again later.
                </div>
              )}
          </div>
        </div>
      </div>
      
      {/* Pagination Section */}
      {filteredProjects.length > 0 && (
        <div className="d-flex justify-content-center mt-4 mb-4">
          <PaginationBar
            pages={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}

      {/* Advertisement Section */}
      <div className="d-flex justify-content-center mb-3">
        <AdsenseComp adSlot="1464856375" />
      </div>
    </div>
  );
};

export default Events;
