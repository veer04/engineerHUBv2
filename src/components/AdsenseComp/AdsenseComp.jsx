import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const AdsenseComp = ({ adSlot }) => {
  const adRef = useRef(null);
  const initializedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Pre-load the AdSense script as soon as component mounts
  useEffect(() => {
    const scriptSrc = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8474972598474156";
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0,
        rootMargin: '200px 0px' // Start loading when ad is 200px away from viewport
      }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!isVisible || initializedRef.current) return;

    const initAd = () => {
      try {
        if (window.adsbygoogle && adRef.current) {
          window.adsbygoogle.push({});
          initializedRef.current = true;
        }
      } catch (error) {
        console.error("Adsense error:", error);
      }
    };

    // Try to initialize immediately if adsbygoogle is already loaded
    if (window.adsbygoogle) {
      initAd();
    } else {
      // If not loaded, wait for it and try again
      const checkAdsense = setInterval(() => {
        if (window.adsbygoogle) {
          initAd();
          clearInterval(checkAdsense);
        }
      }, 50); // Check every 50ms

      // Clear interval after 5 seconds to prevent infinite checking
      setTimeout(() => clearInterval(checkAdsense), 5000);
    }
  }, [isVisible, location.pathname]);

  return (
    <div style={{ 
      overflow: "hidden", 
      width: "100%", 
      maxWidth: "970px",
      minWidth: "300px",
      margin: "10px auto",
      display: "flex",
      justifyContent: "center"
    }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", maxWidth: "970px", height: "auto" }}
        data-ad-client="ca-pub-8474972598474156"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdsenseComp;