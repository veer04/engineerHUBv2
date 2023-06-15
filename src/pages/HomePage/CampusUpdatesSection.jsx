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
      title:
        "ROAD-A-THON 2023, Sona College of Technology, Technical Event, Salem, Tamil Nadu, 14th July 2023",
      link: "https://www.knowafest.com/explore/events/2023/05/3102-road-a-thon-2023-sona-college-technology-technical-event-salem",
    },
    {
      title:
        "TECH NIMBLE 2023, Nadimpalli Satyanarayana Raju Institute of Technology, Techno Fun Festival, Visakhapatnam, Andhra Pradesh, 10th - 12th August 2023",
      link: "https://www.knowafest.com/explore/events/2023/04/2701-tech-nimble-2023-nadimpalli-satyanarayana-raju-institute-technology-techno-fun-festival-visakhapatnam",
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
