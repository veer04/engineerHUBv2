import React, { useEffect, useState } from "react";
import "./digitalproducts.css";
import DigitalCards from "./DigitalCards";
import axios from "axios";
import { getAccessToken } from "../../../../features/getCookieValues";
import { PAYMENT_API_URL } from "../../../../services/APIUtils";

const DigitalProducts = ({ compName }) => {
  const [filterDigitalProducts, setFilterDigitalProducts] = useState("All");
  const [visibleCards, setVisibleCards] = useState([]);
  const [animationClass, setAnimationClass] = useState("show");
  const [courseData, setCourseData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  const getallProductData = async () => {
    try {
      const config = {
        headers: {
          accesstoken: getAccessToken(),
        },
      };

      const { data } = await axios.get(
        `${PAYMENT_API_URL}api/v1/course/open`,
        config
      );

      console.log(data, "productData");
      setCourseData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallProductData();
  }, []);

  useEffect(() => {
    setAnimationClass("hidden");
    const timer = setTimeout(() => {
      setVisibleCards(getFilterCards());
      setAnimationClass("show");
    }, 500);

    return () => clearTimeout(timer);
  }, [filterDigitalProducts, courseData]);

  const handleFilterChange = (filter) => {
    setFilterDigitalProducts(filter);
    setActiveFilter(filter);
  };

  const getFilterCards = () => {
    switch (filterDigitalProducts) {
      case "Cheatsheets":
        return courseData.filter((card) => card.type === "Cheatsheet");
      case "Notes":
        return courseData.filter((card) => card.type === "Notes");
      case "All":
        return courseData;
      default:
        return [];
    }
  };
  return (
    <div id="digital-product" className="main-container-prdoucts">
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
          Cheatcheet
        </button>
        {/* <button
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
        </button> */}
      </div>

      <div className={`digital-cards ${animationClass}`}>
        {visibleCards.map((card, index) => (
          <DigitalCards
            key={card._id}
            id={card._id}
            discount={card.discount}
            price={card.price}
            thumbnail={card.thumbnail}
            title={card.title}
            subTitle={card.subTitle}
            desc={card.description}
            type={card.type}
          />
        ))}
      </div>

      {visibleCards?.length > 3 && (
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
      )}
    </div>
  );
};

export default DigitalProducts;
