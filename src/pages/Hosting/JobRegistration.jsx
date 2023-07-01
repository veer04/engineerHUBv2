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
  Autocomplete,
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";

import {
  controller,
  getDomains,

} from "../../services/APIConfig";
import { getAccessToken } from "../../features/getCookieValues";
import { useNavigate } from "react-router-dom";
// var fs = require("fs");

const JobRegistrationForm = () => {
  const navigate = useNavigate();
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
//   const [campusId, setCampusId] = useState(''); 
//   const [campuses,setCampuses] =useState([]);//only to fetch data
  const [OpportunityType, setOpportunityType] = useState(""); 
  const [IsPaid, setIsPaid] = useState(0);
  const [description, setDescription] = useState("");




  const[mobileNo,setMobileNo]=useState(""); //change the type to Number
  const[alterNetMobileNo, setAlterNetMobileNo]=useState("");
  const[email,setEmail]=useState("");
  const[minSalary,setMinSalary]=useState(0);
  const[maxSalary,setMaxSalary]=useState(0);
  const[experience,setExperience]=useState("");
  const[eligibility,setEligibility]=useState(6);
  const[jobLocation,setJobLocation]=useState("");
  const[jobType,setJobType]=useState("");//enum Hybrid Remote InOffice
  const[JobTiming,setJobTiming]=useState(""); // enum Full Time, Part Time, Contractual
  const[duration,setDuration]=useState(""); //duration in months
  const[workDays,setWorkDays]=useState(4)//number type minimum value 4 and maximum value 6
  const[WebsiteUrl,setWebsiteUrl]=useState("");
  const[isServiceOff,setIsServiceOff]=useState(false);
  const[OpportunityPosition,setOpportunityPosition]=useState("");
  const[organization,setOrganization]=useState("");
  const [organizationPoster, setOrganizationPoster] = useState("");

  const[skillsRequired,setSkillsRequired]=useState([]);
  const [applicationStartTime, setApplicationStartTime] = useState("");
  const [applicationEndTime, setApplicationEndTime] = useState("");
//   const [applyLink, setApplyLink] = useState("");
  const [OpportunityName, setOpportunityName] = useState("");
//   const [eventModeType, setEventModeType] = useState("");
  const [OpportunityPoster, setOpportunityPoster] = useState("");

//   const [status, setStatus] = useState([]);
  const [policy,setPolicy] = useState("");
  const [validation,setValidation]=useState(false);
  
  const [errors, setErrors] = useState({
   domainName:"",
   mobileNo:"",
   alterNetMobileNo:"",
   email:"",
   minSalary:"",
   maxSalary:"",
   experience:"",
   jobType:"",
   jobLocation:"",
   

   OpportunityType:"",
   OpportunityName:"",
   applicationStartTime:"",
   applicationEndTime:"",

//    eventModeType:"",
   IsPaid:"",
   policy:"",
//    status:"",



  });
  
  
  const [file, setFile] = useState();
const validateInput1=()=>
{
  let valid =true;
  const newErrors={

OpportunityType:"",
OpportunityName:"",
OpportunityPoster:"",
OpportunityPosition:"",
organization:"",
organizationPoster:"",





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


const validateInput4=()=>
{
  let valid =true;
  const newErrors={

  }
  setErrors(newErrors);
  return valid;
}

const validateInput5=()=>
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
        if (validateInput3()) setStep(step + 1);
      }
      if (step === 4) {
        if (validateInput4()) setStep(step + 1);
      }
    if (step === 5) {
      if (validateInput5()) setValidation(true);
    }
  }
  const handlePrev = () => {
    setStep(step - 1);
  };
  // var form = new FormData();



  useEffect(() => {
    window.scrollTo(0, 0);
   
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
    const form = new FormData();
    form.append("OpportunityType", OpportunityType);
    form.append("OpportunityPoster", OpportunityPoster);
    form.append("OpportunityName", OpportunityName);
    form.append("OpportunityPosition",OpportunityPosition);
    form.append("organization", organization);
    form.append("organizationPoster", organizationPoster);
    form.append("domainName", domainName);  
    form.append("description", description);
    form.append("mobileNo",mobileNo);
    form.append("alterNetMobileNo", alterNetMobileNo);
    form.append("email",email);
    form.append("applicationStartTime", applicationStartTime);
    form.append("applicationEndTime", applicationEndTime);
    form.append("minSalary",minSalary);
    form.append("maxSalary",maxSalary);
    form.append("IsPaid", IsPaid);
    form.append("experience", experience);
    form.append("eligibility", eligibility);
    form.append("skillsRequired", skillsRequired);
    form.append("jobLocation",jobLocation);
    form.append("jobType",jobType);
    form.append("JobTiming",JobTiming);
    form.append("duration",duration);
    form.append("workDays",workDays);
    form.append("WebsiteUrl",WebsiteUrl);
    form.append("isServiceOff",isServiceOff);
    form.append("policy",policy);


   
    
    
   
   
   
    
    
   
    

    
   
    console.log(form.get("domainName"), " domainName ");
      
    console.log(form.get("OpportunityType"), " OpportunityType ");
    console.log(form.get("description"), " description ");
    console.log(form.get("applicationStartTime"), " applicationStartTime ");
    // console.log(form.get("applyLink"), " applyLink ");
    console.log(form.get("IsPaid"), " IsPaid ");
    console.log(form.get("OpportunityName"), " OpportunityName ");
    // console.log(form.get("eventModeType"), " eventModeType ");
    console.log(form.get("OpportunityPoster"), "OpportunityPoster");
    console.log(form.get("organizationPoster"), "organizationPoster");
    // console.log(form.get("status"), " status ");

  if (validation===true)
   {  
    
    try {
      // const accessToken = document.cookie
      // .split(';')
      // .map((cookie) => cookie.trim())
      // .find((cookie) => cookie.startsWith('access_token='))
      // .split('=')[1];
      // console.log(accessToken);
    const response = await axios.post(`${API_URL}api/v1/hiring`,form, {
      headers: {
        accesstoken: getAccessToken(),
        
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
    setOpportunityPoster(e.target.files[0]);
  };
  const handleFileInputOrganizationPoster = (e) => {
    console.log(e.target.files[0]);
    setOrganizationPoster(e.target.files[0]);
  };

  const handleSkillsChange = (_, value) => {
    setSkillsRequired(value);
  };

        const step1 = (
            <div>
           

    <FormControl
      fullWidth
      >
      <InputLabel
          id="student-signup-campus-label"
          error={!!errors.OpportunityType}
        >
          Oppurtunity
        </InputLabel>
      <Select
        labelId="event-type-label"
        id="event-type"
        name="Opportunity Type"
        value={OpportunityType}
        label="Event Type"
        
        onChange={(e) => setOpportunityType(e.target.value)}
      >
        <MenuItem value="Job">Job</MenuItem>
        <MenuItem value="Internship">Internship</MenuItem>
        <MenuItem value="Challenge">Challenge</MenuItem>
        {/* <MenuItem value="Hackathon">Hackathon</MenuItem> */}
      </Select>
      <FormHelperText error={!!errors.OpportunityType}>
          {errors.OpportunityType}
        </FormHelperText>
    </FormControl>


                    <TextField
                        name="OpportunityName"
                        label="OpportunityName"
                        variant="outlined"
                        value={OpportunityName}
                        onChange={(e) => setOpportunityName(e.target.value)}
                        // onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.OpportunityName}
                        helperText={errors.OpportunityName}
                      />


                
<label htmlFor="OpportunityPoster">Oppurtunity Poster</label>
                <div>
                  <input
                    type="file"
                    id="OpportunityPoster"
                 
                    className="inputHosting"
                    onChange={handleFileInputChangePoster}
                  />

                  {file && <p>Selected file: {file.name}</p>}
                </div>





                     <TextField
                        name="OpportunityPosition"
                        label="Opportunity Position"
                        variant="outlined"
                        value={OpportunityPosition}
                        onChange={(e) => setOpportunityPosition(e.target.value)}
                        // onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.OpportunityPosition}
                        helperText={errors.OpportunityPosition}
                      />


                    <TextField
                        name="organization"
                        label="organization"
                        variant="outlined"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        // onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.organization}
                        helperText={errors.organization}
                      />


<label htmlFor="organizationPoster">Organization Poster</label>
                <div>
                  <input
                    type="file"
                    id="organizationPoster"
                 
                    className="inputHosting"
                    onChange={handleFileInputOrganizationPoster}
                  />

                  {file && <p>Selected file: {file.name}</p>}
                </div>





{/* till Page 1 */}



            </div>
          )

          const step2 = (
            <div>

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


                <TextField
                        name="email"
                        label="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email}
                      />
                <TextField
                        name="mobileNo"
                        label="mobile Number"
                        variant="outlined"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.mobileNo}
                        helperText={errors.mobileNo}
                      />
                         <TextField
                        name="alterNetMobileNo"
                        label="Alternate mobile Number"
                        variant="outlined"
                        value={alterNetMobileNo}
                        onChange={(e) => setAlterNetMobileNo(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.alterNetMobileNo}
                        helperText={errors.alterNetMobileNo}
                      />

            <label htmlFor="applicationStartTime"> Starting Date</label>
             
                
             <TextField
                        name="Application Start Date"
                        // label="Application Start Date"
                        id="applicationStartTime"
                        variant="outlined"
                        type ="date"
                        value={applicationStartTime}
                        onChange={(e) => setApplicationStartTime(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.applicationStartTime}
                        helperText={errors.applicationStartTime}
                      />
              <label htmlFor="applicationEndTime"> End Date</label>
                        <TextField
                        name="Application End Date"
                        id="applicationEndTime"
                        // label="Application End Date"
                        variant="outlined"
                        type ="date"
                        value={applicationEndTime}
                        onChange={(e) => setApplicationEndTime(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.applicationEndTime}
                        helperText={errors.applicationEndTime}
                      />
                      

                      

           
                <br />

           
                
            </div>
          )

          const step3 = (
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
                        name="minSalary"
                        label="Minimum Salary "
                        variant="outlined"
                        value={minSalary}
                        onChange={(e) => setMinSalary(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.minSalary}
                        helperText={errors.minSalary}
                      />
                      
                <TextField
                        name="maxSalary"
                        label="Maximum Salary"
                        variant="outlined"
                        value={maxSalary}
                        onChange={(e) => setMaxSalary(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.maxSalary}
                        helperText={errors.maxSalary}
                      />
                
              <FormControl
                        fullWidth
                        >
                        <InputLabel
                            id="student-signup-campus-label"
                            error={!!errors.IsPaid}
                          >
                           Paid/Unpaid
                          </InputLabel>
                        <Select
                          labelId="event-type-label"
                          id="event-type"
                          value={IsPaid}
                          label="Event Mode"
                          
                          onChange={(e) => setIsPaid(e.target.value)}
                        >
                          <MenuItem value={0}>Unpaid</MenuItem>
                          <MenuItem value={1}>paid</MenuItem>
                
                        </Select>
                        <FormHelperText error={!!errors.IsPaid}>
                            {errors.IsPaid}
                          </FormHelperText>
                      </FormControl>

                     <TextField
                        name="experience"
                        label="experience"
                        variant="outlined"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.experience}
                        helperText={errors.experience}
                      />   


             </div>
        
        )
            const step4=(
                <div>


                    <TextField
                        name="eligibility"
                        label="eligibility"
                        variant="outlined"
                        type="number"
                        value={eligibility}
                        onChange={(e) => setEligibility(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.eligibility}
                        helperText={errors.eligibility}
                      />

<div>
      <Autocomplete
        multiple
        options={['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python','Java','C++',' SQL','No-SQL','MongoDB','MERN','PHP','Web Development','Database Management','Ruby','Rust','Golang','Firebase','Heroku','azure','aws',
        'DevOps','Data Analysis','Numpy','Pandas','Tensorflow','Keras','OpenCV','OpenGL','excel','pandas','tableu','powerBI','Cloud Computing'
    ,'Google Cloud',  "Communication Skills",
    "Problem-Solving",
    "Teamwork and Collaboration",
    "Adaptability",
    "Leadership",
    "Time Management",
    "Creativity",
    "Analytical Thinking",
    "Emotional Intelligence",
    "Continuous Learning",

]}
        value={skillsRequired}
        onChange={handleSkillsChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Required Skills"
            placeholder="Select skills"
          />
        )}
      />
    </div>

    <TextField
                        name="jobLocation"
                        label="jobLocation"
                        variant="outlined"
                        value={jobLocation}
                        onChange={(e) => setJobLocation(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.jobLocation}
                        helperText={errors.jobLocation}
                      />


                <FormControl
                        fullWidth
                        >
                        <InputLabel
                            id="student-signup-campus-label"
                            error={!!errors.jobType}
                          >
                           Job Type
                          </InputLabel>
                        <Select
                          labelId="event-type-label"
                          id="event-type"
                          value={jobType}
                          label="Event Mode"
                          
                          onChange={(e) => setJobType(e.target.value)}
                        >
                          <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
                          <MenuItem value={"Remote"}>Remote</MenuItem>
                          <MenuItem value={"InOffice"}>InOffice</MenuItem>
                
                        </Select>
                        <FormHelperText error={!!errors.jobType}>
                            {errors.jobType}
                          </FormHelperText>
                      </FormControl>


                      <FormControl
                        fullWidth
                        >
                        <InputLabel
                            id="student-signup-campus-label"
                            error={!!errors.JobTiming}
                          >
                        Job Timings
                          </InputLabel>
                        <Select
                          labelId="event-type-label"
                          id="event-type"
                          value={JobTiming}
                          label="Event Mode"
                          
                          onChange={(e) => setJobTiming(e.target.value)}
                        >
                          <MenuItem value={"Full Time"}>Full Time</MenuItem>
                          <MenuItem value={"Part Time"}>Part Time</MenuItem>
                          <MenuItem value={"Contractual"}>Contractual</MenuItem>
                
                        </Select>
                        <FormHelperText error={!!errors.JobTiming}>
                            {errors.JobTiming}
                          </FormHelperText>
                      </FormControl>
                </div>
            )
            const step5=(
                <div>
                    
                    <TextField   //make it number type here number of months
                        name="duration"
                        label="duration"
                        variant="outlined"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.duration}
                        helperText={errors.durration}
                      />

                  <TextField   //make it number type here number of months
                        name="workDays"
                        label="workDays"
                        variant="outlined"
                        value={workDays}
                        onChange={(e) => setWorkDays(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.workDays}
                        helperText={errors.workDays}
                      />

                   <TextField
                        name="WebsiteUrl"
                        label="WebsiteUrl"
                        variant="outlined"
                        value={WebsiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.WebsiteUrl}
                        helperText={errors.WebsiteUrl}
                      />

                <FormControl
                        fullWidth
                        >
                        <InputLabel
                            id="student-signup-campus-label"
                            error={!!errors.isServiceOff}
                          >
                           Service on/off
                          </InputLabel>
                        <Select
                          labelId="event-type-label"
                          id="event-type"
                          value={isServiceOff}
                          label="service on/off"
                          
                          onChange={(e) => setIsServiceOff(e.target.value)}
                        >
                          <MenuItem value={false}>off</MenuItem>
                          <MenuItem value={true}>on</MenuItem>
                
                        </Select>
                        <FormHelperText error={!!errors.isServiceOff}>
                            {errors.isServiceOff}
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
                    
                </div>
            )
        return (


          <>
      <main className="signup-page">
        <section className="details-container">
          <div className="details">
            <HostEventTimeline
              step={step}
              numberOfCheckpoints={5}
              width="100%"
            />
            <form action="/" method="POST" onSubmit={handleSubmit}>
              {step === 1 && step1}
              {step === 2 && step2}
              {step === 3 && step3}
              {step === 4 && step4}
              {step === 5 && step5}
         
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
                  type={`${step === 5 ? "submit" : "button"}`}
                  onClick={handleNext}
                  className="button next-button"
                >
                  {`${step === 5 ? "Submit" : "Next"}`}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
        )

}

export default JobRegistrationForm;
