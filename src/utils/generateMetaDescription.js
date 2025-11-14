/**
 * Generates SEO-friendly meta description for job/internship detail pages
 * Format: Apply now for {Job Title} at {Company Name} in {Location}. 
 *         Check role, salary, skills required, eligibility, and how to apply on engineerHUB.
 * 
 * @param {Object} job - Job object containing job details
 * @param {string} job.jobTitle - Job title (or opportunityName)
 * @param {string} job.companyName - Company name (or organisationName)
 * @param {string} job.location - Job location (or opportunityLocation)
 * @param {string} job.shortDescription - Optional short description
 * @returns {string} Formatted SEO meta description (max 160 characters)
 */
export function generateMetaDescription(job) {
  // Extract values with fallback to alternative field names
  const jobTitle = job?.jobTitle || job?.opportunityName || "";
  const companyName = job?.companyName || job?.organisationName || "";
  const location = job?.location || job?.opportunityLocation || "";
  const shortDescription = job?.shortDescription || "";

  // Helper function to clean and format strings
  const cleanString = (str) => {
    if (!str || typeof str !== "string") return "";
    return str.trim().replace(/\s+/g, " ");
  };

  // Helper function to format location for SEO
  const formatLocation = (loc) => {
    if (!loc || typeof loc !== "string") return "";
    
    const cleanLoc = cleanString(loc);
    
    // Handle common location abbreviations
    if (cleanLoc === "WFH") return "Work From Home";
    if (cleanLoc === "On-Site") return "On-Site";
    if (cleanLoc === "Hybrid") {
      // If city is available, include it
      const city = job?.city;
      if (city && city !== "undefined" && typeof city === "string") {
        return `Hybrid - ${cleanString(city)}`;
      }
      return "Hybrid";
    }
    
    return cleanLoc;
  };

  // Clean all inputs
  const cleanJobTitle = cleanString(jobTitle);
  const cleanCompanyName = cleanString(companyName);
  const cleanLocation = formatLocation(location);
  const cleanShortDescription = cleanString(shortDescription);

  // Target length: 150-160 characters for optimal SEO
  const MAX_LENGTH = 160;

  // Build the base description - prioritize concise format matching example
  let description = "";

  // Start with the main call-to-action (matching example format)
  if (cleanJobTitle && cleanCompanyName) {
    if (cleanLocation) {
      description = `Apply now for ${cleanJobTitle} at ${cleanCompanyName} in ${cleanLocation}.`;
    } else {
      description = `Apply now for ${cleanJobTitle} at ${cleanCompanyName}.`;
    }
  } else if (cleanJobTitle) {
    description = `Apply now for ${cleanJobTitle}.`;
  } else if (cleanCompanyName) {
    description = `Apply now at ${cleanCompanyName}.`;
  } else {
    // Fallback if no basic info
    description = "Apply now on engineerHUB.";
  }

  // Preferred concise second part (matches example)
  const preferredPart = " Check salary, skills, and eligibility on engineerHUB.";
  
  // Full second part (if space allows)
  const fullPart = " Check role, salary, skills required, eligibility, and how to apply on engineerHUB.";

  // Calculate remaining space
  const remainingSpace = MAX_LENGTH - description.length;
  
  // If we have a short description and it fits, use it instead
  if (cleanShortDescription && cleanShortDescription.length > 0) {
    const shortDescSnippet = cleanShortDescription.substring(0, Math.min(cleanShortDescription.length, remainingSpace - 10));
    if (shortDescSnippet && description.length + shortDescSnippet.length + 4 <= MAX_LENGTH) {
      description += ` ${shortDescSnippet}${shortDescSnippet.length < cleanShortDescription.length ? '...' : ''}`;
      // Add minimal branding if space allows
      if (description.length + 20 <= MAX_LENGTH) {
        description += " | engineerHUB";
      }
      return description.trim();
    }
  }

  // Add second part based on available space
  if (remainingSpace >= fullPart.length) {
    // Full part fits
    description += fullPart;
  } else if (remainingSpace >= preferredPart.length) {
    // Preferred concise part fits
    description += preferredPart;
  } else if (remainingSpace >= 25) {
    // Minimal part
    description += " Check details on engineerHUB.";
  } else if (remainingSpace >= 15) {
    // Just branding
    description += " | engineerHUB";
  }

  // Final trim to ensure we don't exceed max length
  if (description.length > MAX_LENGTH) {
    description = description.substring(0, MAX_LENGTH - 3).trim() + "...";
  }

  return description.trim();
}

