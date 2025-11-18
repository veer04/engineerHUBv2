/**
 * Generates SEO-friendly meta title for job/internship listing pages
 * Dynamically includes search query, filters, and page number
 * 
 * @param {Object} options - Options for generating meta title
 * @param {string} options.type - "Job" or "Internship"
 * @param {string} options.searchQuery - Search query from URL params
 * @param {string} options.location - Location filter
 * @param {string} options.jobType - Job type filter
 * @param {string} options.jobMode - Job mode filter (Remote, On-Site, Hybrid, WFH)
 * @param {string} options.experience - Experience filter
 * @param {boolean} options.isFeatured - Whether showing featured only
 * @param {boolean} options.isForFreshers - Whether showing fresher jobs only
 * @param {boolean} options.isRemote - Whether showing remote jobs only
 * @param {boolean} options.isMaang - Whether showing MAANG companies only
 * @param {number} options.pageNo - Current page number
 * @returns {string} Formatted SEO meta title
 */
export function generateListingMetaTitle({
  type = "Job",
  searchQuery = "",
  location = "",
  jobType = "",
  jobMode = "",
  experience = "",
  isFeatured = false,
  isForFreshers = false,
  isRemote = false,
  isMaang = false,
  pageNo = 1,
}) {
  const cleanString = (str) => {
    if (!str || typeof str !== "string") return "";
    return str.trim().replace(/\s+/g, " ");
  };

  const formatLocation = (loc) => {
    if (!loc || typeof loc !== "string") return "";
    const cleanLoc = cleanString(loc);
    if (cleanLoc === "WFH") return "Work From Home";
    if (cleanLoc === "On-Site") return "On-Site";
    return cleanLoc;
  };

  const typeLabel = type === "Internship" ? "Internships" : "Jobs";
  const cleanSearch = cleanString(searchQuery);
  const cleanLocation = formatLocation(location);
  const cleanJobType = cleanString(jobType);
  const cleanJobMode = formatLocation(jobMode);
  const cleanExperience = cleanString(experience);

  // Build title parts
  const parts = [];

  // Priority 1: Search query
  if (cleanSearch) {
    parts.push(cleanSearch);
  }

  // Priority 2: Special filters (these are more specific)
  if (isMaang) {
    parts.push("MAANG");
  }
  if (isForFreshers) {
    parts.push("Fresher");
  }
  if (isFeatured) {
    parts.push("Featured");
  }

  // Priority 3: Job mode (Remote, WFH, Hybrid, On-Site)
  if (isRemote || cleanJobMode === "Work From Home" || cleanJobMode === "Remote") {
    parts.push("Remote");
  } else if (cleanJobMode) {
    parts.push(cleanJobMode);
  }

  // Priority 4: Job type
  if (cleanJobType) {
    parts.push(cleanJobType);
  }

  // Priority 5: Experience
  if (cleanExperience) {
    parts.push(`${cleanExperience} Experience`);
  }

  // Priority 6: Location
  if (cleanLocation && cleanJobMode !== "Work From Home" && !isRemote) {
    parts.push(`in ${cleanLocation}`);
  }

  // Build the title
  let title = "";

  if (parts.length > 0) {
    // If we have search query or filters, build dynamic title
    title = `${parts.join(" ")} ${typeLabel}`;
  } else {
    // Default title
    title = typeLabel;
  }

  // Add page number if > 1
  if (pageNo > 1) {
    title += ` - Page ${pageNo}`;
  }

  // Add branding
  title += " | engineerHUB";

  // Ensure title doesn't exceed recommended length (60 chars for optimal SEO)
  // But allow up to 70 for better context
  const MAX_LENGTH = 70;
  if (title.length > MAX_LENGTH) {
    // Try to shorten by removing less important parts
    const withoutPage = title.replace(/\s*-\s*Page\s+\d+\s*/, "");
    if (withoutPage.length <= MAX_LENGTH) {
      title = withoutPage;
    } else {
      // Truncate intelligently
      const base = `${typeLabel} | engineerHUB`;
      const availableSpace = MAX_LENGTH - base.length - 3; // 3 for " - "
      if (availableSpace > 10 && parts.length > 0) {
        const shortened = parts.slice(0, 2).join(" ");
        title = `${shortened.substring(0, availableSpace)}... ${typeLabel} | engineerHUB`;
      } else {
        title = base;
      }
    }
  }

  return title;
}

