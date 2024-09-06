import React, { useEffect, useState } from "react";
import "./booknowpaymentsuccess.css";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

const BookNowPaymentSuccess = () => {
  const [params, setParams] = useSearchParams({
    selectedDates: "",
    selectedTime: "",
  });

  const [meetingData, setMeetingData] = useState(() => {
    return (
      location.state?.meetingData ||
      JSON.parse(localStorage.getItem("meetingData"))
    );
  });

  useEffect(() => {
    if (meetingData)
      localStorage.setItem("meetingData", JSON.stringify(meetingData));
  }, [meetingData]);

  const selectedDates = localStorage.getItem("selectedDates");
  const selectedTime = localStorage.getItem("selectedTime");

  const MeetPaymentData = JSON.parse(localStorage.getItem("BookNowPayment"));

  console.log(MeetPaymentData, "MeetPaymentData");

  // Extract query parameters
  // const queryParams = new URLSearchParams(window.location.search);
  // const selectedDates = queryParams.get("selectedDates");
  // const selectedTime = queryParams.get("selectedTime");

  console.log("Selected Dates:", selectedDates);
  console.log("Selected Time:", selectedTime);

  const a = params.get("selectedDates");
  const b = params.get("selectedTime");

  return (
    <main className="main-success-cont">
      <div className="main-sub-success">
        <h3 style={{ fontSize: "22px", textAlign: "center", fontWeight: 600 }}>
          Congratulations,
          {/* {MeetPaymentData?.name || "name"} */}
        </h3>

        <div className="main-svg-el1">
          <img src="/el1.svg" alt="/el1.svg" />
          <img
            className="tick-svg"
            src="/success_page_animation_150x150.gif"
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
            Your booking is confirmed
          </h3>

          <h4
            style={{
              fontSize: "14px",
              textAlign: "center",
              fontWeight: 400,
              color: "#547178",
            }}
          >
            For {meetingData.title}
          </h4>
        </div>

        <div className="success-calendar-change">
          <div className="calendar-content-data">
            <img style={{ marginRight: "10px" }} src="/Calender2.svg" alt="" />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h4 className="data-text-h4">
                Date:{selectedDates} | Time:{selectedTime}
              </h4>
              {/* <h5 className="data-text-h5">{selectedTime}</h5> */}
            </div>
          </div>

          <div className="calendar-button">
            {/* <button className="calendar-btn-link">Link</button> */}
          </div>
        </div>

        <div style={{ marginTop: 20 }} className="success-calendar-change">
          <h4 style={{ fontSize: "14px", color: "#002B36", fontWeight: 400 }}>
            Booking details and the meeting link have been shared to your mail.
            <Link to={"https://mail.google.com/"}>
              <span
                style={{
                  color: "blue",
                  fontWeight: "600",
                  textDecoration: "underline",
                }}
              >
                Check Now
              </span>
            </Link>
          </h4>
        </div>
      </div>
      <div
        className="concern-btn"
        style={{
          height: "auto",
          margin: "0 auto",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <div>
          <img src="/circle-dot.svg" alt="" />
        </div>

        <div>
          <h3
            style={{
              fontSize: "14px",
              color: "#002B36",
              fontWeight: 400,
              marginBottom: 0,
              marginLeft: 8,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link
              to={
                "https://wa.me/918303156089?text=Hey%20Rishabh,%20I%20have%20some%20issue!"
              }
              target="_blank"
            >
              Raise Concern
            </Link>
          </h3>
        </div>

        {/* <Link
          to={
            "https://docs.google.com/forms/d/e/1FAIpQLSf0NZgIoidtJUf9haEmvYBzaZ3xCG4l8d25AXOy_OzwbZxOqA/viewform"
          }
          target="_blank"
          style={{
            marginLeft: "auto",
            background: "#138382",
            padding: "8px 14px",
            borderRadius: "10px",
            color: "white",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            fontSize: 14,
            wordBreak: "break-word",
          }}
        >
          Give Testimonial
        </Link> */}
      </div>
    </main>
  );
};

export default BookNowPaymentSuccess;
