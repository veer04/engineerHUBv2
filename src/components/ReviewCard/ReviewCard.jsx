import React, { useEffect, useState } from "react";
import "./ReviewCard.css";

export default function ReviewCard({ img, text, name, activeCard, index }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (index === activeCard) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeCard]);

  const colors = ["#128381", "#B9FFFE"];
  const COUNT = 2;

  const cardIsActive = "review-card-is-active";
  const backdropActive = "review-card-backdrop-is-active";
  const [bgColor, setBgColor] = useState();
  useEffect(() => {
    setBgColor(() => {
      return colors[index % COUNT];
    });
  }, []);

  return (
    <div
      key={index}
      style={{
        backgroundColor: bgColor,
        // colors[
        //   ((id % colors.length) + parseInt(id / colors.length)) %
        //     colors.length
        // ],
        color: bgColor === "#128381" ? "white" : "black",
      }}
      className={`review-card ${isActive ? cardIsActive : ""}`}
    >
      <img className="review-card-img" src={img} alt="Profile" />
      <span className="review-card-text">"{text}"</span>
      <span className="review-card-name">{name}</span>
      <div
        className={`review-card-backdrop ${isActive ? backdropActive : ""}`}
      ></div>
    </div>
  );
}
