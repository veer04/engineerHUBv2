import React, { useState, useEffect, useMemo } from "react";
import { cancelToken, getInternship } from "../../services/APIConfig";

import SearchIcon from "@mui/icons-material/Search";
import InternCard from "./InternCard";
import "./Internship.css";

const Internship = () => {
  const [query, setQuery] = useState("");

  const [internshipData, setInternshipData] = useState([]);

  const filteredInternshipData = useMemo(() => {
    return internshipData.filter((i) => {
      return (
        i.internCompany.toLowerCase().includes(query.toLowerCase()) ||
        i.internPosition.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [query, internshipData]);

  useEffect(() => {
    getInternship(setInternshipData);
    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <div className="contained-xl">
      <div className="heading heading--internship">Internship & Jobs</div>
      <div className="texthire texthire--internship">
        engineerhub offers tons of internships & job opportunities for our
        students & notify them regularly on various social platforms.
      </div>
      <form className="searchBar">
        <div className="search-btn">
          <SearchIcon />
        </div>
        <input
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search Internships & Jobs,..Web Design, App development "
        />
      </form>

      <div className="InternList">
        {filteredInternshipData.map((items, i) => {
          return (
            <InternCard
              key={i}
              company={items.internCompany}
              position={items.internPosition}
              link={items.applyUrl}
              type={items.type}
              timing={items.timing}
              location={items.location}
              description={items.description}
              time={items.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Internship;



