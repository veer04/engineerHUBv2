import React from "react";
import { useLocation } from "react-router-dom";
// import LightbulbIcon from "@mui/icons-material/Lightbulb";
// import EventIcon from "@mui/icons-material/Event";
// import LogoutIcon from "@mui/icons-material/Logout";
import "./user.css";
import AccordionBox from "./AccordionBox";
import VideoCourses from "./VideoCourses";
import { useEffect } from "react";

// import CoursesCa

const User = () => {
  const { state } = useLocation();

  useEffect(() => {
    console.log(state);
  });

  return (
    <div className="row">
      <div className="cont-right col-lg-8 order-sm-1 order-lg-2 ">
        <VideoCourses className="nottobedisplayed" />
      </div>
      <div className="custom-courses-list col-lg-4  order-sm-2 order-lg-1">
        <AccordionBox courseName={`${state.courseName}`} />
      </div>
    </div>
  );
};

export default User;
