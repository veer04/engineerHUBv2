import React from "react";
import "./CampusUpdatesSection.css";
import { Bucket_URL } from "../../services/APIUtils";
import { Link } from "react-router-dom";

export default function CampusUpdatesSection() {
  const bucket = `${Bucket_URL}frontend/homepage/campusupdates/`;

  //fetch updates from backend
  const updates = [
    {
      title: "• IIT Madras is going to have a IOT WORKSHOP on 17.6.23",
    },
    {
      title:
        "• IIT  kharagpur is going to have a online workshop of MATLAB Programming for Physical & Chemical Sciences from 18th june 2023-3rd july 2023 (3weekends)",
    },
    // {
    //   title: "• Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    // },
    {
      title:
        "• Hybrid workshop on scale development and impactful publication in social science to be held w.e.f. 19 to 23 July 2023 at NIT Hamirpur",
    },
    {
      title:
        "• Understanding of molecular simulation at NIT Rourkela form 19 to 23 June 2023",
    },
    // {
    //   title: "• Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    // },
  ];

  //fetch outerUpdates from backend
  const outerUpdates = [
    {
      title: "We GDSC are organizing Hackathon Event.",
      link: "/campus",
    },
    {
      title: "“Aero Club” is organizing Contest.",
      link: "/campus",
    },
  ];

  function updatesCard(updates) {
    return (
      <div className="campus-update-card">
        <div className="campus-update-title">{updates[0].title}</div>
        <div className="campus-update-title">{updates[1].title}</div>
        {/* <div className="campus-update-title">{updates[2].title}</div> */}
      </div>
    );
  }

  const updatesContainer1 = updatesCard(updates.slice(0, 2));
  const updatesContainer2 = updatesCard(updates.slice(2, 4));

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
          <Link to={outerUpdates[0].link}>
            <button className="campus-outer-link">Click here</button>
          </Link>
        </div>
        <div className="campus-section-outer">
          <div className="campus-outer-update">{outerUpdates[1].title}</div>
          <Link to={outerUpdates[1].link}>
            <button className="campus-outer-link">Click here</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
