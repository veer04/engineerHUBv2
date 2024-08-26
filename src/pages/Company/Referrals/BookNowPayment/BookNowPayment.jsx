import React, { useEffect, useState } from "react";
import "./booknowpayment.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import FormInputFileUpload from "../../../../components/FormInputs/FormInputFileUpload";
import { FaFilePdf } from "react-icons/fa";
import FormInputToggle from "../../../../components/FormInputs/FormInputToggle";
import useGlobalSnackbar from "../../../../hooks/useGlobalSnackbar";
import ConnectCards from "../ConnectCards/ConnectCards";
import { getAccessToken } from "../../../../features/getCookieValues";
import axios from "axios";
import {
  PAYMENT_API_URL,
  FRONTEND_URL,
  REFERRAL_REDIRECT_URL,
} from "../../../../services/APIUtils";
import { isUserLoggedIn } from "../../../../features/User/UserDetails";
import { redirectToAuth } from "../../../../features/redirectToAuth";
import FormInput from "../../../../components/FormInputs/FormInput";
import FormInputPhoneNumber from "../../../../components/FormInputs/FormInputPhoneNumber";
import FormInputEmail from "../../../../components/FormInputs/FormInputEmail";
import {
  emailExpression,
  mobileNumberExpression,
} from "../../../../features/regex";
import { patchResume } from "../../../../services/APIConfig";

