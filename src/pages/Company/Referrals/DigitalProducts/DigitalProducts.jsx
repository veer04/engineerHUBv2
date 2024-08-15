import React, { useEffect, useState } from "react";
import "./digitalproducts.css";
import DigitalCards from "./DigitalCards";

const DigitalProducts = ({ compName }) => {
  const [filterDigitalProducts, setFilterDigitalProducts] = useState("All");
  const [visibleCards, setVisibleCards] = useState([]);
  const [animationClass, setAnimationClass] = useState("show");

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
        <button onClick={() => handleFilterChange("All")}>All</button>
        <button onClick={() => handleFilterChange("Cheatsheets")}>
          Cheatcheets
        </button>
        <button onClick={() => handleFilterChange("Notes")}>Notes</button>
      </div>

      {/* <div className="digital-cards">
        <DigitalCards />
        <DigitalCards />
        <DigitalCards />
      </div> */}

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
