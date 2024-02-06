import "./NewHomePage.css";
import { useEffect } from "react";
import useNavbar from "../../hooks/use-navbar";
import CommunitySection from "../HomePage/CommunitySection";
import MainLandingSection from "./MainLandingSection";
import DomainsSection from "../HomePage/DomainsSection";
import CampusUpdatesSection from "../HomePage/CampusUpdatesSection";
import FeaturedEvents from "../HomePage/FeaturedEvents";
import RecentActivitiesSection from "../HomePage/RecentActivitiesSection";
import ReviewsSection from "../HomePage/ReviewsSection";
import SiliconValley from "../HomePage/SiliconValley";
import JobsSection from "../HomePage/JobsSection";
import NewReviewSection from "./NewReviewSection";
import StatsCarousel from "./StatsCarousel";
import NewCommunitySection from "./NewCommunitySectionHomePage";
import NewCampusHomePage from "./NewCampusHomePage";
import NewCompanyHomePage from "./NewCompanyHomePage";
import NewHostHomePage from "./NewHostHomePage";
import NewSiliconValley from "./NewSiliconValley";
export default function NewHomePage() {
  const { setSelectedPageNavbar } = useNavbar();
  useEffect(() => {
    setSelectedPageNavbar("home");
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="homepage">
      <MainLandingSection />
      <StatsCarousel />
      <NewCommunitySection/>
      <NewCampusHomePage/>
      <NewCompanyHomePage/>
      <NewHostHomePage/>
      <NewSiliconValley/>
      <CommunitySection /> {/* to be removed */}
      <DomainsSection /> {/* to be removed */}
      <CampusUpdatesSection /> {/* to be removed */}
      <FeaturedEvents /> {/* to be removed */}
      <JobsSection /> {/* to be removed */}
      <RecentActivitiesSection /> {/* to be removed */}
      <SiliconValley /> {/* to be removed */}
      <NewReviewSection />
    </main>
  );
}
