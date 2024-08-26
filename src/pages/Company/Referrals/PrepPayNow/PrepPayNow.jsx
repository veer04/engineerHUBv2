import React, { useState } from "react";
import FormInput from "../../../../components/FormInputs/FormInput";
import FormInputEmail from "../../../../components/FormInputs/FormInputEmail";
import FormInputFileUpload from "../../../../components/FormInputs/FormInputFileUpload";
import { Link, useLocation } from "react-router-dom";
import {
  emailExpression,
  mobileNumberExpression,
} from "../../../../features/regex";
import useGlobalSnackbar from "../../../../hooks/useGlobalSnackbar";
import "./preppaynow.css";
import axios from "axios";
import { getAccessToken } from "../../../../features/getCookieValues";
import { FRONTEND_URL, PAYMENT_API_URL } from "../../../../services/APIUtils";

const PrepPayNow = () => {
  const [name, setName] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [email, setEmail] = useState([]);
  const [productData, setProductData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const { singleProductData } = location.state || "";

  console.log(singleProductData, "jhgf");
  localStorage.setItem("singleProductData", JSON.stringify(singleProductData));

  const { title, description, price, _id } = singleProductData;

  const priceOfproduct = price;
  const gst = 0.18;
  const platformFees = 0.02;
  const gstAmount = price * gst;
  const platformAmount = price * platformFees;

  const totalPrice = priceOfproduct + gstAmount + platformAmount;

  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();
  let errorStack = [];

  function addToErrorStack(elem) {
    errorStack.push(elem);
  }

  const [errors, setErrors] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    resume: "",
    extraQuestions: "",
  });

  const validateInput1 = () => {
    let valid = true;
    const newErrors = {
      name: "",
      phoneNumber: "",
      email: "",
      resume: "",
      extraQuestions: "",
    };

    if (!name) {
      newErrors.name = "Name is required";
      valid = false;
      addToErrorStack("#name");
    } else if (!/^[a-zA-Z\d\s]+$/.test(name)) {
      newErrors.name = "Name should not contain special characters";
      valid = false;
      addToErrorStack("#name");
    } else if (name.length < 3) {
      newErrors.name = "Name should be at least 3 characters";
      valid = false;
      addToErrorStack("#name");
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
      valid = false;
      addToErrorStack("#phoneNumber");
    } else if (phoneNumber.length < 10) {
      newErrors.phoneNumber = "Phone Number should be at least 10 digits";
      valid = false;
      addToErrorStack("#phoneNumber");
    } else if (!mobileNumberExpression.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format!";
      valid = false;
      addToErrorStack("#phoneNumber");
    }

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
      addToErrorStack("#email");
    } else if (!emailExpression.test(email)) {
      newErrors.email = "Invalid email format!";
      valid = false;
      addToErrorStack("#email");
    }

    setErrors(newErrors);
    return valid;
  };

  const handleFormSubmit = () => {
    if (!validateInput1()) {
      return;
    }
    setIsLoading(true);
    const payload = {
      name: name,
      email: email,
      mobile: phoneNumber,
    };

    axios
      .post(
        `${PAYMENT_API_URL}api/v1/course-purchase/request/${_id}`,
        payload,
        {
          headers: {
            accessToken: getAccessToken(),
          },
        }
      )
      .then(async (res) => {
        if (
          res.status === 200 ||
          res.status === 201 ||
          res.status === 202 ||
          res.status === 203 ||
          res.status === 204
        ) {
          const data = res.data;
          console.log(data, "productpaymentdata");
          setProductData(data?.data);
          localStorage.setItem(
            "productConfirmatonData",
            JSON.stringify(data.data)
          );
          setSnackbarMessage(
            "You Have Submitted all the details successfully!"
          );
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setIsLoading(false);
          setName([]);
          setPhoneNumber([]);
          setEmail([]);

          if (priceOfproduct === 0) {
            await axios
              .get(
                `${PAYMENT_API_URL}api/v1/course-purchase/confirmation/${data?.data?.coursePurchaseRequestId}`,
                {
                  headers: {
                    accessToken: getAccessToken(),
                  },
                }
              )
              .then((res) => {
                if (
                  res.status === 200 ||
                  res.status === 201 ||
                  res.status === 202 ||
                  res.status === 203 ||
                  res.status === 204
                ) {
                  const data = res.data;
                  localStorage.setItem(
                    "ProductPaymentData",
                    JSON.stringify(data.data)
                  );
                  console.log(data, "coursepurchasedata");
                  setSnackbarMessage(
                    "Your course has been purchased successfully!"
                  );
                  setSnackbarSeverity("success");
                  window.location.href =
                    "/referrals/product-book-now/payment/success";
                }
              });
          }
        }
      })
      .catch((res) => {
        if (res.status === 409) {
          window.alert("Fill the Details!");
        }
        setSnackbarMessage(
          "Some server error occurred while applying for this job!"
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setIsLoading(false);
      });
    console.log("Name:", name);
    console.log("Phone Number:", phoneNumber);
    console.log("Email:", email);
  };

  const handleProductPayment = async () => {
    const payload = {
      amount: totalPrice,
      currency: "INR",
      callback_url: `${FRONTEND_URL}referrals/product-book-now/payment/success`,
      callback_method: "get",
      platform: "course",
      coursePurchaseRequestId: productData?.coursePurchaseRequestId,
    };

    const response = await axios.post(
      `${PAYMENT_API_URL}api/v1/razorpay/createPaymentLink`,
      payload,
      {
        headers: {
          accessToken: getAccessToken(),
        },
      }
    );

    const data = response.data;

    console.log("api response:", data);
    if (
      data.status === 201 ||
      data.status === 200 ||
      data.status === 202 ||
      data.status === 203 ||
      data.status === 204
    ) {
      setSnackbarMessage("Payment Initialized successfully!");
      setSnackbarOpen(true);
      const pollInterval = setInterval(async () => {
        console.log(
          `${PAYMENT_API_URL}api/v1/razorpay/confirmCoursePayment/${productData?.coursePurchaseRequestId}`,
          "apiroute"
        );
        try {
          const checkResponse = await axios.get(
            `${PAYMENT_API_URL}api/v1/razorpay/confirmCoursePayment/${productData?.coursePurchaseRequestId}`,
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
      }, 2000);
    }

    console.log(data, "paymentData");
    console.log(data?.data?.payment_link, "paymentlink");
    window.location.href = data?.data?.payment_link;
  };

  return (
    <>
      <main className="prep-book-now-payment">
        <div className="main-book-now-container">
          <div className="book-goback-div">
            <div className="book-goback-btn">
              <img src="/chevro-left.svg" alt="" />
              <Link to={`/referrals/`} className="goback-button-link">
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

          <div className="text-div">
            <h4 className="text-h4">{title}</h4>

            <h3
              style={{
                fontSize: 14,
                color: "#547178",
                fontWeight: 400,
                lineHeight: "19px",
              }}
            >
              {description}
            </h3>
          </div>

          <div style={{ margin: "40px 0px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: ".75rem",
                flexWrap: "nowrap",
              }}
            >
              <FormInput
                label="Name"
                id="name"
                name="name"
                required
                placeholder="Enter your Name"
                value={name}
                setValue={setName}
                helperText={errors.name}
                className="mb-4 w-100"
              />
              <FormInput
                label="Phone Number"
                id="phoneNumber"
                name="phoneNumber"
                required
                placeholder="Enter your Phone Number"
                value={phoneNumber}
                setValue={setPhoneNumber}
                helperText={errors.phoneNumber}
                className="mb-4 w-100"
              />
            </div>

            <FormInputEmail
              label="Email"
              id="contactEmail"
              name="contactEmail"
              required
              placeholder="Enter your Email"
              value={email}
              setValue={setEmail}
              helperText={errors.email}
              className="mb-4"
            />

            <div>
              <button
                onClick={() => handleFormSubmit()}
                style={{
                  padding: "10 24",
                  backgroundColor: "#138382",
                  border: "none",
                  outline: "none",
                  padding: "10px 24px",
                  width: "170px",
                  height: "48px",
                  color: "white",
                  fontSize: 14,
                  borderRadius: 5,
                  cursor: "pointer",
                  marginTop: 10,
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  "Confirm Details"
                )}
              </button>
            </div>

            {productData?.coursePurchaseRequestId && priceOfproduct > 0 ? (
              <div
                className="paynow-div-prep"
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
                    Pay - &#8377;{totalPrice}
                  </h4>
                </div>

                <div>
                  <button
                    onClick={() => handleProductPayment()}
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
                    Pay Now
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {priceOfproduct && priceOfproduct > 0 ? (
            <div
              style={{
                background: "#f8f8f9",
                padding: "16px",
                borderRadius: "10px",
                marginTop: 20,
                marginBottom: "3.5rem",
              }}
            >
              <h4 style={{ fontSize: "16px", fontWeight: 600 }}>
                Bill Summary
              </h4>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0 8px",
                  marginTop: 14,
                }}
              >
                <h3 style={{ fontSize: "14px", fontWeight: 400 }}>Total MRP</h3>
                <h3 style={{ fontSize: "14px", fontWeight: 400 }}>
                  ₹{priceOfproduct}
                </h3>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0 8px",
                  marginTop: 5,
                }}
              >
                <h3 style={{ fontSize: "14px", fontWeight: 400 }}>
                  Taxes and platform fees
                </h3>
                <h3 style={{ fontSize: "14px", fontWeight: 400 }}>
                  ₹{gstAmount}
                </h3>
              </div>

              <div style={{ border: "1px solid #002B36", marginTop: 4 }}></div>

              <div
                style={{
                  marginTop: 15,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h4 style={{ fontSize: "16px", fontWeight: 600 }}>
                  Total Amount
                </h4>

                <h4 style={{ fontSize: "16px", fontWeight: 600 }}>
                  ₹{totalPrice}
                </h4>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
};

export default PrepPayNow;
