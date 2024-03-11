import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { isUserLoggedIn } from "../../features/User/UserDetails";
import { redirectToAuth } from "../../features/redirectToAuth";
import { Bucket_URL } from "../../services/APIUtils";
import FormInput from "../../components/FormInputs/FormInput";
import FormInputTextarea from "../../components/FormInputs/FormInputTextarea";
import FormInputDropdown from "../../components/FormInputs/FormInputDropdown";
import FormInputFileUpload from "../../components/FormInputs/FormInputFileUpload";
import FormInputSelect from "../../components/FormInputs/FormInputSelect";
import FormInputSelectOption from "../../components/FormInputs/FormInputSelectOption";
import FormInputDate from "../../components/FormInputs/FormInputDate";
import FormInputDateTime from "../../components/FormInputs/FormInputDateTime";
import FormInputToggle from "../../components/FormInputs/FormInputToggle";
import FormInputAutocomplete from "../../components/FormInputs/FormInputAutocomplete";
import FormInputMultiValue from "../../components/FormInputs/FormInputMultiValue";
import FormButton from "../../components/FormInputs/FormButton";
import FormIndicator from "../../components/FormInputs/FormIndicator";
import "../../pages/Hosting/HostingCulturalEvent.css";
 
export default function DoNotImportSampleFile() {
  if (!isUserLoggedIn()) {
    redirectToAuth("/login");
  }
  const bucket = `${Bucket_URL}frontend/hosting/`;
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventType, setEventType] = useState();
  const [eventPoster, setEventPoster] = useState("");
  const [eventMode, setEventMode] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventToggle, setEventToggle] = useState(false);
  const [autocomplete, setAutocomplete] = useState("");
  const [multiValue, setMultiValue] = useState([]);

  const [errors, setErrors] = useState({
    eventName: "",
    eventDescription: "",
    eventType: "",
    eventPoster: "",
    eventMode: "",
    eventDate: "",
    eventTime: "",
    eventToggle: "",
    autocomplete: "",
    multiValue: "",
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

  const autocompleteOptions = [
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Orange",
    "Purple",
    "Black",
    "White",
    "Grey",
    "Brown",
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
          <FormIndicator className="mt-2" totalPages={4} currentPage={2} />
        </div>
        <div className="content">
          <h2>Basic Details</h2>
          <div className="d-flex gap-4 flex-column">
            <FormInput
              label="Event Name"
              required
              constraint="max 30 characters"
              placeholder="Enter event name"
              caption="Name of the event"
              value={eventName}
              setValue={setEventName}
              helperText={errors.eventName}
              // className="mb-2"
              // disabled
            />
            <FormInputTextarea
              label="Event Description"
              required
              constraint="max 200 characters"
              placeholder="Enter event description"
              caption="Name of the event"
              rows={8}
              value={eventDescription}
              setValue={setEventDescription}
              helperText={errors.eventDescription}
              // className="mb-2"
              // disabled
            />
            <FormInputDropdown
              label="Event Type"
              required
              placeholder="Select event type"
              caption="Name of the event"
              value={eventType}
              setValue={setEventType}
              options={options}
              helperText={errors.eventType}
              // className="mb-2"
              // disabled
            />
            <FormInputFileUpload
              label="Event Poster"
              required
              constraint="max 5MB"
              placeholder="Upload event poster 1:1 ratio"
              caption="Name of the event"
              fileType="image/*"
              value={eventPoster}
              setValue={setEventPoster}
              helperText={errors.eventPoster}
              // className="mb-2"
              // disabled
            />
            <FormInputSelect
              label="Event Mode"
              required
              constraint="max 3"
              caption="Name of the event"
              helperText={errors.eventMode}
              // className="mb-2"
            >
              <div className="d-flex gap-4">
                <FormInputSelectOption
                  icon={
                    <svg
                      style={{ marginRight: "8px" }}
                      width="26"
                      height="27"
                      viewBox="0 0 26 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 0.5C5.824 0.5 0 6.324 0 13.5C0 20.676 5.824 26.5 13 26.5C20.176 26.5 26 20.676 26 13.5C26 6.324 20.176 0.5 13 0.5ZM11.7 23.809C6.565 23.172 2.6 18.804 2.6 13.5C2.6 12.694 2.704 11.927 2.873 11.173L9.1 17.4V18.7C9.1 20.13 10.27 21.3 11.7 21.3V23.809ZM20.67 20.507C20.332 19.454 19.37 18.7 18.2 18.7H16.9V14.8C16.9 14.085 16.315 13.5 15.6 13.5H7.8V10.9H10.4C11.115 10.9 11.7 10.315 11.7 9.6V7H14.3C15.73 7 16.9 5.83 16.9 4.4V3.867C20.709 5.414 23.4 9.145 23.4 13.5C23.4 16.204 22.36 18.661 20.67 20.507Z"
                        fill="#002B36"
                      />
                    </svg>
                  }
                  label="Online"
                  value={eventMode}
                  setValue={setEventMode}
                  // multiple
                  result="online"
                  helperText={errors.eventMode}
                  disabled
                />
                <FormInputSelectOption
                  label="Offline"
                  icon={
                    <svg
                      style={{ marginRight: "8px" }}
                      width="26"
                      height="27"
                      viewBox="0 0 26 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.1232 8.28738L6.43377 2.59515C8.42698 1.2699 10.8113 0.5 13.3848 0.5C20.3484 0.5 26 6.15437 26 13.1214C26 15.6961 25.2305 18.0816 23.9059 20.0757L22.064 18.233C22.9597 16.7437 23.477 14.9893 23.477 13.1214C23.477 8.8932 20.8656 5.27087 17.1693 3.76893V4.28641C17.1693 5.67476 16.034 6.81068 14.6463 6.81068H12.1232V8.28738ZM24.9782 24.7204L23.1994 26.5L20.3358 23.635C18.3426 24.9728 15.9583 25.7427 13.3848 25.7427C6.42115 25.7427 0.769529 20.0883 0.769529 13.1214C0.769529 10.5466 1.53906 8.16116 2.86366 6.16699L0 3.30194L1.77875 1.52233L24.9782 24.7204ZM12.1232 20.6942C10.7356 20.6942 9.60019 19.5583 9.60019 18.1699V16.9078L3.5575 10.8621C3.3935 11.5942 3.29258 12.3388 3.29258 13.1214C3.29258 18.2709 7.14022 22.5117 12.1232 23.1301V20.6942Z"
                        fill="#002B36"
                      />
                    </svg>
                  }
                  value={eventMode}
                  setValue={setEventMode}
                  // multiple
                  result="offline"
                  helperText={errors.eventMode}
                  // disabled
                />
              </div>
            </FormInputSelect>
            <FormInputDate
              label="Event Date"
              required
              constraint="max 3"
              caption="Name of the event"
              value={eventDate}
              setValue={setEventDate}
              helperText={errors.eventDate}
              // className="mb-2"
            />
            <FormInputDateTime
              label="Event Time"
              required
              constraint="max 3"
              caption="Name of the event"
              value={eventTime}
              setValue={setEventTime}
              helperText={errors.eventTime}
              // className="mb-2"
            />
            <FormInputToggle
              label="Show Contact Details to candidates"
              // checkedLabel="Yes"
              // uncheckedLabel="No"
              required
              value={eventToggle}
              setValue={setEventToggle}
              helperText={errors.eventToggle}
              // className="mb-2"
              // disabled
            />
            <FormInputAutocomplete
              label="Autocomplete"
              required
              constraint="max 3"
              placeholder="Enter skills"
              caption="Name of the event"
              value={autocomplete}
              setValue={setAutocomplete}
              options={autocompleteOptions}
              helperText={errors.skills}
              // className="mb-2"
              // disabled
            />
            <FormInputMultiValue
              label="Skills"
              required
              constraint="max 3"
              placeholder="Enter skills"
              caption="Name of the event"
              value={multiValue}
              setValue={setMultiValue}
              options={autocompleteOptions}
              helperText={errors.multiValue}
              // className="mb-2"
              // disabled
            />
            <FormButton disabled>Previous</FormButton>
            <FormButton>Submit</FormButton>
          </div>
        </div>
      </section>
    </main>
  );
}
