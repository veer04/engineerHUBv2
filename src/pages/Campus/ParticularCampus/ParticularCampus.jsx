import React from "react";
import "./ParticularCampus.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ImageCarousel from "../../../components/ImageCarousel/ImageCarousel";

export default function ParticularCampus() {
  return (
    <div className="particular-campus-page">
      <div className="search-bar__container">
        <SearchBar placeholder="You are looking for which campus" type="text" />
      </div>
      <div className="image-carousel__container">
        <div className="image-carousel">
          <ImageCarousel />
        </div>
      </div>
      <div className="details__tab">
        <div className="details">
          <div>
            {/* <img src="https://source.unsplash.com/random" alt="logo" /> */}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
