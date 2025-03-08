import React, { useEffect, useState } from "react";
import "./companywiseprep.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import FeedBackCarousalForBookNow from "../FeedbackCarousalForBookNow/FeedBackCarousalForBookNow";
import { getAccessToken } from "../../../../features/getCookieValues";
import axios from "axios";
import { Link } from "react-router-dom";
import { PAYMENT_API_URL } from "../../../../services/APIUtils";
import { isUserLoggedIn } from "../../../../features/User/UserDetails";
import { redirectToAuth } from "../../../../features/redirectToAuth";

const CompanyWisePrep = () => {
  const { booknowId } = useParams();
  const [singleProductData, setSingleProductData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const { rating, popular } = location.state || {};
  // const [excludedId, setExcludedId] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 520);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false); // Set loading to false when the image loads
  };

  const handleImageError = () => {
    setIsError(true); // Set error to true if the image fails to load
    setIsLoading(false);
  };

  const getAllSingleProductData = async () => {
    try {
      const config = {
        headers: {
          accesstoken: getAccessToken(),
        },
      };

      const { data } = await axios.get(
        `${PAYMENT_API_URL}api/v1/course?_id=${booknowId}&ehub_referral=${
          location?.search?.split("ref=")[1]?.split("&")[0] || ""
        }`,
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

  function handleBuyNow() {
    if (!isUserLoggedIn()) {
      redirectToAuth("/login");
      return null;
    }
    navigate(
      `/referrals/product-book-now/payment${
        location.search.includes("ref")
          ? `?ref=${location?.search?.split("ref=")[1]?.split("&")[0]}`
          : ``
      }`,
      {
        state: { singleProductData, rating },
      }
    );
  }

  return (
    <div className="prep-main-comp">
      <div className="prep-main-sub">
        <div className="prep-goback-div">
          <div className="goback-btn">
            <img src="/chevro-left.svg" alt="" />
            <Link
              to={`/referrals${
                location.search.includes("ref")
                  ? `?ref=${location?.search?.split("ref=")[1]?.split("&")[0]}`
                  : ``
              }`}
              className="goback-button-link"
            >
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
            <h5 style={{ fontSize: "13px", marginTop: "10px" }}>
              {rating || "5"}
            </h5>
            <img src={"/star.svg"} alt="" width={16} height={16} />
          </div>

          {/* rating button */}
        </div>

        <div className="prep-slide">
          {isLoading ? (
            <div className="spinner-border text-[#138382]" role="status">
              <span className="sr-only"></span>
            </div>
          ) : null}

          {!isError && (
            <img
              className="slide-img"
              onLoad={handleImageLoad}
              onError={handleImageError}
              src={singleProductData?.thumbnail}
              alt=""
              style={{ display: isLoading ? "none" : "block" }}
            />
          )}

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

          {/* <h3 className="text-h3">More details</h3> */}
        </div>

        <div className="prep-more-details-content">
          {/* <h4 className="text-h4-content">{singleProductData.description}</h4> */}
          <h4 className="text-h4">More Details</h4>

          <h4
            className="text-h4-content"
            dangerouslySetInnerHTML={{
              __html: singleProductData.description,
            }}
          ></h4>
        </div>

        <div className="prep-feedback-section">
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <h3 className="text-h3">Recent Feedback</h3>
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
          {isMobile ? (
            <>
              <FeedBackCarousalForBookNow
                content={
                  "Resourceful List! I've applied to some open positions among these."
                }
                name={"Rahul Pratap"}
                profile={"dd/mm/yy"}
              />
            </>
          ) : (
            <>
              <FeedBackCarousalForBookNow
                content={
                  "Thank you for providing such a wonderful resource it helped me a lot in my preparation."
                }
                name={"Girish Shedge"}
                // profile={"dd/mm/yy"}
              />
              {/* 
              <FeedBackCarousalForBookNow
                content={
                  "Thanks for helping in understanding resume to attract recruiters."
                }
                name={"Ravindra Babu"}
                profile={"dd/mm/yy"}
              /> */}
            </>
          )}
        </div>

        <div
          className="paynow-div-payment-prep-div"
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
              onClick={() => handleBuyNow()}
              type="submit"
              style={{
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
