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

  return (
    <div className="domains-section-container">
      <div className="domains-section-title">Domains</div>
      <div className="domains-section-content">
        <div>
          <div className="domain-chip-container align-items-start">
            <DomainChips
              to="/community/domain/app-development"
              green
              className="domain-chip-title-1"
            >
              App Development
            </DomainChips>
          </div>
          <div className="domain-chip-container align-items-end">
            <DomainChips
              to="/community/domain/ui-ux-designing"
              red
              className="domain-chip-title-2"
            >
              UI / UX Designing
            </DomainChips>
          </div>
          <div className="domain-chip-container align-items-start">
            <DomainChips
              to="/community/domain/ml-ai"
              orange
              className="domain-chip-title-3"
            >
              Machine Learning & AI
            </DomainChips>
          </div>
          <div className="domain-chip-container align-items-end">
            <DomainChips
              to="/community/domain/cybersecurity"
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
              to="/community/domain/devops"
              green
              className="domain-chip-title-5"
            >
              DevOps
            </DomainChips>
          </div>
          <div className="domain-chip-container align-items-start">
            <DomainChips
              to="/community/domain/web-development"
              orange
              className="domain-chip-title-6"
            >
              Web Development
            </DomainChips>
          </div>
          <div className="domain-chip-container">
            <DomainChips
              to="/community/domain/dsa"
              red
              className="domain-chip-title-7"
            >
              Data Structures & Algo
            </DomainChips>
          </div>
          <div className="domain-chip-container align-items-end">
            <DomainChips
              to="/community/domain/blockchain"
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
