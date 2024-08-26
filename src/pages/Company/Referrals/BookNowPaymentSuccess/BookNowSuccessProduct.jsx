import React, { useState } from "react";
import "./booknowsuccessproduct.css";
import { Link } from "react-router-dom";

const BookNowSuccessProduct = () => {
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const storedData = localStorage.getItem("paymentData");
  const paymentData = storedData ? JSON.parse(storedData) : null;
  console.log(storedData, "storeddate");

  const productPaymentData = JSON.parse(
    localStorage.getItem("ProductPaymentData")
  );

  const singleProductData = JSON.parse(
    localStorage.getItem("singleProductData")
  );

  console.log(productPaymentData, "jhgf");

  function downloadFile() {
    const productPaymentData = JSON.parse(
      localStorage.getItem("ProductPaymentData")
    );

    if (!productPaymentData || !productPaymentData.coursePdf) {
      console.error("No valid URL found in productPaymentData");
      return;
    }

    const imageUrl = productPaymentData.coursePdf;
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
    </main>
  );
};

export default BookNowSuccessProduct;
