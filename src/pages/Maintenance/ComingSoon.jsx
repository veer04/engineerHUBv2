import React, { useEffect } from "react";
import "./ComingSoon.css";
import { Bucket_URL } from "../../services/APIUtils";
import useNavbar from "../../hooks/use-navbar";

export default function ComingSoon() {
  const { setSelectedPageNavbar } = useNavbar();
  setSelectedPageNavbar("maintenance");

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
        “It's been true in my life that when I've needed a mentor, the right
        person shows up.” –Ken Blanchard
      </span>
    </div>
  );
}
