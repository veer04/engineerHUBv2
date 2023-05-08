import React, { useState, useEffect } from "react";
import "./EventRegistration.css";
import axios from "axios";
import FormData from "form-data";

// var fs = require("fs");

const EventRegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [domainName, setDomainName] = useState("");
  const [campusName, setCampusName] = useState("");
  const [eventType, setEventType] = useState("");
  const [mode, setMode] = useState(0);
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventModeType, setEventModeType] = useState("");
  const [eventPoster, setEventPoster] = useState("");
  const [campusLogos, setCampusLogos] = useState([]);
  const [file, setFile] = useState();

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };
  // var form = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(data, "inside post ");
    const form = new FormData();
    form.append("domainName", domainName);
    form.append("campusName", campusName);
    form.append("eventType", eventType);
    form.append("description", description);
    form.append("eventDate", eventDate);
    form.append("applyLink", applyLink);
    form.append("mode", mode);
    form.append("eventName", eventName);
    form.append("eventModeType", eventModeType);
    form.append("eventPoster", eventPoster);
    for (let i = 0; i < campusLogos.length; i++) {
      form.append("campusLogo", campusLogos[i]);
    }
    // form.append("campusLogo", campusLogos);
    form.append("policy", description);
    console.log(form.get("domainName"), " domainName ");
    console.log(form.get("campusName"), " campusName ");
    console.log(form.get("eventType"), " eventType ");
    console.log(form.get("description"), " description ");
    console.log(form.get("eventDate"), " eventDate ");
    console.log(form.get("applyLink"), " applyLink ");
    console.log(form.get("mode"), " mode ");
    console.log(form.get("eventName"), " eventName ");
    console.log(form.get("eventModeType"), " eventModeType ");
    console.log(form.get("eventPoster"), " eventPoster ");
    console.log(form.get("campusLogo"), " campusLogo ");

    axios
      .post(
        "http://e-hub-backend-production-9545.up.railway.app/api/v1/event",
        form
      )
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };
  const handleFileInputChange = (e) => {
    console.log(e.target.files);
    setCampusLogos(e.target.files);
  };
  const handleFileInputChangePoster = (e) => {
    console.log(e.target.files[0]);
    setEventPoster(e.target.files[0]);
  };

  return (
    <div className="eventR">
      <div>
        <h1 className="heading-3">Registration Form</h1>
        <h2 className="subheading-1">
          Lorem ipsum dolor sit amet consectetur. Vitae diam facilisi libero
          mauris mauris quam elit. Convallis nunc accumsan sit cum. Vitae diam
          eu enim dignissim donec ultrices dis amet ipsum.
        </h2>
        <div className="navigation-buttons__container">
          <div className="navigation-buttons">
            <div
              style={{
                borderColor: step > 1 ? "var(--primary-color-dark-green)" : "",
              }}
              className="dotted-line dotted-line-1"
            ></div>
            <div
              style={{
                borderColor: step > 2 ? "var(--primary-color-dark-green)" : "",
              }}
              className="dotted-line dotted-line-2"
            ></div>
            <div
              style={{
                backgroundColor:
                  step === 1 ? "var(--primary-color-dark-green)" : "#15CF74",
                color: "white",
                borderColor: step > 1 ? "#15CF74" : "",
              }}
              className="form-button"
            >
              Basic Details
            </div>
            <div
              style={{
                backgroundColor:
                  step === 2
                    ? "var(--primary-color-dark-green)"
                    : step === 3
                    ? "#15CF74"
                    : "",
                color: step === 2 ? "white" : step === 3 ? "white" : "",
                borderColor:
                  step === 2
                    ? "var(--primary-color-dark-green)"
                    : step === 3
                    ? "#15CF74"
                    : "",
              }}
              className="form-button"
            >
              Applicant Details
            </div>
            <div
              style={{
                backgroundColor:
                  step === 3 ? "var(--primary-color-dark-green)" : "",
                color: step === 3 ? "white" : "",
                borderColor:
                  step === 3 ? "var(--primary-color-dark-green)" : "",
              }}
              className="form-button"
            >
              Publish
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <div className="step1Header">Step 1 - Basic Details</div>
              <div className="formcontainer">
                <label htmlFor="domainName">Domain Name</label>
                <input
                  type="text"
                  id="domainName"
                  className="inputHosting"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                  required
                />
                <br />

                <label htmlFor="campusName">Campus Name</label>
                <input
                  type="text"
                  id="campusName"
                  className="inputHosting"
                  value={campusName}
                  onChange={(e) => setCampusName(e.target.value)}
                  required
                />
                <br />

                <label htmlFor="eventType">Event Type</label>
                <input
                  type="eventType"
                  id="eventType"
                  className="inputHosting"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  required
                />
                <br />

                <button
                  type="button"
                  onClick={handleNext}
                  className="buttonOnHostingPage"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="step1Header">Step 2 - Application Details</div>
              <div className="formcontainer">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  className="inputHosting"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <br />

                <label htmlFor="eventDate">Event Date</label>
                <input
                  type="date"
                  id="eventDate"
                  className="inputHosting"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
                <br />

                <label htmlFor="applyLink">Apply Link</label>
                <input
                  type="text"
                  id="applyLink"
                  className="inputHosting"
                  value={applyLink}
                  onChange={(e) => setApplyLink(e.target.value)}
                  required
                />
                <br />

                <button
                  type="button"
                  className="buttonOnHostingPage"
                  onClick={handlePrev}
                >
                  Previous
                </button>

                <button
                  type="button"
                  className="buttonOnHostingPage"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="step1Header">Step 3 - Publish</div>
              <div className="formcontainer">
                <label htmlFor="eventName">Event Name</label>
                <input
                  type="text"
                  id="eventName"
                  className="inputHosting"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
                <br />

                <label htmlFor="eventModeType">Event Mode Type</label>
                <input
                  type="text"
                  id="eventModeType"
                  className="inputHosting"
                  value={eventModeType}
                  onChange={(e) => setEventModeType(e.target.value)}
                  required
                />
                <br />

                <label htmlFor="eventPoster">Event Poster</label>
                <div>
                  <input
                    type="file"
                    id="eventPoster"
                    className="inputHosting"
                    onChange={handleFileInputChangePoster}
                  />

                  {file && <p>Selected file: {file.name}</p>}
                </div>

                <label htmlFor="Campus Logo">Campus Logo</label>
                <div>
                  <input
                    multiple
                    type="file"
                    id="campusLogo"
                    className="inputHosting"
                    onChange={handleFileInputChange}
                  />

                  {file && <p>Selected file {file.name}</p>}
                </div>
                <br />

                <button
                  type="button"
                  onClick={handlePrev}
                  className="buttonOnHostingPage"
                >
                  Previous
                </button>

                <br />
                <button type="submit" className="buttonOnHostingPage">
                  submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EventRegistrationForm;
