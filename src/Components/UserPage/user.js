import React from "react";
// import LightbulbIcon from "@mui/icons-material/Lightbulb";
// import EventIcon from "@mui/icons-material/Event";
// import LogoutIcon from "@mui/icons-material/Logout";
import "./user.css";
import AccordionBox from "./AccordionBox";
import VideoCourses from "./VideoCourses";

// import CoursesCa

function User() {
  return (
    <div className="d-flex justify-content-evenly">
      <div className="custom-courses-list">
        <AccordionBox />
        <AccordionBox />
        <AccordionBox />
      </div>
      <div className="cont-right"> 
        <VideoCourses/>
      </div>
    </div>
  );
}

export default User;
