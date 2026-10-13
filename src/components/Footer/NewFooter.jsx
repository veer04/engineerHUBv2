import "./NewFooter.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BsDiscord,
  BsInstagram,
  BsLinkedin,
  BsTelegram,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { FiMail, FiPhone, FiExternalLink, FiShield } from "react-icons/fi";
import { HashLink } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
import { Bucket_URL } from "../../services/APIUtils";

export default function NewFooter() {
  const [displayFooter, setDisplayFooter] = useState(true);
  const location = useLocation();
  const bucket = `${Bucket_URL}static/documents/`;

  useEffect(() => {
    if (
      location.pathname.includes("community/chat") ||
      location.pathname.includes("host/") ||
      location.pathname.includes("login") ||
      location.pathname.includes("signup") ||
      location.pathname.includes("club-signup") ||
      location.pathname.includes("organization-signup") ||
      location.pathname.includes("forgot-password") ||
      location.pathname.includes("change-password") ||
      location.pathname.includes("otp-verification") ||
      location.pathname.includes("referrals") ||
      location.pathname.includes("career/jobs/board") ||
      location.pathname.includes("/chat/") ||
      location.pathname.includes("/profile/user") ||
      location.pathname.includes("/profile/organization")
    ) {
      setDisplayFooter(false);
    } else {
      setDisplayFooter(true);
    }
  }, [location]);

  if (!displayFooter) return null;

  return (
    <footer className="ehub-footer">
      <div className="ehub-footer-container">
        {/* Top Grid Section */}
        <div className="ehub-footer-top">
          {/* Column 1: Brand & Key Company Details */}
          <div className="ehub-footer-col brand-col">
            <div className="brand-header">
              <span className="brand-badge-dot" />
              <h3 className="brand-name">engineerHUB</h3>
            </div>

            <p className="brand-tagline">
              AI-powered end-to-end technical hiring platform connecting ambitious
              engineering talent with leading tech companies and high-growth recruiters.
            </p>

            {/* Office Address */}
            <div className="location-block">
              <IoLocationOutline className="location-icon" />
              <address className="location-text">
                8-B, Gyan Khand 4, Indirapuram, Ghaziabad, Uttar Pradesh (201014)
              </address>
            </div>

            {/* Direct Contact Queries */}
            <div className="contact-queries">
              <span className="queries-label">Have a query?</span>
              <div className="contact-links-grid">
                <a href="mailto:info@engineerhub.in" className="contact-chip">
                  <FiMail className="contact-chip-icon" />
                  <span>info@engineerhub.in</span>
                </a>
                <a href="tel:+918303156089" className="contact-chip">
                  <FiPhone className="contact-chip-icon" />
                  <span>+91 83031 56089</span>
                </a>
                <a href="mailto:career@engineerhub.in" className="contact-chip">
                  <FiMail className="contact-chip-icon" />
                  <span>career@engineerhub.in</span>
                </a>
                <a href="tel:+918303564068" className="contact-chip">
                  <FiPhone className="contact-chip-icon" />
                  <span>+91 8303564068</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Startup India Certificate of Recognition */}
          <div className="ehub-footer-col certificate-col">
            <div className="col-header">
              <FiShield className="col-icon" />
              <span className="col-title">Government Recognition</span>
            </div>

            <div className="certificate-card">
              <a
                href={`${bucket}startup_india_certificate.pdf`}
                target="_blank"
                rel="noreferrer"
                className="certificate-link"
                title="View full Startup India Certificate (PDF)"
              >
                <div className="cert-preview-wrap">
                  <img
                    className="certificate-image"
                    src={`${bucket}startup_india_certificate_png.png`}
                    alt="Certificate of recognition from #startupindia"
                    loading="lazy"
                  />
                  <div className="cert-hover-overlay">
                    <FiExternalLink size={18} />
                    <span>View PDF</span>
                  </div>
                </div>
              </a>
              <div className="certificate-meta">
                <span className="cert-pill">#startupindia</span>
                <span className="cert-desc">DPIIT Recognized Startup Entity</span>
              </div>
            </div>
          </div>

          {/* Column 3: Legal & Platform Navigation */}
          <div className="ehub-footer-col nav-col">
            <div className="col-header">
              <span className="col-title">Policies & Legal</span>
            </div>

            <ul className="footer-nav-list">
              <li>
                <HashLink to="/terms-and-conditions" className="footer-nav-link">
                  Terms And Conditions
                </HashLink>
              </li>
              <li>
                <HashLink
                  to="/terms-and-conditions#privacy-policy"
                  className="footer-nav-link"
                >
                  Privacy Policy
                </HashLink>
              </li>
              <li>
                <HashLink
                  to="/terms-and-conditions#refund-and-cancellation-policy"
                  className="footer-nav-link"
                >
                  Refund and Cancellation Policy
                </HashLink>
              </li>
            </ul>

            <div className="platform-nav-group">
              <span className="col-title-sm">Platform</span>
              <ul className="footer-nav-list">
                <li>
                  <Link to="/employer" className="footer-nav-link">
                    For Employers
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="footer-nav-link">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Center Domain Tag */}
        <div className="ehub-domain-strip">
          <span className="domain-line" />
          <a
            href="https://www.engineerhub.in"
            target="_blank"
            rel="noreferrer"
            className="domain-text"
          >
            engineerhub.in
          </a>
          <span className="domain-line" />
        </div>

        {/* Big Display Wordmark in Teal on Whitish Background */}
        <div className="ehub-big-wordmark-container" aria-label="engineerHUB">
          <div className="ehub-big-wordmark" aria-hidden="true">
            {"engineerHUB".split("").map((char, index) => (
              <span
                key={index}
                className="ehub-char"
                style={{ "--char-idx": index }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="ehub-footer-bottom">
          <div className="copyright-text">
            © {new Date().getFullYear()} Campus Engineerhub Pvt. Ltd. All rights reserved.
          </div>

          <div className="social-links-strip">
            <a
              href="https://www.linkedin.com/company/engineersummit"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="LinkedIn"
            >
              <BsLinkedin />
            </a>
            <a
              href="http://www.instagram.com/engineerhub.in"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="Instagram"
            >
              <BsInstagram />
            </a>
            <a
              href="https://www.youtube.com/c/engineerHUB1"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="YouTube"
            >
              <BsYoutube />
            </a>
            <a
              href="https://discord.gg/ZMZAEZ5NfA"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="Discord"
            >
              <BsDiscord />
            </a>
            <a
              href="https://chat.whatsapp.com/CBXimuglKBk1j8VYWA5crE"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="WhatsApp"
            >
              <BsWhatsapp />
            </a>
            <a
              href="https://t.me/engineerhub_in"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="Telegram"
            >
              <BsTelegram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
