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
    <div className="  row">
  
      <div className="cont-right col-lg-8 order-sm-1 order-lg-2 "> 
        <VideoCourses className="nottobedisplayed"/>
      </div>
      <div className="custom-courses-list col-lg-4  order-sm-2 order-lg-1">
      
        <AccordionBox />
        <AccordionBox />
        <AccordionBox />
      </div>
      
    </div>
  );
}

export default User;
