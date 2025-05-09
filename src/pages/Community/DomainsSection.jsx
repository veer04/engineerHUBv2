import React, { useEffect, useState } from "react";
import "./DomainsSection.css";
import Domains from "../../components/Domains/Domains";
import { getDomains, controller } from "../../services/APIConfig";

export default function DomainsSection() {
  const [domainData, setDomainData] = useState(
    sessionStorage.getItem("domainData")
      ? JSON.parse(sessionStorage.getItem("domainData"))
      : []
  );
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (sessionStorage.getItem("domainData")) {
      setDomainData(JSON.parse(sessionStorage.getItem("domainData")));
    } else {
      getDomains(setDomainData);
    }

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem("domainData", JSON.stringify(domainData));
    setFilteredData(
      domainData.filter((item) => item.domain !== "Non-Technical")
    );
  }, [domainData]);

  return (
    <div className="community-domains-section">
      <h1 className="heading-3">Our Domains </h1>
      
      <h2 className="subheading-1">
        Our technical areas specialize students in what industry is looking for
        in candidates, rather than spending ample time in building general
        skills. Now is the time to start developing skills in the field where
        our interests lie and build a career in that direction.
      </h2>
      
      <div className="domain-content-section">
        <Domains domains={filteredData} />
      </div>
    </div>
  );
}
