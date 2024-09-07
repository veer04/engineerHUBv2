import React, { useEffect, useState } from "react";
import "./booknowsuccessproduct.css";
import { Link } from "react-router-dom";
import { API_URL, PAYMENT_API_URL } from "../../../../services/APIUtils";
import axios from "axios";
import { getAccessToken } from "../../../../features/getCookieValues";
import useGlobalSnackbar from "../../../../hooks/useGlobalSnackbar";

const BookNowSuccessProduct = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const [paymentData1, setPaymentData1] = useState([]);
  const [downloadButtonToShow, setDownloadButtonToShow] = useState([]);

  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();
  const storedData = localStorage.getItem("paymentData");
  const paymentData = storedData ? JSON.parse(storedData) : null;
  // console.log(storedData, "storeddate");

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

  console.log(paymentData1, "saifalam");
  console.log(downloadButtonToShow, "kaifalam");

  // console.log(productPaymentData, "jhgf");

  console.log(confirmationData?.coursePurchaseRequestId, "jhgf");

  // const pollInterval = setInterval(async () => {

  //   try {
  //     const checkResponse = await axios.get(
  //       `${PAYMENT_API_URL}api/v1/razorpay/confirmCoursePayment/${confirmationData?.coursePurchaseRequestId}`,
  //       {
  //         headers: {
  //           accessToken: getAccessToken(),
  //         },
  //       }
  //     );

  //     const checkData = checkResponse.data;
  //     console.log(checkData, "checkData");
  //     setDownloadButtonToShow(checkData.data);
  //     console.log(checkData, "kjhgf");
  //     setPaymentData1(checkData.data);

  //     if (checkData?.data?.isPaymentPaid === true) {
  //       clearInterval(pollInterval);
  //       setSnackbarMessage("Payment confirmed successfully");
  //       setSnackbarOpen(true);
  //       // setPaymentData1(checkData.data);

  //       localStorage.setItem("paymentData", JSON.stringify(checkData.data));
  //     } else if (checkData.status === "failed") {
  //       clearInterval(pollInterval);
  //       setSnackbarMessage("Payment failed");
  //       setSnackbarOpen(true);
  //       window.location.href = "/referrals/booking/payment/failed";
  //     }
  //   } catch (error) {
  //     console.error("Error checking payment status:", error);
  //   }
  // }, 3000);

  const paymentCheckingApi = async () => {
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
      console.log(checkData, "checkData");
      setDownloadButtonToShow(checkData);
      console.log(checkData, "kjhgf");
      setPaymentData1(checkData.data);

      if (checkData?.data?.isPaymentPaid === true) {
        setSnackbarMessage("Payment confirmed successfully");
        setSnackbarOpen(true);
        // setPaymentData1(checkData.data);

        localStorage.setItem("paymentData", JSON.stringify(checkData.data));
      } else {
        paymentCheckingApi();
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
    }
  };

  useEffect(() => {
    paymentCheckingApi();
  }, []);

  // api/v1/downloadPdf?title=“”&url=“”

  // const download = async () => {
  //   if (status === "loading") return;
  //   setStatus("loading");
  //   await axios({
  //     url: `${API_URL}api/v1/downloadPdf?title=${singleProductData.title}&url=${paymentData.coursePdf}`,
  //     method: "GET",
  //     responseType: "blob",
  //     onDownloadProgress: (progressEvent) => {
  //       let percentCompleted = Math.round(
  //         (progressEvent.loaded * 100) / progressEvent.total
  //       );

  //       setProgress(percentCompleted);
  //     },
  //   })
  //     .then((response) => {
  //       setProgress(100);
  //       const blob = new Blob([response.data], {
  //         type: "application/pdf",
  //       });

  //       const link = document.createElement("a");
  //       link.href = URL.createObjectURL(blob);
  //       link.setAttribute("download", `${singleProductData.title}.pdf`);
  //       link.click();
  //       setStatus("downloaded");
  //       setProgress(0);
  //     })
  //     .catch((err) => {
  //       setStatus("failed");
  //       setSnackbarMessage(
  //         <>
  //           <span>Download failed</span>
  //           {err?.response?.data?.message && (
  //             <>
  //               {" "}
  //               <br />
  //               <span>Error: {err?.response?.data?.message}</span>
  //             </>
  //           )}
  //         </>
  //       );
  //       setSnackbarSeverity("error");
  //       setSnackbarDuration(5000);
  //       setSnackbarOpen(true);
  //       console.error(err);
  //       setProgress(0);
  //     });
  // };

  const download = async () => {
    if (loading) return; // Prevent multiple downloads
    setLoading(true); // Indicate loading
    setStatus("loading"); // Set status to loading

    try {
      const response = await axios({
        url: `${API_URL}api/v1/downloadPdf?title=${singleProductData?.title}&url=${paymentData1?.coursePdf}`,
        method: "POST",
        data: { title: singleProductData?.title, url: paymentData1?.coursePdf },
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted); // Update progress
        },
      });

      setProgress(100); // Download completed
      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", `${singleProductData?.title}.pdf`);
      link.click();

      setDownloaded(true); // Mark as downloaded
      setStatus("downloaded");
      setSnackbarMessage("Download successful!");
      setSnackbarOpen(true);
    } catch (err) {
      setStatus("failed");
      setSnackbarMessage(
        <>
          <span>Download failed</span>
          {err?.response?.data?.message && (
            <>
              <br />
              <span>Error: {err?.response?.data?.message}</span>
            </>
          )}
        </>
      );
      setSnackbarSeverity("error");
      setSnackbarDuration(5000);
      setSnackbarOpen(true);
      console.error(err);
    } finally {
      setLoading(false); // Reset loading state
      setProgress(0); // Reset progress state
    }
  };

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
        link.download = "download.pdf";
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

          {downloadButtonToShow?.data?.isPaymentPaid === true ? (
            <div className="calendar-button">
              <button
                style={{
                  backgroundColor: downloaded ? "#80D1CE" : "#138382",
                  color: downloaded ? "white" : "",
                }}
                onClick={() => {
                  download();
                }}
                className="calendar-btn-link"
                disabled={loading}
              >
                {loading ? (
                  <>{progress}%</>
                ) : downloaded ? (
                  "Downloaded"
                ) : (
                  "Download"
                )}
              </button>
            </div>
          ) : null}
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

        {/* <Link
          to={
            "https://docs.google.com/forms/d/e/1FAIpQLSeHSI4eYnFcJwTGZCPYn7cMSpUryIASWxKYIeguyCR1y7JNGQ/viewform"
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

export default BookNowSuccessProduct;
