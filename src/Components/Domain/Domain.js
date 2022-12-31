import React, { useState, useEffect } from "react";
import axios from "axios";
import {getDomains,cancelToken} from "../../services/APIConfig"
import "./Domain.css";
import Dropdown from "./Dropdown.js";

export default function Domain() {
 
  const [data, setData] = useState([]);

  useEffect(() => {
    getDomains(setData);
    return () => {
      cancelToken.cancel();
    };
  }, []);
  return (
    <>
      <div className="container-hiring">
        <div className="heading">Our Domains !!</div>

        <div
          className="d-flex row justify-content-center"
          style={{
            marginTop: "0px",
            gap: "9px",
            paddingBottom: "80px",
            paddingTop: "25px",
            marginRight: "0px",
          }}
        >
          <Dropdown domainArr={data} />
        </div>
      </div>
    </>
  );
}
