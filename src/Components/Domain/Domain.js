/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import axios from "axios";
import "./Domain.css";
import Dropdown from "./Dropdown.js";

function Domain() {
  const [domainArr, setDomainArr] = useState([]);
  const dg = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  useEffect(() => {
    let subscribed = true;
    const getDomains = async () => {
      const res = await axios.get(
        `https://ehubbackend.herokuapp.com/api/v1/domain`
      );

      setDomainArr(res.data);
    };

    if (subscribed) {
      getDomains();
    }
    return () => {
      subscribed = false;
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
          <Dropdown domains={domainArr} />
        </div>
      </div>
    </>
  );
}

export default Domain;
