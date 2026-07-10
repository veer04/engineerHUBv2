import { useState, useEffect, useRef } from 'react';

export const useTypewriter = (text, speed = 100, delay = 1000) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  // Intersection Observer to detect when the element is scrolled into view
  useEffect(() => {
    // If IntersectionObserver is not available, default to visible immediately
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger only once
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let timeoutId;
    let charIndex = 0;
    
    // Start typing after initial delay
    const startTimeoutId = setTimeout(() => {
      const type = () => {
        if (charIndex <= text.length) {
          setDisplayText(text.slice(0, charIndex));
          charIndex++;
          if (charIndex <= text.length) {
            timeoutId = setTimeout(type, speed);
          } else {
            setIsComplete(true);
          }
        }
      };
      type();
    }, delay);

    return () => {
      clearTimeout(startTimeoutId);
      clearTimeout(timeoutId);
    };
  }, [isVisible, text, speed, delay]);

  return { displayText, isComplete, elementRef };
};
