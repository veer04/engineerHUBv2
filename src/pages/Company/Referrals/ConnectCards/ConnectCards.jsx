import React from "react";
import "./connectcard.css";
import { useLocation, useNavigate } from "react-router-dom";

const ConnectCards = ({
  id,
  title,
  desc,
  duration,
  price,
  mrp,
  type,
  rating,
  popular,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location, "location");

  const handleBookNow = () => {
    navigate(`/referrals/book-now/${id}`, {
      state: { rating, popular },
    });
  };
  return (
    <>
      <div className="connect-card-main">
        <div className="connect-card-sub">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              width: "55px",
              height: "32px",
              padding: "4px 12px",
              gap: 3,
              borderRadius: 10,
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
            }}
          >
            <h5 style={{ fontSize: "13px", marginTop: "10px" }}>{rating}</h5>
            <img src={"/star.svg"} alt="" width={16} height={16} />
          </div>
          {popular && (
            <div
              style={{
                backgroundColor: "white",
                width: "72px",
                height: "32px",
                padding: "4px 12px",
                gap: 3,
                borderRadius: 10,
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
              }}
            >
              <h5 style={{ fontSize: "13px", marginTop: "5px" }}>{popular}</h5>
            </div>
          )}
        </div>

        {/* //heading resume saif */}
        <div style={{ marginTop: "10px" }}>
          <h5
            style={{
              display: "-webkit-box", // Enables the use of line clamping
              WebkitLineClamp: 2, // Limits the text to 2 lines
              WebkitBoxOrient: "vertical", // Sets the box orientation to vertical
              overflow: "hidden", // Hides the overflow text
              textOverflow: "ellipsis",
            }}
            className="resume-title"
          >
            {title}
          </h5>
        </div>

        <div className="meeting-duration">
          <div className="m-left-duration">
            <h5
              className="text-h5"
              style={{ fontSize: "12px", color: "#547178" }}
            >
              Meeting Duration
            </h5>
            <h5
              style={{ fontSize: "18px", fontWeight: "500", marginTop: "-5px" }}
            >
              {duration}
            </h5>
          </div>

          <div className="stick"></div>

          <div className="m-right-duration">
            <h5 style={{ fontSize: "12px", color: "#547178" }}>Amount</h5>
            <h5
              style={{ fontSize: "18px", fontWeight: "500", marginTop: "-5px" }}
            >
              {price === 0 ? (
                "Free"
              ) : (
                <>
                  &#8377;{price} <del>{mrp}</del>
                </>
              )}
            </h5>
          </div>
        </div>

        <div className="btn-book-now">
          {location.pathname === "/referrals" ||
          location.pathname === "/referrals/" ? (
            <button onClick={handleBookNow}>Book Now</button>
          ) : location.pathname === "/referrals/book-now/payment/" ? (
            <button style={{ color: "white" }}>Add Now</button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ConnectCards;
