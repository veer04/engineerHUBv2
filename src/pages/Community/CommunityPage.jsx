import React, { useEffect } from "react";
import "./CommunityPage.css";
import DomainsSection from "./DomainsSection";
import useNavbar from "../../hooks/use-navbar";

export default function CommunityPage() {
  const { setSelectedPageNavbar } = useNavbar();

  useEffect(() => {
    setSelectedPageNavbar("community");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="community-page">
      <DomainsSection />
    </div>
  );
}
