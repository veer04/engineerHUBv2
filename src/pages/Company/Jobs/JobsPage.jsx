import { useEffect, useState } from "react";
import "./JobsPage.css";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
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
import FilterContainerJob from "../../../components/Filter/Company/FilterContainerJob";

export default function JobsPage() {
  const { hiringId } = useParams();
  const { setSelectedPageNavbar } = useNavbar();
  const [width, setWidth] = useState(window.innerWidth);
  const [pageCount, setPageCount] = useState(1);
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

  const params = {
    search: q,
    opportunityType: "Job",
    pageNo: pageNo ? pageNo : 1,
    limit: limit ? limit : 24,
    experienceRequired: exp,
    jobType: jobType,
    jobMode: jobMode,
    salaryRange: salary,
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
    ],
    queryFn: () =>
      axios
        .get(
          `${API_URL}api/v1/getHiringByOpportunityType/`,
          {
            params,
          },
          config
        )
        .then((res) => {
          return res;
        }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (jobsQuery.isSuccess) {
      setPageCount(
        Math.ceil(
          (!!jobsQuery.data?.data?.pageSize
            ? jobsQuery.data?.data?.pageSize
            : 1) / (!!limit ? limit : jobsQuery.data?.data?.data?.length)
        )
      );
      setTimeout(() => {
        if (
          !!document.getElementById("jobs-container") &&
          !!document.getElementById("individual-job-container")
        )
          document.getElementById("jobs-container").style.height = `${
            document.getElementById("individual-job-container").offsetHeight -
            98.4
          }px`;
      }, 100);
    }
  }, [jobsQuery]);

  useEffect(() => {
    if (!Boolean(hiringId)) {
      !!document.getElementById("jobs-container")
        ? (document.getElementById("jobs-container").style.height = "initial")
        : null;
    }
  }, [hiringId]);

  useEffect(() => {
    document.title = "Jobs | Company | engineerHUB";
    window.scrollTo(0, 0);
    setSelectedPageNavbar("company");
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNo]);

  return (
    <main className="jobs-page">
      {!Boolean(hiringId) && (
        <>
          <h1 className="display-md">Job Hiring</h1>
          <h2 className="body-md-regular">
            Apply for the jobs of your interest and get the offer letter in the
            next step
          </h2>
        </>
      )}
      {!(!!hiringId && width < 1150) && (
        <>
          <div className="d-flex justify-content-center mt-2 mb-4">
            <SearchBarWithSearchParams
              param="q"
              placeholder="Search for jobs, company, etc"
            />
          </div>
          <FilterContainerJob
            style={{
              marginBottom: ".5rem",
              maxWidth: !!hiringId ? "1230px" : "",
            }}
          />
        </>
      )}
      <div className={`${!!hiringId ? "job-page-divider" : ""}`}>
        {!(!!hiringId && width < 1150) && (
          <section className={`${!!hiringId ? "all-jobs-section" : ""}`}>
            {jobsQuery.isSuccess && !!pageNo && !!pageCount && (
              <span style={{ color: "#295397" }} className="label-sm">
                Page {pageNo} of {pageCount}
              </span>
            )}
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
                {!!jobsQuery.data.data?.data?.length && (
                  <div
                    id="jobs-container"
                    className={`jobs-container ${
                      !!hiringId ? "--overflow" : ""
                    }`}
                  >
                    {jobsQuery.data.data?.data.map((item, index) => {
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
                {!jobsQuery.data.data?.data?.length && (
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
                    <h2 className="heading-sm">No Jobs Found</h2>
                  </div>
                )}
              </>
            )}
            {jobsQuery.isSuccess &&
              jobsQuery?.data?.data?.data?.length !== 0 && (
                <PaginationBarWithSearchParams
                  param="pageNo"
                  pages={pageCount}
                />
              )}
          </section>
        )}
        <Outlet />
      </div>
    </main>
  );
}
