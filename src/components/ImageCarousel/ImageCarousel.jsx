import React from "react";
import "./ImageCarousel.css";

export default function ImageCarousel({ collegePhoto }) {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide h-100"
      data-bs-ride="true"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        {collegePhoto &&
          collegePhoto.map((image, index) => {
            if (index === 0) return null;
            return (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={`${index}`}
                aria-label={`Slide ${index + 1}`}
              ></button>
            );
          })}
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          {collegePhoto && (
            <img src={collegePhoto[0]} className="d-block w-100" alt="Campus" />
          )}
        </div>
        {collegePhoto &&
          collegePhoto.map((image, index) => {
            if (index === 0) return null;
            return (
              <div key={index} className="carousel-item">
                <img src={image} className="d-block w-100" alt="Campus" />
              </div>
            );
          })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
