import "./HostingCulturalEvent.css";
import { isUserLoggedIn } from "../../features/User/UserDetails";
import { redirectToAuth } from "../../features/redirectToAuth";
import { IoIosArrowBack } from "react-icons/io";
import FormInput from "../../components/FormInputs/FormInput";
import { useState } from "react";
import FormInputTextarea from "../../components/FormInputs/FormInputTextArea";
import FormInputDropdown from "../../components/FormInputs/FormInputDropdown";
import { Bucket_URL } from "../../services/APIUtils";

export default function HostingCulturalEvent() {
  if (!isUserLoggedIn()) {
    redirectToAuth("/login");
  }
  const bucket = `${Bucket_URL}frontend/hosting/`;
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventType, setEventType] = useState();

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
  const [errors, setErrors] = useState({
    eventName: "",
    eventDescription: "",
    eventType: "",
  });

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
            disabled
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
            disabled
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
            disabled
          />
        </div>
      </section>
    </main>
  );
}
