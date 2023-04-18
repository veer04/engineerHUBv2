/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { MdTune } from "react-icons/md";
import Hackathons from "./EventsChoices/Hackathons";
import Competitions from "./EventsChoices/Competitions";
import "./events.css";

const Events = () => {
  const [search, setSearch] = useState("");
  const [choices, setChoices] = useState("Competitions");
  const handleChoicesChange = (e) => {
    e.preventDefault();
    document.querySelector(".select").classList.remove("select");
    setChoices(e.target.value);
    e.target.classList.add("select");
    changeChoice();
  };
  const changeChoice = () => {
    switch (choices) {
      case "Competitions":
        return <Competitions />;
      case "Hackathons":
        return <Hackathons />;
      default:
        return <Competitions />;
    }
  };

  console.log(choices);

  useEffect(() => {
    changeChoice(choices);
  }, []);

  return (
    <div className="CompanyEvent">
      <h2>Event Hiring</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur. Vitae diam facilisi libero
        mauris mauris quam elit. Convallis nunc accumsan sit cum. Vitae diam eu
        enim dignissim donec ultrices dis amet ipsum.
      </p>
      <div className="search">
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
      </div>
      <div className="Choices">
        <button
          className="btn select"
          value="Competitions"
          onClick={(e) => handleChoicesChange(e)}
        >
          Competitions
        </button>
        <button
          className="btn"
          value="Hackathons"
          onClick={(e) => handleChoicesChange(e)}
        >
          Hackathons
        </button>
      </div>
      <div className="ChoicesSelection">{changeChoice()}</div>
    </div>
  );
};

export default Events;
