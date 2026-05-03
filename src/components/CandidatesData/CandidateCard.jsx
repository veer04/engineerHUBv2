import { useState } from "react";

const getInitials = (name) => {
  if (!name) return "EH";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

export default function CandidateCard({
  candidate,
  isShortlisted,
  onToggleShortlist,
}) {
  const avatarUrl =
    candidate?.image ||
    candidate?.profileImage ||
    candidate?.avatar ||
    candidate?.photo;

  const resumeUrl = candidate?.resume || candidate?.resumeUrl || "";
  const canShowResume = Boolean(resumeUrl);
  const contactEmail = candidate?.email || "";
  const contactPhone = candidate?.mobile
    ? `${candidate?.mobileCountryCode || ""} ${candidate.mobile}`.trim()
    : "";
  const hasContact = Boolean(contactEmail || contactPhone);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <article className="candidate-card">
      <div className="candidate-card-header">
        <div className="candidate-card-profile">
          <div className="candidate-avatar">
            {avatarUrl ? (
              <img src={avatarUrl} alt={candidate.displayName} />
            ) : (
              <span>{getInitials(candidate.displayName)}</span>
            )}
          </div>
          <div>
            <div className="candidate-name">{candidate.displayName}</div>
            <div className="candidate-meta">
              <span>Skills :</span>{" "}
              {candidate.displaySkills?.length
                ? candidate.displaySkills.join(", ")
                : "Not specified"}
            </div>
            <div className="candidate-meta">
              <span>College :</span> {candidate.displayCollege}
            </div>
            <div className="candidate-meta">
              <span>YOE :</span> {candidate.displayExperience}
            </div>
          </div>
        </div>
        <div className="candidate-card-actions-top">
          <button
            type="button"
            className={`shortlist-button ${isShortlisted ? "active" : ""}`}
            onClick={() => onToggleShortlist && onToggleShortlist(candidate._id)}
            aria-pressed={isShortlisted}
          >
            {isShortlisted ? "Shortlisted" : "Shortlist"}
          </button>
        </div>
      </div>

      {isContactOpen && hasContact && (
        <div className="candidate-contact-popup">
          <div className="candidate-contact-row">
            <span className="contact-icon">✉</span>
            <span>{contactEmail || "Email not available"}</span>
          </div>
          <div className="candidate-contact-row">
            <span className="contact-icon">☎</span>
            <span>{contactPhone || "Phone not available"}</span>
          </div>
        </div>
      )}

      <div className="candidate-card-actions">
        <button
          type="button"
          disabled={!hasContact}
          onClick={() => {
            if (!hasContact) return;
            setIsContactOpen((prev) => !prev);
          }}
          onMouseEnter={() => hasContact && setIsContactOpen(true)}
          onMouseLeave={() => setIsContactOpen(false)}
        >
          Contact
        </button>
        <button
          type="button"
          className="primary-action"
          disabled={!canShowResume}
          onClick={() => {
            if (!resumeUrl) return;
            window.open(resumeUrl, "_blank", "noopener,noreferrer");
          }}
        >
          Resume
        </button>
      </div>
    </article>
  );
}
