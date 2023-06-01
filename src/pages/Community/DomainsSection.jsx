import React, { useEffect, useState } from "react";
import "./DomainsSection.css";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import { BsArrowUpRight } from "react-icons/bs";
import Domains from "../../components/Domains/Domains";
import { getDomains, controller } from "../../services/APIConfig";
import { IoIosArrowDown } from "react-icons/io";

export default function DomainsSection() {
  const [domainData, setDomainData] = useState(
    sessionStorage.getItem("domainData")
      ? JSON.parse(sessionStorage.getItem("domainData"))
      : []
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    getDomains(setDomainData);

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem("domainData", JSON.stringify(domainData));
  }, [domainData]);

  const [current, setCurrent] = useState(1);
  const [displayButton, setDisplayButton] = useState(true);

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
    <Domains domains={domainData.slice(0, 6)} />
  );

  function handleClick() {
    setRenderedAll(<Domains domains={domainData} />);
    setDisplayButton(false);
  }

  const renderedTrending = (
    <Domains domains={domainData.filter((item) => item.isTrending)} />
  );

  return (
    <div className="community-domains-section">
      <h1 className="heading-3">Our Domains</h1>
      <h2 className="subheading-1">
        engineerHUB’s technical domains cover a range of skills and expertise
        needed to create and deliver innovative software solutions that can help
        businesses succeed in today's digital landscape and meet their unique
        needs and requirements.
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
      {displayButton && current === 1 && (
        <div className="load-more">
          <button onClick={handleClick}>
            View More <IoIosArrowDown />
          </button>
        </div>
      )}
    </div>
  );
}
