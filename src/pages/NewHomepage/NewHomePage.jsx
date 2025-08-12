import "./NewHomePage.css";
import { useEffect, useState } from "react";
import useNavbar from "../../hooks/use-navbar";
import MainLandingSection from "./MainLandingSection";
import NewReviewSection from "./NewReviewSection";
import StatsCarousel from "./StatsCarousel";
import NewCommunitySection from "./NewCommunitySectionHomePage";
import NewCampusHomePage from "./NewCampusHomePage";
import NewCompanyHomePage from "./NewCompanyHomePage";
import NewHostHomePage from "./NewHostHomePage";
import NewSiliconValley from "./NewSiliconValley";
import { getTrendingAlumni2, getTrendingClubs } from "../../services/APIConfig";
import EasyWayToHire from "../Enterprise/Assests/Components/EasyWayToHire/EasyWayToHire";
import OurClientale from "../../components/OurClientale/OurClientale";
import JobsForYouFilterComp from "../Company/JobsForYouFilterPage/JobsForYouFilterComp";
import TestimonialsSection from "../Company/TestimonialsSection/TestimonialsSection";

export default function NewHomePage() {
  const { setSelectedPageNavbar } = useNavbar();
  const [list, setList] = useState([]);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    document.title = "engineerHUB";
    setSelectedPageNavbar("home");
    getTrendingAlumni2(setList);
    getTrendingClubs(setClubs);

    // window.scrollTo(0, 0);
  }, []);

  return (
    <main className="homepage">
      <MainLandingSection />
      <StatsCarousel />
     {/* <NewCommunitySection /> */}
     {/* <NewCampusHomePage list={list} clubs={clubs} />*/}
      

      <NewCompanyHomePage />
      <JobsForYouFilterComp/>
      <NewHostHomePage />

      <EasyWayToHire />
      <OurClientale />

      {/* <NewSiliconValley /> */}
      <TestimonialsSection />
     {/* <NewReviewSection /> */}
    </main>
  );
}
