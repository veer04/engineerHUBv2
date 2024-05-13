import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { getEventById, getProjectById } from "../../../services/APIConfig";
import Loading from "../../../components/Loader/Loading";
import { defaultEventPoster } from "../../../assets/defaultPoster";

export default function EventWindow() {
  const { id, eventId } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({});
  const [event, setEvent] = useState({});
  const [handleHeight] = useOutletContext();

  if (!!!eventId) {
    return;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getEventById(setEventData, eventId);

    return () => {
      setEventData({});
    };
  }, [eventId]);

  useEffect(() => {
    if (eventData?.data?.data) {
      document.title = `${eventData?.data?.data?.eventName} | Events | engineerHUB`;
    }
    setEvent(eventData?.data?.data || {});
  }, [eventData]);

  useEffect(() => {
    if (Object.keys(event).length !== 0) {
      handleHeight();
    }
  }, [event]);

  // code for date element in card
  const date = new Date(event?.eventEndTime);
  const day = date.toLocaleString("en-IN", { weekday: "long" });
  let getDate = date
    .toLocaleTimeString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(/,/g, " /");
  getDate = getDate.replace("am", "AM");
  getDate = getDate.replace("pm", "PM");
  const eventDate = getDate.split("/")[0];
  const time = getDate.split("/")[1];

  function timeInText(time) {
    const eventTime = new Date(time);
    return eventTime.toLocaleTimeString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  const renderEventWindow = (
    <>
      <section className="header">
        <div className="poster">
          <img
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultEventPoster;
            }}
            src={event?.eventPoster}
            alt="poster"
          />
        </div>
        <div className="details">
          <span className="heading">{event?.eventName}</span>
          <span className="name">
            Organized by{" "}
            <strong>
              {`${
                !!event?.creatorId?.name
                  ? event?.creatorId?.name
                  : `${
                      event?.creatorId?.firstName
                        ? `${event?.creatorId?.firstName} ${
                            event?.creatorId?.lastName
                              ? event?.creatorId?.lastName
                              : ""
                          }`
                        : "engineerHUB"
                    }`
              }`}
            </strong>
          </span>
          <div className="d-flex gap-2 flex-wrap">
            {event?.domainName && (
              <div className="type">#{event?.domainName}</div>
            )}
            {event?.eventType && (
              <div className="type">
                #
                {event?.eventType === "eventHiring"
                  ? "Event Hiring"
                  : event?.eventType}
              </div>
            )}
            {(event?.mode === true || event?.mode === false) && (
              <div className="type">#{event?.mode ? "Online" : "Offline"}</div>
            )}
            {event?.registrationType && (
              <div className="type">#{event?.registrationType}</div>
            )}
          </div>
        </div>
      </section>
      <section className="registration">
        <div>
          <div className="detail">
            <div className="logo">
              <AiOutlineCalendar />
            </div>
            <div className="headings">
              <span>Register by:</span>
              <span>
                {timeInText(
                  event?.eventRegistrationEndTime || event?.eventStartTime
                )}
              </span>
            </div>
          </div>
          <button
            onClick={() => (window.location.href = event?.applyLink)}
            className="register-btn"
          >
            Visit Now
          </button>
        </div>
      </section>
      <section
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        className="content"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
          }}
          className="data"
        >
          <div className="detail">
            <div className="logo">
              <AiOutlineCalendar />
            </div>
            <div className="headings">
              <span>Event Start Date:</span>
              <span>{timeInText(event?.eventStartTime)}</span>
            </div>
          </div>
          <div className="detail">
            <div className="logo">
              <AiOutlineCalendar />
            </div>
            <div className="headings">
              <span>Event End Date:</span>
              <span>{timeInText(event?.eventEndTime)}</span>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
          }}
          className="data"
        >
          <div className="detail">
            <div className="logo">
              <AiOutlinePhone style={{ transform: "rotate(90deg)" }} />
            </div>
            <div className="headings">
              <span>Phone Number:</span>
              <span>
                {event?.showContactDetails
                  ? event?.organizerMobile
                    ? `+${event?.organizerMobileCountryCode} ${event?.organizerMobile}`
                    : "Not Available"
                  : "Not disclosed"}
              </span>
            </div>
          </div>
          <div className="detail">
            <div className="logo">
              <AiOutlineMail />
            </div>
            <div className="headings">
              <span>Email:</span>
              <span>
                {event?.showContactDetails
                  ? event?.organizerEmail
                    ? event?.organizerEmail
                    : "Not Available"
                  : "Not disclosed"}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="description">
        <span className="heading">Event Details</span>
        <span
          className="details"
          dangerouslySetInnerHTML={{
            __html: event?.description,
          }}
        ></span>
      </section>
      {!!event?.policy && (
        <section className="description">
          <span className="heading">Policy</span>
          <span className="details">{event?.policy}</span>
        </section>
      )}
    </>
  );

  return (
    <div id="event-window" className="event-window">
      <div
        onClick={() => navigate(`/community/events/${encodeURIComponent(id)}`)}
        className="cancel"
      >
        <RxCross1 />
      </div>
      {Object.keys(eventData).length === 0 && (
        <div
          style={{ height: "50vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Loading />
        </div>
      )}
      {Object.keys(eventData).length !== 0 && (
        <>
          {eventData?.status === 200 ? (
            renderEventWindow
          ) : (
            <div
              style={{ height: "50vh" }}
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <h4>No data found</h4>
              <span>It may have been moved or removed</span>
              <span
                style={{ color: "grey", fontSize: ".75rem" }}
              >{`EventId: ${eventId}`}</span>
              <span
                style={{ color: "grey", fontSize: ".75rem" }}
              >{`error code: ${eventData?.response.status}`}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
