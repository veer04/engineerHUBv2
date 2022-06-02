import React from "react";
import { BiSearch } from "react-icons/bi";
import InternCard from "./InternCard";
import "./Internship.css";

const Internship = () => {
  return (
    <div className="contained-xl">
      <div className="heading">Internship & Jobs</div>

      <form className="searchBar">
        <div className="search-btn">
          <BiSearch size={"2em"} />
        </div>
        <input
          type="text"
          placeholder="Search Internships & Jobs,..Web Design, App development "
        />
      </form>

      <div className="InternList">
        <InternCard />
        <InternCard />
        <InternCard />
        <InternCard />
      </div>
    </div>
  );
};

export default Internship;
