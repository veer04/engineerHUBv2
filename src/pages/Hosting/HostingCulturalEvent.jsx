import "./HostingCulturalEvent.css";
import { getUserRole, isUserLoggedIn } from "../../features/User/UserDetails";
import { redirectToAuth } from "../../features/redirectToAuth";
import { MdArrowLeft } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import culturalEventPosterLarge from "./cultural-event-poster-large.png";
import FormInput from "../../components/FormInputs/FormInput";
import { useState } from "react";

export default function HostingCulturalEvent() {
  if (!isUserLoggedIn()) {
    redirectToAuth("/login");
  }
  const [eventName, setEventName] = useState("");

  const [errors, setErrors] = useState({
    eventName: "",
  });

  return (
    <main className="hosting-container">
      <aside
        style={{
          backgroundImage: `url(${culturalEventPosterLarge})`,
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
            placeholder="This is a placeholder"
            value={eventName}
            setValue={setEventName}
            helperText={errors.eventName}
            className="mb-2"
          />
        </div>
      </section>
    </main>
  );
}
