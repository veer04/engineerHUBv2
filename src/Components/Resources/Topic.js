import React from "react";
import "./ResourceWrapper.css";
function Topic(props) {
  const { link, subheading } = props;
  return (
    <div className="topicBox">
      <a
        href={link}
        rel="noopener noreferrer"
        target="_blank"
        className="subheading"
      >
        {subheading}
      </a>
    </div>
  );
}

export default Topic;
