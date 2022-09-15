import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import InternCard from "./InternCard";
import "./Internship.css";

const Internship = () => {
  const [internshipData, setInternshipData] = useState([]);

  useEffect(() => {
    const getInternshipDetails = async () => {
      const res = await axios.get(
        `https://ehubbackend.herokuapp.com/api/v1/internship`
      );

      setInternshipData(res.data);
    };

    getInternshipDetails();
  }, []);

  return (
    <div className="contained-xl">
      <div className="heading">Internship & Jobs</div>
      <div className="texthire">
      engineerhub offers tons of internships & job opportunities for our students & notify them regularly on various social platforms. 
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
        {internshipData.map((items) => {
          return (
            <InternCard
              company={items.internCompany}
              position={items.internPosition}
              link={items.internLink}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Internship;
