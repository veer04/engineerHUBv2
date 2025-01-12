import React, { useEffect } from "react";
import "./CommunityPage.css";
import DomainsSection from "./DomainsSection";
import useNavbar from "../../hooks/use-navbar";
import CommunityPageBlogSection from "./CommunityPageBlogSection";

export default function CommunityPage() {
  const { setSelectedPageNavbar } = useNavbar();

  useEffect(() => {
    document.title = "Community | engineerHUB";
    setSelectedPageNavbar("community");
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="community-page">
        <DomainsSection />
        <CommunityPageBlogSection />
      </div>
    </>
  );
}
