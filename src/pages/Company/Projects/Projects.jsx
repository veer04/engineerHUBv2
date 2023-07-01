import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdTune } from "react-icons/md";
import HTML from "./ProjectChoices/HTML";
import "./Projects.css";

const Projects = () => {
  // const [search, setSearch] = useState("");
  // const [choice, setChoice] = useState("HTML");

  // const changeChoice = () => {
  //   switch (choice) {
  //     case "HTML":
  //       return <HTML />;
  //     default:
  //       return <HTML />;
  //   }
  // };

  // const handleChoicesChange = (e) => {
  //   e.preventDefault();
  //   document.querySelector(".select").classList.remove("select");
  //   setChoice(e.target.value);
  //   e.target.classList.add("select");
  //   changeChoice();
  // };

  // useEffect(() => {
  //   if (window.location.pathname.split("/").includes("html")) {
  //     document.querySelector(".select").classList.remove("select");
  //     setChoice("HTML");
  //     document.querySelector(".html").classList.add("select");
  //   } else if (window.location.pathname.split("/").includes("java")) {
  //     document.querySelector(".select").classList.remove("select");
  //     setChoice("Java");
  //     document.querySelector(".java").classList.add("select");
  //   } else if (window.location.pathname.split("/").includes("javascript")) {
  //     document.querySelector(".select").classList.remove("select");
  //     setChoice("Javascript");
  //     document.querySelector(".javascript").classList.add("select");
  //   } else if (window.location.pathname.split("/").includes("nodejs")) {
  //     document.querySelector(".select").classList.remove("select");
  //     setChoice("NodeJs");
  //     document.querySelector(".nodejs").classList.add("select");
  //   } else if (window.location.pathname.split("/").includes("php")) {
  //     document.querySelector(".select").classList.remove("select");
  //     setChoice("PHP");
  //     document.querySelector(".php").classList.add("select");
  //   } else if (window.location.pathname.split("/").includes("backend")) {
  //     document.querySelector(".select").classList.remove("select");
  //     setChoice("Backend");
  //     document.querySelector(".backend").classList.add("select");
  //   } else if (window.location.pathname.split("/").includes("html5")) {
  //     document.querySelector(".select").classList.remove("select");
  //     setChoice("HTML5");
  //     document.querySelector(".html5").classList.add("select");
  //   } else {
  //     document.querySelector(".select").classList.remove("select");
  //     setChoice("HTML");
  //     document.querySelector(".html").classList.add("select");
  //   }
  // }, []);

  return (
    <div className="Projects">
      <h1>Projects</h1>
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
      {/* <div className="Choices">
        <button
          className="btn select html"
          value="HTML"
          onClick={(e) => handleChoicesChange(e)}
        >
          HTML
        </button>
        <button
          className="btn java"
          value="Java"
          onClick={(e) => handleChoicesChange(e)}
        >
          Java
        </button>
        <button
          className="btn javascript"
          value="Javascript"
          onClick={(e) => handleChoicesChange(e)}
        >
          Javascript
        </button>
        <button
          className="btn php"
          value="PHP"
          onClick={(e) => handleChoicesChange(e)}
        >
          PHP
        </button>
        <button
          className="btn nodejs"
          value="NodeJS"
          onClick={(e) => handleChoicesChange(e)}
        >
          Node Js
        </button>
        <button
          className="btn html5"
          value="HTML5"
          onClick={(e) => handleChoicesChange(e)}
        >
          HTML 5
        </button>
        <button
          className="btn backend"
          value="Backend"
          onClick={(e) => handleChoicesChange(e)}
        >
          Backend
        </button>
      </div> */}
      {/* <div className="ChoicesSelection">{changeChoice()}</div> */}
      <div className="ChoicesSelection">
        <HTML />
      </div>
    </div>
  );
};

export default Projects;
