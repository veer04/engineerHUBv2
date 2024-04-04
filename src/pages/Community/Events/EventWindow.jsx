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

  const renderEventWindow = (
    <>
      <section className="header">
        <div className="poster">
          <img src={event?.eventPoster} alt="poster" />
        </div>
        <div className="details">
          <span className="heading">{event?.eventName}</span>
          <span className="name">
            Organized by{" "}
            <strong>
              {`${
                !!event?.creatorId?.name
                  ? event?.creatorId?.name
                  : `${event?.creatorId?.firstName} ${event?.creatorId?.lastName}`
              }` || "engineerHUB"}{" "}
            </strong>
          </span>
          <div className="type">#{event?.eventType}</div>
        </div>
      </section>
      <section className="registration">
        <div>
          <div className="detail">
            <div className="logo">
              <AiOutlineCalendar />
            </div>
            <div className="headings">
              <span>Event Date:</span>
              <span>{eventDate}</span>
            </div>
          </div>

          <button
            onClick={() => (window.location.href = event?.applyLink)}
            className="register-btn"
          >
            Register Now
          </button>
        </div>
      </section>
      <section className="content">
        <div className="data">
          <div className="detail">
            <div className="logo">
              <AiOutlineCalendar />
            </div>
            <div className="headings">
              <span>Day:</span>
              <span>{day}</span>
            </div>
          </div>
          <div className="detail">
            <div className="logo">
              <AiOutlinePhone />
            </div>
            <div className="headings">
              <span>Phone Number:</span>
              <span>{event?.creatorId?.mobile || "Not Available"}</span>
            </div>
          </div>
        </div>
        <div className="data">
          <div className="detail">
            <div className="logo">
              <AiOutlineClockCircle />
            </div>
            <div className="headings">
              <span>Time:</span>
              <span>{time}</span>
            </div>
          </div>
          <div className="detail">
            <div className="logo">
              <AiOutlineMail />
            </div>
            <div className="headings">
              <span>Email:</span>
              <span>{event?.creatorId?.email || "Not Available"}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="description">
        <span className="heading">Event Details</span>
        <span className="details">
          {event?.description || "No description provided"}
        </span>
      </section>
      <section className="description">
        <span className="heading">Policy</span>
        <span className="details">{event?.policy || "No policy provided"}</span>
      </section>
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
