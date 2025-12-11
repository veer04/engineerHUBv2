import React, { useEffect, useState, useRef } from "react";
import { PAYMENT_API_URL } from "../../services/APIUtils";
import "./FeedbackCarousel.css";

const FeedbackCarousel = ({ referralId, autoPlayInterval = 5000, itemsPerView = 2 }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 520);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const url = referralId
          ? `${PAYMENT_API_URL}api/v1/feedback?referralId=${referralId}`
          : `${PAYMENT_API_URL}api/v1/feedback`;
        
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          console.log("Feedbacks API response:", data);
          console.log("All feedbacks:", data?.data);
          
          // Only show feedbacks with screenshots (companyLogo is optional for backward compatibility)
          const validFeedbacks = (data?.data || []).filter(f => f.screenshot);
          console.log("Valid feedbacks with screenshots:", validFeedbacks);
          setFeedbacks(validFeedbacks);
        } else {
          console.error("Error fetching feedbacks - Status:", response.status);
          const errorData = await response.json().catch(() => ({}));
          console.error("Error response:", errorData);
        }
      } catch (error) {
        console.error("Error fetching feedbacks", error);
      }
    };

    fetchFeedbacks();
  }, [referralId]);

  // Auto-play carousel
  useEffect(() => {
    if (feedbacks.length <= itemsPerView) {
      return; // Don't auto-play if there are not enough items
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, feedbacks.length - itemsPerView);
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [feedbacks, itemsPerView, autoPlayInterval]);

  // Update carousel position
  useEffect(() => {
    if (carouselRef.current) {
      const translateX = -(currentIndex * (100 / itemsPerView));
      carouselRef.current.style.transform = `translateX(${translateX}%)`;
    }
  }, [currentIndex, itemsPerView]);

  // Debug: Log feedbacks state
  useEffect(() => {
    console.log("Current feedbacks state:", feedbacks);
  }, [feedbacks]);

  if (feedbacks.length === 0) {
    console.log("No feedbacks to display - returning null");
    return null; // Don't render if no feedbacks
  }

  const displayItems = isMobile ? 1 : itemsPerView;
  const maxIndex = Math.max(0, feedbacks.length - displayItems);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
    // Reset auto-play timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIdx = Math.max(0, feedbacks.length - displayItems);
          return prevIndex >= maxIdx ? 0 : prevIndex + 1;
        });
      }, autoPlayInterval);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    // Reset auto-play timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIdx = Math.max(0, feedbacks.length - displayItems);
          return prevIndex >= maxIdx ? 0 : prevIndex + 1;
        });
      }, autoPlayInterval);
    }
  };

  return (
    <div className="feedback-carousel-container">
      <div className="feedback-carousel-wrapper">
        <div className="feedback-carousel-track" ref={carouselRef}>
          {feedbacks.map((feedback, index) => (
            <div
              key={feedback._id || index}
              className="feedback-carousel-item"
              style={{
                width: `${100 / displayItems}%`,
                minWidth: `${100 / displayItems}%`,
              }}
            >
              <div className="feedback-screenshot-container">
                <img
                  src={feedback.screenshot}
                  alt={`Referral screenshot from ${feedback.name}`}
                  className="feedback-screenshot"
                />
                <div className="feedback-overlay">
                  {feedback.companyLogo && (
                    <div className="feedback-company-logo">
                      <img
                        src={feedback.companyLogo}
                        alt="Company logo"
                        className="company-logo-img"
                      />
                    </div>
                  )}
                  <div className="feedback-name-overlay">
                    <span className="feedback-name-text">{feedback.name}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {feedbacks.length > displayItems && (
        <div className="feedback-carousel-controls">
          <button
            className="feedback-carousel-btn feedback-carousel-btn-prev"
            onClick={handlePrev}
            aria-label="Previous feedback"
          >
            <img src="/chevro-left.svg" alt="Previous" />
          </button>
          <button
            className="feedback-carousel-btn feedback-carousel-btn-next"
            onClick={handleNext}
            aria-label="Next feedback"
          >
            <img src="/chevro-right.svg" alt="Next" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackCarousel;

