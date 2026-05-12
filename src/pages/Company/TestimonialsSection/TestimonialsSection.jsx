import React, { useSyncExternalStore } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../../../services/APIUtils';
import './TestimonialsSection.css';

function getReducedMotionQuery() {
  return window.matchMedia('(prefers-reduced-motion: reduce)');
}

function subscribeReducedMotion(callback) {
  const mq = getReducedMotionQuery();
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return getReducedMotionQuery().matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

const TestimonialsSection = () => {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const testimonialsQuery = useQuery({
    queryKey: ['Testimonials'],
    queryFn: () =>
      axios.get(`${API_URL}api/v1/testimonials?page=1&limit=30`).then((res) => res),
    staleTime: Infinity,
  });

  if (!testimonialsQuery.isSuccess) return null;

  const testimonials = testimonialsQuery?.data?.data?.data?.testimonials || [];
  if (testimonials.length === 0) return null;

  const durationSec = Math.min(90, Math.max(28, testimonials.length * 7));

  const cardKey = (item, index, dup) =>
    `${item?._id ?? item?.name ?? 't'}-${index}-d${dup}`;

  const renderCard = (item, index, dup) => (
    <div className="flip-card" key={cardKey(item, index, dup)}>
      <div className="flip-card-inner">
        <div className="flip-card-front testimonial-card-front">
          <div className="author-image">
            <img src={item?.image} alt="" />
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
          <p className="placed-company-name" title={item?.company}>
            {item?.company ?? ''}
          </p>
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
  );

  return (
    <section className="testimonials">
      <h3 className="heading-md">Our placed students and their reviews ❤️</h3>
      <div
        className="testimonials-marquee"
        role="region"
        aria-label="Student placement testimonials"
      >
        <div
          className={`testimonials-marquee__viewport${
            prefersReducedMotion ? ' testimonials-marquee__viewport--scroll' : ''
          }`}
        >
          <div
            className={`testimonials-marquee__track${
              prefersReducedMotion ? '' : ' testimonials-marquee__track--animated'
            }`}
            style={
              prefersReducedMotion
                ? undefined
                : { '--testimonials-marquee-duration': `${durationSec}s` }
            }
          >
            {testimonials.map((item, index) => renderCard(item, index, 0))}
            {!prefersReducedMotion &&
              testimonials.map((item, index) => renderCard(item, index, 1))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
