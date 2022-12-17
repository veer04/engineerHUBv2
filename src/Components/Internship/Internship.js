import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../services/APIUtils";
import SearchIcon from "@mui/icons-material/Search";
import InternCard from "./InternCard";
import "./Internship.css";

const Internship = () => {
  const [internshipData, setInternshipData] = useState([]);

  useEffect(() => {
    const getInternshipDetails = async () => {
      const url=  `${process.env.REACT_APP_INTERN_API}`
      const res = await axios.get(
       url
      );

      setInternshipData(res.data);
    };

    getInternshipDetails();
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
          placeholder="Search Internships & Jobs,..Web Design, App development "
        />
      </form>

      <div className="InternList">
        {internshipData.map((items, i) => {
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
