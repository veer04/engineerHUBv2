import { useEffect, useState, useMemo } from "react";
import "./InternshipPageNew.css";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../../services/APIUtils";
import { getAccessToken } from "../../../features/User/UserDetails";
import Loading from "../../../components/Loader/Loading";
import SearchBarWithSearchParams from "../../../components/SearchBarWithSearchParams/SearchBarWithSearchParams";
import useNavbar from "../../../hooks/use-navbar";
import PaginationBarWithSearchParams from "../../../components/PaginationBarWithSearchParams/PaginationBarWithSearchParams";
import InternshipCardNew from "./InternshipCardNew";
import FilterContainerInternship from "../../../components/Filter/Company/FilterContainerInternship";
import AdsenseComp from "../../../components/AdsenseComp/AdsenseComp";
import { generateListingMetaTitle } from "../../../utils/generateListingMetaTitle";
import { generateListingMetaDescription } from "../../../utils/generateListingMetaDescription";
import { SEO } from "../../../components/SEO/SEO.jsx";

export default function InternshipPageNew() {
  const { hiringId } = useParams();
  const { setSelectedPageNavbar } = useNavbar();
  const [width, setWidth] = useState(window.innerWidth);
  const [pageCount, setPageCount] = useState(1);
  const [internships, setInternships] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({
    q: "",
    pageNo: "",
    limit: "",
    jobType: "",
    jobMode: "",
    salary: "",
    location: "",
    recentlyPosted: "",
    isFeatured: "",
    isEasyApply: "",
  });

  // Get search params
  const q = searchParams.get("q");
  const pageNo = searchParams.get("pageNo");
  const limit = searchParams.get("limit");
  const jobType = searchParams.get("jobType");
  const jobMode = searchParams.get("jobMode");
  const salary = searchParams.get("salary");
  const location = searchParams.get("location");
  const recentlyPosted = searchParams.get("recentlyPosted");
  const isFeatured = searchParams.get("isFeatured");
  const isEasyApply = searchParams.get("isEasyApply");

  // API params
  const params = {
    search: q,
    opportunityType: "Internship",
    pageNo: pageNo || 1,
    limit: limit || 24,
    jobType: jobType,
    jobMode: jobMode,
    salaryRange: salary,
    location: location,
    recentlyPosted: recentlyPosted,
    isFeatured: isFeatured,
    isEasyApply: isEasyApply,
  };

  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };

  // Fetch internships using React Query
  const internshipsQuery = useQuery({
    queryKey: [
      "Internships",
      params.search,
      params.pageNo,
      params.limit,
      params.jobType,
      params.jobMode,
      params.salaryRange,
      params.location,
      params.recentlyPosted,
      params.isFeatured,
      params.isEasyApply,
    ],
    queryFn: () =>
      axios.get(
        `${API_URL}api/v1/getHiringByOpportunityType/`,
        { params },
        config
      ).then((res) => {
        console.log('Internships API Response:', res.data);
        return res;
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Update page count when data changes
  useEffect(() => {
    if (internshipsQuery.isSuccess) {
      const internships = internshipsQuery.data?.data?.data || [];
      console.log('Internships data:', internships);
      setInternships(internships);
      setPageCount(
        Math.ceil(
          (internshipsQuery.data?.data?.pageSize || 1) /
            (limit || internshipsQuery.data?.data?.data?.length)
        )
      );
    }
  }, [internshipsQuery.data, limit]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNo]);

  // Generate dynamic meta tags based on search params and filters
  const metaTitle = useMemo(() => {
    return generateListingMetaTitle({
      type: "Internship",
      searchQuery: q || "",
      location: location || "",
      jobType: jobType || "",
      jobMode: jobMode || "",
      experience: "",
      isFeatured: isFeatured === "1" || isFeatured === "true",
      isForFreshers: false,
      isRemote: false,
      isMaang: false,
      pageNo: pageNo ? parseInt(pageNo) : 1,
    });
  }, [q, location, jobType, jobMode, isFeatured, pageNo]);

  const metaDescription = useMemo(() => {
    const totalResults = internshipsQuery.isSuccess && internshipsQuery.data?.data?.pageSize 
      ? internshipsQuery.data.data.pageSize 
      : null;
    
    return generateListingMetaDescription({
      type: "Internship",
      searchQuery: q || "",
      location: location || "",
      jobType: jobType || "",
      jobMode: jobMode || "",
      experience: "",
      isFeatured: isFeatured === "1" || isFeatured === "true",
      isForFreshers: false,
      isRemote: false,
      isMaang: false,
      totalResults,
    });
  }, [q, location, jobType, jobMode, isFeatured, internshipsQuery.data]);

  // Set navbar
  useEffect(() => {
    setSelectedPageNavbar("company");
  }, [setSelectedPageNavbar]);

  // Get current URL for canonical and Open Graph
  const currentUrl = typeof window !== "undefined" 
    ? `${window.location.origin}${window.location.pathname}` 
    : "";

  return (
    <SEO
      title={!hiringId ? metaTitle : undefined}
      description={!hiringId ? metaDescription : undefined}
      keywords={!hiringId ? `internships, ${q ? q + ", " : ""}${location ? location + ", " : ""}${jobType ? jobType + ", " : ""}internship opportunities, career, engineerHUB, tech internships, software internships, engineering internships` : undefined}
      canonical={!hiringId ? currentUrl : undefined}
      openGraph={
        !hiringId && metaTitle && metaDescription
          ? {
              type: "website",
              site_name: "engineerHUB",
              url: currentUrl,
              title: metaTitle,
              description: metaDescription,
            }
          : undefined
      }
      twitter={
        !hiringId && metaTitle && metaDescription
          ? {
              card: "summary_large_image",
              title: metaTitle,
              description: metaDescription,
              url: currentUrl,
            }
          : undefined
      }
    >
      <main className="internship-page">

      {/* {!hiringId && (
        <>
          <h1 className="page-title">Internship Opportunities</h1>
          <p className="page-subtitle">
            Find the perfect internship to kickstart your career
          </p>
        </>
      )} */}
      

      {!(hiringId && width < 1150) && (
        <>
          <div className="search-container">
            <SearchBarWithSearchParams
              param="q"
              placeholder="Search for internships,companies etc"
            />
          </div>
                 {/* AD-4 */}
               
            <AdsenseComp adSlot="5168117459" />
       

          <FilterContainerInternship
            className="filter-section"
            style={{
              marginBottom: ".5rem",
              maxWidth: hiringId ? "1230px" : "",
            }}
          />
        </>
      )}

      <div className={`content-section ${hiringId ? "with-details" : ""}`}>
        {!(hiringId && width < 1150) && (
          <section className={`internships-section ${hiringId ? "with-details" : ""}`}>
            {/* Page count indicator */}
            {internshipsQuery.isSuccess && internships.length > 0 && pageNo && pageCount && (
              <span className="page-indicator">
                Page {pageNo} of {pageCount}
              </span>
            )}

            {/* Loading state */}
            {internshipsQuery.isPending && (
              <div className="loading-container">
                <Loading />
              </div>
            )}

            {/* Internships grid */}
            {internshipsQuery.isSuccess && (
              <>
                {internships.length > 0 ? (
                  <div className="internships-grid">
                    {internships.map((internship, index) => (
                      <InternshipCardNew
                        key={internship._id || index}
                        details={internship}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="no-results">
                    <h2>No Internship Found</h2>
                    <p>Try adjusting your search or filters</p>
                  </div>
                )}

                {/* Pagination */}
                {internships.length > 0 && (
                  <PaginationBarWithSearchParams
                    param="pageNo"
                    pages={pageCount}
                  />
                )}
              </>
            )}
          </section>
        )}
        
        {/* Outlet for individual internship details */}
        <Outlet />
      </div>
      <div className="d-flex justify-content-center mb-3">
            <AdsenseComp adSlot="1464856375" />
          </div>
    </main>
    </SEO>
  );
} 