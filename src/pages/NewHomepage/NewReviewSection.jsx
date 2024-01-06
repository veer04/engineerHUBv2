import { useEffect, useState } from "react";
import "./NewReviewSection.css";
import { getReviews } from "../../services/APIConfig";
import colorWheel from "../../assets/colorWheel";

export default function NewReviewSection() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews(setReviews);
  }, []);
  return (
    <section className="review-section">
      {[...Array(7)].map((_, index1) => {
        return (
          <div key={index1} className="column">
            {reviews.slice(index1 * 2, index1 * 2 + 2).map((review, index2) => (
              <div
                style={{
                  backgroundColor:
                    colorWheel[(index1 + index2 + 1) % colorWheel.length],
                }}
                key={review.userId?._id}
                className="review"
              >
                <span className="text">{review.text}</span>
                <div className="details-container">
                  <div className="image">
                    <img src={review.userId?.image} alt="" />
                  </div>
                  <div className="details">
                    <span className="name">
                      {!!review.userId?.name
                        ? review.userId?.name
                        : `${review.userId?.firstName} ${review.userId?.lastName}`}
                    </span>
                    <span className="position">UI/UX Designer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
}
