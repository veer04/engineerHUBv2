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
    getResourceDetials();
  }, []);

  return (
    <div className="container-hiring">
      <div className="heading">{heading}</div>
      <div className="texthire">{text}</div>
      <div className="topic_container">
        <Topic link="https://geeksforgeeks.com" subheading="Best websites for DSA" />
        <Topic link="https://geeksforgeeks.com" subheading="Top 10 DSA Questions" />
        <Topic
          link="https://geeksforgeeks.com"
          subheading="Youtube channel for DSA"
          style={{ overflow: "hidden" }}
        />
        <Topic link="https://geeksforgeeks.com" subheading="Tutorial for Python" />
        <Topic link="https://geeksforgeeks.com" subheading="Tutorial for Python" />
        <Topic link="https://geeksforgeeks.com" subheading="Tutorial for C ++" />
      </div>
    </div>
  );
}

export default ResourceApi;
