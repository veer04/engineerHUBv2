import React, { useEffect } from "react";
import "./CommunityPage.css";
import DomainsSection from "./DomainsSection";
import useNavbar from "../../hooks/use-navbar";
import CommunityPageBlogSection from "./CommunityPageBlogSection";
import AdsenseComp from "../../components/AdsenseComp/AdsenseComp";
import SliderNotesCommunityPage from './SliderNotesCommunityPage';


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
        <SliderNotesCommunityPage />

      </div>
       {/* AD-14 */}
       <div className="d-flex justify-content-center mb-3">
        <AdsenseComp adSlot="1464856375"/>
      </div>
    </>
  );
}
