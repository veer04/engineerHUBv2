import React, { useEffect, useState } from "react";
import "./digitalproducts.css";
import DigitalCards from "./DigitalCards";

const DigitalProducts = ({ compName }) => {
  const [filterDigitalProducts, setFilterDigitalProducts] = useState("All");
  const [visibleCards, setVisibleCards] = useState([]);
  const [animationClass, setAnimationClass] = useState("show");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    setAnimationClass("hidden");
    const timer = setTimeout(() => {
      setVisibleCards(getFilterCards());
      setAnimationClass("show");
    }, 500);

    return () => clearTimeout(timer);
  }, [filterDigitalProducts]);

  const handleFilterChange = (filter) => {
    setFilterDigitalProducts(filter);
    setActiveFilter(filter);
  };

  const getFilterCards = () => {
    switch (filterDigitalProducts) {
      case "Cheatsheets":
        return [1, 2];
      case "Notes":
        return [1];
      case "All":
        return [1, 2, 3];
      default:
        return [];
    }
  };
  return (
    <div className="main-container-prdoucts">
      <div>
        <h4 className="connect-txt">{compName}</h4>
      </div>

      <div className="filter-cards-btns">
        <button
          style={{
            backgroundColor: activeFilter === "All" ? "#138382" : "#f2f4f5",
            color: activeFilter === "All" ? "white" : "#002b36",
            padding: "4px 16px",
            borderRadius: "10px",
            border: "none",
            marginRight: "10px",
            marginBottom: "10px",
          }}
          onClick={() => handleFilterChange("All")}
        >
          All
        </button>
        <button
          style={{
            backgroundColor:
              activeFilter === "Cheatsheets" ? "#138382" : "#f2f4f5",
            color: activeFilter === "Cheatsheets" ? "white" : "#002b36",
            padding: "4px 16px",
            borderRadius: "10px",
            border: "none",
            marginRight: "10px",
            marginBottom: "10px",
          }}
          onClick={() => handleFilterChange("Cheatsheets")}
        >
          Cheatcheets
        </button>
        <button
          style={{
            backgroundColor: activeFilter === "Notes" ? "#138382" : "#f2f4f5",
            color: activeFilter === "Notes" ? "white" : "#002b36",
            padding: "4px 16px",
            borderRadius: "10px",
            border: "none",
            marginRight: "10px",
            marginBottom: "10px",
          }}
          onClick={() => handleFilterChange("Notes")}
        >
          Notes
        </button>
      </div>

      <div className={`digital-cards ${animationClass}`}>
        {visibleCards.map((card, index) => (
          <DigitalCards key={index} />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <div className="button-container">
          <span className="view-btn">View more</span>
          <div className="icon-container">
            <img
              src="/chevro-right.svg"
              alt="Chevron"
              className="chevron-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalProducts;
