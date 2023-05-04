import React, { useState, useEffect } from 'react';
import "./EventRegistration.css";
import axios from 'axios';
const EventRegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [domainName, setdomainName] = useState('');
  const [campusName, setcampusName] = useState('');
  const [eventType, seteventType] = useState('');
  const [mode, setMode] = useState(0);
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [applyLink, setApplyLink] = useState('');
  const [eventName, setEventName]=useState('');
  const [eventModeType, setEventModeType]=useState('');
  const [eventPoster, setEventPoster]=useState('');
  const [campusLogo, setcampusLogo]=useState('');
  const [file, setFile] = useState(null);

  

  const [activeButton, setActiveButton] = useState('btn2');

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
    const data= {
    domainName :domainName,
    campusName :campusName, //array
    eventType  :eventType,
    description :description,
    eventDate  : eventDate,
    applyLink  : applyLink,
    mode : mode,

//new added below

    eventName : eventName,
    eventModeType  : eventModeType,
    eventPoster : eventPoster, 
    campusLogo : campusLogo, 
    };


    event.preventDefault();
    axios
      .post('https://e-hub-backend-production.up.railway.app/api/v1/event', data)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };
  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
    setcampusLogo(e.target.value());

  }
  const handleFileInputChangePoster=()=>{

    setFile(e.target.files[0]);
    setEventPoster(e.target.value());
  }

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
          <label htmlFor="domainName">Domain Name:</label>
          <input
            type="text"
            id="domainName"
            className="inputHosting"
            value={domainName}
            onChange={(e) => setdomainName(e.target.value)}
            required
          />
          <br />

          <label htmlFor="campusName">Campus Name:</label>
          <input
            type="text"
            id="campusName"
            className="inputHosting"
            value={campusName}
            onChange={(e) => setcampusName(e.target.value)}
            required
          />
          <br />

          <label htmlFor="eventType">event Type:</label>
          <input
            type="eventType"
            id="eventType"
            className="inputHosting"
            value={eventType}
            onChange={(e) => seteventType(e.target.value)}
            required
          />
          <br />

          <button type="button" onClick={handleNext}
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
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            className="inputHosting"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

          <label htmlFor="applyLink">Apply Link:</label>
          <input
            type="text"
            id="applyLink"
            className="inputHosting"
            value={applyLink}
            onChange={(e) => setApplyLink(e.target.value)}
            required
          />
          <br />

          <button type="button" 
          
          className='buttonOnHostingPage'
          onClick={handlePrev}
          >
            Previous
          </button>

          <button type="button"
          className='buttonOnHostingPage'
          onClick={handleNext}
          >Next</button>
          </div>
        </div>
      )}


{step === 3 && (
        
        <div>
            <div className="step1Header">
                Step 3 - Publish 
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

          <label htmlFor="eventModeType">Event Mode Type:</label>
          <input
            type="text"
            id="eventModeType"
            className="inputHosting"
            value={eventModeType}
            onChange={(e) => setEventModeType(e.target.value)}
            required
          />
          <br />

          <label htmlFor="eventPoster">Event Poster:</label>
          <div>
      <input type="file"
      
      id="eventPoster"
      value={eventPoster}
      className="inputHosting"
      onChange={handleFileInputChangePoster} />

      {file && <p>Selected file: {file.name}</p>}
    </div>

<label htmlFor="Campus Logo">Campus Logo:</label>
<div>
      <input type="file"
      
      id="campusLogo"
      value={campusLogo}
      className="inputHosting"
      onChange={handleFileInputChange} />

      {file && <p>Selected file: {file.name}</p>}
    </div>
          <br />



<button type="button" onClick={handlePrev}
className='buttonOnHostingPage'>
  Previous
</button>

            <br />
          <button type="submit"
          className='buttonOnHostingPage'>
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
