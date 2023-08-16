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
import useNavbar from "../../hooks/use-navbar";

export default function HomePage() {
  const { setSelectedPageNavbar } = useNavbar();
  useEffect(() => {
    setSelectedPageNavbar("home");
    window.scrollTo(0, 0);
  }, []);

  // const [me, setMe] = useState({});

  // useEffect(() => {
  //   async function getMe() {
  //     try {
  //       const response = await axios.get(`${API_URL}api/v1/auth/details`, {
  //         withCredentials: true,
  //       });
  //       console.log("1");
  //       console.log(response.data);
  //       console.log(response.data.success);
  //       setMe(response.data);
  //       if(response.data.success===true)
  //       {
  //         Cookies.set("access_token",response.data.accessToken)
  //         Cookies.set("userName",response.data.decodedToken.name)
  //         Cookies.set("email",response.data.decodedToken.email)
  //         Cookies.set("_id",response.data.decodedToken.id)
  //         Cookies.set("image",response.data.decodedToken.picture);
  //         console.log(response.data)
  //       }
  //       else
  //       {
  //         navigate("/login");
  //         window.alert("No id exists with the provided mail signup Now!!!")
  //       }

  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   }

  //   getMe();
  // }, []);
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
