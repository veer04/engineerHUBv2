import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../../components/EventModal/Modal";


export default function ParticularEvent({ setIsEventModalOpen }) {
  const [showModal, setShowModal] = useState(true);


  function handleClose() {
    setShowModal(false);
  }

  useEffect(() => {
    setIsEventModalOpen(true);

    return () => {
      setIsEventModalOpen(false);
    };
  }, [showModal]);

  const modal = <Modal handleClose={handleClose} setShowModal={setShowModal} />;
  if (showModal === false) return null;

  return modal;
}
