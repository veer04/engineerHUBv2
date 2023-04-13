import React from "react";
import "./Domains.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Domains({ domains }) {
  return (
    <div className="domains-section">
      <div className="domains-section__list">
        {domains.map((item) => (
          <Link key={item.id} to={`/community/project/${item.id}`}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "contain",
                }}
                className="domains-section__item dynamicShadow--off"
              >
                <div className="domains-section__item__title">{item.title}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
