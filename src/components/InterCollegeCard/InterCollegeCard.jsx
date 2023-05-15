import React from "react";
import "./InterCollegeCard.css";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function InterCollegeCard({
  eventPoster,
  eventName,
  title,
  description,
  tags,
  eventDate,
  time,
  _id,
  domainName,
}) {
  const navigate = useNavigate();
  console.log(tags);

  return (
    <div
      onClick={() => {
        navigate(`/community/events/${encodeURIComponent(domainName)}/${_id}`);
      }}
      style={{
        cursor: "pointer",
        backgroundImage: `url(${eventPoster})`,
      }}
      className="inter-college-card"
    >
      <div className="card-transition">
        <div className="title">{eventName}</div>
        <div className="description">{description}</div>
        {tags && (
          <div className="tags">
            {tags.length !== 0 &&
              tags.map((tag) => (
                <div key={tag} className="tag">
                  #{tag}
                </div>
              ))}
          </div>
        )}
        <div className="stats">
          {/* code for future use */}
          {/* <div className="stat">
              <svg
                width="26"
                height="25"
                viewBox="0 0 26 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.051 1.78906L16.584 8.84502L24.4848 9.98344L18.7679 15.4727L20.1171 23.2274L13.051 19.5642L5.9849 23.2274L7.33409 15.4727L1.61719 9.98344L9.51795 8.84502L13.051 1.78906Z"
                  stroke="white"
                  strokeOpacity="0.94"
                  strokeWidth="2.14384"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>{" "}
              50000
            </div>
            <svg
              width="4"
              height="39"
              viewBox="0 0 4 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.521484"
                y="0.21875"
                width="2.85845"
                height="38.5891"
                fill="#EDEDED"
              />
            </svg>
            <div className="stat">
              <svg
                width="29"
                height="23"
                viewBox="0 0 29 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.1055 14.6622C15.6842 14.6622 16.964 13.3824 16.964 11.8038C16.964 10.2251 15.6842 8.94531 14.1055 8.94531C12.5268 8.94531 11.2471 10.2251 11.2471 11.8038C11.2471 13.3824 12.5268 14.6622 14.1055 14.6622Z"
                  stroke="white"
                  strokeOpacity="0.94"
                  strokeWidth="2.14384"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.24219 11.7936C1.24219 11.7936 5.91965 1.78906 14.1052 1.78906C22.2908 1.78906 26.9682 11.7936 26.9682 11.7936C26.9682 11.7936 22.2908 21.7982 14.1052 21.7982C5.91965 21.7982 1.24219 11.7936 1.24219 11.7936Z"
                  stroke="white"
                  strokeOpacity="0.94"
                  strokeWidth="2.14384"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>{" "}
              1056 views
            </div>
            <svg
              width="4"
              height="39"
              viewBox="0 0 4 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.521484"
                y="0.21875"
                width="2.85845"
                height="38.5891"
                fill="#EDEDED"
              />
            </svg>*/}
          <div className="stat">
            <svg
              width="22"
              height="21"
              viewBox="0 0 22 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.75 5.50781V10.8674L14.6085 12.6539"
                stroke="white"
                strokeOpacity="0.94"
                strokeWidth="2.14384"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.0361 19.7987C16.1668 19.7987 20.326 15.6394 20.326 10.5087C20.326 5.37801 16.1668 1.21875 11.0361 1.21875C5.90535 1.21875 1.74609 5.37801 1.74609 10.5087C1.74609 15.6394 5.90535 19.7987 11.0361 19.7987Z"
                stroke="white"
                strokeOpacity="0.94"
                strokeWidth="2.14384"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>{" "}
            {eventDate} Days left
          </div>
        </div>
        {/* <Link to={`/campus/inter-college/${_id}`}>
          <div className="register-btn">Register Now</div>
        </Link> */}
      </div>
    </div>
  );
}
