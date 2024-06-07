import "./NewFooter.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BsDiscord,
  BsInstagram,
  BsLinkedin,
  BsTelegram,
  // BsThreads,
  // BsTwitterX,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";
import { Bucket_URL } from "../../services/APIUtils";

export default function NewFooter() {
  const [displayFooter, setDisplayFooter] = useState(true);
  const location = useLocation();
  const bucket = `${Bucket_URL}frontend/footer/`;

  useEffect(() => {
    if (
      location.pathname.includes("community/chat") ||
      location.pathname.includes("host/") ||
      location.pathname.includes("login") ||
      location.pathname.includes("signup") ||
      location.pathname.includes("club-signup") ||
      location.pathname.includes("organization-signup") ||
      location.pathname.includes("login") ||
      location.pathname.includes("forgot-password") ||
      location.pathname.includes("change-password") ||
      location.pathname.includes("otp-verification")
    ) {
      setDisplayFooter(false);
    } else setDisplayFooter(true);
  }, [location]);

  return (
    displayFooter && (
      <footer>
        <div className="content">
          <div className="about-us-container">
            <p className="title">About Us</p>
            <p className="description">
              engineerHUB is one stop solution for engineers ! A platform to
              learn in community, explore campuses & get placed in dream
              companies.
            </p>
            <a href={`${bucket}certificate_of_recognition.pdf`} target="_blank">
              <img
                style={{ width: "100%", height: "auto", marginBottom: "20px" }}
                src={`${bucket}certificate_of_recognition.png`}
                alt="Certificate of recognition from #startupindia"
              />
            </a>
            <div className="our-links">
              <Link to="http://www.instagram.com/engineerhub.in">
                <BsInstagram />
              </Link>
              <Link to="https://www.linkedin.com/company/engineersummit">
                <BsLinkedin />
              </Link>
              <Link to="https://www.youtube.com/c/engineerHUB1">
                <BsYoutube />
              </Link>
              <Link to="https://discord.gg/ZMZAEZ5NfA">
                <BsDiscord />
              </Link>
              <Link to="https://chat.whatsapp.com/CBXimuglKBk1j8VYWA5crE">
                <BsWhatsapp />
              </Link>

              <Link to="https://t.me/engineerhub_in">
                <BsTelegram />
              </Link>
            </div>
            <p className="sub-title">Have a query?</p>
            <div className="info">
              <Link to="mailto:info@engineerhub.in" className="link">
                info@engineerhub.in
              </Link>
              <Link to="tel:+918303156089" className="link">
                +91 83031 56089
              </Link>
            </div>
            <div className="info">
              <Link to="mailto:career@engineerhub.in" className="link">
                career@engineerhub.in
              </Link>
              <Link to="tel:+919129883089" className="link">
                +91 91298 83089
              </Link>
            </div>
          </div>
          <div className="links-container">
            <div className="pages">
              <p className="title">Community</p>
              <Link
                to="/community/chat/Data%20Structures%20%26%20Algorithms"
                className="link"
              >
                Chat
              </Link>
              <Link
                to="/community/projects/Data%20Structures%20%26%20Algorithms"
                className="link"
              >
                Projects
              </Link>
              <Link
                to="/community/events/Data%20Structures%20%26%20Algorithms"
                className="link"
              >
                Events
              </Link>
              <Link
                to="/community/blogs/Data%20Structures%20%26%20Algorithms"
                className="link"
              >
                Blogs
              </Link>
            </div>
            <div className="pages">
              <p className="title">Campus</p>
              <Link to="/campus/search/IIT%20KANPUR" className="link">
                Search Campuses
              </Link>
              <Link
                to="/trending/events/64e611837c5cb93359147f46"
                className="link"
              >
                Trending Events
              </Link>
              <Link
                to="/trending/campuses/64e88d0f3e682ea8e588a8a0"
                className="link"
              >
                Trending Campus
              </Link>
              <Link
                to="/trending/alumni/6485eba73b1ce8dd9ff91a10"
                className="link"
              >
                Trending Alumni
              </Link>
              <Link
                to="/trending/workshops/64c0f9c6f0c72e2702488a5c"
                className="link"
              >
                Workshops
              </Link>
            </div>
            <div className="pages">
              <p className="title">Company</p>
              <Link to="/company/internships" className="link">
                Internships
              </Link>
              <Link to="/company/jobs?pageNo=1&limit=21" className="link">
                Jobs
              </Link>
              <Link to="/company/events" className="link">
                Hackathons
              </Link>
              <Link to="/company/projects" className="link">
                Projects
              </Link>
            </div>
            <div className="pages">
              <p className="title">Host</p>
              <Link to="/host/cultural-event" className="link">
                Cultural Events
              </Link>
              <Link to="/host/technical-event" className="link">
                Technical Events
              </Link>
              <Link to="/host/hackathon" className="link">
                Hackathon
              </Link>
              <Link to="/host/webinar" className="link">
                Webinar
              </Link>
              <Link to="/host/job" className="link">
                Jobs
              </Link>
              <Link to="/host/internship" className="link">
                Internships
              </Link>
              <Link to="/host/project" className="link">
                Projects
              </Link>
            </div>
          </div>
        </div>
        <div className="courtesy">Campus Engineerhub Pvt. Ltd.</div>
      </footer>
    )
  );
}
