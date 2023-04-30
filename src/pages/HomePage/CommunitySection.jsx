import React, { useEffect } from "react";
import CommunityTile from "./CommunityTile";
import "./CommunitySection.css";
import { FaDiscord } from "react-icons/fa";

export default function CommunitySection() {
  const colors = [
    "--tile-bg-color-1",
    "--tile-bg-color-2",
    "--tile-bg-color-3",
    "--tile-bg-color-4",
    "--tile-bg-color-5",
    "--tile-bg-color-6",
  ];
  const randomColor = Math.floor(Math.random() * 2)
    ? colors[Math.floor(Math.random() * colors.length)]
    : null;
  const tiles = [];
  for (let i = 0; i < 1800; i++) {
    tiles.push(
      <CommunityTile
        key={i}
        color={
          Math.floor(Math.random() * 2)
            ? colors[Math.floor(Math.random() * colors.length)]
            : null
        }
      />
    );
  }

  // const scroller = document.getElementsByClassName("community-bg-scroller");
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     let prevScroll = scroller[0].scrollLeft;
  //     scroller[0].scrollLeft += 1;
  //     if (prevScroll === scroller[0].scrollLeft) {
  //       scroller[0].scrollLeft = 0;
  //     }
  //   }, 10);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="community-section-container">
      <img
        className="community-image"
        src="https://frontendehubbucket.s3.ap-south-1.amazonaws.com/frontend/homepage/communitysection/community.png"
        alt=""
      />
      {/* <div className="community-bg-scroller">
        <div className="community-section-bg">{tiles}</div>
      </div> */}
      <div className="community-section-content heading-3">
        <div>
          <div>Tap into the</div>
          <div>
            largest <span>engineers community</span>
          </div>
        </div>
        <a href="https://discord.com/invite/ZMZAEZ5NfA">
          <button className="discord-btn btn btn-primary">
            <FaDiscord className="discord-icon" />
            Join Discord
          </button>
        </a>
      </div>
    </div>
  );
}
