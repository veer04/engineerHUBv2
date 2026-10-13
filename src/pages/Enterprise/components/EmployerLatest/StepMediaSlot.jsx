import React from "react";
import styles from "./StepMediaSlot.module.css";
import { Play, Sparkles } from "lucide-react";

/**
 * StepMediaSlot
 * Component that houses functional video clips, animated GIFs, or rich interactive SaaS UI fallback previews
 * for each step in the 5-stage recruiter workflow.
 */
export default function StepMediaSlot({
  stepId,
  badgeText,
  badgeBg = "#f0f6f8",
  badgeTextColor = "#093341",
  tintBg,
  tintBorder,
  hatchColor,
  mediaSrc = "",
  mediaType = "mockup", // "gif" | "video" | "mockup"
  altText = "engineerHUB Platform Demonstration",
  fallbackMockup = null,
  caption = "",
}) {
  return (
    <div
      className={styles.mediaSlotWrapper}
      style={{
        "--segment-theme-color": badgeTextColor,
        "--segment-theme-bg": badgeBg,
        "--segment-theme-shadow": `${badgeTextColor}20`,
        "--caption-dot-color": badgeTextColor,
        "--segment-tint-bg": tintBg || badgeBg,
        "--segment-tint-border": tintBorder || "#e4e4e7",
        "--segment-hatch-color": hatchColor || "#e4e4e7",
      }}
    >
      {/* Blueprint diagonal hatch framing */}
      <div className={styles.hatchFrame}>
        <div className={styles.innerCard}>
          {/* Top Window Bar */}
          <div className={styles.windowHeader}>
            <div className={styles.windowDots}>
              <span className={`${styles.dot} ${styles.dotRed}`} />
              <span className={`${styles.dot} ${styles.dotYellow}`} />
              <span className={`${styles.dot} ${styles.dotGreen}`} />
            </div>
            
            <div
              className={styles.statusPill}
              style={{ backgroundColor: badgeBg, color: badgeTextColor }}
            >
              <Sparkles size={12} className={styles.sparkleIcon} />
              <span>{badgeText || `Step ${stepId} Workflow`}</span>
            </div>

            <div className={styles.windowBrand}>
              <span>engineerHUB · AI Engine</span>
            </div>
          </div>

          {/* Media Body: Either Video, GIF, or Rich Fallback Mockup */}
          <div className={styles.mediaContainer}>
            {mediaType === "video" && mediaSrc ? (
              <video
                src={mediaSrc}
                className={styles.videoPlayer}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                ref={(el) => {
                  if (el) el.muted = true;
                }}
                aria-label={altText}
              />
            ) : mediaType === "gif" && mediaSrc ? (
              <img
                src={mediaSrc}
                alt={altText}
                className={styles.gifPlayer}
                loading="lazy"
              />
            ) : (
              <div className={styles.mockupWrapper}>
                {fallbackMockup}
              </div>
            )}
          </div>

          {/* Bottom Caption / Functional Note */}
          {caption && (
            <div className={styles.captionBar}>
              <span
                className={styles.captionDot}
                style={{
                  backgroundColor: badgeTextColor,
                  boxShadow: `0 0 6px ${badgeTextColor}66`,
                }}
              />
              <span className={styles.captionText}>{caption}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
