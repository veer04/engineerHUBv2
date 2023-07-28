import React, { useState } from "react";
import "./Domains.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import getCookie, { getAccessToken } from "../../features/getCookieValues";

export default function Domains({ domains }) {
  const navigate = useNavigate();
  const colors = ["#F7D77F", "#8FC8E8", "#B2E887", "#E8BA98"];

  const [width, setWidth] = useState(window.innerWidth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    if (!!getAccessToken()) setIsLoggedIn(true);

    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, []);

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
          <div
            key={item._id}
            onClick={() => handleClick(item)}
            className="on-hover-scale"
            style={{ position: "relative", borderRadius: ".6rem" }}
          >
            <div
              style={{
                backgroundImage: `url(${item.domainImage})`,
                backgroundColor: colors[index % colors.length],
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom right",
                // boxShadow: `0px 10px 40px 1px ${colors[index % colors.length]}`,
                boxShadow: ` ${
                  colors[index % colors.length]
                } 0px 10px 25px -2px`,
                backgroundSize: width > 573 ? "120px" : "80px",
              }}
              className="domains-section__item dynamicShadow--off"
            >
              <div className="domains-section__item__title">{item.domain}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
