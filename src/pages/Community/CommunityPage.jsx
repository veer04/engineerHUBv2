import React, { useEffect } from "react";
import "./CommunityPage.css";
import DomainsSection from "./DomainsSection";

export default function CommunityPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="community-page">
      <DomainsSection />
    </div>
  );
}
