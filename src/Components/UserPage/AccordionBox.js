import React from "react";
// import {Link} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import styles from "./AccordionBox.module.css";

const AccordionBox = ({ courseName = "Learning Javascript" }) => {
  return (
    <div className={styles.accordion_box}>
      <div className={styles.accordion_box_name}>{courseName}</div>

      <Accordion
        defaultActiveKey="0"
        flush
        style={{ boxShadow: "21px 21px 21px rgb(201 231 239)" }}
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Introduction to {courseName}</Accordion.Header>
          <Accordion.Body
            style={{ display: "flex", gap: "20px", cursor: "pointer" }}
          >
            Learn about what Intermediate JavaScript has in store!
            <div style={{ color: "blue" }}>Watch now</div>
            {/* </Link> */}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Classes</Accordion.Header>
          <Accordion.Body
            style={{ display: "flex", gap: "20px", cursor: "pointer" }}
          >
            Learn how to create classes and use inheritance to minimize
            redundancy in your code.{" "}
            <div style={{ color: "blue" }}>Watch now</div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Modules</Accordion.Header>
          <Accordion.Body
            style={{ display: "flex", gap: "20px", cursor: "pointer" }}
          >
            Learn how to create classes and use inheritance to minimize
            redundancy in your code. Learn how to use JavaScript modules, a way
            to define reusable logic in your programs.{" "}
            <div style={{ color: "blue" }}>Watch now</div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Promises</Accordion.Header>
          <Accordion.Body
            style={{ display: "flex", gap: "20px", cursor: "pointer" }}
          >
            Learn how to write asynchronous JavaScript with the Promises Syntax.{" "}
            <div style={{ color: "blue" }}>Watch now</div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Async-Await</Accordion.Header>
          <Accordion.Body
            style={{ display: "flex", gap: "20px", cursor: "pointer" }}
          >
            Learn about asynchronous programming and leverage promises in
            JavaScript. <div style={{ color: "blue" }}>Watch now</div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>Requests</Accordion.Header>
          <Accordion.Body
            style={{ display: "flex", gap: "20px", cursor: "pointer" }}
          >
            In this course, you will learn the benefits of asynchronous
            JavaScript properties. You will create calls to various APIs using
            four different techniques.{" "}
            <div style={{ color: "blue" }}>Watch now</div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default AccordionBox;
