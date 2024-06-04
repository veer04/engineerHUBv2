import { useEffect, useState } from "react";
import "./JobsPage.css";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../../services/APIUtils";
import { getAccessToken } from "../../../features/User/UserDetails";
import JobCards from "./JobCards";
import colorWheel from "../../../assets/colorWheel";
import Loading from "../../../components/Loader/Loading";
import SearchBarWithSearchParams from "../../../components/SearchBarWithSearchParams/SearchBarWithSearchParams";
import useNavbar from "../../../hooks/use-navbar";
import PaginationBarWithSearchParams from "../../../components/PaginationBarWithSearchParams/PaginationBarWithSearchParams";
import FiltersContainer from "../../../components/Filter/Company/Jobs/FiltersContainer";

export default function JobsPage() {
  const { setSelectedPageNavbar } = useNavbar();
  const [pageCount, setPageCount] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams({
    search: "",
    pageNo: "",
    limit: "",
    experienceRequired: "",
    jobType: "",
    jobMode: "",
    salaryRange: "",
    location: "",
    recentlyPosted: "",
    isFeatured: "",
  });
  const search = searchParams.get("search");
  const pageNo = searchParams.get("pageNo");
  const limit = searchParams.get("limit");
  const experienceRequired = searchParams.get("experienceRequired");
  const jobType = searchParams.get("jobType");
  const jobMode = searchParams.get("jobMode");
  const salaryRange = searchParams.get("salaryRange");
  const location = searchParams.get("location");
  const recentlyPosted = searchParams.get("recentlyPosted");
  const isFeatured = searchParams.get("isFeatured");

  const params = {
    search,
    opportunityType: "Job",
    pageNo: pageNo,
    limit: limit,
    experienceRequired: experienceRequired,
    jobType: jobType,
    jobMode: jobMode,
    salaryRange: salaryRange,
    location: location,
    recentlyPosted: recentlyPosted,
    isFeatured: isFeatured,
  };

  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };

  const jobsQuery = useQuery({
    queryKey: [
      "Job",
      !!params.search ? params.search : "",
      !!params.pageNo ? params.pageNo : 1,
      !!params.limit ? params.limit : 21,
      !!params.experienceRequired ? params.experienceRequired : [],
      !!params.jobType ? params.jobType : [],
      !!params.jobMode ? params.jobMode : [],
      !!params.salaryRange ? params.salaryRange : [],
      !!params.location ? params.location : [],
      !!params.recentlyPosted ? params.recentlyPosted : [],
      !!params.isFeatured ? params.isFeatured : [],
    ],
    queryFn: async () => {
      return await axios
        .get(
          `${API_URL}api/v1/getHiringByOpportunityType/`,
          {
            params,
          },
          config
        )
        .then((res) => {
          return res;
        });
    },
    staleTime: 1000 * 60 * 1, // 1 minutes
  });

  useEffect(() => {
    if (jobsQuery.isSuccess) {
      setPageCount(
        Math.ceil(
          (!!jobsQuery?.data?.data?.pageSize
            ? jobsQuery?.data?.data?.pageSize
            : 1) / limit
        )
      );
    }
  }, [jobsQuery]);

  useEffect(() => {
    document.title = "Jobs | Company | engineerHUB";
    window.scrollTo(0, 0);
    setSelectedPageNavbar("company");
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNo]);

  return (
    <main className="jobs-page">
      <h1 className="display-md">Job Hiring</h1>
      <h2 className="body-md-regular">
        Apply for the jobs of your interest and get the offer letter in the next
        step
      </h2>
      <div className="d-flex justify-content-center mt-2 mb-4">
        <SearchBarWithSearchParams
          param="search"
          placeholder="Search for jobs, company, etc"
        />
      </div>
      {jobsQuery.isPending && (
        <>
          <div
            style={{
              marginTop: "25dvh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading />
          </div>
        </>
      )}
      {jobsQuery.error && (
        <>
          <div
            style={{
              marginTop: "20dvh",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
              flexDirection: "column",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#3C3C43",
              opacity: "0.6",
            }}
          >
            <span className="mb-1">
              Something went wrong. Please try again later.
            </span>
            <span
              className="mb-1"
              style={{
                fontSize: "1rem",
                color: "black",
              }}
            >
              {jobsQuery.error.message}
            </span>
            <span
              className="mb-1"
              style={{
                fontSize: "1rem",
                color: "black",
              }}
            >
              {jobsQuery.error.name}
            </span>
          </div>
        </>
      )}
      {jobsQuery.isSuccess && (
        <>
          {!!jobsQuery.data.data.data.length && (
            <div className="jobs-container">
              {jobsQuery.data.data.data.map((item, index) => {
                return (
                  <JobCards
                    details={item}
                    color={colorWheel[index % colorWheel.length]}
                    key={index}
                  />
                );
              })}
            </div>
          )}
          {!jobsQuery.data.data.data.length && (
            <div
              style={{
                marginTop: "20dvh",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
                flexDirection: "column",
                color: "#3C3C43",
                opacity: "0.6",
              }}
              className="jobs-container-empty"
            >
              <h2 className="heading-sm">
                No jobs found for the search criteria
              </h2>
            </div>
          )}
        </>
      )}
      {jobsQuery.isSuccess && jobsQuery?.data?.data?.data?.length !== 0 && (
        <PaginationBarWithSearchParams param="pageNo" pages={pageCount} />
      )}
    </main>
  );
}
