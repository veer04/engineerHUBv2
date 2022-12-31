import React, { useState, useEffect } from "react";
import { getDomains, cancelToken } from "../../services/APIConfig";

import Dropdown from "./Dropdown.js";
import "./Domain.css";

export default function Domain() {
  const [domainPhoneData, setDomainPhoneData] = useState([]);

  useEffect(() => {
    getDomains(setDomainPhoneData);
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
            paddingTop: "25px",
          }}
        >
          <Dropdown domainArr={domainPhoneData} />
        </div>
      </div>
    </>
  );
}
