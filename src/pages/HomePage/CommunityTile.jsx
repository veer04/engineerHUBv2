import { useState } from "react";
import "./CommunityTile.css";

export default function CommunityTile({ color }) {
  const colors = [
    "--tile-bg-color-1",
    "--tile-bg-color-2",
    "--tile-bg-color-3",
    "--tile-bg-color-4",
    "--tile-bg-color-5",
    "--tile-bg-color-6",
  ];
  const imageChances = Math.floor(Math.random() * 4);

  const oldCard = (
    <img
      className="community-tile-image"
      src={`https://source.unsplash.com/random?query=${Math.floor(
        Math.random() * 1000
      )}`}
      alt="community tile"
    />
  );

  const actualCard = (
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img
            src={`https://source.unsplash.com/random?query=${Math.floor(
              Math.random() * 1000
            )}`}
            alt="Avatar"
            style="width:300px;height:300px;"
          />
        </div>
        <div class="flip-card-back">
          <img
            src="https://source.unsplash.com/random/300x300"
            alt="Avatar"
            style="width:300px;height:300px;"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="community-tile">
      <div
        className="community-tile-image-container"
        style={{
          backgroundColor: `${
            color === null ? "transparent" : `var(${color})`
          }`,
        }}
      >
        {color && imageChances === 0 && oldCard}
      </div>
    </div>
  );
}
