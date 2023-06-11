import React, { useState, useEffect } from "react";
import "./EventRegistration.css";
import axios from "axios";
import FormData from "form-data";
import useNavbar from "../../hooks/use-navbar";
import { API_URL } from "../../services/APIUtils";
import Cookies from "js-cookie";
import { Select, MenuItem } from "@mui/material";
import HostEventTimeline from "../../components/Timeline/HostEventTimeline";
import {
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";

import {
  controller,
  getAllCampuses,
  getDomains,

} from "../../services/APIConfig";
import { getAccessToken } from "../../features/getCookieValues";
// var fs = require("fs");

const EventRegistrationForm = () => {
  const { setSelectedPageNavbar } = useNavbar();

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("host");
    return () => {
      controller.abort();
    };
  }, []);

  const [step, setStep] = useState(1);
  const [domainName, setDomainName] = useState('');
  const[domain,setDomain]=useState([]);    //only to fetch data
  const [campusId, setCampusId] = useState(''); 
  const [campuses,setCampuses] =useState([]);//only to fetch data
  const [eventType, setEventType] = useState(""); 
  const [mode, setMode] = useState(0);
  const [description, setDescription] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventModeType, setEventModeType] = useState("");
  const [eventPoster, setEventPoster] = useState("");
  const [status, setStatus] = useState([]);
  const [policy,setPolicy] = useState("");
  const [validation,setValidation]=useState(false);
  
  const [errors, setErrors] = useState({
   domainName:"",
   campusId:"",
  //  eventType:"",
   eventStartTime:"",
   eventEndTime:"",
   eventModeType:"",
   mode:"",
   policy:"",
   status:"",



  });
  
  //remove this//
  //eventType(dropdown), Tags(insert Tags it is of array type), status(dropdown), policy,  campusId(apiDropDown)//
  const [file, setFile] = useState();
