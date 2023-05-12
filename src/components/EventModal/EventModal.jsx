import React, { useState } from "react";
import "./EventModal.css";
import ReactDOM from "react-dom";
import Modal from "./Modal";
import { createPortal } from "react-dom";

export default function EventModal({ onClose, actionBar }) {
  // let node = null;
  node = document.createElement("div");
  node.id = "event-modal-container";
  document.body.appendChild(node);
  console.log("test");
  ReactDOM.createPortal(
    <>
      <span>Hello</span>
      {/* <Modal actionBar={actionBar} onClose={onClose} /> */}
    </>,
    node
  );
  // ReactDOM.render();
  // return ReactDOM.createPortal(
  //   <React.StrictMode>
  //     <Modal actionBar={actionBar} onClose={onClose} />
  //   </React.StrictMode>,
  //   document.querySelector(".event-modal-container")
  // );
}
