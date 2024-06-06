import "./PopUpModal.css";
import React from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Bucket_URL } from "../../services/APIUtils";

export default function PopUpModal() {
  //function to find out window current scroll position
  function getScrollPosition() {
    var doc = document.documentElement;
    var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    return { top, left };
  }

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    // start a 20 second timer. After 20 seconds open the modal.
    setTimeout(() => {
      setIsModalOpen(true);
    }, 20000);
  }

  function handleModalClose() {
    // set promotionModal to true in session storage. This will prevent the modal from opening again.
    sessionStorage.setItem("promotionModalAlreadyOpened", "true");
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (!(sessionStorage.getItem("promotionModalAlreadyOpened") === "true")) {
      handleOpenModal();
    }
  }, []);

  return ReactDOM.createPortal(
    <>
      {isModalOpen && (
        <div
          style={{
            top: getScrollPosition().top,
            left: getScrollPosition().left,
          }}
          id="edit-modal"
          onClick={() => {
            handleModalClose();
          }}
        >
          <div className="">
            <div className="modal-cancel-button-container">
              <RxCross2 className="modal-cancel-button" />
            </div>
            <a href="https://bit.ly/45bFpz6" target="__blank">
              <img
                className="promo-image-pop-up"
                src={`${Bucket_URL}frontend/promotionPopUp/geekster.png`}
                alt="Geekster"
              />
            </a>
          </div>
        </div>
      )}
    </>,
    document.querySelector("#modal")
  );
}
