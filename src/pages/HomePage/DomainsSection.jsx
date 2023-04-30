import React, { useEffect, useState } from "react";
import DomainChips from "../../components/DomainChips/DomainChip";
import "./DomainsSection.css";

export default function DomainsSection() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, []);

  const ROUTE = "/community/projects/";

  return (
    <div className="domains-section-container">
      <div className="domains-section-title">Domains</div>
      <div className="domains-section-content">
        <div>
          <div className="domain-chip-container align-items-start">
            <DomainChips
              to={`${ROUTE}App Development`}
              green
              className="domain-chip-title-1"
            >
              App Development
            </DomainChips>
          </div>
          <div className="domain-chip-container align-items-end">
            <DomainChips
              to={`${ROUTE}${encodeURIComponent("UI/UX Design")}`}
              red
              className="domain-chip-title-2"
            >
              UI / UX Designing
            </DomainChips>
          </div>
          <div className="domain-chip-container align-items-start">
            <DomainChips
              to={`${ROUTE}Machine Learning & AI`}
              orange
              className="domain-chip-title-3"
            >
              Machine Learning & AI
            </DomainChips>
          </div>
          <div className="domain-chip-container align-items-end">
            <DomainChips
              to={`${ROUTE}Cyber Security`}
              green
              className="domain-chip-title-4"
            >
              CyberSecurity
            </DomainChips>
          </div>
        </div>
        <div>
          <div className="domain-chip-container align-items-end">
            <DomainChips
              to={`${ROUTE}DevOps`}
              green
              className="domain-chip-title-5"
            >
              DevOps
            </DomainChips>
          </div>
          <div className="domain-chip-container align-items-start">
            <DomainChips
              to={`${ROUTE}Web Development`}
              orange
              className="domain-chip-title-6"
            >
              Web Development
            </DomainChips>
          </div>
          <div className="domain-chip-container">
            <DomainChips
              to={`${ROUTE}Data Structures & Algorithms`}
              red
              className="domain-chip-title-7"
            >
              Data Structures & Algo
            </DomainChips>
          </div>
          <div className="domain-chip-container align-items-end">
            <DomainChips
              to={`${ROUTE}Block Chain`}
              orange
              className="domain-chip-title-8"
            >
              BlockChain
            </DomainChips>
          </div>
        </div>
      </div>
    </div>
  );
}
