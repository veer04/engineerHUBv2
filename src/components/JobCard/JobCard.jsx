import "./JobCard.css";

export default function JobCard({
  logo,
  title,
  location,
  isServiceOn,
  time,
  views,
}) {
  const eyeSvg = (
    <svg
      width="19"
      height="14"
      viewBox="0 0 19 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 6.97656C1 6.97656 3.98828 1 9.21777 1C14.4473 1 17.4355 6.97656 17.4355 6.97656C17.4355 6.97656 14.4473 12.9531 9.21777 12.9531C3.98828 12.9531 1 6.97656 1 6.97656Z"
        stroke="black"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 9C10.1046 9 11 8.10457 11 7C11 5.89543 10.1046 5 9 5C7.89543 5 7 5.89543 7 7C7 8.10457 7.89543 9 9 9Z"
        stroke="black"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  return (
    <div className="job-card">
      <div className="header">
        <div
          style={{
            backgroundImage: `url(${logo})`,
          }}
          className="logo"
        ></div>
        {isServiceOn && <div className="tag --service-on">Hiring Now</div>}
      </div>
      <p className="title text-crop-2">{title}</p>
      <p className="location text-crop-1">Location: {location}</p>
      <button className="applicants-btn">View Applicants</button>
      <div className="stats-container">
        <span className="time">{time}</span>
        <span className="views">
          {eyeSvg} {views} views
        </span>
      </div>
    </div>
  );
}
