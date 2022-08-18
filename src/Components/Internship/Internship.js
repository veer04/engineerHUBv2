import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import InternCard from "./InternCard";
import "./Internship.css";

const Internship = () => {
  return (
    <div className="contained-xl">
      <div className="heading">Internship & Jobs</div>
      <div className="texthire">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non gravida sit
        nunc duis dui, dui hendrerit suscipit.
      </div>
      <form className="searchBar">
        <div className="search-btn">
          <SearchIcon/>
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
