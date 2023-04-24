import React from "react";
import "./ImageCarousel.css";

export default function ImageCarousel() {
  // { images }
  const image = "https://source.unsplash.com/random";
  const images = [
    {
      _id: 1,
      image: image,
    },
    {
      _id: 2,
      image: image,
    },
    {
      _id: 3,
      image: image,
    },
  ];

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
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={images[0].image} className="d-block w-100" alt="Campus" />
        </div>
        {images.map((image) => {
          return (
            <div key={image._id} className="carousel-item">
              <img src={image.image} className="d-block w-100" alt="Campus" />
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
