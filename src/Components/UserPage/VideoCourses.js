import React from "react";
import "./user.css";
import ReactPlayer from "react-player";
const VideoCourses = () => {
  return (
    <div>
    <ReactPlayer
      url="https://www.youtube.com/watch?v=B-ytMSuwbf8"
      className="react_player"
      controls={true}
      width="65vw"
      height="70vh"
    />
    <div className="video-name">Introduction to Video Courses</div>
    <div className="video-desc">Learn about what Intermediate JavaScript has in store!</div>
    </div>
  );
};

export default VideoCourses;
