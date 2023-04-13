import React from "react";
import "./CampusUpdatesSection.css";
import { Bucket_URL } from "../../services/APIUtils";

export default function CampusUpdatesSection() {
  const bucket = `${Bucket_URL}frontend/homepage/campusupdates/`;

  //fetch updates from backend
  const updates = [
    {
      title: "• Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      title: "• Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      title: "• Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      title: "• Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      title: "• Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      title: "• Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
  ];

  //fetch outerUpdates from backend
  const outerUpdates = [
    {
      title: "We GDSC are organizing Hackathon Event.",
      link: "https://www.google.com",
    },
    {
      title: "“Aero Club” is organizing Contest.",
      link: "https://www.google.com",
    },
  ];

  function updatesCard(updates) {
    return (
      <div className="campus-update-card">
        <div className="campus-update-title">{updates[0].title}</div>
        <div className="campus-update-title">{updates[1].title}</div>
        <div className="campus-update-title">{updates[2].title}</div>
      </div>
    );
  }

  const updatesContainer1 = updatesCard(updates.slice(0, 3));
  const updatesContainer2 = updatesCard(updates.slice(3, 6));

  return (
    <div className="campus-section-container">
      <img
        className="campus-section-img"
        src={`${bucket}campus-update.svg`}
        alt="Campus svg"
      />
      <div className="campus-section-content">
        <div className="campus-section-title">Campus Updates</div>
        <div className="campus-update-container">
          {updatesContainer1}
          {updatesContainer2}
        </div>
        <div className="campus-section-outer">
          <div className="campus-outer-update">{outerUpdates[0].title}</div>
          <a href={outerUpdates[0].link}>
            <button className="campus-outer-link">Click here</button>
          </a>
        </div>
        <div className="campus-section-outer">
          <div className="campus-outer-update">{outerUpdates[1].title}</div>
          <a href={outerUpdates[1].link}>
            <button className="campus-outer-link">Click here</button>
          </a>
        </div>
      </div>
    </div>
  );
}
