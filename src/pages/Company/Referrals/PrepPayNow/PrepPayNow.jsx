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

const PrepPayNow = () => {
  const [name, setName] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [email, setEmail] = useState([]);
  const [resume, setResume] = useState("");
  const [extraQuestions, setExtraQuestions] = useState([]);
  const location = useLocation();
  const { singleProductData } = location.state || "";

  console.log(singleProductData, "jhgf");
  localStorage.setItem("singleProductData", JSON.stringify(singleProductData));

  const { title, description, price } = singleProductData;

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

    if (!resume) {
      newErrors.resume = "Resume is required";
      valid = false;
      addToErrorStack("#resume");
    }
    setErrors(newErrors);
    return valid;
  };

  const handleFormSubmit = () => {
    if (!validateInput1()) {
      return;
    }
  };

  return (
    <>
      <div className="prep-book-now-payment">
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
                type="submit"
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
              >
                Confirm Details
              </button>
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
                  Pay - &#8377;{"totalPrice"}
                </h4>
              </div>

              <div>
                <button
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
          </div>

          <div
            style={{
              background: "#f8f8f9",
              padding: "16px",
              borderRadius: "10px",
              marginTop: 20,
              marginBottom: "3.5rem",
            }}
          >
            <h4 style={{ fontSize: "16px", fontWeight: 600 }}>Bill Summary</h4>

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
        </div>
      </div>
    </>
  );
};

export default PrepPayNow;
