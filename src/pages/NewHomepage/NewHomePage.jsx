import React from "react";
import "./NewHomePage.css";
import CommunitySection from "../HomePage/CommunitySection";
import CompaniesWeCollaborate from "../HomePage/CompaniesWeCollaborate";
import MainLandingSection from "../HomePage/MainLandingSection";
import DomainsSection from "../HomePage/DomainsSection";
import CampusUpdatesSection from "../HomePage/CampusUpdatesSection";
import FeaturedEvents from "../HomePage/FeaturedEvents";
import RecentActivitiesSection from "../HomePage/RecentActivitiesSection";
import ReviewsSection from "../HomePage/ReviewsSection";
import SiliconValley from "../HomePage/SiliconValley";
import JobsSection from "../HomePage/JobsSection";
import { useEffect ,useState} from "react";
import useNavbar from "../../hooks/use-navbar";

export default function NewHomePage() {
  const { setSelectedPageNavbar } = useNavbar();
  useEffect(() => {
    setSelectedPageNavbar("home");
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="homepage">
      <MainLandingSection />
      <CompaniesWeCollaborate />
      <CommunitySection />
      <DomainsSection />
      <CampusUpdatesSection />
      <FeaturedEvents />
      <JobsSection />
      <RecentActivitiesSection />
      <SiliconValley />
      <ReviewsSection />
    </div>
  );
}










