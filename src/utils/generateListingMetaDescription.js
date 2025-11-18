/**
 * Generates SEO-friendly meta description for job/internship listing pages
 * Dynamically includes search query, filters, and relevant information
 * 
 * @param {Object} options - Options for generating meta description
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
 * @param {number} options.totalResults - Total number of results (optional)
 * @returns {string} Formatted SEO meta description (max 160 characters)
 */
export function generateListingMetaDescription({
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
  totalResults = null,
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

  const typeLabel = type === "Internship" ? "internships" : "jobs";
  const typeLabelCapitalized = type === "Internship" ? "Internships" : "Jobs";
  const cleanSearch = cleanString(searchQuery);
  const cleanLocation = formatLocation(location);
  const cleanJobType = cleanString(jobType);
  const cleanJobMode = formatLocation(jobMode);
  const cleanExperience = cleanString(experience);

  const MAX_LENGTH = 160;
  let description = "";

  // Build description based on available filters
  const filters = [];

  if (cleanSearch) {
    filters.push(cleanSearch);
  }

  if (isMaang) {
    filters.push("MAANG companies");
  }

  if (isForFreshers) {
    filters.push("fresher");
  }

  if (isFeatured) {
    filters.push("featured");
  }

  if (isRemote || cleanJobMode === "Work From Home" || cleanJobMode === "Remote") {
    filters.push("remote");
  } else if (cleanJobMode) {
    filters.push(cleanJobMode.toLowerCase());
  }

  if (cleanJobType) {
    filters.push(cleanJobType.toLowerCase());
  }

  if (cleanExperience) {
    filters.push(`${cleanExperience} experience`);
  }

  if (cleanLocation && cleanJobMode !== "Work From Home" && !isRemote) {
    filters.push(`in ${cleanLocation}`);
  }

  // Build the description
  if (filters.length > 0) {
    const filterText = filters.slice(0, 3).join(", "); // Limit to 3 filters for readability
    description = `Browse ${filterText} ${typeLabel} on engineerHUB. `;
  } else {
    description = `Browse ${totalResults ? `${totalResults}+ ` : ""}${typeLabelCapitalized} on engineerHUB. `;
  }

  // Add call to action
  const cta = "Find your dream career opportunity. Apply now!";
  const remainingSpace = MAX_LENGTH - description.length;

  if (remainingSpace >= cta.length) {
    description += cta;
  } else if (remainingSpace >= 20) {
    description += "Apply now!";
  }

  // Ensure we don't exceed max length
  if (description.length > MAX_LENGTH) {
    description = description.substring(0, MAX_LENGTH - 3).trim() + "...";
  }

  return description.trim();
}

