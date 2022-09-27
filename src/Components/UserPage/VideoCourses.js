import React from "react";
import "./user.css";
import ReactPlayer from "react-player";
const VideoCourses = () => {
  return (
    <div>
      <div className="video-wrapper">
    <ReactPlayer
      url="https://www.youtube.com/watch?v=B-ytMSuwbf8"
      className="react-player"
      controls={true}
      style={{padding:"5%"}}
      width="100%"
      height="100%"
    />
    </div>
    <div className="video-name">Introduction to Video Courses</div>
    <div className="video-desc">Learn about what Intermediate JavaScript has in store!</div>
    </div>
  );
};

export default VideoCourses;
