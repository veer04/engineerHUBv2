import React from "react";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import "./user.css";
import AccordionBox from "./AccordionBox";
import VideoCourses from "./VideoCourses";

// import CoursesCa

function User() {
  return (
    <div className="d-flex flex-row">
      <div className="custom-courses-list">
        <AccordionBox />
        <AccordionBox />
        <AccordionBox />
      </div>
      <div>
        <VideoCourses/>
      </div>
    </div>
  );
}

export default User;
