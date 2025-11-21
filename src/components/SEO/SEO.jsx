import React, { createContext, useContext, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const ROOT_URL = "https://www.engineerhub.in";

export const FALLBACK_META = {
  title: "engineerHUB | engineer",
  description: "engineerHUB - Jobs, Internships & Career Platform.",
  keywords:
    "engineerhub jobs, tech internships, referral programs, career mentorship, campus placements",
  canonical: ROOT_URL,
  openGraph: {
    type: "website",
    site_name: "engineerHUB",
    url: ROOT_URL,
  },
  twitter: {
    card: "summary_large_image",
    site: "@engineerhubin",
  },
};

const SEOContext = createContext(FALLBACK_META);

export const SEOProvider = ({ children }) => (
  <SEOContext.Provider value={FALLBACK_META}>{children}</SEOContext.Provider>
);

const normalizeKeywords = (keywords) => {
  if (!keywords) return "";
  if (Array.isArray(keywords)) {
    return keywords
      .map((item) => item?.trim())
      .filter(Boolean)
      .join(", ");
  }
  return keywords;
};

const buildCanonical = (explicitCanonical, location) => {
  if (explicitCanonical) return explicitCanonical;
  if (!location) return undefined;
  return `${ROOT_URL}${location.pathname}${location.search}`;
};

export const SEO = ({
  title,
  description,
  keywords,
  canonical,
  noIndex = false,
  meta = [],
  openGraph,
  twitter,
  structuredData,
  children,
}) => {
  const parentMeta = useContext(SEOContext);
  const location = useLocation();

  const mergedMeta = useMemo(() => {
    const nextMeta = {
      ...parentMeta,
      openGraph: { ...parentMeta.openGraph },
      twitter: { ...parentMeta.twitter },
    };

    if (title) nextMeta.title = title;
    if (description) nextMeta.description = description;
    if (keywords) nextMeta.keywords = normalizeKeywords(keywords);

    nextMeta.canonical = buildCanonical(canonical, location);

    if (openGraph) {
      nextMeta.openGraph = { ...nextMeta.openGraph, ...openGraph };
    } else if (!nextMeta.openGraph.url) {
      nextMeta.openGraph.url = nextMeta.canonical;
    }

    if (twitter) {
      nextMeta.twitter = { ...nextMeta.twitter, ...twitter };
    }

    return nextMeta;
  }, [
    canonical,
    description,
    keywords,
    location,
    openGraph,
    parentMeta,
    title,
    twitter,
  ]);

  const resolvedKeywords = normalizeKeywords(mergedMeta.keywords);

  return (
    <SEOContext.Provider value={mergedMeta}>
      <Helmet>
        <title>{mergedMeta.title}</title>
        {mergedMeta.description && (
          <meta name="description" content={mergedMeta.description} />
        )}
        {resolvedKeywords && (
          <meta name="keywords" content={resolvedKeywords} />
        )}
        {mergedMeta.canonical && (
          <link rel="canonical" href={mergedMeta.canonical} />
        )}
        {noIndex && <meta name="robots" content="noindex, nofollow" />}

        {/* Open Graph */}
        {Object.entries(mergedMeta.openGraph || {}).map(([key, value]) =>
          value ? (
            <meta
              key={`og:${key}`}
              property={`og:${key}`}
              content={value}
            />
          ) : null
        )}

        {/* Twitter */}
        {Object.entries(mergedMeta.twitter || {}).map(([key, value]) =>
          value ? (
            <meta
              key={`twitter:${key}`}
              property={`twitter:${key}`}
              content={value}
            />
          ) : null
        )}

        {/* Additional meta tags */}
        {meta
          .filter(
            (item) =>
              item &&
              (item.name || item.property) &&
              typeof item.content === "string" &&
              item.content.length > 0
          )
          .map((item) => (
            <meta key={`${item.name || item.property}`} {...item} />
          ))}

        {/* Structured data */}
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}
      </Helmet>
      {children}
    </SEOContext.Provider>
  );
};

export default SEO;

