import React from "react";

const PaymentRedirectPopup = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2 style={styles.heading}>Redirecting to Payment Page</h2>
        <p style={styles.message}>Please wait while we redirect you...</p>
        <button style={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.0)", // Transparent background to only show the popup
    zIndex: 1000,
  },
  popup: {
    width: "300px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#138382",
  },
  message: {
    fontSize: "14px",
    color: "#555",
  },
  closeBtn: {
    marginTop: "15px",
    padding: "8px 16px",
    backgroundColor: "#138382",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default PaymentRedirectPopup;
