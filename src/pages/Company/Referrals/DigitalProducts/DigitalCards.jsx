import React from "react";
import "./digitalcard.css";
import { Link, useNavigate } from "react-router-dom";

const DigitalCards = ({
  discount,
  price,
  mrp,
  thumbnail,
  title,
  subTitle,
  type,
  desc,
  id,
  popular,
  rating,
}) => {
  const navigate = useNavigate();

  const handlePurchaseNow = () => {
    navigate(`/referrals/product-book-now/${id}`, {
      state: { rating, popular },
    });
  };

  return (
    <>
      {/* <Link to={`/referrals/product-book-now/${id}`}> */}
      <div className="digi-main-container">
        <div className="digi-img-container">
          <img src={thumbnail} alt="" width={324} height={183} />
          <div className="popular-star">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                width: "65px",
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
                <h5 style={{ fontSize: "13px", marginTop: "5px" }}>
                  {popular}
                </h5>
              </div>
            )}
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
              WebkitLineClamp: 1 /* Number of lines to show before truncating */,
            }}
            className="digi-h4"
          >
            {subTitle}
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
                  fontSize: "18px",
                  fontWeight: "600",
                  marginTop: "-5px",
                }}
              >
                {price === 0 ? (
                  "Free"
                ) : (
                  <>
                    <del style={{ fontSize: 16, color: "#828282" }}>
                      &#8377;{mrp}
                    </del>{" "}
                    &#8377;{price}
                  </>
                )}
              </h5>
            </div>

            <div onClick={handlePurchaseNow} className="purchase-btn">
              <button>Purchase Now</button>
            </div>
          </div>
        </div>
      </div>
      {/* </Link> */}
    </>
  );
};

export default DigitalCards;
