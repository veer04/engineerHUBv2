import "./PopUpModal.css";
import React, { useRef } from "react";
import { useEffect } from "react";
import { Bucket_URL } from "../../services/APIUtils";

export default function PopUpModalBootstrap() {
  const ref = useRef(null);

  function handleOpenModal() {
    // start a 20 second timer. After 20 seconds open the modal.
    setTimeout(() => {
      ref.current.click();
      sessionStorage.setItem("promoModalAlreadyOpened", "true");
    }, 20000);
  }

  useEffect(() => {
    if (!(sessionStorage.getItem("promoModalAlreadyOpened") === "true")) {
      handleOpenModal();
    }
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ display: "none" }}
        ref={ref}
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-promo justify-content-center">
          <div className="modal-content">
            <a
              className="promo-image-pop-up-link"
              href="https://bit.ly/45bFpz6"
              target="__blank"
            >
              <img
                className="promo-image-pop-up"
                src={`${Bucket_URL}frontend/promotionPopUp/geekster.png`}
                alt="Geekster Poster"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
