import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAYMENT_API_URL } from "../../../../services/APIUtils";
import "./ReferralCarousel.css";

const ReferralCarousel = () => {
  const [snapshots, setSnapshots] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const trackRef = useRef(null);
  
  // Calculate dynamic scroll step based on viewport
  const getScrollStep = () => {
    return window.innerWidth <= 768 ? 320 : 364; // width of card + gap
  };

  const intervalTime = 5000;

  useEffect(() => {
    const fetchSnapshots = async () => {
      try {
        const response = await fetch(`${PAYMENT_API_URL}payment/referral-snapshots`);
        if (response.ok) {
          const resData = await response.json();
          if (resData.success && Array.isArray(resData.data)) {
            setSnapshots(resData.data);
          }
        }
      } catch (error) {
        console.error("Error fetching referral snapshots:", error);
      }
    };
    fetchSnapshots();
  }, []);

  useEffect(() => {
    if (!isAutoScrolling || snapshots.length === 0) return;

    const interval = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;

      const scrollStep = getScrollStep();
      const isAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 15;

      if (isAtEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: scrollStep, behavior: "smooth" });
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isAutoScrolling, snapshots]);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || snapshots.length === 0) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) {
      setActiveIndex(0);
      return;
    }
    const scrollPercentage = track.scrollLeft / maxScroll;
    const index = Math.round(scrollPercentage * (snapshots.length - 1));
    setActiveIndex(index);
  };

  const handlePrev = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: getScrollStep(), behavior: "smooth" });
    }
  };

  const handleDotClick = (index) => {
    const track = trackRef.current;
    if (track && snapshots.length > 1) {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const targetScroll = (index / (snapshots.length - 1)) * maxScroll;
      track.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  };

  if (snapshots.length === 0) return null;

  return (
    <div className="referral-carousel-section">
      <div className="referral-carousel-header">
        <h2>Real Referrals. Real Results.</h2>
        <p>See actual referral opportunities our community members received through engineerHUB.</p>
      </div>

      <div
        className="referral-carousel-wrapper"
        onMouseEnter={() => setIsAutoScrolling(false)}
        onMouseLeave={() => setIsAutoScrolling(true)}
      >
        {/* Navigation Arrows */}
        <button className="referral-nav-btn prev" onClick={handlePrev} aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <button className="referral-nav-btn next" onClick={handleNext} aria-label="Next">
          <ChevronRight size={20} />
        </button>

        {/* Cards Container */}
        <div className="referral-carousel-track" ref={trackRef} onScroll={handleScroll}>
          {snapshots.map((item) => (
            <div key={item._id} className="referral-snapshot-card">
              <span className="referral-badge">
                ✅ Referral Received
              </span>
              <div className="referral-snapshot-image-container">
                <div className="referral-snapshot-zoom">
                  <img
                    src={item.snapshot}
                    alt={`${item.name} Referral`}
                    className="referral-snapshot-img"
                  />
                </div>
              </div>
              <div className="referral-snapshot-info">
                <h4>{item.name}</h4>
                <div className="referral-snapshot-meta">
                  <span className="role-text">{item.role}</span>
                  <span className="dot-separator"></span>
                  <span className="company-text">{item.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="referral-pagination-dots">
          {snapshots.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`referral-pagination-dot ${i === activeIndex ? "active" : ""}`}
              aria-label={`Go to slide ${i + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferralCarousel;
