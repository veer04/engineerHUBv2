/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { MdTune } from "react-icons/md";
import Hackathons from "./EventsChoices/Hackathons";
import Competitions from "./EventsChoices/Competitions";
import "./events.css";

const Events = () => {
  const [search, setSearch] = useState("");
  const [choice, setChoice] = useState("Hackathons");

  const changeChoice = () => {
    switch (choice) {
      case "Competitions":
        return <Competitions />;
      case "Hackathons":
        return <Hackathons />;
      default:
        return <Competitions />;
    }
  };

  const handleChoicesChange = (e) => {
    e.preventDefault();
    document.querySelector(".select").classList.remove("select");
    setChoice(e.target.value);
    e.target.classList.add("select");
    changeChoice();
  };

  useEffect(() => {
    if (window.location.pathname.split("/").includes("hackathons")) {
      document.querySelector(".select").classList.remove("select");
      setChoice("Hackathons");
      document.querySelector(".hackathon").classList.add("select");
    } else if (window.location.pathname.split("/").includes("competitions")) {
      document.querySelector(".select").classList.remove("select");
      setChoice("Competitions");
      document.querySelector(".competition").classList.add("select");
    }
  }, []);

  return (
    <div className="CompanyEvent">
      <h2>Event Hiring</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur. Vitae diam facilisi libero
        mauris mauris quam elit. Convallis nunc accumsan sit cum. Vitae diam eu
        enim dignissim donec ultrices dis amet ipsum.
      </p>
      {/* <div className="search">
        <span>
          <BsSearch />
          <input
            type="text"
            id="search"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </span>
        <div className="filters">
          <MdTune />
        </div>
      </div> */}
      <div className="Choices">
        <button
          className="btn select hackathon"
          value="Hackathons"
          onClick={(e) => handleChoicesChange(e)}
        >
          Hackathons
        </button>
        {/* <button
          className="btn competition"
          value="Competitions"
          onClick={(e) => handleChoicesChange(e)}
        >
          Competitions
        </button> */}
      </div>
      <div className="ChoicesSelection">{changeChoice()}</div>
    </div>
  );
};

export default Events;
