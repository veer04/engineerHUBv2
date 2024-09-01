import React from "react";
import "./paymentfailed.css";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <main className="main-failed-cont">
      <div className="main-sub-success">
        <h3 style={{ fontSize: "22px", textAlign: "center", fontWeight: 600 }}>
          Payment Failed!
        </h3>

        <div className="main-svg-el1">
          <img src="/g.png" alt="/el1.svg" />
          <img
            className="tick-svg"
            src="/failed_payment_animation_150x150.gif"
            alt=""
          />
        </div>

        <div style={{ marginTop: 30 }}>
          <h3
            style={{
              fontSize: "16px",
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            Don’t worry your money is safe!
          </h3>

          <h4
            style={{
              fontSize: "14px",
              textAlign: "center",
              fontWeight: 400,
              color: "#547178",
            }}
          >
            If your money is debited from your account. It will be refunded
            automatically in 4-5 working days.
          </h4>
        </div>

        <div className="success-calendar-change">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h4 className="data-text-h4">Payment ID:</h4>
            <h5 className="data-text-h5">Time & Date</h5>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            <h4 className="data-text-h4-ab">ABC123456789</h4>
            <h5 className="data-text-h5-ab">12:30 AM, 22 Aug 24</h5>
          </div>
        </div>

        <div style={{ marginTop: 20 }} className="success-calendar-raise">
          <img src="/circle-dot.svg" alt="" />
          <h4
            style={{
              fontSize: "14px",
              color: "#002B36",
              fontWeight: 400,
              marginBottom: 0,
              marginLeft: 5,
            }}
          >
            Raise Concern
          </h4>
        </div>
      </div>
    </main>
  );
};

export default PaymentFailed;
