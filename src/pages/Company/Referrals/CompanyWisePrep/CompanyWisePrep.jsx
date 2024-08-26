import React, { useEffect, useState } from "react";
import "./companywiseprep.css";
import { useNavigate, useParams } from "react-router-dom";

import FeedBackCarousalForBookNow from "../FeedbackCarousalForBookNow/FeedBackCarousalForBookNow";
import { getAccessToken } from "../../../../features/getCookieValues";
import axios from "axios";
import { Link } from "react-router-dom";
import { PAYMENT_API_URL } from "../../../../services/APIUtils";
import { isUserLoggedIn } from "../../../../features/User/UserDetails";
import { redirectToAuth } from "../../../../features/redirectToAuth";

const CompanyWisePrep = () => {
  if (!isUserLoggedIn()) {
    redirectToAuth("/login");
    return null;
  }
  const { booknowId } = useParams();
  const [singleProductData, setSingleProductData] = useState([]);
  const navigate = useNavigate();

  console.log(booknowId, "booknowid");

  const getAllSingleProductData = async () => {
    try {
      const config = {
        headers: {
          accesstoken: getAccessToken(),
        },
      };

      const { data } = await axios.get(
        `${PAYMENT_API_URL}api/v1/course/${booknowId}`,
        config
      );

      console.log(data, "singleProductData");
      setSingleProductData(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSingleProductData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="prep-main-comp">
      <div className="prep-main-sub">
        <div className="prep-goback-div">
          <div className="goback-btn">
            <img src="/chevro-left.svg" alt="" />
            <Link to={"/referrals"} className="goback-button-link">
              Go Back
            </Link>
          </div>
          {/* rating button */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              width: "63px",
              height: "32px",
              padding: "4px 14px",
              gap: 3,
              borderRadius: 10,
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
            }}
          >
            <h5 style={{ fontSize: "13px", marginTop: "10px" }}>5</h5>
            <img src={"/star.svg"} alt="" width={16} height={16} />
          </div>

          {/* rating button */}
        </div>

        <div className="prep-slide">
          <img className="slide-img" src="/slider-prep.png" alt="" />

          <div className="prep-popular-star">
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

        <div className="prep-24">
          <h4 className="text-h4">{singleProductData.title}</h4>

          <h3 className="text-h3">More details</h3>
        </div>

        <div className="prep-more-details-content">
          {/* <h4 className="text-h4">Here for the z at Amazon:</h4> */}
          <h4 className="text-h4-content">{singleProductData.description}</h4>
        </div>

        <div className="prep-feedback-section">
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <h3 className="text-h3">Recent Feedbacks</h3>
          </div>

          {/* <div className="feedback-btn-main-div">
            <div className="feedback-btn">
              <img src="/chevro-left.svg" alt="" />
              <Link className="feedback-button-link">Previous</Link>
            </div>

            <div className="feedback-btn">
              <Link className="feedback-button-link">Next</Link>
              <img src="/chevro-right.svg" alt="" />
            </div>
          </div> */}
        </div>

        <div className="prep-feedback-carousal-div">
          <FeedBackCarousalForBookNow
            content={
              "I had an excellent experience during my referral session for Google. The guidance I received was precise and immensely helpful. The session provided invaluable insights, and my resume was expertly refined and improved. I highly recommend this service to anyone seeking professional and effective career advice. Thank you for making the process seamless and enjoyable."
            }
            name={"Girish Shedge"}
            profile={"dd/mm/yy"}
          />
          <FeedBackCarousalForBookNow
            content={
              "Good session. I understood the problems in my resume and corrected those"
            }
            name={"Girish Shedge"}
            profile={"dd/mm/yy"}
          />
        </div>

        <div
          className="paynow-div"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 40,
            background: "white",
            padding: "18px 12px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
            borderRadius: 5,
            position: "fixed",
            bottom: 0,
            transform: "translateX(-3.5%)",
            margin: "0 auto",
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: "#f7f9f9",
              padding: "13px 24px",
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h4
              style={{
                color: "#138382",
                fontSize: 16,
                marginBottom: "0px",
                textAlign: "center",
              }}
            >
              Pay - &#8377;{singleProductData.price}
            </h4>
          </div>

          <div>
            <button
              onClick={() =>
                navigate("/referrals/product-book-now/payment", {
                  state: { singleProductData },
                })
              }
              type="submit"
              style={{
                padding: "10 24",
                backgroundColor: "#138382",
                border: "none",
                outline: "none",
                padding: "10px 24px",
                width: "150px",
                height: "48px",
                color: "white",
                fontSize: 14,
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyWisePrep;
