/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import { cancelToken, getResources } from "../../services/APIConfig";
import AOS from "aos";
import Topic from "./Topic";

import "./ResourceWrapper.css";
import "aos/dist/aos.css";

AOS.init();

function ResourceSubWrapper({ heading, text, domain }) {
  const [resourceData, setResourceData] = useState([]);

  const filteredResources = useMemo(
    () =>
      resourceData.filter(
        (rd) => rd.domain.toLowerCase() === domain.toLowerCase()
      ),
    [resourceData, domain]
  );

  useEffect(() => {
    getResources(setResourceData);

    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <div className="container-hiring">
      <div className="heading">{heading}</div>
      <div className="texthire">{text}</div>
      <div className="topic_container">
        {/* <Topic link="https://www.geeksforgeeks.org/data-structures/" subheading="Best websites for DSA"  data-aos="fade-up"></Topic>
        <Topic link="https://www.geeksforgeeks.org/commonly-asked-data-structure-interview-questions-set-1/" subheading="Top 10 DSA Questions"  data-aos="fade-up"/>
        <Topic
          link="https://www.youtube.com/c/engineerHUB1"
          subheading="Youtube channel for DSA"
          style={{ overflow: "hidden" }}
          data-aos="fade-up"
        />
        <Topic link="https://www.geeksforgeeks.org/python-programming-language/learn-python-tutorial/" subheading="Tutorial for Python"data-aos="fade-up"
     data-aos-anchor-placement="center-bottom"/>
        <Topic link="https://www.geeksforgeeks.org/competitive-programming-a-complete-guide/?ref=shm" subheading="Tutorial for CP" data-aos="fade-up" />
        <Topic link="https://www.geeksforgeeks.org/c-plus-plus/?ref=shm" subheading="Tutorial for C++" data-aos="fade-up" /> */}
        {filteredResources.map((rd) => {
          return (
            <Topic
              key={rd._id}
              link={rd.resourceLink}
              subheading={rd.resourceName}
              domain={rd.domain}
              data-aos="fade-up"
            />
          );
        })}
      </div>
    </div>
  );
}

export default ResourceSubWrapper;
