import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../../../services/APIUtils';
import './TestimonialsPopup.css';

const TestimonialsPopup = ({ show, onClose }) => {
  const testimonialsQuery = useQuery({
    queryKey: ["Testimonials"],
    queryFn: () =>
      axios.get(`${API_URL}api/v1/testimonials?page=1&limit=30`).then((res) => {
        return res;
      }),
    staleTime: Infinity,
  });

  if (!show || !testimonialsQuery.isSuccess) return null;

  const testimonials = testimonialsQuery?.data?.data?.data?.testimonials || [];
  // Show latest 4-5 profiles
  const displayCards = testimonials.slice(0, 4);

  return (
    <div className="testimonials-popup-overlay" onClick={onClose}>
      <div className="testimonials-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="testimonials-popup-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <section className="testimonials-popup">
          <h3 className="heading-md">
            Our placed students and their reviews ❤️
          </h3>
          <div className="testimonial-container-popup">
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
        </section>
      </div>
    </div>
  );
};

export default TestimonialsPopup;

