import "./Domains.css";
import { useNavigate } from "react-router-dom";
import getCookie from "../../features/getCookieValues";
import colorWheel from "../../assets/colorWheel";
import { isUserLoggedIn } from "../../features/User/UserDetails";

export default function Domains({ domains }) {
  const navigate = useNavigate();

  const isLoggedIn = isUserLoggedIn();

  function handleClick(item) {
    if (isLoggedIn) {
      if (
        getCookie("role")[2] === "User" ||
        getCookie("role")[2] === "Alumni"
      ) {
        navigate(`/community/chat/${encodeURIComponent(item.domain)}`);
        return;
      }
    }
    navigate(`/community/projects/${encodeURIComponent(item.domain)}`);
  }

  return (
    <div className="domains-section">
      <div className="domains-section__list">
        {domains.map((item, index) => (
          <button
            key={item._id}
            onClick={() => handleClick(item)}
            style={{
              backgroundColor: colorWheel[index % colorWheel.length],
            }}
            className="domain on-hover-scale"
          >
            <div className="count">125</div>
            <span className="title text-crop-2">{item.domain}</span>
            <div className="info-container">
              {!!item.projects && (
                <span className="info">{item.projects}+ Projects</span>
              )}
              {!!item.events && (
                <span className="info">{item.events}+ Events</span>
              )}
              {!!item.blogs && (
                <span className="info">{item.blogs}+ Blogs</span>
              )}
            </div>
            <div className="logo-container">
              <img
                src={item.domainImage}
                alt="domain logo"
                className="domain-logo"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
