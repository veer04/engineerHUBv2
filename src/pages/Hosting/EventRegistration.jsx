import React, { useState, useEffect } from "react";
import "./EventRegistration.css";
import axios from "axios";
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
  const [campusLogo, setCampusLogo] = useState("");
  const [eventPosterUpload, setEventPosterUpload] = useState(null);
  const [campusLogoUpload, setCampusLogoUpload] = useState(null);
  const [file, setFile] = useState();

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      domainName: domainName,
      campusName: campusName, //array
      eventType: eventType,
      description: description,
      eventDate: eventDate,
      applyLink: applyLink,
      mode: mode,

      //new added below

      eventName: eventName,
      eventModeType: eventModeType,
      eventPoster: eventPosterUpload,
      campusLogo: campusLogoUpload,
    };
    console.log(data, "inside post ");

    e.preventDefault();
    axios
      .post(
        "https://e-hub-backend-production.up.railway.app/api/v1/event",
        data
      )
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };
  const handleFileInputChange = (e) => {
    console.log(e.target.files[0]);
    // setCampusLogo(e.target.files[0]);
    // setFile(e.target.files[0]);
    setCampusLogoUpload(e.target.files[0]);
  };
  const handleFileInputChangePoster = (e) => {
    console.log(e.target.files[0]);
    setEventPosterUpload(e.target.files[0]);
    // setEventPoster(e.target.files[0]);

    // setFile(e.target.files[0]);
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
                    value={eventPoster}
                    className="inputHosting"
                    onChange={handleFileInputChangePoster}
                  />

                  {file && <p>Selected file: {file.name}</p>}
                </div>

                <label htmlFor="Campus Logo">Campus Logo</label>
                <div>
                  <input
                    type="file"
                    id="campusLogo"
                    value={campusLogo}
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
