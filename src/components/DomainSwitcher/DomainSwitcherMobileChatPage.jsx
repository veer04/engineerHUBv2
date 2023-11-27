import React, { useEffect, useState } from "react";
import "./DomainSwitcherMobileChatPage.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { controller, getDomains } from "../../services/APIConfig";
import { useParams, useNavigate } from "react-router-dom";
import colorWheel from "../../assets/colorWheel";
import useSidebar from "../../hooks/use-sidebar";
import { useIsScrolling } from "../../hooks/useIsScrolling";

export default function DomainSwitcherMobileChatPage({ collapsed }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [domains, setDomains] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredDomains, setFilteredDomains] = useState([]);
  const { selectedItem } = useSidebar();
  const isScrolling = useIsScrolling();

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

  const currentActiveDomain = filteredDomains.find(
    (domain) => domain.domain === id
  );

  return (
    <aside
      style={{
        height: isScrolling ? 0 : "56px",
        transition: "height 0.2s ease-in-out",
        overflow: isScrolling ? "hidden" : "visible",
      }}
      id="domain-switcher-mobile-chat-page"
      className={`${collapsed ? "collapsed" : ""}`}
    >
      <button
        style={{
          backgroundColor: colorWheel[0],
        }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="active-item"
      >
        <div className="left">
          <div className="logo">
            <img
              src={`${currentActiveDomain?.domainImage}`}
              alt={`${currentActiveDomain?.domain} logo`}
            />
          </div>
          <span className="text-crop-1">{currentActiveDomain?.domain}</span>
        </div>
        <div className="logo arrow">
          {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </button>
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
    </aside>
  );
}
