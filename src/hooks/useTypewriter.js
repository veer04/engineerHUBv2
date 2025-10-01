import { useState, useEffect } from 'react';

export const useTypewriter = (text, speed = 100, delay = 1000) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);

  useEffect(() => {
    // Initial delay before starting animation
    const initialTimeout = setTimeout(() => {
      setCurrentIndex(0);
      setDisplayText('');
      setIsComplete(false);
    }, delay);

    return () => clearTimeout(initialTimeout);
  }, [delay]);

  return { displayText, isComplete };
};
