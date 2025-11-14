/**
 * Generates SEO-friendly meta title for job/internship detail pages
 * Format: {Job Title} – {Company Name} Hiring in {Location} | engineerHUB
 * 
 * @param {Object} job - Job object containing job details
 * @param {string} job.jobTitle - Job title (or opportunityName)
 * @param {string} job.companyName - Company name (or organisationName)
 * @param {string} job.location - Job location (or opportunityLocation)
 * @returns {string} Formatted SEO meta title
 */
export function generateMetaTitle(job) {
  // Extract values with fallback to alternative field names
  const jobTitle = job?.jobTitle || job?.opportunityName || "";
  const companyName = job?.companyName || job?.organisationName || "";
  const location = job?.location || job?.opportunityLocation || "";

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

  // Build the title according to the exact format:
  // {Job Title} – {Company Name} Hiring in {Location} | engineerHUB

  // Require at least job title and company name
  if (!cleanJobTitle || !cleanCompanyName) {
    // Fallback: if we only have job title
    if (cleanJobTitle) {
      return `${cleanJobTitle} | engineerHUB`;
    }
    // Final fallback
    return "engineerHUB";
  }

  // Build the main title part
  let mainTitle = `${cleanJobTitle} – ${cleanCompanyName}`;

  // Add location if available
  if (cleanLocation) {
    mainTitle += ` Hiring in ${cleanLocation}`;
  }

  return `${mainTitle} | engineerHUB`;
}

