import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Resources.css";
import Topic from "./Topic";

function ResourceApi({ heading, text }) {
  const [resourceData, setResourceData] = useState([]);

  useEffect(() => {
    const getResourceDetials = async () => {
      const res = await axios.get(
        `https://ehubbackend.herokuapp.com/api/v1/resource`
      );

      setResourceData(res.data);
    };
    console.log(resourceData);
    getResourceDetials();
  }, );

  return (
    <div className="container-hiring">
      <div className="heading">{heading}</div>
      <div className="texthire">{text}</div>
      <div className="topic_container">
        <Topic link="https://www.geeksforgeeks.org/data-structures/" subheading="Best websites for DSA" />
        <Topic link="https://www.geeksforgeeks.org/commonly-asked-data-structure-interview-questions-set-1/" subheading="Top 10 DSA Questions" />
        <Topic
          link="https://www.youtube.com/c/engineerHUB1"
          subheading="Youtube channel for DSA"
          style={{ overflow: "hidden" }}
        />
        <Topic link="https://www.geeksforgeeks.org/python-programming-language/learn-python-tutorial/" subheading="Tutorial for Python" />
        <Topic link="https://www.geeksforgeeks.org/competitive-programming-a-complete-guide/?ref=shm" subheading="Tutorial for CP" />
        <Topic link="https://www.geeksforgeeks.org/c-plus-plus/?ref=shm" subheading="Tutorial for C++" />
      </div>
    </div>
  );
}

export default ResourceApi;
