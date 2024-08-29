import React, { useEffect, useState } from "react";
import "./booknowsuccessproduct.css";
import { Link } from "react-router-dom";
import { PAYMENT_API_URL } from "../../../../services/APIUtils";
import axios from "axios";
import { getAccessToken } from "../../../../features/getCookieValues";

const BookNowSuccessProduct = () => {
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [paymentData1, setPaymentData1] = useState([]);
  const storedData = localStorage.getItem("paymentData");
  const paymentData = storedData ? JSON.parse(storedData) : null;
  console.log(storedData, "storeddate");

  const productPaymentData = JSON.parse(
    localStorage.getItem("ProductPaymentData")
  );

  const confirmationData = JSON.parse(
    localStorage.getItem("productConfirmatonData")
  );

  // const paymentResponse = JSON.parse(localStorage.getItem("paymentData"));

  // console.log(paymentResponse, "PaymentResponse");

  const singleProductData = JSON.parse(
    localStorage.getItem("singleProductData")
  );

  console.log(productPaymentData, "jhgf");

  console.log(confirmationData?.coursePurchaseRequestId, "jhgf");

  const pollInterval = () =>
    setInterval(async () => {
      console.log(
        `${PAYMENT_API_URL}api/v1/razorpay/confirmCoursePayment/${confirmationData?.coursePurchaseRequestId}`,
        "apiroute"
      );
      try {
        const checkResponse = await axios.get(
          `${PAYMENT_API_URL}api/v1/razorpay/confirmCoursePayment/${confirmationData?.coursePurchaseRequestId}`,
          {
            headers: {
              accessToken: getAccessToken(),
            },
          }
        );

        const checkData = checkResponse.data;

        if (checkData.status === "success") {
          clearInterval(pollInterval);
          setSnackbarMessage("Payment confirmed successfully");
          setSnackbarOpen(true);
          setPaymentData1(checkData.data);

          localStorage.setItem("paymentData", JSON.stringify(checkData.data));
        } else if (checkData.status === "failed") {
          clearInterval(pollInterval);
          setSnackbarMessage("Payment failed");
          setSnackbarOpen(true);
          window.location.href = "/referrals/booking/payment/failed";
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    }, 3000);

  useEffect(() => {
    pollInterval();
  }, []);

  function downloadFile() {
    // if (!paymentData1 || !paymentData1.coursePdf) {
    //   console.error("No valid URL found in productPayment");
    //   return;
    // }

    const imageUrl = paymentData1.coursePdf;
    setLoading(true);

    fetch(imageUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "downloaded_image.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        setDownloaded(true);
      })
      .catch((error) => console.error("Error downloading the file:", error));
    setLoading(false);
  }

  return (
    <main className="product-main-success-cont">
      <div className="main-sub-success">
        <h3 style={{ fontSize: "22px", textAlign: "center", fontWeight: 600 }}>
          Congratulations,
          {/* {productPaymentData?.name || "name"} */}
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
            style={{ fontSize: "16px", textAlign: "center", fontWeight: 600 }}
          >
            Thankyou for purchasing
          </h3>

          <h4
            style={{
              fontSize: "14px",
              textAlign: "center",
              fontWeight: 400,
              color: "#547178",
            }}
          >
            you can access the file below
          </h4>
        </div>

        <div className="success-calendar-change">
          <div className="calendar-content-data">
            <img style={{ marginRight: "10px" }} src="/pdf_img.svg" alt="" />

            <div>
              <h4 className="data-text-h4">
                {singleProductData.title ||
                  "Company wise preparation guide for Batch 24-25"}
              </h4>
              <h5 className="data-text-h5">PDF File</h5>
            </div>
          </div>

          <div className="calendar-button">
            <button
              style={{
                backgroundColor: downloaded ? "#80D1CE" : "#138382",
                color: downloaded ? "white" : "",
              }}
              onClick={() => {
                if (!loading && !downloaded) {
                  downloadFile();
                }
              }}
              className="calendar-btn-link"
            >
              {loading
                ? "Downloading.."
                : downloaded
                ? "Downloaded"
                : "Download"}
            </button>
          </div>
        </div>

        <div style={{ marginTop: 20 }} className="success-calendar-change">
          <h4 style={{ fontSize: "14px", color: "#002B36", fontWeight: 400 }}>
            The details have been shared to your mail.{" "}
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
      </div>
    </main>
  );
};

export default BookNowSuccessProduct;
