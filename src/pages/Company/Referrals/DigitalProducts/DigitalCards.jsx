import React from "react";
import "./digitalcard.css";
import { Link } from "react-router-dom";

const DigitalCards = ({
  discount,
  price,
  thumbnail,
  title,
  type,
  desc,
  id,
}) => {
  return (
    <>
      <Link to={`/referrals/product-book-now/${id}`}>
        <div className="digi-main-container">
          <div className="digi-img-container">
            <img src={"/digitalcard.png"} alt="" />
            <div className="popular-star">
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
                <h5 style={{ fontSize: "13px", marginTop: "10px" }}>5</h5>
                <img src={"/star.svg"} alt="" width={16} height={16} />
              </div>

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
                <h5 style={{ fontSize: "13px", marginTop: "5px" }}>Popular</h5>
              </div>
            </div>
          </div>

          <div className="digi-content-container">
            <h2 className="digi-h2">{title}</h2>

            <h4
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 3 /* Number of lines to show before truncating */,
              }}
              className="digi-h4"
            >
              {desc}
            </h4>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <div>
                <h5 style={{ fontSize: "12px", color: "#000" }}>Amount</h5>
                <h5
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    marginTop: "-5px",
                  }}
                >
                  &#8377;{price === 0 ? "Free" : price}
                </h5>
              </div>

              <div className="purchase-btn">
                <button>Purchase Now</button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default DigitalCards;
