import React, { useEffect, useRef, useState } from "react";
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
  API_URL,
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
import PaymentRedirectPopup from "./PaymentRedirectPopup";
import FormInputDropdown from "../../../../components/FormInputs/FormInputDropdown";

const BookNowPayment = () => {
  const location = useLocation();
  if (!isUserLoggedIn()) {
    redirectToAuth("/login", `${location.pathname}${location.search}`);
    return null;
  }
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState("");
  const [state, setState] = useState("");
  const [extraQuestions, setExtraQuestions] = useState("");
  const [usePreviousResume, setUsePreviousResume] = useState(false);
  const [isResumePresent, setIsResumePresent] = useState(false);
  const [allMeetData, setAllMeetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const navigate = useNavigate();
  const [meetId, setMeetId] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [query, setQuery] = useState("");
  const [showCustomFields, setShowCustomFields] = useState(false);
  const [paymentData, setPaymentData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [stateData, setStateData] = useState([]);
  const { startDateTimeISO, endDateTimeISO, rating } = location.state || {};

  const [selectedDates, setSelectedDates] = useState(() => {
    return (
      location.state?.selectedDates ||
      JSON.parse(localStorage.getItem("selectedDates"))
    );
  });

  console.log(selectedDates, "selectedDates");

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
  console.log(price, "price");
  const gst = 0.2;
  const gstAmount = price * gst;

  const totalPrice = price + gstAmount;
  console.log(Math.ceil(totalPrice), "jhg");
  const billSummaryRef = useRef(null);
  useEffect(() => {
    if (clicked && billSummaryRef.current) {
    
      billSummaryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [clicked]);

  const getAllStateData = async () => {
    try {
      const config = {
        headers: {
          accessToken: getAccessToken(),
        },
      };
      const { data } = await axios.get(
        `${API_URL}api/v1//getStates/IN`,
        config
      );
      console.log(data, "stateData");
      setStateData(data.data);
    } catch (error) {
      console.log("Error getting the state Data");
    }
  };

  const mappedStateData = stateData.map((item) => ({
    label: item.state,
    value: item.stateCode,
  }));

  useEffect(() => {
    getAllStateData();
  }, []);

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
  useEffect(() => {
    const storedMeetingData = JSON.parse(localStorage.getItem("meetingData"));
    if (storedMeetingData && storedMeetingData._id === "67a107c89d57a46e99582bd1") {
      setShowCustomFields(true);
    }
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
    selectState: "",
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

  const validateInput1 = () => {
    let valid = true;
    const newErrors = {
      name: "",
      phoneNumber: "",
      email: "",
      resume: "",
      selectState: "",
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

    if (!state || !state.label) {
      newErrors.selectState = "State is required";
      valid = false;
      addToErrorStack("#selectState");
    }

    const isExtraQuestionsVisible =
      meetingData.title === "Personalized Projects for Your Target Role" ||
      meetingData.title === "Ask Anything Related to Engineering";

    if (isExtraQuestionsVisible) {
      if (!extraQuestions) {
        newErrors.extraQuestions =
          "This is required so our mentor can be well prepared for you";
        valid = false;
        addToErrorStack("#extraQuestions");
      } else if (extraQuestions.length < 100) {
        newErrors.extraQuestions =
          "Questions should be at least 100 characters";
        valid = false;
        addToErrorStack("#extraQuestions");
      }
    }
    setErrors(newErrors);
    
    return valid;
  };
  const validateInput2 = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      companyName: "",
      designation: "",
      query: "",
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
  
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
      addToErrorStack("#email");
    } else if (!emailExpression.test(email)) {
      newErrors.email = "Invalid email format!";
      valid = false;
      addToErrorStack("#email");
    }
  
    if (!companyName) {
      newErrors.companyName = "Company Name is required";
      valid = false;
      addToErrorStack("#companyName");
    }
  
    if (!designation) {
      newErrors.designation = "Designation is required";
      valid = false;
      addToErrorStack("#designation");
    }
  
    if (!query) {
      newErrors.query = "Query is required";
      valid = false;
      addToErrorStack("#query");
    } else if (query.length < 10) {
      newErrors.query = "Query should be at least 10 characters";
      valid = false;
      addToErrorStack("#query");
    }
  
    setErrors(newErrors);
    return valid;
  };
const handleMeetingSub =() => {
  // console.log(validateInput2()) hello
  if (!validateInput2()) {
    return;
  }
  setIsLoading(true);

  const payload = {
    name: name,
    mobile: phoneNumber,
    email: email,
    query: extraQuestions,
    startDateTime: startDateTimeISO,
    endDateTime: endDateTimeISO,
    companyName: companyName,
    designation: designation
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
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        console.log(res.data, "registrationData");
        setSnackbarMessage("You have registered successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        
        if (meetingData?.price === 0 || meetingData?.fees === 0) {
          axios
            .post(
              `${PAYMENT_API_URL}api/v1/meet-event/book?meetRegistrationId=${
                res.data?.data?.meetRegistrationId
              }&ehub_referral=${
                location?.search?.split("ref=")[1]?.split("&")[0] || ""
              }`,
              {},
              {
                headers: {
                  accessToken: getAccessToken(),
                },
              }
            )
            .then((res) => {
              if (res.status >= 200 && res.status < 300) {
                console.log(res.data, "meetregistrationdata");
                setSnackbarMessage("Your meet has been booked successfully!");
                setSnackbarSeverity("success");
                window.location.href = "/referrals/book-now/payment/success";
              }
            })
            .catch((err) => {
              console.error("Error booking meet", err);
              setSnackbarMessage("Issue while booking meet, try again!");
              setSnackbarSeverity("error");
              setSnackbarOpen(true);
            });
        }
      }
    })
    .catch((err) => {
      console.error("Error registering for meet", err);
      setSnackbarMessage("Issue while registering, try again!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
}

  const handleResume = () => {
    if (!validateInput1()) {
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append("resume", resume);
    try {
      const config = {
        headers: {
          accessToken: getAccessToken(),
        },
      };
      axios
        .patch(`${API_URL}api/v1/user/resumeUpdate`, formData, config)
        .then((res) => {
          console.log(res, "resumeData");
          const payload = {
            name: name,
            mobile: phoneNumber,
            email: email,
            resume: res?.data?.data,
            query: extraQuestions,
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
                const data = res.data;
                console.log(data, "Detaileddata");
                setMeetId(data?.data);
                setSnackbarMessage(
                  "You Have Submitted all the details successfully!"
                );
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                setIsLoading(false);
                setName("");
                setPhoneNumber("");
                setEmail("");
                setResume("");
                setExtraQuestions("");
                setClicked(true);

                if (meetingData?.price === 0) {
                  await axios
                    .post(
                      `${PAYMENT_API_URL}api/v1/meet-event/book?meetRegistrationId=${
                        data?.data?.meetRegistrationId
                      }&ehub_referral=${
                        location?.search?.split("ref=")[1]?.split("&")[0] || ""
                      }`,
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
                        setSnackbarMessage(
                          "Your meet has been booked successfully!"
                        );
                        setSnackbarSeverity("success");
                        window.location.href =
                          "/referrals/book-now/payment/success";
                      }
                    });
                }
              }
            })
            .catch((res) => {
              if (res.status === 409) {
                window.alert("Fill the Details!");
              }
              setSnackbarMessage("Issue while submitting details, try again!");
              setSnackbarSeverity("error");
              setSnackbarOpen(true);
              setIsLoading(false);
            });

          return res;
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("req cancel");
            return err;
          } else {
            console.log("req performed");
            console.log(err);
            return err;
          }
        });
    } catch (error) {
      console.error("getting error the resume", error);
    }
  }; 
  const handlePay = async () => {
    setIsLoading1(true);
    setSnackbarMessage("Redirecting you to the payment page");
    setSnackbarOpen(true);

    try {
      const payload = {
        amount: Math.ceil(totalPrice),
        currency: "INR",
        callback_url: `${FRONTEND_URL}referrals/book-now/payment/success?date=${selectedDates}&time=${selectedTime}`,
        callback_method: "get",
        state: state.label,
        platform: "meet",
        meetRegistrationId: meetId?.meetRegistrationId,
      };
      console.log(payload, "payload");
      const ehubReferral = location.search.includes("ref")
        ? location?.search?.split("ref=")[1]?.split("&")[0]
        : null;

      if (ehubReferral) {
        payload.ehub_referral = ehubReferral;
      }

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
      }
      console.log(data, "paymentData");
      console.log(data.data.payment_link, "paymentlink");
      window.location.href = data?.data?.payment_link;
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
            <h5 style={{ fontSize: "13px", marginTop: "10px" }}>{rating}</h5>
            <img src={"/star.svg"} alt="" width={16} height={16} />
          </div>
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
              onClick={() =>
                navigate(
                  `/referrals/book-now/${meetingData._id}${
                    location.search.includes("ref")
                      ? `?ref=${
                          location?.search?.split("ref=")[1]?.split("&")[0]
                        }`
                      : ``
                  }`
                )
              }
              className="calendar-btn-link"
            >
              Change
            </button>
          </div>
        </div>
{showCustomFields ?  (
  <div>
    <FormInput
      label="Name"
      id="name"
      name="name"
      required
      placeholder="Enter your Name"
      value={name}
      setValue={setName}
      helperText={errors.name}
      className="mb-4"
    />
    <FormInputEmail
      label="Email"
      id="email"
      name="email"
      required
      placeholder="Enter your Email"
      value={email}
      setValue={setEmail}
      helperText={errors.email}
      className="mb-4"
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
    <FormInput
      label="Company Name"
      id="companyName"
      name="companyName"
      required
      placeholder="Enter your Company Name"
      value={companyName}
      setValue={setCompanyName}
      helperText={errors.companyName}
      className="mb-4"
    />
    <FormInput
      label="Designation"
      id="designation"
      name="designation"
      required
      placeholder="Enter your Designation"
      value={designation}
      setValue={setDesignation}
      helperText={errors.designation}
      className="mb-4"
    />
    <FormInput
      label="Query"
      id="query"
      name="query"
      required
      placeholder="Enter your Query"
      value={query}
      setValue={setQuery}
      helperText={errors.query}
      className="mb-4"
    />
     <div className="btn-confirm-details" onClick={() => {
        handleMeetingSub()
      }}>
      <button
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
  </div>
                    
        ) : ( <div style={{ margin: "20px 0px" }}>
          <div
            className="form-input-saifalam"
            style={
              {
        
              }
            }
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

          <div style={{ marginBottom: 20 }}>
            <FormInputDropdown
              label={"Select Your State"}
              id="selectState"
              name="state"
              required
              placeholder={"Select Your State"}
              value={state}
              setValue={setState}
              helperText={errors.selectState}
              options={mappedStateData}
            />
          </div>

          {meetingData.title == "Personalized Projects for Your Target Role" ||
          meetingData.title === "Ask Anything Related to Engineering" ? (
            <FormInput
              label={
                meetingData.title === "Ask Anything Related to Engineering"
                  ? "Drop your Query"
                  : meetingData.title ===
                    "Personalized Projects for Your Target Role"
                  ? "Drop your current stack and role which you're targeting?"
                  : "Here goes the question"
              }
              id="extraQuestions"
              name="extraQuestions"
              placeholder="Enter your answer"
              constraint="Min 100 characters"
              value={extraQuestions}
              setValue={setExtraQuestions}
              helperText={errors.extraQuestions}
              className="mb-4"
            />
          ) : null}

          <div className="btn-confirm-details">
            <button
              onClick={() => {
                if (!isLoading && !clicked) {
                  // handleFormSubmit();
                  handleResume();
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
              className="paynow-div-payment"
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
                  Pay - &#8377;{totalPrice.toFixed(2)}
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
        </div>)}
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

  

        {meetId?.meetId && meetingData.price > 0 ? (
          <div
            ref={billSummaryRef}
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
                Taxes &amp; Gateway Charges
              </h3>
              <h3 style={{ fontSize: "14px", fontWeight: 400 }}>
                ₹{gstAmount.toFixed(2)}
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
                ₹{totalPrice.toFixed(2)}
              </h4>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BookNowPayment;
