import React from "react";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import "./user.css";

// import CoursesCa

function User() {
  return (
    <div className="d-flex row">
      <div
        style={{
          backgroundColor: "rgb(5 66 83)",
          width: "19rem",
          height: "700px",
        }}
      >
        <div className=" ml-5">
          <ul style={{ listStyle: "none" }}>
            <a
              href="/courses"
              style={{ textDecoration: "none", padding: "30px" }}
            >
              <li className="fs-5 offli">
                <LightbulbIcon className="fs-1 p-2" />
                Courses
              </li>
            </a>
            <a href="" style={{ textDecoration: "none", padding: "30px" }}>
              <li className="fs-5 offli">
                <EventIcon className="fs-1 p-2" />
                Events
              </li>
            </a>
            <a href="" style={{ textDecoration: "none", padding: "30px" }}>
              <li className="fs-5 offli">
                <LogoutIcon className="fs-1 p-2" />
                Logout
              </li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default User;
