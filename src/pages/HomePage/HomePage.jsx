import React from "react";
import "./HomePage.css";
import jwt_decode from "jwt-decode";
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
import { useEffect ,useState} from "react";
import useNavbar from "../../hooks/use-navbar";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL,API_URLT } from "../../services/APIUtils";
export default function HomePage() {
  const navigate=useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  useEffect(() => {
    setSelectedPageNavbar("home");
    window.scrollTo(0, 0);
  
  }, []);
  
  const [me, setMe] = useState({});

  
  useEffect(() => {
    setSelectedPageNavbar("home");
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://engineerhub-yash.onrender.com/api/v1/auth/details`);

        console.log(response.data);
        console.log(response.data.success);
        setMe(response.data);

        if (response.data.success === true) {
          const decoded = jwt_decode(response.data.accessToken);
          const _id = decoded._id;
          Cookies.set("access_token", response.data.accessToken);
          Cookies.set("name", decoded.name);
          Cookies.set("userName", decoded.userName);
          Cookies.set("email", decoded.email);
          Cookies.set("_id", _id);
          Cookies.set("image", decoded.image);
          Cookies.set("role", decoded.role);
          Cookies.set("mobile", decoded.mobile);
          console.log(response.data);
          navigate("/login");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
// Delay in milliseconds (1-2 seconds)

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
