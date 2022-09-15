import React from "react";
import "./user.css";
import ReactPlayer from "react-player";
const VideoCourses = () => {
  return (
    <>
    <ReactPlayer
      url="https://www.youtube.com/watch?v=B-ytMSuwbf8"
      className="react_player"
      controls={true}
      width={800}
      height={500}
    />
    <div className="video-name">Introduction to Video Courses</div>
    <div className="video-desc">Learn about what Intermediate JavaScript has in store!</div>
    </>
  );
};

export default VideoCourses;
