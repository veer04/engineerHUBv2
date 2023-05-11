import React, { useEffect } from "react";
import "./ComingSoon.css";
import { Bucket_URL } from "../../services/APIUtils";

export default function ComingSoon() {
  const bucket = `${Bucket_URL}frontend/maintenance/`;

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="coming-soon-page">
      <img
        src={`${bucket}coming_soon.png`}
        alt="Coming Soon"
        className="image"
      />
      <span className="text-1">To be launched soon</span>
      <span className="text-2">
        Our team of developers are working on this feature. We’ll launch this
        soon!!
      </span>
    </div>
  );
}
