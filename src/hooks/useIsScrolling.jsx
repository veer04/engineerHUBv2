import { useEffect, useState } from "react";

function useIsScrolling(delay = 1000) {
  let timeout = null;

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onScroll = () => {
    // if the page scrolling hits the top or bottom, set isScrolling to false
    if (
      window.scrollY === 0 ||
      window.scrollY + window.innerHeight === window.document.body.scrollHeight
    ) {
      setIsScrolling(false);
      return;
    }
    // !remove above code if you want to keep isScrolling true when the page hits the top or bottom
    setIsScrolling(true);

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      setIsScrolling(false);
    }, delay);
  };

  return isScrolling;
}

export { useIsScrolling };
