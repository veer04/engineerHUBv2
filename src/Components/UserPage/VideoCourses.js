import React from "react";
import "./user.css"
import ReactPlayer from "react-player";
const VideoCourses = () => {
  return (
    <div className="videocard">
      {" "}
      <ReactPlayer
        url="https://www.youtube.com/watch?v=B-ytMSuwbf8"
        className="react-player"
        width="100%"
        height="100%"
        controls={false}
      />
    </div>
  );
};

export default VideoCourses;
