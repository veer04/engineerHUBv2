import React from "react";
import "./booknowpaymentsuccess.css";

const BookNowPaymentSuccess = () => {
  return (
    <div className="main-success-cont">
      <div className="main-sub-success">
        <h3 style={{ fontSize: "22px", textAlign: "center", fontWeight: 600 }}>
          Congratulations, Name
        </h3>

        <div className="main-svg-el1">
          <img src="/el1.svg" alt="/el1.svg" />
          <img className="tick-svg" src="/tick.svg" alt="" />
        </div>

        <div style={{ marginTop: 10 }}>
          <h3
            style={{ fontSize: "16px", textAlign: "center", fontWeight: 600 }}
          >
            Your booking is confirmed
          </h3>

          <h4
            style={{ fontSize: "16px", textAlign: "center", fontWeight: 400 }}
          >
            for job referral and carrer guidance
          </h4>
        </div>

        <div className="success-calendar-change">
          <div className="calendar-content-data">
            <img style={{ marginRight: "10px" }} src="/Calender2.svg" alt="" />

            <div>
              <h4 className="data-text-h4">{"Thu, 26"}</h4>
              <h5 className="data-text-h5">{"1:00 AM - 1:30 AM "}</h5>
            </div>
          </div>

          <div className="calendar-button">
            <button className="calendar-btn-link">Link</button>
          </div>
        </div>

        <div style={{ marginTop: 20 }} className="success-calendar-change">
          <h4 style={{ fontSize: "14px", color: "#002B36", fontWeight: 400 }}>
            Booking details and the meeting link have been shared to your mail.
            Check now.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default BookNowPaymentSuccess;
