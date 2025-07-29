
// EasyWayModal.jsx
import React from "react";
import { MdEmail, MdPhone } from "react-icons/md";
import "./easymodal.css";

const EasyWayModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleEmailClick = () => {
    window.open("mailto:info@engineerhub.in", "_blank");
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "+918303156089";
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <div className="modal-overlay-easyway">
      <div className="modal-box-easyway">
        <h3 className="modal-title">Kindly drop a call or mail</h3>

        <div className="modal-contact" onClick={handleEmailClick}>
          <MdEmail className="modal-icon" />
          <span>info@engineerhub.in</span>
        </div>

        <div className="modal-contact" onClick={handleWhatsAppClick}>
          <MdPhone className="modal-icon" />
          <span>+91 8303156089</span> 
        </div>

        <button className="modal-back-btn" onClick={onClose}>
          Back
        </button>
      </div>
    </div>
  );
};

export default EasyWayModal;

{/*import React from "react";
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
*/}