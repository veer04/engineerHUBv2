import { useParams, useNavigate } from "react-router-dom";
import "./NewEventCard.css";
import { defaultEventPoster, eHUBLogo } from "../../assets/defaultPoster";

export default function NewEventCard({
  data,
  community,
  workshop,
  eventHiring,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const time = new Date(data?.eventStartTime);
  const eventDate = time.toLocaleString("default", {
    day: "numeric",
    month: "long",
  });
  const formattedDate = eventDate.split(" ");
  let month = formattedDate[0];
  let date = formattedDate[1];
  if (date.length > 2) {
    // we will swap month and date
    const temp = month;
    month = date;
    date = temp;
  }
  let eventDateWithSuffix = "";
  if (date === "1" || date === "21" || date === "31") {
    eventDateWithSuffix = `${month} ${date}st `;
  } else if (date === "2" || date === "22") {
    eventDateWithSuffix = `${month} ${date}nd`;
  } else if (date === "3" || date === "23") {
    eventDateWithSuffix = `${month} ${date}rd`;
  } else {
    eventDateWithSuffix = `${month} ${date}th`;
  }

  // const eventTime = time.toLocaleString("default", {
  //   hour: "numeric",
  //   minute: "numeric",
  //   hour12: true,
  // });

  function currentTime() {
    const time = new Date();
    return time.getTime();
  }

  function eventTimeInMs(time) {
    const eventTime = new Date(time);
    return eventTime.getTime();
  }

  return (
    <div
      onClick={() => {
        if (eventHiring) {
          navigate(`/company/events/${data._id}`);
        } else if (community)
          navigate(`/community/events/${encodeURIComponent(id)}/${data._id}`);
        else if (!workshop) {
          navigate(`/trending/events/${data._id}`);
        } else {
          navigate(`/trending/workshops/${data._id}`);
        }
      }}
      key={data._id}
      className="event-card-new card"
      style={{
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "1/1",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="poster"
      >
        <div className="registration-text">
          <svg
            width="19"
            height="25"
            viewBox="0 0 19 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.5 25C0 25 12.9571 0 0 0H19V25H16.5Z"
              fill={`${
                currentTime() < eventTimeInMs(data?.eventRegistrationStartTime)
                  ? "#E9EEF0"
                  : eventTimeInMs(data?.eventRegistrationStartTime) <=
                      currentTime() &&
                    currentTime() <
                      eventTimeInMs(data?.eventRegistrationEndTime)
                  ? "#FFFFFE"
                  : eventTimeInMs(data?.eventRegistrationEndTime) <=
                      currentTime() &&
                    currentTime() < eventTimeInMs(data?.eventStartTime)
                  ? "#F1FFFF"
                  : eventTimeInMs(data?.eventStartTime) <= currentTime() &&
                    currentTime() < eventTimeInMs(data?.eventEndTime)
                  ? "#CFECCD"
                  : "#FFE5E5"
              }`}
            />
          </svg>
          <div
            style={{
              backgroundColor: `${
                currentTime() < eventTimeInMs(data?.eventRegistrationStartTime)
                  ? "#E9EEF0"
                  : eventTimeInMs(data?.eventRegistrationStartTime) <=
                      currentTime() &&
                    currentTime() <
                      eventTimeInMs(data?.eventRegistrationEndTime)
                  ? "#FFFFFE"
                  : eventTimeInMs(data?.eventRegistrationEndTime) <=
                      currentTime() &&
                    currentTime() < eventTimeInMs(data?.eventStartTime)
                  ? "#F1FFFF"
                  : eventTimeInMs(data?.eventStartTime) <= currentTime() &&
                    currentTime() < eventTimeInMs(data?.eventEndTime)
                  ? "#CFECCD"
                  : "#FFE5E5"
              }`,
              color: `${
                currentTime() < eventTimeInMs(data?.eventRegistrationStartTime)
                  ? "#002B36"
                  : eventTimeInMs(data?.eventRegistrationStartTime) <=
                      currentTime() &&
                    currentTime() <
                      eventTimeInMs(data?.eventRegistrationEndTime)
                  ? "#DA9000"
                  : eventTimeInMs(data?.eventRegistrationEndTime) <=
                      currentTime() &&
                    currentTime() < eventTimeInMs(data?.eventStartTime)
                  ? "#138382"
                  : eventTimeInMs(data?.eventStartTime) <= currentTime() &&
                    currentTime() < eventTimeInMs(data?.eventEndTime)
                  ? "#05902C"
                  : "#FF0000"
              }`,
            }}
            className="box"
          >
            {currentTime() < eventTimeInMs(data?.eventRegistrationStartTime)
              ? "Yet to begin"
              : eventTimeInMs(data?.eventRegistrationStartTime) <=
                  currentTime() &&
                currentTime() < eventTimeInMs(data?.eventRegistrationEndTime)
              ? "Registrations Open"
              : eventTimeInMs(data?.eventRegistrationEndTime) <=
                  currentTime() &&
                currentTime() < eventTimeInMs(data?.eventStartTime)
              ? "Registrations Closed"
              : eventTimeInMs(data?.eventStartTime) <= currentTime() &&
                currentTime() < eventTimeInMs(data?.eventEndTime)
              ? "Ongoing Event"
              : "Expired"}
          </div>
        </div>

        <img
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultEventPoster;
          }}
          src={data?.eventPoster}
          alt={`${data?.eventName} poster`}
        />
        <div className="tags-container">
          {data?.domainName && (
            <span
              style={{
                backgroundColor: "#fff",
                fontSize: ".75rem",
                wordBreak: "break-all",
                border: "1px solid #002b3640",
                fontWeight: "500",
              }}
              className="text-crop-1"
            >
              {data?.domainName}
            </span>
          )}
          {data?.eventType && (
            <span
              style={{
                backgroundColor: "#fff",
                fontSize: ".75rem",
                wordBreak: "break-all",
                border: "1px solid #002b3640",
                fontWeight: "500",
              }}
              className="text-crop-1"
            >
              {data?.eventType === "eventHiring"
                ? "Event Hiring"
                : data?.eventType}
            </span>
          )}
          {(data?.mode === true || data?.mode === false) && (
            <span
              style={{
                backgroundColor: "#fff",
                fontSize: ".75rem",
                wordBreak: "break-all",
                border: "1px solid #002b3640",
                fontWeight: "500",
              }}
              className="text-crop-1"
            >
              {data?.mode ? "Online" : "Offline"}
            </span>
          )}
          {data?.registrationType && (
            <span
              style={{
                backgroundColor: "#fff",
                fontSize: ".75rem",
                wordBreak: "break-all",
                border: "1px solid #002b3640",
                fontWeight: "500",
              }}
              className="text-crop-1"
            >
              {data?.registrationType}
            </span>
          )}
        </div>
      </div>
      <span className="text-crop-2 heading">{data?.eventName}</span>
      <span className="text-crop-2 description">{data?.description}</span>
      <div className="details">
        <div className="logo">
          <img
            src={`${
              data?.campusId
                ? data?.campusId?.length
                  ? data?.campusId[0]?.collegeLogo
                  : eHUBLogo
                : eHUBLogo
            }`}
            alt="logo"
          />
        </div>
        <div className="name">
          <span className="title">Organized By</span>
          <span className="label text-crop-2">{`${
            data?.campusId
              ? data?.campusId?.length
                ? data?.campusId[0]?.collegeName
                : "engineerHUB"
              : "engineerHUB"
          }`}</span>
        </div>
      </div>
    </div>
  );
}