const validateInput1=()=>
{
  let valid =true;
  const newErrors={

  }
  setErrors(newErrors);
  return valid;
}
const validateInput2=()=>
{
  let valid = true;
  const newErrors={

  }
  setErrors(newErrors);
  return valid;
}
const validateInput3=()=>
{
  let valid =true;
  const newErrors={

  }
  setErrors(newErrors);
  return valid;
}

  function handleNext() {
    if (step === 1) {
      if (validateInput1()) setStep(step + 1);
    }
    if (step === 2) {
      if (validateInput2()) setStep(step + 1);
    }
    if (step === 3) {
      if (validateInput3()) setValidation(true);
    }
  }
  const handlePrev = () => {
    setStep(step - 1);
  };
  // var form = new FormData();



  useEffect(() => {
    window.scrollTo(0, 0);
    getAllCampuses(setCampuses);
    getDomains(setDomain);

    return () => {
      controller.abort();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();

    // console.log(data, "inside post ");
    const form = new FormData();
    form.append("domainName", domainName);
    form.append("campusId", campusId);
    form.append("eventType", eventType);
    form.append("description", description);
    form.append("eventStartTime", eventStartTime);
    form.append("eventEndTime", eventEndTime);
    form.append("applyLink", applyLink);
    form.append("mode", mode);
    form.append("eventName", eventName);
    form.append("eventModeType", eventModeType);
    form.append("eventPoster", eventPoster);
    form.append("policy",policy);
    form.append("stauts",status);
    // for (let i = 0; i < campusLogos.length; i++) {
    //   form.append("campusLogo", campusLogos[i]);
    // }
    // form.append("campusLogo", campusLogos);
    // form.append("policy", description);
    console.log(form.get("domainName"), " domainName ");
    console.log(form.get("campusId"), " campusId ");
    console.log(form.get("eventType"), " eventType ");
    console.log(form.get("description"), " description ");
    console.log(form.get("eventStartTime"), " eventStartTime ");
    console.log(form.get("applyLink"), " applyLink ");
    console.log(form.get("mode"), " mode ");
    console.log(form.get("eventName"), " eventName ");
    console.log(form.get("eventModeType"), " eventModeType ");
    console.log(form.get("eventPoster"), " eventPoster ");
    console.log(form.get("status"), " status ");

  if (validation===true)
   {  
    
    try {
      // const accessToken = document.cookie
      // .split(';')
      // .map((cookie) => cookie.trim())
      // .find((cookie) => cookie.startsWith('access_token='))
      // .split('=')[1];
      // console.log(accessToken);
    const response = await axios.post(`${API_URL}api/v1/event`,form, {
      headers: {
        accessToken: getAccessToken(),
        
      },

      
    }
    );

    console.log(response);

    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 202 ||
      response.status === 203 ||
      response.status === 204
    ) {
      // setLoading(false);
      navigate("/");
    }
  } catch (error) {
    alert(error.response.data.message);
    setValidation(false);
    console.log(error);
  }
     
  };
}
  const handleFileInputChange = (e) => {
    console.log(e.target.files);
    setCampusLogos(e.target.files);
  };
  const handleFileInputChangePoster = (e) => {
    console.log(e.target.files[0]);
    setEventPoster(e.target.files[0]);
  };

  
        const step1 = (
            <div>
           

           <TextField
                        name="eventName"
                        label="Event Name"
                        variant="outlined"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        // onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.eventName}
                        helperText={errors.eventName}
                      />

                <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-campus-label"
          error={!!errors.domainName}
        >
          Domain Name
        </InputLabel>
        <Select
          labelId="Domain-name"
          id="student-signup-campus-select"
          value={domainName}
          label="Domain Name"
          name="domainName"
          // onChange={handleChange}
          onChange={(e)=> setDomainName(e.target.value)}
          error={!!errors.domainName}
        >
          {domain.map((domains) => (
            <MenuItem key={domains} value={domains.domain}>
              {domains.domain}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={!!errors.domainName}>
          {errors.domainName}
        </FormHelperText>
      </FormControl>



       
      <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-campus-label"
          error={!!errors.campusId}
        >
          Campus Name
        </InputLabel>
        <Select
          labelId="campus-name"
          id="student-signup-campus-select"
          value={campusId}
          label="Campus Name"
          name="campusId"
          onChange={(e)=> setCampusId(e.target.value)}
          error={!!errors.campusId}
        >
          {campuses.map((campus) => (
            <MenuItem key={campus._id} value={campus._id}>
              {campus.collegeName}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={!!errors.campusId}>
          {errors.campusId}
        </FormHelperText>
      </FormControl>


<br />
<br />


      <FormControl
      fullWidth
      >
      <InputLabel
          id="student-signup-campus-label"
          error={!!errors.eventType}
        >
          Event Type
        </InputLabel>
      <Select
        labelId="event-type-label"
        id="event-type"
        value={eventType}
        label="Event Type"
        
        onChange={(e) => setEventType(e.target.value)}
      >
        <MenuItem value="Technical">Technical</MenuItem>
        <MenuItem value="Cultural">Cultural</MenuItem>
        <MenuItem value="Webinar">Webinar</MenuItem>
        <MenuItem value="Hackathon">Hackathon</MenuItem>
      </Select>
      <FormHelperText error={!!errors.eventType}>
          {errors.eventType}
        </FormHelperText>
    </FormControl>
    <br />
    <br />

                     <FormControl
                        fullWidth
                        >
                        <InputLabel
                            id="student-signup-campus-label"
                            error={!!errors.eventModeType}
                          >
                            Event Mode Type
                          </InputLabel>
                        <Select
                          labelId="event-type-label"
                          id="event-type"
                          value={eventModeType}
                          label="Event Mode Type"
                          
                          onChange={(e) => setEventModeType(e.target.value)}
                        >
                          <MenuItem value="InterCollege">InterCollege</MenuItem>
                          <MenuItem value="IntraCollege">IntraCollege</MenuItem>
                          <MenuItem value="Workshop">Workshop</MenuItem>
                        </Select>
                        <FormHelperText error={!!errors.eventModeType}>
                            {errors.eventModeType}
                          </FormHelperText>
                      </FormControl>
       
            </div>
          )

          const step2 = (
            <div>



                <TextField
                        name="description"
                        label="Description"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.description}
                        helperText={errors.description}
                      />
             
                
             <TextField
                        name="Event Start Date"
                        label="Event Start Date"
                        variant="outlined"
                        type ="date"
                        value={eventStartTime}
                        onChange={(e) => setEventStartTime(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.eventStartTime}
                        helperText={errors.eventStartTime}
                      />
                        <TextField
                        name="Event End Date"
                        label="Event End Date"
                        variant="outlined"
                        type ="date"
                        value={eventEndTime}
                        onChange={(e) => setEventEndTime(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.eventEndTime}
                        helperText={errors.eventEndTime}
                      />

           
                <br />

                <TextField
                        name="applyLink"
                        label="apply Link"
                        variant="outlined"
                        value={applyLink}
                        onChange={(e) => setApplyLink(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.applyLink}
                        helperText={errors.applyLink}
                      />
                
            </div>
          )

          const step3 = (
            <div>
              
            
                
              <FormControl
                        fullWidth
                        >
                        <InputLabel
                            id="student-signup-campus-label"
                            error={!!errors.mode}
                          >
                            Event Mode 
                          </InputLabel>
                        <Select
                          labelId="event-type-label"
                          id="event-type"
                          value={mode}
                          label="Event Mode"
                          
                          onChange={(e) => setMode(e.target.value)}
                        >
                          <MenuItem value={0}>online</MenuItem>
                          <MenuItem value={1}>offline</MenuItem>
                
                        </Select>
                        <FormHelperText error={!!errors.mode}>
                            {errors.mode}
                          </FormHelperText>
                      </FormControl>
                                

                      <TextField
                        name="policy"
                        label="policy"
                        variant="outlined"
                        value={policy}
                        onChange={(e) => setPolicy(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.policy}
                        helperText={errors.policy}
                      />

                    <FormControl
                        fullWidth
                        >
                        <InputLabel
                            id="student-signup-campus-label"
                            error={!!errors.status}
                          >
                            Event Status
                          </InputLabel>
                        <Select
                          labelId="event-type-label"
                          id="event-type"
                          value={status}
                          label="Event Status"
                          
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <MenuItem value={"Upcoming"}>Upcoming</MenuItem>
                          <MenuItem value={"Ongoing"}>Ongoing</MenuItem>
                          <MenuItem value={"Completed"}>Completed</MenuItem>
                
                        </Select>
                        <FormHelperText error={!!errors.status}>
                            {errors.status}
                          </FormHelperText>
                      </FormControl>
                

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

                {/* <label htmlFor="Campus Logo">Campus Logo</label>
                <div>
                  <input
                    multiple
                    type="file"
                    id="status"
                    className="inputHosting"
                    onChange={handleFileInputChange}
                  />

                  {file && <p>Selected file {file.name}</p>}
                </div> */}
              

              </div>
        
        )
        return (


          <>
      <main className="signup-page">
        <section className="details-container">
          <div className="details">
            <HostEventTimeline
              step={step}
              numberOfCheckpoints={3}
              width="100%"
            />
            <form action="/" method="POST" onSubmit={handleSubmit}>
              {step === 1 && step1}
              {step === 2 && step2}
              {step === 3 && step3}
              <div className="button-container">
                <button
                  type="button"
                  className="button previous-button"
                  onClick={handlePrev}
                  disabled={step === 1}
                >
                  Previous
                </button>
                <button
                  type={`${step === 3 ? "submit" : "button"}`}
                  onClick={handleNext}
                  className="button next-button"
                >
                  {`${step === 3 ? "Submit" : "Next"}`}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
        )

}

export default EventRegistrationForm;
