import "./NewHomePage.css";
import CommunitySection from "../HomePage/CommunitySection";
import CompaniesWeCollaborate from "../HomePage/CompaniesWeCollaborate";
import MainLandingSection from "./MainLandingSection";
import DomainsSection from "../HomePage/DomainsSection";
import CampusUpdatesSection from "../HomePage/CampusUpdatesSection";
import FeaturedEvents from "../HomePage/FeaturedEvents";
import RecentActivitiesSection from "../HomePage/RecentActivitiesSection";
import ReviewsSection from "../HomePage/ReviewsSection";
import SiliconValley from "../HomePage/SiliconValley";
import JobsSection from "../HomePage/JobsSection";
import { useEffect } from "react";
import useNavbar from "../../hooks/use-navbar";
import NewReviewSection from "./NewReviewSection";

export default function NewHomePage() {
  const { setSelectedPageNavbar } = useNavbar();
  useEffect(() => {
    setSelectedPageNavbar("home");
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="homepage">
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
      <NewReviewSection />
    </main>
  );
}
