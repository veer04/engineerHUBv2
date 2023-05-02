import React, { useState } from 'react';
import "./EventRegistration.css";
const EventRegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const [activeButton, setActiveButton] = useState('btn2');

//   const handleButtonClick = (buttonName) => {
    
//   };

  const handleNext = (buttonName) => {
    setStep(step + 1);
    setActiveButton('btn1');
  };

  const handlePrev = () => {
    setStep(step - 1);
    setActiveButton('btn2');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      email,
      eventName,
      eventDate,
      eventLocation,
    });
  };

  return (
    <div className="eventR">
        <div className="container">
            <div className="headerSectionEvent">
                <p>
                    Registration form
                </p>
            </div>
            <div className='headerSectionInfoText' >
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                     Asperiores sed cumque repellendus soluta. Consequatur, maiores
                      labore ratione accusamus dolor quas velit veniam nobis
                       voluptates eius sequi harum optio! Cum, ducimus?
                </p>

            </div>
        <div className="navDifferentPagesButton">
            <div className={activeButton === 'btn2' ? 'btn1' : 'btn3'}>Basic Details </div>
            <div className={activeButton === 'btn2' ? 'btn1' : 'btn3'}>Applicant Details</div>
            <div className={activeButton === 'btn2' ? 'btn1' : 'btn3'}>Publish</div>
        </div>
        <form onSubmit={handleSubmit}>

      {step === 1 && (
        
        <div>
            <div className="step1Header">
                Step 1 - Basic Details
            </div>
            <div className="formcontainer">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            className="inputHosting"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <br />

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            className="inputHosting"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <br />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="inputHosting"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />

          <button type="button" onClick={handleNext()}
          className='buttonOnHostingPage'>
            Next
          </button>
        </div>
        </div>
      )}

      {step === 2 && (
        <div>
               <div className="step1Header">
                Step 2 - Application Details
            </div>
             <div className="formcontainer">
          <label htmlFor="eventName">Event Name:</label>
          <input
            type="text"
            id="eventName"
            className="inputHosting"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
          <br />

          <label htmlFor="eventDate">Event Date:</label>
          <input
            type="date"
            id="eventDate"
            className="inputHosting"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
          <br />

          <label htmlFor="eventLocation">Event Location:</label>
          <input
            type="text"
            id="eventLocation"
            className="inputHosting"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            required
          />
          <br />

          <button type="button" onClick={handlePrev()}
          className='buttonOnHostingPage'>
            Previous
          </button>

          <button type="submit"
          className='buttonOnHostingPage'>Submit</button>
          </div>
        </div>
      )}
    </form>

        </div>
    </div>
  );
};

export default EventRegistrationForm;
