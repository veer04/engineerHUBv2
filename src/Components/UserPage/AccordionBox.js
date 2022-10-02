import React from "react";
// import {Link} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import styles from "./AccordionBox.module.css";

const AccordionBox = ({courseName = "Learning Javascript"}) => {
  return (
    <div className={styles.accordion_box}>
      <div className={styles.accordion_box_name}>{courseName}</div>

      <Accordion
        defaultActiveKey="0"
        flush
        style={{ boxShadow: "21px 21px 21px rgb(201 231 239)" }}
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Introduction to Javascript</Accordion.Header>
          <Accordion.Body style={{ display: "flex", gap: "20px" }}>
            Learn about what Intermediate JavaScript has in store!
            <a
              href="https://youtube.com/playlist?list=PLK5Xw4XYHVkvV41XZ8wNsHb_37IAAvB3p"
              rel="noreferrer"
              className="watchnowbtn"
              target={"_blank"}
            >
              Watch now
            </a>
            {/* </Link> */}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Classes</Accordion.Header>
          <Accordion.Body>
            Learn how to create classes and use inheritance to minimize
            redundancy in your code.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Modules</Accordion.Header>
          <Accordion.Body>
            Learn how to create classes and use inheritance to minimize
            redundancy in your code. Learn how to use JavaScript modules, a way
            to define reusable logic in your programs.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Promises</Accordion.Header>
          <Accordion.Body>
            Learn how to write asynchronous JavaScript with the Promises Syntax.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Async-Await</Accordion.Header>
          <Accordion.Body>
            Learn about asynchronous programming and leverage promises in
            JavaScript.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>Requests</Accordion.Header>
          <Accordion.Body>
            In this course, you will learn the benefits of asynchronous
            JavaScript properties. You will create calls to various APIs using
            four different techniques.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default AccordionBox;
