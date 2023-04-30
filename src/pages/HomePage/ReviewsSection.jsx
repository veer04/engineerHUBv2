import React, { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import "./ReviewsSection.css";
import { getReviews } from "../../services/APIConfig";

export default function ReviewsSection() {
  const [activeCard, setActiveCard] = useState(0);

  //not more than 15 reviews recommended

  //fetch reviews from database

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews(setReviews);
  }, []);

  let randomnessFactor = reviews.length;

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    const interval = setInterval(() => {
      setActiveCard(Math.floor(Math.random() * randomnessFactor));
    }, 5000);

    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
      clearInterval(interval);
    };
  }, []);

  if (width < 1450) {
    randomnessFactor = 12;
  }
  if (width < 1150) {
    randomnessFactor = 9;
  }
  if (width < 750) {
    randomnessFactor = 6;
  }
  if (width < 510) {
    randomnessFactor = 3;
  }

  let counter = 0;

  function renderReviews(reviews) {
    return reviews.map((review) => {
      return (
        <ReviewCard
          key={review._id}
          index={counter++}
          name={review.userId.name}
          text={review.text}
          img={review.userId.image}
          activeCard={activeCard}
        />
      );
    });
  }

  return (
    <div className="reviews-section">
      <div className="reviews-section-title heading-3">
        Your Honest Reviews :)
      </div>
      <div className="reviews-section-container">
        <div className="reviews-col reviews-col-1">
          {renderReviews(reviews.slice(0, 3))}
        </div>
        <div className="reviews-col reviews-col-2">
          {renderReviews(reviews.slice(3, 6))}
        </div>
        <div className="reviews-col reviews-col-3">
          {renderReviews(reviews.slice(6, 9))}
        </div>
        <div className="reviews-col reviews-col-4">
          {renderReviews(reviews.slice(9, 12))}
        </div>
        <div className="reviews-col reviews-col-5">
          {renderReviews(reviews.slice(12, 15))}
        </div>
      </div>
    </div>
  );
}
