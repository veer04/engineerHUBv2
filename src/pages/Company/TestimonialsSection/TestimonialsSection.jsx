import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../../../services/APIUtils';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const testimonialsQuery = useQuery({
    queryKey: ["Testimonials"],
    queryFn: () =>
      axios.get(`${API_URL}api/v1/testimonials?page=1&limit=30`).then((res) => {
        return res;
      }),
    staleTime: Infinity,
  });

  if (!testimonialsQuery.isSuccess) return null;

  const testimonials = testimonialsQuery?.data?.data?.data?.testimonials || [];
  const initialCards = testimonials.slice(0, 8);
  const remainingCards = testimonials.slice(8);
  const displayCards = showAll ? testimonials : initialCards;

  // Debug logs
  console.log('Total testimonials:', testimonials.length);
  console.log('Initial cards:', initialCards.length);
  console.log('Remaining cards:', remainingCards.length);
  console.log('Show all:', showAll);

  return (
    <section className="testimonials">
      <h3 className="heading-md">
        Our placed students and their reviews ❤️
      </h3>
      <div 
        className={`testimonial-container ${showAll ? 'expanded' : ''}`}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {displayCards.map(
          (item, index) => (
            <div className="flip-card" key={index}>
              <div className="flip-card-inner">
                <div className="flip-card-front testimonial-card-front">
                  <div className="author-image">
                    <img src={item?.image} alt="author-image" />
                    <div className="role">
                      <p title={item?.role} className="label-xsm">
                        {item?.role}
                      </p>
                    </div>
                  </div>
                  <p title={item?.name} className="name-text-crop-1">
                    {item?.name}
                  </p>
                  <p className="placed-at">Placed at</p>
                  <div className="company-logo-container">
                    <img
                      title={item?.company}
                      src={item?.companyLogo}
                      alt={item?.company}
                    />
                  </div>
                </div>
                <div className="flip-card-back testimonial-card-back">
                  <p title={item?.text} className="testimonial">
                    {item?.text}
                  </p>
                  <div className="placement-details">
                    <div className="detail">
                      <p>Role</p>
                      <p title={item?.role} className="text-crop-3">
                        {item?.role}
                      </p>
                    </div>
                    <div className="detail">
                      <p>Package</p>
                      <p>{item?.package}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      {/* Always show button if there are more than 8 testimonials */}
      {testimonials.length > 8 && (
        <div className="see-more-container">
          <button 
            className="see-more-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'See Less' : 'See All'}
            <svg 
              className={`arrow-icon ${showAll ? 'rotated' : ''}`}
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M9 18L15 12L9 6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection; 