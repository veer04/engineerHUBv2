import React from "react";
import "./Domains.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Domains({ domains }) {
  const colors = ["#F7D77F", "#8FC8E8", "#B2E887", "#E8BA98"];

  return (
    <div className="domains-section">
      <div className="domains-section__list">
        {domains.map((item, index) => (
          <Link
            key={item._id}
            to={`/community/projects/${encodeURIComponent(item.domain)}`}
          >
            <div style={{ position: "relative", borderRadius: ".6rem" }}>
              <div
                style={{
                  backgroundImage: `url(${item.domainImage})`,
                  backgroundColor: colors[index % colors.length],
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom right",
                }}
                className="domains-section__item dynamicShadow--off"
              >
                <div className="domains-section__item__title">
                  {item.domain}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
