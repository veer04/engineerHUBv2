import React, { useState } from "react";
import "./EventModal.css";
import ReactDOM from "react-dom/client";
import Modal from "./Modal";

export default function EventModal({ onClose, actionBar }) {
  let node = null;
  node = document.createElement("div");
  node.id = "event-modal-container";
  document.body.appendChild(node);
  ReactDOM.render(
    <>
      Hello
      <Modal actionBar={actionBar} onClose={onClose} />
    </>,
    node
  );
  // return ReactDOM.createPortal(
  //   <React.StrictMode>
  //     <Modal actionBar={actionBar} onClose={onClose} />
  //   </React.StrictMode>,
  //   document.querySelector(".event-modal-container")
  // );
}
