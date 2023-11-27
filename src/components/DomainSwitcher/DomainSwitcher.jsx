import React, { useEffect, useState } from "react";
import "./DomainSwitcher.css";
import { useParams, useNavigate } from "react-router-dom";
import useSidebar from "../../hooks/use-sidebar";
import { controller, getDomains } from "../../services/APIConfig";
import colorWheel from "../../assets/colorWheel";

export default function DomainSwitcher() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [domains, setDomains] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredDomains, setFilteredDomains] = useState([]);
  const { selectedItem } = useSidebar();

  useEffect(() => {
    if (sessionStorage.getItem("domainData")) {
      setDomains(JSON.parse(sessionStorage.getItem("domainData")));
    } else {
      getDomains(setDomains);
    }

    return () => {
      controller.abort();
    };
  }, [id]);

  useEffect(() => {
    if (!!!sessionStorage.getItem("domainData") && domains.length > 0) {
      sessionStorage.setItem("domainData", JSON.stringify(domains));
    }
    setFilteredDomains(
      domains.filter((item) => item.domain !== "Non-Technical")
    );
  }, [domains]);

  const currentActiveDomain = filteredDomains?.find(
    (domain) => domain.domain === id
  );
  return (
    <div id="domain-switcher" className="change-domain">
      <span className="heading">Tap to select</span>
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="domain"
      >
        <img
          src={currentActiveDomain?.domainImage}
          alt={`${currentActiveDomain?.domain} logo`}
          loading="lazy"
        />
      </button>
      <span className="title text-crop-1">{currentActiveDomain?.domain}</span>
      {isDropdownOpen && (
        <div className="dropdown">
          {
            // filter the current active domain from the list of domains
            filteredDomains
              .filter((domain) => domain.domain !== id)
              .map((domain, item) => (
                <button
                  style={{
                    backgroundColor: colorWheel[(item + 1) % colorWheel.length],
                  }}
                  className="active-item"
                  key={domain?._id}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate(
                      `/community/${selectedItem}/${encodeURIComponent(
                        domain?.domain
                      )}`
                    );
                  }}
                >
                  <div className="left">
                    <div className="logo">
                      <img
                        src={`${domain?.domainImage}`}
                        alt={`${domain?.domain} logo`}
                      />
                    </div>
                    <span className="text-crop-1">{domain?.domain}</span>
                  </div>
                </button>
              ))
          }
        </div>
      )}
    </div>
  );
}
