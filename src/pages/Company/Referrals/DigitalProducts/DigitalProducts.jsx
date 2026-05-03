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
  const [availableTypes, setAvailableTypes] = useState([]);

  const shuffleArrayData = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1 + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const customOrder = [
    "Editable Resume Template – 94% ATS Score",
    "Company-Wise Complete Preparation Guide",
    "Last 2 Years' Startup & Mid-Company Tech Interview Ques",
    "ATS-Friendly Templates for Frontend, Backend, and Full-Stack Roles",
    "FAANG Equivalent Companies - Top 100",
    "Complete DSA Resources for Interview Preparation",
    "A Complete Package for Data Science Students",
  ];

  const sortDataByCustomOrder = (data) => {
    return data.sort((a, b) => {
      const indexA = customOrder.indexOf(a.title);
      const indexB = customOrder.indexOf(b.title);

      // If the title is not found in the custom order, push it to the end
      return (
        (indexA === -1 ? data.length : indexA) -
        (indexB === -1 ? data.length : indexB)
      );
    });
  };

  const getallProductData = async () => {
    try {
      const config = {
        headers: {
          accesstoken: getAccessToken(),
        },
      };

      const { data } = await axios.get(
        `${PAYMENT_API_URL}payment/course/open`,
        config
      );

      console.log(data, "productData");

      // const shuffleData = shuffleArrayData(data.data);
      // setCourseData(shuffleData);
      const sortedData = sortDataByCustomOrder(data.data);
      setCourseData(sortedData);

      const uniqueTypes = [...new Set(data.data.map((item) => item.type))];
      setAvailableTypes(uniqueTypes);
    } catch (error) {
      console.log(error);
    }
  };

  const rating = [5, 4.5, 4.5];
  const popular = ["Popular", "Popular", "", "Popular", ""];

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
    if (filterDigitalProducts === "All") {
      return courseData;
    }
    return courseData.filter((card) => card.type === filterDigitalProducts);
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

        {availableTypes.map((type) => (
          <button
            key={type}
            style={{
              backgroundColor: activeFilter === type ? "#138382" : "#f2f4f5",
              color: activeFilter === type ? "white" : "#002b36",
              padding: "4px 16px",
              borderRadius: "10px",
              border: "none",
              marginRight: "10px",
              marginBottom: "10px",
            }}
            onClick={() => handleFilterChange(type)}
          >
            {type}
          </button>
        ))}

        {/* <button
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
          Resume
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
          Resources
        </button> */}
      </div>

      <div className={`digital-cards ${animationClass}`}>
        {visibleCards.map((card, index) => (
          <DigitalCards
            key={card._id}
            id={card._id}
            discount={card.discount}
            price={card.price}
            mrp={card.mrp}
            thumbnail={card.thumbnail}
            title={card.title}
            subTitle={card.subTitle}
            desc={card.description}
            type={card.type}
            rating={rating[index % rating.length]}
            popular={popular[index % popular.length]}
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
          {/* <div className="button-container">
            <span className="view-btn">View more</span>
            <div className="icon-container">
              <img
                src="/chevro-right.svg"
                alt="Chevron"
                className="chevron-icon"
              />
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default DigitalProducts;
