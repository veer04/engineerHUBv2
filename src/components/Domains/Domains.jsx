import "./Domains.css";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getCookie from "../../features/getCookieValues";
import colorWheel from "../../assets/colorWheel";
import { isUserLoggedIn } from "../../features/User/UserDetails";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Domain({ item, index }) {
  const navigate = useNavigate();
  const isLoggedIn = isUserLoggedIn();

  function handleClick(item) {
    navigate(`/community/projects/${encodeURIComponent(item.domain)}`);
  }

  return (
    <button
      onClick={() => handleClick(item)}
      style={{ backgroundColor: colorWheel[index % colorWheel.length] }}
      className="domain on-hover-scale"
    >
      <span className="title text-crop-2">{item.domain}</span>
      <div className="info-container">
        {!!item.projects && (
          <span className="info">{item.projects}+ Projects</span>
        )}
        {!!item.events && <span className="info">{item.events}+ Events</span>}
        {!!item.blogs && <span className="info">{item.blogs}+ Blogs</span>}
        {!!item.notes && <span className="info">{item.notes}+ Notes</span>}
      </div>
      <div className="logo-container">
        <img src={item.domainImage} alt="domain logo" className="domain-logo" />
      </div>
    </button>
  );
}

export default function Domains({ domains }) {
  const sliderRef = useRef();

  // Scroll left/right
  const scroll = (direction) => {
    const width = sliderRef.current.offsetWidth;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => scroll("right"), 5000);
    return () => clearInterval(interval);
  }, []);

  {
    /* return (
    <div className="domains-section">
      <button className="slider-btn left" onClick={() => scroll("left")}><ChevronLeft /></button>

      <div className="domains-section__list slider" ref={sliderRef}>
        {domains.map((item, index) => (
          <Domain key={item._id} item={item} index={index} />
        ))}
      </div>

      <button className="slider-btn right" onClick={() => scroll("right")}><ChevronRight /></button>
    </div>
  );
  */
  }

  return (
    <div className="domains-section">
      <div className="domains-section__slider-wrapper">
        <button className="slider-btn left" onClick={() => scroll("left")}>
          <ChevronLeft />
        </button>

        <div className="domains-section__list slider" ref={sliderRef}>
          {domains.map((item, index) => (
            <Domain key={item._id} item={item} index={index} />
          ))}
        </div>

        <button className="slider-btn right" onClick={() => scroll("right")}>
          <ChevronRight />
        </button>
      </div>

      {/* Mobile-only bottom arrows */}
      <div className="slider-btn-wrapper">
        <button
          className="slider-btn-mobile left"
          onClick={() => scroll("left")}
        >
          <ChevronLeft />
        </button>
        <button
          className="slider-btn-mobile right"
          onClick={() => scroll("right")}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export { Domain };

{
  /*import "./Domains.css";
import { useNavigate } from "react-router-dom";
import getCookie from "../../features/getCookieValues";
import colorWheel from "../../assets/colorWheel";
import { isUserLoggedIn } from "../../features/User/UserDetails";

function Domain({ item, index }) {
  const navigate = useNavigate();

  const isLoggedIn = isUserLoggedIn();

  function handleClick(item) {
    // if (isLoggedIn) {
    //   if (
    //     getCookie("role")[2] === "User" ||
    //     getCookie("role")[2] === "Alumni"
    //   ) {
    //     navigate(`/community/chat/${encodeURIComponent(item.domain)}`); // route does not exist anymore
    //     return;
    //   }
    // }
    navigate(`/community/projects/${encodeURIComponent(item.domain)}`);
  }

  return (
    <button
      onClick={() => handleClick(item)}
      style={{
        backgroundColor: colorWheel[index % colorWheel.length],
      }}
      className="domain on-hover-scale"
    >
  
      <span className="title text-crop-2">{item.domain}</span>
      <div className="info-container">
        {!!item.projects && (
          <span className="info">{item.projects}+ Projects</span>
        )}
        {!!item.events && <span className="info">{item.events}+ Events</span>}
        {!!item.blogs && <span className="info">{item.blogs}+ Blogs</span>}
        {!!item.notes && <span className="info">{item.notes}+ Notes</span>}
      </div>
      <div className="logo-container">
        <img src={item.domainImage} alt="domain logo" className="domain-logo" />
      </div>
    </button>
  );
}

export default function Domains({ domains }) {
  return (
    <div className="domains-section">
      <div className="domains-section__list">
        {domains.map((item, index) => (
          <Domain key={item._id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

export { Domain };

*/
}
