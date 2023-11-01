import { useEffect, useState } from "react";
import "./TrendingEvents.css";
import CampusSearchBox from "../../components/CampusSearchBox/CampusSearchBox";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllCampuses,
  getEventByMode,
  getFeaturedEvents,
  getParticularEventDetails,
} from "../../services/APIConfig";
import { FaArrowTrendUp } from "react-icons/fa6";
import defaultPoster from "../../assets/defaultPoster";
import Page404 from "../Maintenance/Page404";
import LoadingPage from "../../components/Loader/LoadingPage";
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";

export default function TrendingEvents() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [trendingList, setTrendingList] = useState([]);
  const [eventData, setEventData] = useState({});
  const [event, setEvent] = useState({});
  const [allCampuses, setAllCampuses] = useState([]);
  const [output, setOutput] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    getEventByMode(setTrendingList, "Workshop");
    getParticularEventDetails(setEventData, eventId);
    getAllCampuses(setAllCampuses);

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      setEventData({});
      setEvent({});
      window.removeEventListener("resize", handleResize);
    };
  }, [eventId]);

  useEffect(() => {
    if (Object.keys(event).length !== 0) {
      setTimeout(() => {
        document.getElementById("column-1").style.height = `${
          document.getElementById("column-2").offsetHeight
        }px`;
      }, 250);
    }
  }, [event, trendingList, width]);

  useEffect(() => {
    if (output) {
      navigate(`/campus/search/${output}`);
    }
  }, [output]);

  useEffect(() => {
    if (Object.keys(eventData).length !== 0) {
      setEvent(eventData?.data?.data);
    }
  }, [eventData]);

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

  const renderTrendingCollege = (
    <main className="trending-events">
      <div className="search-bar__container">
        <div>
          <CampusSearchBox
            data={allCampuses}
            placeholder="Search any Campus, Clubs or Almas"
            searchParams={["collegeName"]}
            listLength={4}
            setOutput={setOutput}
          />
        </div>
      </div>
      <div className="content-container">
        <aside id="column-1" className="column column-1">
          <div className="list-heading">
            <div>
              <FaArrowTrendUp /> Trending Workshops
            </div>
          </div>
          <div className="cards">
            {trendingList?.map((item) => (
              <div
                onClick={() => navigate(`/trending/events/${item._id}`)}
                key={item._id}
                className="card"
                style={{
                  cursor: "pointer",
                }}
              >
                <div className="poster">
                  {item?.eventPoster ? (
                    <img src={item?.eventPoster} alt="poster" />
                  ) : (
                    <img src={defaultPoster} alt="poster" />
                  )}
                </div>
                <span className="text-crop-2 heading">{item?.eventName}</span>
                <span className="text-crop-2 description">
                  {item?.description}
                </span>
                <div className="details">
                  <div className="logo">
                    <img src={item?.creatorId?.image} alt="logo" />
                  </div>
                  <div className="name">
                    <span className="title">Organized By</span>
                    <span className="label text-crop-2">
                      {`${
                        !!item?.creatorId?.name
                          ? item?.creatorId?.name
                          : `${item?.creatorId?.firstName} ${item?.creatorId?.lastName}`
                      }`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
        <div id="column-2" className="column column-2">
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
                Visit Now
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
            <span className="details">
              {event?.policy || "No policy provided"}
            </span>
          </section>
        </div>
      </div>
    </main>
  );

  return !!Object.keys(eventData).length ? (
    eventData?.status >= 200 && eventData?.status <= 300 ? (
      renderTrendingCollege
    ) : (
      <Page404 />
    )
  ) : (
    <LoadingPage />
  );
}
