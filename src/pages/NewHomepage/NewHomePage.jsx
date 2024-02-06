import "./NewHomePage.css";
import { useEffect } from "react";
import useNavbar from "../../hooks/use-navbar";
import MainLandingSection from "./MainLandingSection";
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
      <NewCommunitySection />
      <NewCampusHomePage />
      <NewCompanyHomePage />
      <NewHostHomePage />
      <NewSiliconValley />
      <NewReviewSection />
    </main>
  );
}
