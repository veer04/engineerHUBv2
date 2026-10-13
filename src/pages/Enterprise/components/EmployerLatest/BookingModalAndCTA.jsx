import React, { useState } from "react";
import styles from "./BookingModalAndCTA.module.css";
import { Phone, Mail, MessageCircle, Calendar, ArrowRight, X, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BookingModalAndCTA() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookSlot = () => {
    navigate("/referrals/book-now/67a107c89d57a46e99582bd1");
  };

  const handleEmailClick = () => {
    window.open("mailto:info@engineerhub.in", "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/918303156089", "_blank");
  };

  const handlePhoneClick = () => {
    window.open("tel:+918303156089", "_self");
  };

  return (
    <section className={styles.ctaSection} id="book-slot-section">
      <div className={styles.ctaContainer}>
        <div className={styles.ctaCard}>
          {/* Blueprint diagonal hatch texture */}
          <div className={styles.cardHatchOverlay} aria-hidden="true" />

          <div className={styles.cardContent}>
            <div className={styles.pillBadge}>
              <Sparkles size={13} className={styles.sparkleIcon} />
              <span>DIRECT RECRUITER ASSISTANCE</span>
            </div>

            <h2 className={styles.ctaTitle}>
              Let us help you to hire the best
            </h2>

            <p className={styles.ctaSubtitle}>
              Book a personalized slot with our campus hiring team or reach out to us directly
              via call, email, or WhatsApp.
            </p>

            {/* Actions Bar */}
            <div className={styles.actionsBar}>
              <button
                className={styles.btnBookSlot}
                onClick={handleBookSlot}
                type="button"
              >
                <Calendar size={17} />
                <span>Book a slot now</span>
                <ArrowRight size={16} />
              </button>

              <button
                className={styles.btnQuickConnect}
                onClick={() => setIsModalOpen(true)}
                type="button"
              >
                <span>Instant Call / Inquiry</span>
              </button>
            </div>

            {/* Contact Pills Strip */}
            <div className={styles.contactsStrip}>
              <div
                className={styles.contactItem}
                onClick={handlePhoneClick}
                role="button"
                tabIndex={0}
              >
                <div className={styles.contactIconWrap}>
                  <Phone size={14} />
                </div>
                <span>83031 56089 / 8303564068</span>
              </div>

              <div
                className={styles.contactItem}
                onClick={handleEmailClick}
                role="button"
                tabIndex={0}
              >
                <div className={styles.contactIconWrap}>
                  <Mail size={14} />
                </div>
                <span>info@engineerhub.in</span>
              </div>

              <div
                className={styles.contactItem}
                onClick={handleWhatsAppClick}
                role="button"
                tabIndex={0}
              >
                <div className={styles.contactIconWrap}>
                  <MessageCircle size={14} />
                </div>
                <span>Chat on WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Inquiry Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div
            className={styles.modalBox}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              className={styles.modalCloseBtn}
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
              type="button"
            >
              <X size={18} />
            </button>

            <h3 className={styles.modalTitle}>Connect with our Recruiter Desk</h3>
            <p className={styles.modalDesc}>
              Select your preferred channel to get in touch with our team immediately.
            </p>

            <div className={styles.modalOptionList}>
              <div
                className={styles.modalOption}
                onClick={handlePhoneClick}
                role="button"
                tabIndex={0}
              >
                <div className={styles.modalOptionIcon}>
                  <Phone size={18} />
                </div>
                <div className={styles.modalOptionText}>
                  <strong>Direct Phone Call</strong>
                  <span>+91 83031 56089 / +91 83035 64068</span>
                </div>
              </div>

              <div
                className={styles.modalOption}
                onClick={handleWhatsAppClick}
                role="button"
                tabIndex={0}
              >
                <div className={styles.modalOptionIcon} style={{ color: "#16a34a" }}>
                  <MessageCircle size={18} />
                </div>
                <div className={styles.modalOptionText}>
                  <strong>WhatsApp Chat</strong>
                  <span>Fastest response for urgent campus drives</span>
                </div>
              </div>

              <div
                className={styles.modalOption}
                onClick={handleEmailClick}
                role="button"
                tabIndex={0}
              >
                <div className={styles.modalOptionIcon}>
                  <Mail size={18} />
                </div>
                <div className={styles.modalOptionText}>
                  <strong>Corporate Email</strong>
                  <span>info@engineerhub.in</span>
                </div>
              </div>
            </div>

            <button
              className={styles.modalSlotBtn}
              onClick={handleBookSlot}
              type="button"
            >
              <span>Or Schedule a Video Call Slot</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
