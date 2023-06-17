import React, { useEffect, useState } from "react";
import "./DomainsSection.css";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import { BsArrowUpRight } from "react-icons/bs";
import Domains from "../../components/Domains/Domains";
import { getDomains, controller } from "../../services/APIConfig";
import { IoIosArrowDown } from "react-icons/io";

export default function DomainsSection() {
  const [domainData, setDomainData] = useState(
    // sessionStorage.getItem("domainData")
    //   ? JSON.parse(sessionStorage.getItem("domainData"))
    //   :
    []
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    getDomains(setDomainData);

    return () => {
      controller.abort();
    };
  }, []);

  // useEffect(() => {
  //   setCurrentData(domainData.slice(0, 6));
  // }, [domainData]);

  // useEffect(() => {
  //   sessionStorage.setItem("domainData", JSON.stringify(domainData));
  // }, [domainData]);

  const [current, setCurrent] = useState(1);
  // const [displayButton, setDisplayButton] = useState(true);

  // const [currentData, setCurrentData] = useState(domainData.slice(0, 6));

  const categories = [
    {
      id: 1,
      title: "All",
    },
    {
      id: 2,
      title: "Trending",
    },
  ];

  const colors = ["#F7D77F", "#8FC8E8", "#B2E887", "#E8BA98"];

  const [renderedAll, setRenderedAll] = useState(
    <Domains domains={domainData} />
  );

  useEffect(() => {
    setRenderedAll(<Domains domains={domainData} />);
  }, [domainData]);

  useEffect(() => {
    //filter out domain with name "Non-Technical"
    const filteredData = domainData.filter(
      (item) => item.domain !== "Non-Technical"
    );
    setRenderedAll(<Domains domains={filteredData} />);
  }, [domainData]);

  // function handleClick() {
  //   setRenderedAll(<Domains domains={domainData} />);
  //   setDisplayButton(false);
  // }

  const renderedTrending = (
    <Domains domains={domainData.filter((item) => item.isTrending)} />
  );

  return (
    <div className="community-domains-section">
      <h1 className="heading-3">Our Domains</h1>
      <h2 className="subheading-1">
        Our technical areas specialize students in what industry is looking for
        in candidates, rather than spending ample time in building general
        skills. Now is the time to start developing skills in the field where
        our interests lie and build a career in that direction.
      </h2>
      <CategoryBar
        categories={categories}
        current={current}
        setCurrent={setCurrent}
      />
      <div className="domain-content-section">
        {current === 1 && renderedAll}
        {current === 2 && renderedTrending}
      </div>
      {/* {displayButton && current === 1 && (
        <div className="load-more">
          <button onClick={handleClick}>
            View More <IoIosArrowDown />
          </button>
        </div>
      )} */}
    </div>
  );
}