const BookNowPayment = () => {
  if (!isUserLoggedIn()) {
    redirectToAuth("/login");
    return null;
  }
  const [name, setName] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [email, setEmail] = useState([]);
  const [resume, setResume] = useState("");
  const [extraQuestions, setExtraQuestions] = useState([]);
  const [usePreviousResume, setUsePreviousResume] = useState(false);
  const [isResumePresent, setIsResumePresent] = useState(false);
  const [allMeetData, setAllMeetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);

  const navigate = useNavigate();
  const [meetId, setMeetId] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [clicked, setClicked] = useState(false);

  // location.state.startDateTimeISO || JSON.parse(localStorage.getItem("startDateTimeISO"));
  const location = useLocation();
  const { startDateTimeISO, endDateTimeISO } = location.state || {};

  const [selectedDates, setSelectedDates] = useState(() => {
    return (
      location.state?.selectedDates ||
      JSON.parse(localStorage.getItem("selectedDates"))
    );
  });

  const [selectedTime, setSelectedTime] = useState(() => {
    return (
      location.state?.selectedTime ||
      JSON.parse(localStorage.getItem("selectedTime"))
    );
  });

  const [meetingData, setMeetingData] = useState(() => {
    return (
      location.state?.meetingData ||
      JSON.parse(localStorage.getItem("meetingData"))
    );
  });

  useEffect(() => {
    if (selectedDates)
      localStorage.setItem("selectedDates", JSON.stringify(selectedDates));
    if (selectedTime)
      localStorage.setItem("selectedTime", JSON.stringify(selectedTime));
    if (meetingData)
      localStorage.setItem("meetingData", JSON.stringify(meetingData));
    if (startDateTimeISO)
      localStorage.setItem(
        "startDateTimeISO",
        JSON.stringify(startDateTimeISO)
      );
    if (endDateTimeISO)
      localStorage.setItem("endDateTimeISO", JSON.stringify(endDateTimeISO));
  }, [
    selectedDates,
    selectedTime,
    meetingData,
    startDateTimeISO,
    endDateTimeISO,
  ]);

  const price = meetingData.price;
  const gst = 0.18;
  const platformFees = 0.02;
  const gstAmount = price * gst;
  const platformAmount = price * platformFees;

  const totalPrice = price + gstAmount + platformAmount;

  const getAllOpenMeet = async () => {
    try {
      const response = await fetch(`${PAYMENT_API_URL}api/v1/meet/open`);

      if (response.ok) {
        const data = await response.json();
        setAllMeetData(data?.data);

        console.log(data, "getallmeetdata");
      } else {
        throw new Error("error getting the data");
      }
    } catch (error) {
      console.error("error getting the data");
    }
  };

  useEffect(() => {
    getAllOpenMeet();
  }, []);

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

  function handleFormErrors() {
    if (errorStack.length > 0) {
      const element = document.querySelector(errorStack[0]);
      if (element) {
        window.scrollTo({
          behavior: "smooth",
          top: element.offsetTop - 200,
        });
      }
      setSnackbarMessage("Please fill all the required fields");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    errorStack = [];
  }

  // function validateForm() {
  //   let isValid = true;
  //   const errors = {
  //     name: "",
  //     phoneNumber: "",
  //     email: "",
  //     resume: "",
  //     extraQuestions: "",
  //   };

  //   if (name.length === 0) {
  //     errors.name = "Name is Required";
  //     isValid = false;
  //     addToErrorStack("#name");
  //   }
  //   if (!phoneNumber) {
  //     errors.phoneNumber = "Phone Number is Required";
  //     isValid = false;
  //     addToErrorStack("#phoneNumber");
  //   } else if (phoneNumber.length !== 10) {
  //     errors.phoneNumber = "Phone Number must be exactly 10 digits";
  //     isValid = false;
  //   }

  //   if (!email) {
  //     errors.email = "Email is Required";
  //     isValid = false;
  //     addToErrorStack("#email");
  //   }
  //   if (!usePreviousResume && !resume) {
  //     errors.resume = "Resume is required";
  //     isValid = false;
  //     addToErrorStack("#resume");
  //   }
  //   if (!extraQuestions) {
  //     errors.extraQuestions = "Extra Questions is Required";
  //     isValid = false;
  //     addToErrorStack("#extraQuestions");
  //   }

  //   setErrors(errors);
  //   handleFormErrors();
  //   return isValid;
  // }

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
    // e.preventDefault();
    if (!validateInput1()) {
      return;
    }

    setIsLoading(true);

    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("mobile", phoneNumber);
    // formData.append("email", email);
    // formData.append("resume", resume);

    // formData.append("extraQuestions", extraQuestions);
    // formData.append("startDateTime", startDateTimeISO);
    // formData.append("endDateTime", endDateTimeISO);

    // console.log(formData.get("resume"), "jhg");

    const payload = {
      name: name,
      mobile: phoneNumber,
      email: email,
      // resume: resume,
      // extraQuestions: extraQuestions,
      startDateTime: startDateTimeISO,
      endDateTime: endDateTimeISO,
    };
    axios
      .post(
        `${PAYMENT_API_URL}api/v1/meet-event/register/${meetingData._id}`,
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
          // patchResume("", resume);
          const data = res.data;
          console.log(data, "Detaileddata");
          setMeetId(data?.data);
          setSnackbarMessage(
            "You Have Submitted all the details successfully!"
          );
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setIsLoading(false);
          setName([]);
          setPhoneNumber([]);
          setEmail([]);
          setResume([]);
          setClicked(true);
          // setExtraQuestions([]);

          // localStorage.setItem("registrationData", JSON.stringify(data));

          if (meetingData?.price === 0) {
            await axios
              .post(
                `${PAYMENT_API_URL}api/v1/meet-event/book/${data?.data?.meetRegistrationId}`,
                {},
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
                  console.log(data, "meetregistrationdata");
                  setSnackbarMessage("Your meet has been booked successfully!");
                  setSnackbarSeverity("success");
                  window.location.href = "/referrals/book-now/payment/success";
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
    console.log("resume", resume);
    // console.log("extraquesrions", extraQuestions);
  };

  const handlePay = async () => {
    setIsLoading1(true);
    try {
      const payload = {
        amount: totalPrice,
        currency: "INR",
        callback_url: `${FRONTEND_URL}referrals/book-now/payment/success?date=${selectedDates}?time=${selectedTime}`,
        callback_method: "get",
        platform: "meet",
        meetRegistrationId: meetId?.meetRegistrationId,
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
      if (
        data.status === 201 ||
        data.status === 200 ||
        data.status === 202 ||
        data.status === 203 ||
        data.status === 204
      ) {
        setSnackbarMessage("You Have paid successfully");
        setSnackbarOpen(true);
        setPaymentData(data);

        // const pollInterval = setInterval(async () => {
        //   try {
        //     const checkResponse = await axios.get(
        //       `${PAYMENT_API_URL}api/v1/razorpay/confirmCoursePayment/${meetId?.meetRegistrationId}`,
        //       {
        //         headers: {
        //           accessToken: getAccessToken(),
        //         },
        //       }
        //     );

        //     const checkData = checkResponse?.data;
        //     console.log(checkData, "Checkdatameet");
        //     console.log(checkResponse, "Checkresponse");

        //     if (checkData.status === "success") {
        //       clearInterval(pollInterval);
        //       setSnackbarMessage("Payment confirmed successfully");
        //       setSnackbarOpen(true);

        //       localStorage.setItem(
        //         "BookNowPayment",
        //         JSON.stringify(checkData?.data)
        //       );
        //     } else if (checkData.status === "failed") {
        //       clearInterval(pollInterval);
        //       setSnackbarMessage("Payment failed");
        //       setSnackbarOpen(true);
        //       window.location.href = "/referrals/booking/payment/failed";
        //     }
        //   } catch (error) {
        //     console.error("Error checking payment status:", error);
        //   }
        // }, 2000);
      }

      setIsLoading1(false);

      console.log(data, "paymentData");
      console.log(data.data.payment_link, "paymentlink");
      window.location.href = data?.data?.payment_link;

      // setTimeout(() => {
      //   axios
      //     .post(
      //       `${PAYMENT_API_URL}/api/v1/razorpay/confirmPayment/${meetId?.meetRegistrationId}`,
      //       {},
      //       {
      //         headers: {
      //           accessToken: getAccessToken(),
      //         },
      //       }
      //     )
      //     .then((response) => {
      //       console.log("Payment confirmation successful", response);
      //     })
      //     .catch((error) => {
      //       console.error("Error in payment confirmation", error);
      //     });
      // }, 2000);

      // navigate(`${data?.data?.payment_link}`);
    } catch (error) {
      console.error("error getting the data");
    }
  };

  return (
    <div className="main-book-now-payment">
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
          <h4 className="text-h4">{meetingData.title}</h4>
        </div>

        <div className="calendar-change">
          <div className="calendar-content-data">
            <img style={{ marginRight: "10px" }} src="/Calender2.svg" alt="" />

            <div>
              <h4 className="data-text-h4">Date: {selectedDates}</h4>
              <h5 className="data-text-h5">Time: {selectedTime}</h5>
            </div>
          </div>

          <div className="calendar-button">
            <button
              onClick={() => navigate(`/referrals/book-now/${meetingData._id}`)}
              className="calendar-btn-link"
            >
              Change
            </button>
          </div>
        </div>

        <div style={{ margin: "40px 0px" }}>
          {/* <form onSubmit={handleFormSubmit}> */}
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

          <FormInputFileUpload
            label="Upload your resume"
            id="resume"
            name="resume"
            required
            placeholder="Upload your resume"
            constraint="less than 2 MB"
            fileType="application/pdf,application/vnd.ms-excel"
            value={resume}
            setValue={setResume}
            helperText={errors.resume}
            className="mb-4"
          />

          {/* <FormInput
            label="Extra Questions you would like to cover"
            id="extraQuestions"
            name="extraQuestions"
            placeholder="Enter your question"
            value={extraQuestions}
            setValue={setExtraQuestions}
            helperText={errors.extraQuestions}
            className="mb-4 w-100"
          /> */}

          <div className="btn-confirm-details">
            <button
              onClick={() => {
                if (!isLoading && !clicked) {
                  handleFormSubmit();
                }
              }}
              type="submit"
              style={{
                backgroundColor: clicked ? "#80D1CE" : "#138382",
                border: "none",
                outline: "none",
                padding: "10px 24px",
                width: "170px",
                height: "48px",
                color: "white",
                fontSize: 14,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                cursor: clicked ? "not-allowed" : "pointer",
              }}
              disabled={isLoading}
            >
              {isLoading ? <div className="loader"></div> : "Confirm Details"}
            </button>
          </div>
          {/* </form> */}

          {meetId?.meetId && meetingData?.price > 0 ? (
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
                  Pay - &#8377;{totalPrice}
                </h4>
              </div>

              <div className="btn-pay-now-click">
                <button
                  onClick={() => {
                    if (!isLoading1) {
                      handlePay();
                    }
                  }}
                  style={{
                    padding: "10 24",
                    backgroundColor: "#138382",
                    border: "none",
                    outline: "none",
                    padding: "10px 24px",
                    width: "150px",
                    height: "48px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: 14,
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                  disabled={isLoading1}
                >
                  {isLoading1 ? <div className="loader-4"></div> : "Pay Now"}
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {/* <div
          style={{
            marginTop: 40,
            marginBottom: 15,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ fontSize: 16 }}>People also brought</h3>
          <button
            style={{
              padding: "4px 22px",
              border: "none",
              outline: "none",
              borderRadius: "10px",
              background: "#f2f4f5",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
              display: "flex",
              gap: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => handleNext()}
          >
            Next
            <img src="/chevro-right.svg" alt="" />
          </button>
        </div> */}

        {/* {allMeetData &&
              allMeetData.map((card, index) => {
                return (
                  <ConnectCards
                    key={card._id}
                    id={card._id}
                    title={card.title}
                    desc={card.description}
                    duration={card.duration}
                    price={card.price}
                    type={card.type}
                  />
                );
              })} */}

        {/* Carousal */}
        {/* <div
          id="connectCardsCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {allMeetData &&
              allMeetData.map((card, index) => {
                // Start a new carousel item every two cards
                if (index % 2 === 0) {
                  return (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <div className="d-flex justify-content-center gap-2">
                        <div className="col-6">
                          <ConnectCards
                            id={card._id}
                            title={card.title}
                            desc={card.description}
                            duration={card.duration}
                            price={card.price}
                            type={card.type}
                          />
                        </div>
                        {allMeetData[index + 1] && (
                          <div className="col-6">
                            <ConnectCards
                              id={allMeetData[index + 1]._id}
                              title={allMeetData[index + 1].title}
                              desc={allMeetData[index + 1].description}
                              duration={allMeetData[index + 1].duration}
                              price={allMeetData[index + 1].price}
                              type={allMeetData[index + 1].type}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div> */}

        {meetId?.meetId && meetingData.price > 0 ? (
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
                ₹{meetingData.price}
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
    </div>
  );
};

export default BookNowPayment;
