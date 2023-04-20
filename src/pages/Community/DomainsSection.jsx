import React, { useEffect, useState } from "react";
import "./DomainsSection.css";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import { BsArrowUpRight } from "react-icons/bs";
import Domains from "../../components/Domains/Domains";
import { getDomains, controller } from "../../services/APIConfig";

export default function DomainsSection() {
  const whatsNew = {
    recents: [
      {
        id: 1,
        domain: "Web Development",
        title: "New Project introduced <name> by <name>",
        link: "https://www.google.com",
      },
      {
        id: 2,
        domain: "Web Development",
        title: "New Project introduced <name> by <name>",
        link: "https://www.google.com",
      },
      {
        id: 3,
        domain: "Web Development",
        title: "New Project introduced <name> by <name>",
        link: "https://www.google.com",
      },
      {
        id: 4,
        domain: "Web Development",
        title: "New Project introduced <name> by <name>",
        link: "https://www.google.com",
      },
      {
        id: 5,
        domain: "Web Development",
        title: "New Project introduced <name> by <name>",
        link: "https://www.google.com",
      },
      {
        id: 6,
        domain: "Web Development",
        title: "New Project introduced <name> by <name>",
        link: "https://www.google.com",
      },
    ],
    fewDaysAgo: [
      {
        id: 1,
        domain: "Web Development",
        title: "New Project introduced <name> by <name>",
        link: "https://www.google.com",
      },
      {
        id: 2,
        domain: "Web Development",
        title: "New Project introduced <name> by <name>",
        link: "https://www.google.com",
      },
      {
        id: 3,
        domain: "Web Development",
        title: "New Project introduced <name> by <name>",
        link: "https://www.google.com",
      },
      {
        id: 4,
        domain: "Web Development",
        title: "New Project introduced <name> by <name>",
        link: "https://www.google.com",
      },
    ],
  };

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

  const categories = [
    {
      id: 1,
      title: "All",
    },
    {
      id: 2,
      title: "Trending",
    },
    {
      id: 3,
      title: "What's New",
    },
  ];

  const colors = ["#F7D77F", "#8FC8E8", "#B2E887", "#E8BA98"];

  function handleClick(link) {
    window.open(link, "_blank");
  }

  const renderedAll = <Domains domains={domainData} />;

  const renderedTrending = (
    <Domains domains={domainData.filter((item) => item.isTrending)} />
  );
  // const renderedWhatsNew = (
  //   <>
  //     <div className="whats-new-section">
  //       <div className="whats-new-section__recent">
  //         <h1 className="whats-new-section__heading">Recents</h1>
  //         <div className="whats-new-section__list">
  //           {whatsNew[0].recents.map((item) => (
  //             <div
  //               key={item.id}
  //               style={{ backgroundColor: colors[(item.id - 1) % 4] }}
  //               className="whats-new-section__item"
  //             >
  //               <div>
  //                 <div className="whats-new-section__item__domain">
  //                   {item.domain}
  //                 </div>
  //                 <div className="whats-new-section__item__title">
  //                   {item.title}
  //                 </div>
  //               </div>
  //               <div
  //                 onClick={() => handleClick(item.link)}
  //                 className="whats-new-section__item__link"
  //               >
  //                 <svg
  //                   width="12"
  //                   height="12"
  //                   viewBox="0 0 12 12"
  //                   fill="none"
  //                   xmlns="http://www.w3.org/2000/svg"
  //                 >
  //                   <path
  //                     d="M0.947471 11.0506L11.0527 0.945312"
  //                     stroke="black"
  //                     strokeWidth="1.5"
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                   />
  //                   <path
  //                     d="M0.947471 0.945312L11.0527 0.945312L11.0527 11.0506"
  //                     stroke="black"
  //                     strokeWidth="1.5"
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                   />
  //                 </svg>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //     <div className="whats-new-section">
  //       <div className="whats-new-section__old">
  //         <h1 className="whats-new-section__heading">Few Days Ago</h1>
  //         <div className="whats-new-section__list">
  //           {whatsNew[0].fewDaysAgo.map((item) => (
  //             <div key={item.id} className="whats-new-section__item">
  //               <div>
  //                 <div className="whats-new-section__item__domain">
  //                   {item.domain}
  //                 </div>
  //                 <div className="whats-new-section__item__title">
  //                   {item.title}
  //                 </div>
  //               </div>
  //               <div
  //                 onClick={() => handleClick(item.link)}
  //                 className="whats-new-section__item__link"
  //               >
  //                 <svg
  //                   width="12"
  //                   height="12"
  //                   viewBox="0 0 12 12"
  //                   fill="none"
  //                   xmlns="http://www.w3.org/2000/svg"
  //                 >
  //                   <path
  //                     d="M0.947471 11.0506L11.0527 0.945312"
  //                     stroke="black"
  //                     strokeWidth="1.5"
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                   />
  //                   <path
  //                     d="M0.947471 0.945312L11.0527 0.945312L11.0527 11.0506"
  //                     stroke="black"
  //                     strokeWidth="1.5"
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                   />
  //                 </svg>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <div className="community-domains-section">
      <h1 className="heading-3">Our Domains</h1>
      <h2 className="subheading-1">
        Lorem ipsum dolor sit amet consectetur. Vitae diam facilisi libero
        mauris mauris quam elit. Convallis nunc accumsan sit cum. Vitae diam eu
        enim dignissim donec ultrices dis amet ipsum.
      </h2>
      <CategoryBar
        categories={categories}
        current={current}
        setCurrent={setCurrent}
      />
      <div className="domain-content-section">
        {current === 1 && renderedAll}
        {current === 2 && renderedTrending}
        {/* {current === 3 && renderedWhatsNew} */}
      </div>
    </div>
  );
}
