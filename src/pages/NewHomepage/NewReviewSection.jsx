import { useEffect, useState } from "react";
import "./NewReviewSection.css";
import { getReviews } from "../../services/APIConfig";

export default function NewReviewSection() {
  //! This file will render twice with React StrictMode turned on and make the slider move faster.
  //! Hitting save multiple times without refreshing the page will make the page unresponsive.
  //! It is stable in production but unstable in development. Debug accordingly.

  const colorWheel = ["#FAE8B7", "#C0E0F2", "#D6F3BF", "#F1D5C0"];

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews(setReviews);
  }, []);

  useEffect(() => {
    if (!!reviews?.length) {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
        addAnimation();
      }
    }
  }, [reviews]);

  function addAnimation() {
    const scrollers = document.querySelectorAll(".scroller");
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", true);

      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }

  return (
    <section className="review-section">
      <span className="heading">
        Feedbacks & Reviews{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="24"
          viewBox="0 0 26 24"
          fill="none"
        >
          <path
            d="M23.1494 2.94496C22.5629 2.32835 21.8667 1.83921 21.1003 1.50549C20.334 1.17177 19.5126 1 18.6831 1C17.8535 1 17.0321 1.17177 16.2658 1.50549C15.4994 1.83921 14.8032 2.32835 14.2167 2.94496L12.9997 4.22404L11.7826 2.94496C10.5981 1.70004 8.99152 1.00065 7.31633 1.00065C5.64114 1.00065 4.03455 1.70004 2.85001 2.94496C1.66547 4.18988 1 5.87836 1 7.63895C1 9.39954 1.66547 11.088 2.85001 12.3329L4.06705 13.612L12.9997 23L21.9323 13.612L23.1494 12.3329C23.7361 11.7166 24.2015 10.9849 24.519 10.1794C24.8366 9.37403 25 8.51076 25 7.63895C25 6.76714 24.8366 5.90387 24.519 5.09846C24.2015 4.29305 23.7361 3.56128 23.1494 2.94496Z"
            fill="#FF0000"
            stroke="#FF0000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className="scroller">
        <div className="scroller__inner">
          {[...Array(7)].map((_, index1) => {
            return (
              <div key={index1} className="column">
                {reviews
                  ?.slice(index1 * 2, index1 * 2 + 2)
                  .map((review, index2) => (
                    <div
                      style={{
                        backgroundColor:
                          colorWheel[(index1 + index2 + 1) % colorWheel.length],
                      }}
                      key={index2}
                      className={`review ${
                        index2 === 1 ? "--hide-mobile" : ""
                      }`}
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
                          {/* <span className="position">UI/UX Designer</span> */}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
