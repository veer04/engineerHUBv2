import React from "react";
import "./CampusUpdatesSection.css";
import { Bucket_URL } from "../../services/APIUtils";
import { Link } from "react-router-dom";

export default function CampusUpdatesSection() {
  const bucket = `${Bucket_URL}frontend/homepage/campusupdates/`;

  //fetch updates from backend
  const updates = [
    {
      title:
        "• The Department of Industrial and Systems Engineering at IIT Kharagpur is organizing an online Short-Term Course on Categorical Data Analysis from November 6th to November 8th, 2023.",
    },
    {
      title: "",
    },
    // {
    //   title: "• Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    // },
    {
      title:
        "• IIT Kanpur is going to organize an International Workshop on Sustainable Materials Development for Energy & Environmental Applications from October 30, 2023 to November 2, 2023.",
    },
    {
      title: "",
    },
    // {
    //   title: "• Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    // },
  ];

  //fetch outerUpdates from backend
  const outerUpdates = [
    {
      title:
        "Practical Workshop on IC Engines and Electric Vehicles 2023, Top Engineers, Chennai, Tamil Nadu, 28th October 2023",
      link: "https://pages.razorpay.com/pl_MZIVG2LQ5YtCRX/view",
    },
    {
      title:
        "WEB (Website) Development Workshop 2023, Top Engineers, Chennai, Tamil Nadu, 29th October 2023",
      link: "https://pages.razorpay.com/pl_MZCBwdadyks9i7/view",
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
          <div className="campus-outer-update text-crop-1">
            {outerUpdates[0].title}
          </div>
          <Link to={outerUpdates[0].link}>
            <button className="campus-outer-link">Click here</button>
          </Link>
        </div>
        <div className="campus-section-outer">
          <div className="campus-outer-update text-crop-1">
            {outerUpdates[1].title}
          </div>
          <Link to={outerUpdates[1].link}>
            <button className="campus-outer-link">Click here</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
