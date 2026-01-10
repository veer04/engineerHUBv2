import React, { useEffect, useState, useMemo } from "react";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./JobsPageNew.css";
import { API_URL, Bucket_URL } from "../../../services/APIUtils";
import { getAccessToken } from "../../../features/User/UserDetails";
import JobCardsNew from "./JobCardsNew";
import Loading from "../../../components/Loader/Loading";
import SearchBarWithSearchParams from "../../../components/SearchBarWithSearchParams/SearchBarWithSearchParams";
import useNavbar from "../../../hooks/use-navbar";
import PaginationBarWithSearchParams from "../../../components/PaginationBarWithSearchParams/PaginationBarWithSearchParams";
import FilterContainerJob from "../../../components/Filter/Company/FilterContainerJob";
import BannerSpaceComp from "../BannerSpaceComp/BannerSpaceComp";
import AdsenseComp from "../../../components/AdsenseComp/AdsenseComp";
import { generateListingMetaTitle } from "../../../utils/generateListingMetaTitle";
import { generateListingMetaDescription } from "../../../utils/generateListingMetaDescription";
import { SEO } from "../../../components/SEO/SEO.jsx";

const JobsPageNew = () => {
  const { hiringId } = useParams();
  const { setSelectedPageNavbar } = useNavbar();
  const [width, setWidth] = useState(window.innerWidth);
  const [pageCount, setPageCount] = useState(1);
  const [jobs, setJobs] = useState([]);
  
  const [searchParams, setSearchParams] = useSearchParams({
    q: "",
    pageNo: "",
    limit: "",
    exp: "",
    jobType: "",
    jobMode: "",
    salary: "",
    location: "",
    recentlyPosted: "",
    isFeatured: "",
    isEasyApply: "",
    isRemote: "",
    isMaang: "",
    isForFreshers: "",
  });

  const q = searchParams.get("q");
  const pageNo = searchParams.get("pageNo");
  const limit = searchParams.get("limit");
  const exp = searchParams.get("exp");
  const jobType = searchParams.get("jobType");
  const jobMode = searchParams.get("jobMode");
  const salary = searchParams.get("salary");
  const location = searchParams.get("location");
  const recentlyPosted = searchParams.get("recentlyPosted");
  const isFeatured = searchParams.get("isFeatured");
  const isEasyApply = searchParams.get("isEasyApply");
  const isRemote = searchParams.get("isRemote");
  const isMaang = searchParams.get("isMaang");
  const isForFreshers = searchParams.get("isForFreshers");

  const params = {
    search: q || "",
    opportunityType: "Job",
    pageNo: pageNo ? pageNo : 1,
    limit: limit ? limit : 24,
    experienceRequired: exp || undefined,
    jobType: jobType || undefined,
    jobMode: jobMode || undefined,
    salaryRange: salary || undefined,
    location: location || undefined,
    recentlyPosted: recentlyPosted || undefined,
    isFeatured: isFeatured || undefined,
    isEasyApply: isEasyApply === "1" ? 1 : undefined,
    isRemote: isRemote === "1" ? 1 : undefined,
    isMaang: isMaang === "1" ? 1 : undefined,
    isForFreshers: isForFreshers === "1" ? 1 : undefined,
  };

  const jobsQuery = useQuery({
    queryKey: [
      "Jobs",
      !!params.search ? params.search : "",
      !!params.pageNo ? params.pageNo : 1,
      !!params.limit ? params.limit : 24,
      !!params.experienceRequired ? params.experienceRequired : [],
      !!params.jobType ? params.jobType : [],
      !!params.jobMode ? params.jobMode : [],
      !!params.salaryRange ? params.salaryRange : [],
      !!params.location ? params.location : [],
      !!params.recentlyPosted ? params.recentlyPosted : [],
      !!params.isFeatured ? params.isFeatured : [],
      !!params.isForFreshers ? params.isForFreshers : [],
      !!params.isRemote ? params.isRemote : [],
      !!params.isMaang ? params.isMaang : [],
      !!params.isEasyApply ? params.isEasyApply : [],
    ],
    queryFn: () =>
      axios.get(
        `${API_URL}api/v1/getHiringByOpportunityType/`,
        {
          params,
          headers: {
            accessToken: getAccessToken(),
          }
        }
      ).then((res) => {
        console.log('API Request Params:', params);
        console.log('Jobs API Response:', res.data);
        return res;
      })
      .catch((error) => {
        console.error('API Error:', error);
        console.error('Error Response:', error.response?.data);
        throw error;
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (jobsQuery.isSuccess) {
      const jobsData = jobsQuery.data?.data?.data || [];
      console.log('Jobs API Response:', jobsQuery.data);
      console.log('Jobs data array:', jobsData);
      console.log('Sample job fields:', jobsData[0] ? Object.keys(jobsData[0]) : 'No jobs found');
      console.log('First job details:', jobsData[0]);
      
      // Backend will handle sorting by latest posted jobs
      setJobs(jobsData);
      
      // Update page count calculation to handle both filtered and unfiltered data
      const totalItems = jobsQuery.data?.data?.pageSize || 0;
      const itemsPerPage = limit || 24;
      setPageCount(Math.max(1, Math.ceil(totalItems / itemsPerPage)));
    }
  }, [jobsQuery.data, limit]);

  useEffect(() => {
    if (jobsQuery.error) {
      console.error('Jobs API Error:', jobsQuery.error);
      console.error('Error response:', jobsQuery.error.response?.data);
    }
  }, [jobsQuery.error]);

  useEffect(() => {
    if (!Boolean(hiringId)) {
      const jobsContainer = document.getElementById("jobs-container");
      if (jobsContainer) {
        jobsContainer.style.height = "initial";
      }
    }
  }, [hiringId]);

  // Generate dynamic meta tags based on search params and filters
  const metaTitle = useMemo(() => {
    return generateListingMetaTitle({
      type: "Job",
      searchQuery: q || "",
      location: location || "",
      jobType: jobType || "",
      jobMode: jobMode || "",
      experience: exp || "",
      isFeatured: isFeatured === "1" || isFeatured === "true",
      isForFreshers: isForFreshers === "1" || isForFreshers === "true",
      isRemote: isRemote === "1" || isRemote === "true",
      isMaang: isMaang === "1" || isMaang === "true",
      pageNo: pageNo ? parseInt(pageNo) : 1,
    });
  }, [q, location, jobType, jobMode, exp, isFeatured, isForFreshers, isRemote, isMaang, pageNo]);

  const metaDescription = useMemo(() => {
    const totalResults = jobsQuery.isSuccess && jobsQuery.data?.data?.pageSize 
      ? jobsQuery.data.data.pageSize 
      : null;
    
    return generateListingMetaDescription({
      type: "Job",
      searchQuery: q || "",
      location: location || "",
      jobType: jobType || "",
      jobMode: jobMode || "",
      experience: exp || "",
      isFeatured: isFeatured === "1" || isFeatured === "true",
      isForFreshers: isForFreshers === "1" || isForFreshers === "true",
      isRemote: isRemote === "1" || isRemote === "true",
      isMaang: isMaang === "1" || isMaang === "true",
      totalResults,
    });
  }, [q, location, jobType, jobMode, exp, isFeatured, isForFreshers, isRemote, isMaang, jobsQuery.data]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("company");
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNo]);

  // Get current URL for canonical and Open Graph
  const currentUrl = typeof window !== "undefined" 
    ? `${window.location.origin}${window.location.pathname}` 
    : "";

  return (
    <SEO
      title={!hiringId ? metaTitle : undefined}
      description={!hiringId ? metaDescription : undefined}
      keywords={!hiringId ? `jobs, ${q ? q + ", " : ""}${location ? location + ", " : ""}${jobType ? jobType + ", " : ""}careers, employment, engineerHUB, tech jobs, software jobs, engineering jobs` : undefined}
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
      <main className="jobs-new-container">

      {!hiringId && (
        <>
          <h1 className="page-title">Job Hiring</h1>
        </>
      )}

      {!(hiringId && width < 1150) && (
        <>
          <div className="search-container">
            <SearchBarWithSearchParams
              param="q"
              placeholder="Search for jobs, companies etc"
            />
          </div>
         
            <AdsenseComp adSlot="8908232121" />
         
          
          <FilterContainerJob
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
          <section className="jobs-section">
            {/* Page count indicator */}
            {jobsQuery.isSuccess && jobs.length > 0 && pageNo && pageCount && (
              <span className="page-indicator">
                Page {pageNo} of {pageCount}
              </span>
            )}

            {/* Loading state */}
            {jobsQuery.isPending && (
              <div className="loading-container">
                <Loading />
              </div>
            )}

            {/* Error state */}
            {jobsQuery.error && (
              <div className="error-message">
                <h2>Error loading jobs</h2>
                <p>Please try again later</p>
              </div>
            )}

            {/* Jobs grid */}
            {jobsQuery.isSuccess && (
              <>
                {jobs.length > 0 ? (
                  <div className="jobs-grid">
                    {jobs.map((job, index) => (
                      <JobCardsNew
                        key={job._id || index}
                        details={job}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="no-results">
                    <h2>No Jobs Found</h2>
                    <p>Try adjusting your search or filters</p>
                  </div>
                )}

                {/* Pagination */}
                {jobs.length > 0 && (
                  <PaginationBarWithSearchParams
                    param="pageNo"
                    pages={pageCount}
                  />
                )}
              </>
            )}
          </section>
        )}
        <Outlet />
      </div>
      
      <div className="d-flex justify-content-center mb-3">
            <AdsenseComp adSlot="1464856375" />
          </div>
       
      <div className="banner-space-div">
        <BannerSpaceComp
          image={`${Bucket_URL}banner-cosdata.png`}
          mobileImage={`${Bucket_URL}banner-cosdata-mobile.png`}
        />
      </div>
    </main>
    </SEO>
  );
};

export default JobsPageNew;
