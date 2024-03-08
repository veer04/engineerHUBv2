import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { isUserLoggedIn } from "../../features/User/UserDetails";
import { redirectToAuth } from "../../features/redirectToAuth";
import { Bucket_URL } from "../../services/APIUtils";
import FormInput from "../../components/FormInputs/FormInput";
import FormInputTextarea from "../../components/FormInputs/FormInputTextArea";
import FormInputDropdown from "../../components/FormInputs/FormInputDropdown";
import "./HostingCulturalEvent.css";
import FormInputFileUpload from "../../components/FormInputs/FormInputFileUpload";

export default function HostingCulturalEvent() {
  if (!isUserLoggedIn()) {
    redirectToAuth("/login");
  }
  const bucket = `${Bucket_URL}frontend/hosting/`;
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventType, setEventType] = useState();
  const [eventPoster, setEventPoster] = useState("");

  const [errors, setErrors] = useState({
    eventName: "",
    eventDescription: "",
    eventType: "",
    eventPoster: "",
  });

  const options = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
    { label: "Yellow", value: "yellow" },
    { label: "Orange", value: "orange" },
    { label: "Purple", value: "purple" },
    { label: "Black", value: "black" },
    { label: "White", value: "white" },
    { label: "Grey", value: "grey" },
    { label: "Brown", value: "brown" },
  ];

  return (
    <main className="hosting-container">
      <aside
        style={{
          backgroundImage: `url(${bucket}cultural-event-poster-large.png)`,
        }}
        className="poster-container"
      >
        <div className="fact">
          <p>Do you know?</p>
          <p>
            Every year around 2000+ cultural event are host across Indian
            colleges
          </p>
        </div>
      </aside>
      <section className="main">
        <div className="header">
          <span className="navigate-back">
            <IoIosArrowBack /> Back
          </span>
          <h1 className="title">Cultural Event Details</h1>
          <div>indicator</div>
        </div>
        <div className="content">
          <h2>Basic Details</h2>
          <FormInput
            label="Event Name"
            required
            constraint="max 30 characters"
            placeholder="Enter event name"
            value={eventName}
            setValue={setEventName}
            helperText={errors.eventName}
            className="mb-2"
            // disabled
          />
          <FormInputTextarea
            label="Event Description"
            required
            constraint="max 200 characters"
            placeholder="Enter event description"
            rows={8}
            value={eventDescription}
            setValue={setEventDescription}
            helperText={errors.eventDescription}
            className="mb-2"
            // disabled
          />
          <FormInputDropdown
            label="Event Type"
            required
            placeholder="Select event type"
            value={eventType}
            setValue={setEventType}
            options={options}
            helperText={errors.eventType}
            className="mb-2"
            // disabled
          />
          <FormInputFileUpload
            label="Event Poster"
            required
            constraint="max 5MB"
            placeholder="Upload event poster 1:1 ratio"
            fileType="image/*"
            value={eventPoster}
            setValue={setEventPoster}
            helperText={errors.eventPoster}
            className="mb-2"
            // disabled
          />
        </div>
      </section>
    </main>
  );
}
