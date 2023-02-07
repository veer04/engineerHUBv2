import React from "react";
// import {Link} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import styles from "./SyllabusWrapper.module.css";
import ReactPlayer from "react-player";
import "./CourseSubWrapper.css";
import { useState } from "react";
// import Default from "./defualt.png";
const SyllabusWrapper = ({ courseName = "Learning Javascript", syllabus }) => {
  const [courseVideoStatus, setCourseVideoStatus] = useState({
    currentCourse: "",
    // "Web Development Tutorials For Beginners: Episode 1",
    currentDescription:"",
      // "In this video you will get an intro about what is HTML.HTML is the standard markup language for Web pages. HTML is a language made up of elements. The absolute basics of HTML defines elements, attributes, and other important terms, and show where they fit in the language.",
    currentVideoUrl:"",
      // "https://youtube.com/playlist?list=PLK5Xw4XYHVkvV41XZ8wNsHb_37IAAvB3p",
  });

  return (
    <>
      <div className="col-lg-4 order-sm-2 order-lg-1">
        <div className={styles.accordion_box}>
          <div className={styles.accordion_box_name}>{courseName}</div>
          <Accordion
            defaultActiveKey="0"
            flush
            style={{ boxShadow: "21px 21px 21px rgb(201 231 239)" }}
          >
            {syllabus.map((s, i) => {
              return (
                <Accordion.Item eventKey={`${i}.toString()`}>
                  <Accordion.Header>{s.title}</Accordion.Header>
                  <Accordion.Body
                    style={{ display: "flex", gap: "20px", cursor: "pointer" }}
                  >
                    {s.description}
                    <div
                      className="watchnowbtn"
                      onClick={() => {
                        setCourseVideoStatus({
                          currentCourse: s.title,
                          currentDescription: s.description,
                          currentVideoUrl: s.url,
                        });
                      }}
                    >
                      Watch now
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      </div>
      <div className="cont-right col-lg-8 order-sm-1 order-lg-2">
        <div className="video-wrapper">
          <ReactPlayer
            url={courseVideoStatus.currentVideoUrl}
            className="react-player"
            controls={true}
            style={{ padding: "5%" }}
            width="100%"
            height="100%"
          />
        </div>
        <div className="video-name">{courseVideoStatus.currentCourse}</div>
        <div className="video-desc">{courseVideoStatus.currentDescription}</div>
      </div>
    </>
  );
};

export default SyllabusWrapper;
