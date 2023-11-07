import { useNavigate } from "react-router-dom";
import "./NewEventCard.css";
import defaultPoster from "../../assets/defaultPoster";

export default function NewEventCard({ data }) {
  const navigate = useNavigate();
  const time = new Date(data?.eventStartTime);
  const eventDate = time.toLocaleString("default", {
    day: "numeric",
    month: "long",
  });
  const formattedDate = eventDate.split(" ");
  const month = formattedDate[0];
  const date = formattedDate[1];
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

  const eventTime = time.toLocaleString("default", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div
      onClick={() => navigate(`/trending/events/${data._id}`)}
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
          backgroundImage: `url(${data?.eventPoster})`,
        }}
        className="poster"
      >
        <span style={{ backgroundColor: "#F7D77F" }} className="text-crop-1">
          {data?.eventType}
        </span>
        <span
          style={{ backgroundColor: "#F7D77F" }}
          className="text-crop-1"
        >{`${eventDateWithSuffix} @${eventTime}`}</span>
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
                  : defaultPoster
                : defaultPoster
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
