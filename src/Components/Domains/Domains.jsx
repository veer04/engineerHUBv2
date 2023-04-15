import React from "react";
import "./Domains.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Domains({ domains }) {
  return (
    <div className="domains-section">
      <div className="domains-section__list">
        {domains.map((item) => (
          <Link key={item._id} to={`/community/project/${item.domain}`}>
            <div style={{ position: "relative", borderRadius: ".6rem" }}>
              <div
                style={{
                  backgroundImage: `url(${item.domainImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
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
