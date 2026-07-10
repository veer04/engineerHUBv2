import React, { useState } from "react";
import "./easywaycard.css";
import { FreeOrangeBand } from "../../../../../components/SvgsIconsComps/SvgsComps";
import EasyWayModal from "./EasyWayModal";
import { getUserRole } from "../../../../../features/User/UserDetails";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EasyWayCard = ({ data }) => {
  const { title, desc, bgColor, btnText, btnUrl, isFree } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const role = getUserRole();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleNavigate = () => {
    if (btnText === "Connect Now") {
      document
        .getElementById("book-slot-section")
        ?.scrollIntoView({ behavior: "smooth" });
    } else if (btnText === "Host Now") {
      document
        .getElementById("hire-talent-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <EasyWayModal isOpen={isModalOpen} onClose={closeModal} />
      <div className="main-card-div-easy" style={{ background: bgColor }}>
        {isFree === true ? (
          <div className="free-band">
            <FreeOrangeBand />

            <h3 className="free-text">FREE</h3>
          </div>
        ) : null}

        <div className="card-info">
          <h3 className="card-h3">{title}</h3>

          <p className="card-p">{desc}</p>

          <div className="card-btn-div" onClick={handleNavigate}>
            <button>{btnText}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EasyWayCard;
