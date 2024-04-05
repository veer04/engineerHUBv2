import React, { useState, useEffect } from "react";
import "./EventRegistration.css";
import axios from "axios";
import FormData from "form-data";
import useNavbar from "../../hooks/use-navbar";
import { API_URL } from "../../services/APIUtils";
import { Select, MenuItem } from "@mui/material";
import HostEventTimeline from "../../components/Timeline/HostEventTimeline";
import {
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

import {
  controller,
  getAllCampuses,
  getDomains,
} from "../../services/APIConfig";
import { getAccessToken } from "../../features/getCookieValues";
import { useNavigate } from "react-router-dom";

const EventRegistrationForm = () => {
  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();

  useEffect(() => {
    document.title = "Host an Event | engineerHUB";
    window.scrollTo(0, 0);
    setSelectedPageNavbar("host");
    return () => {
      controller.abort();
    };
  }, []);

  const [step, setStep] = useState(1);
  const [domainName, setDomainName] = useState("");
  const [domain, setDomain] = useState([]); //only to fetch data
  const [campusId, setCampusId] = useState("");
  const [campuses, setCampuses] = useState([]); //only to fetch data
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
  const [policy, setPolicy] = useState("");
  const [validation, setValidation] = useState(false);

  const [errors, setErrors] = useState({
    domainName: "",
    campusId: "",
    eventStartTime: "",
    eventEndTime: "",
    eventType: "",
    eventModeType: "",
    mode: "",
    policy: "",
    status: "",
  });

  const [file, setFile] = useState();

  const validateInput1 = () => {
    let valid = true;
    const newErrors = {
      eventName: "",
      domainName: "",
      eventType: "",
      eventModeType: "",
    };

    if (!eventName) {
      newErrors.eventName = "Event name is required";
      valid = false;
    } else if (!/^[a-zA-Z\d\s]+$/.test(eventName)) {
      newErrors.eventName =
        "Event name should not contain any special characters such as *:$#!@^";
      valid = false;
    } else if (eventName.length < 3) {
      newErrors.eventName = "Event name should be of atleast 3 characters";
      valid = false;
    }
    if (!domainName) {
      newErrors.domainName = "Domain name is required";
      valid = false;
    } else if (domainName.length < 3) {
      newErrors.domainName = "Domain name should be of atleast 3 characters";
      valid = false;
    }
    if (!eventType) {
      newErrors.eventType = "Event type is required";
      valid = false;
    }
    if (!eventModeType) {
      newErrors.eventModeType = "Event mode is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const validateInput2 = () => {
    let valid = true;
    const newErrors = {
      description: "",
      eventStartTime: "",
      eventEndTime: "",
      applyLink: "",
    };

    if (!description) {
      newErrors.description = "Description is required";
      valid = false;
    } else if (description.length < 51) {
      newErrors.description = "Description should have atleast 50 characters";
      valid = false;
    }
    if (!eventStartTime) {
      newErrors.eventStartTime = "Event start time is required";
      valid = false;
    }
    if (!eventEndTime) {
      newErrors.eventEndTime = "Event end time is required";
      valid = false;
    }
    if (!applyLink) {
      newErrors.applyLink = "Apply link is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validateInput3 = () => {
    let valid = true;
    const newErrors = {
      policy: "",
    };
    if (!policy) {
      newErrors.policy = "Policy is required";
      valid = false;
    } else if (policy.length < 51) {
      newErrors.policy = "Policy should have atleast 50 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

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

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllCampuses(setCampuses);
    getDomains(setDomain);

    return () => {
      controller.abort();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("domainName", domainName);
    if (!!campusId) {
      form.append("campusId", campusId);
    }
    form.append("eventType", eventType);
    form.append("description", description);
    form.append("eventStartTime", eventStartTime);
    form.append("eventEndTime", eventEndTime);
    form.append("applyLink", applyLink);
    form.append("mode", mode);
    form.append("eventName", eventName);
    form.append("eventModeType", eventModeType);
    form.append("eventPoster", eventPoster);
    form.append("policy", policy);
    form.append("status", status);

    if (validation === true) {
      try {
        const response = await axios.post(`${API_URL}api/v1/event`, form, {
          headers: {
            accesstoken: getAccessToken(),
          },
        });

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
    }
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
          labelid="Domain-name"
          id="student-signup-campus-select"
          value={domainName}
          label="Domain Name"
          name="domainName"
          onChange={(e) => setDomainName(e.target.value)}
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
        <InputLabel id="student-signup-campus-label" error={!!errors.campusId}>
          Campus Name
        </InputLabel>
        <Select
          labelid="campus-name"
          id="student-signup-campus-select"
          value={campusId}
          label="Campus Name"
          name="campusId"
          onChange={(e) => setCampusId(e.target.value)}
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

      <FormControl fullWidth>
        <InputLabel id="student-signup-campus-label" error={!!errors.eventType}>
          Event Type
        </InputLabel>
        <Select
          labelid="event-type-label"
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

      <FormControl fullWidth>
        <InputLabel
          id="student-signup-campus-label"
          error={!!errors.eventModeType}
        >
          Event Mode Type
        </InputLabel>
        <Select
          labelid="event-type-label"
          id="event-type"
          value={eventModeType}
          label="Event Mode Type"
          onChange={(e) => setEventModeType(e.target.value)}
        >
          {/* <MenuItem value="InterCollege">InterCollege</MenuItem> */}
          <MenuItem value="collegeEvent">College Event</MenuItem>
          <MenuItem value="Workshop">Workshop</MenuItem>
        </Select>
        <FormHelperText error={!!errors.eventModeType}>
          {errors.eventModeType}
        </FormHelperText>
      </FormControl>
    </div>
  );

  const step2 = (
    <div>
      <TextField
        name="description"
        label="Description"
        variant="outlined"
        value={description}
        multiline
        minRows={3}
        maxRows={6}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.description}
        helperText={errors.description}
      />

      <label htmlFor="sdate">Event Start Date</label>
      <TextField
        name="Event Start Date"
        variant="outlined"
        id="sdate"
        type="date"
        value={eventStartTime}
        onChange={(e) => setEventStartTime(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.eventStartTime}
        helperText={errors.eventStartTime}
      />
      <label htmlFor="edate">Event End Date</label>
      <TextField
        name="Event End Date"
        variant="outlined"
        type="date"
        id="edate"
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
        label="Apply Link"
        variant="outlined"
        value={applyLink}
        onChange={(e) => setApplyLink(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.applyLink}
        helperText={errors.applyLink}
      />
    </div>
  );

  const step3 = (
    <div>
      <FormControl margin="normal" fullWidth>
        <InputLabel id="student-signup-campus-label" error={!!errors.mode}>
          Event Mode
        </InputLabel>
        <Select
          labelid="event-type-label"
          id="event-type"
          value={mode}
          label="Event Mode"
          onChange={(e) => setMode(e.target.value)}
        >
          <MenuItem value={0}>online</MenuItem>
          <MenuItem value={1}>offline</MenuItem>
        </Select>
        <FormHelperText error={!!errors.mode}>{errors.mode}</FormHelperText>
      </FormControl>

      <TextField
        name="policy"
        label="Policy"
        variant="outlined"
        value={policy}
        onChange={(e) => setPolicy(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.policy}
        helperText={errors.policy}
      />

      <FormControl margin="normal" fullWidth>
        <InputLabel id="student-signup-campus-label" error={!!errors.status}>
          Event Status
        </InputLabel>
        <Select
          labelid="event-type-label"
          id="event-type"
          value={status}
          label="Event Status"
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value={"Upcoming"}>Upcoming</MenuItem>
          <MenuItem value={"Ongoing"}>Ongoing</MenuItem>
          <MenuItem value={"Completed"}>Completed</MenuItem>
        </Select>
        <FormHelperText error={!!errors.status}>{errors.status}</FormHelperText>
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
    </div>
  );

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
  );
};

export default EventRegistrationForm;
