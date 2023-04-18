import React, { useEffect, useState } from "react";
import "./ReviewCard.css";

export default function ReviewCard({ id, img, text, name, activeCard }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (id === activeCard) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeCard]);

  const colors = ["#128381", "#F7D77F", "#B9FFFE"];

  const cardIsActive = "review-card-is-active";
  const backdropActive = "review-card-backdrop-is-active";
  const [bgColor, setBgColor] = useState();
  useEffect(() => {
    setBgColor(() => {
      return colors[
        ((id % colors.length) + parseInt(id / colors.length)) % colors.length
      ];
    });
  }, [id]);

  return (
    <div
      key={id}
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
