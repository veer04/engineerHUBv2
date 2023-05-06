import React, { useEffect } from "react";
import "./ComingSoon.css";

export default function ComingSoon() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="coming-soon-page">
      <img
        src="https://frontendehubbucket.s3.ap-south-1.amazonaws.com/frontend/maintenance/coming_soon.png"
        alt="Coming Soon"
        className="image"
      />
      <span className="text-1">We are currently working on this </span>
      <span className="text-2">
        Our team of developers are working on this feature. We’ll launch this
        soon!!
      </span>
    </div>
  );
}
