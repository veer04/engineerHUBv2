import React from "react";
import "./easymodal.css";

const EasyWayModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleEmailClick = () => {
    window.open("mailto:info@engineerhub.in", "_blank");
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "918303156089";
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <div className="modal-overlay-eas-way-card">
      <div className="modal-custom">
        <h3>Drop a call or mail </h3>
        <label>Email</label>
        <input
          type="email"
          placeholder="info@engineerhub.in"
          readOnly
          onClick={handleEmailClick}
        />
        <label>Phone no</label>
        <input
          type="tel"
          placeholder="+91 83031 56089"
          readOnly
          onClick={handleWhatsAppClick}
        />
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EasyWayModal;
