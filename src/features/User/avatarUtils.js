/**
 * Helper to compute initials from user's full name.
 * e.g. "Lemme Apply" -> "LA", "Akhilesh Kaparaju" -> "AK", "John" -> "JO"
 */
export function getInitials(fullName) {
  const t = fullName?.trim();
  if (!t) return "?";
  const parts = t.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return t.slice(0, 2).toUpperCase();
}

/**
 * Helper to determine if an image URL is a custom user profile picture
 * (e.g. uploaded S3 image or Google auth picture) vs a missing, default,
 * or static banner image asset (like Student.png, employer_new.png, bot-avatar).
 */
export function isCustomProfileImage(url) {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (
    !trimmed ||
    trimmed === "undefined" ||
    trimmed === "null" ||
    trimmed.includes("Student.png") ||
    trimmed.includes("Student.jpg") ||
    trimmed.includes("employer_new.png") ||
    trimmed.includes("organization.png") ||
    trimmed.includes("ui/banners") ||
    trimmed.includes("default_profile_icon") ||
    trimmed.includes("bot-avatar") ||
    trimmed.includes("banner-cosdata")
  ) {
    return false;
  }
  return true;
}
