import React from "react";
import "./HomePage.css";
import CommunitySection from "./CommunitySection";
import CompaniesWeCollaborate from "./CompaniesWeCollaborate";
import MainLandingSection from "./MainLandingSection";
import DomainsSection from "./DomainsSection";
import CampusUpdatesSection from "./CampusUpdatesSection";
import FeaturedEvents from "./FeaturedEvents";
import RecentActivitiesSection from "./RecentActivitiesSection";
import ReviewsSection from "./ReviewsSection";
import SiliconValley from "./SiliconValley";
import JobsSection from "./JobsSection";
import { useEffect } from "react";
import useMobileNavbar from "../../hooks/use-mobileNavbar";

export default function HomePage() {
  const { setSelectedPage } = useMobileNavbar();
  useEffect(() => {
    setSelectedPage("home");
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
      {/* <ReviewsSection /> */}
    </div>
  );
}
