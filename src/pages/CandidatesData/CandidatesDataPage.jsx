import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import "./CandidatesDataPage.css";
import { API_URL } from "../../services/APIUtils.jsx";
import CandidatesSearchFilters from "../../components/CandidatesData/CandidatesSearchFilters.jsx";
import CandidatesResultsSection from "../../components/CandidatesData/CandidatesResultsSection.jsx";
import ShortlistedCandidatesPanel from "../../components/CandidatesData/ShortlistedCandidatesPanel.jsx";

const DEFAULT_LIMIT = 10;
const RECENT_LIMIT = 4;
const DEBOUNCE_DELAY = 400;

const getNormalizedSkills = (candidate) => {
  const rawSkills =
    candidate?.skills ||
    candidate?.skill ||
    candidate?.skillSet ||
    candidate?.skillsDetails ||
    candidate?.skillDetails ||
    [];

  if (Array.isArray(rawSkills)) {
    return rawSkills
      .map((item) => {
        if (!item) return null;
        if (typeof item === "string") return item;
        return item.skills || item.name || item.title || item.skill;
      })
      .filter(Boolean);
  }

  if (typeof rawSkills === "string") {
    return rawSkills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }

  return [];
};

const getCandidateDisplayName = (candidate) => {
  if (!candidate) return "Unnamed Candidate";
  const fullName = candidate.fullName || candidate.name;
  if (fullName) return fullName;
  const combinedName = [candidate.firstName, candidate.lastName]
    .filter(Boolean)
    .join(" ");
  return combinedName || candidate.userName || "Unnamed Candidate";
};

const getCandidateCollege = (candidate) =>
  candidate?.college ||
  candidate?.collegeName ||
  candidate?.collegeId?.collegeName ||
  candidate?.collegeId?.name ||
  candidate?.collegeId?.name ||
  candidate?.collegeId?.collegeName ||
  candidate?.institute ||
  candidate?.institution ||
  "Not specified";

const getCandidateExperience = (candidate) =>
  candidate?.experience ||
  candidate?.experienceYears ||
  candidate?.totalExperience ||
  candidate?.yearsOfExperience ||
  "Not specified";

const useDebouncedValue = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default function CandidatesDataPage() {
  const [filters, setFilters] = useState({
    skills: "",
    college: "",
    name: "",
    experience: "",
  });
  const [searchPage, setSearchPage] = useState(1);
  const [recentPage, setRecentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [recentCandidates, setRecentCandidates] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [recentTotalCount, setRecentTotalCount] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingRecent, setIsLoadingRecent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
  const [isLoadingShortlist, setIsLoadingShortlist] = useState(false);
  const [shortlistError, setShortlistError] = useState("");
  const latestSearchRef = useRef(0);
  const latestRecentRef = useRef(0);

  const debouncedFilters = useDebouncedValue(filters, DEBOUNCE_DELAY);

  const hasActiveFilters = useMemo(
    () =>
      Object.values(filters).some(
        (value) => value !== null && value.toString().trim().length > 0
      ),
    [filters]
  );

  const normalizedSearchResults = useMemo(
    () =>
      searchResults.map((candidate) => ({
        ...candidate,
        displayName: getCandidateDisplayName(candidate),
        displaySkills: getNormalizedSkills(candidate),
        displayCollege: getCandidateCollege(candidate),
        displayExperience: getCandidateExperience(candidate),
      })),
    [searchResults]
  );

  const normalizedRecentCandidates = useMemo(
    () =>
      recentCandidates.map((candidate) => ({
        ...candidate,
        displayName: getCandidateDisplayName(candidate),
        displaySkills: getNormalizedSkills(candidate),
        displayCollege: getCandidateCollege(candidate),
        displayExperience: getCandidateExperience(candidate),
      })),
    [recentCandidates]
  );

  const normalizedShortlistedCandidates = useMemo(
    () =>
      shortlistedCandidates.map((candidate) => ({
        ...candidate,
        displayName: getCandidateDisplayName(candidate),
        displaySkills: getNormalizedSkills(candidate),
        displayCollege: getCandidateCollege(candidate),
        displayExperience: getCandidateExperience(candidate),
      })),
    [shortlistedCandidates]
  );

  const shortlistedIds = useMemo(
    () => new Set(shortlistedCandidates.map((candidate) => candidate._id)),
    [shortlistedCandidates]
  );

  const buildQueryParams = (activeFilters, page, limit) => {
    const params = { page, limit };
    const skillsList = activeFilters.skills
      ? activeFilters.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : [];

    if (skillsList.length > 0) params.skills = skillsList.join(",");
    if (activeFilters.college) params.college = activeFilters.college.trim();
    if (activeFilters.name) params.name = activeFilters.name.trim();
    if (activeFilters.experience) params.experience = activeFilters.experience;

    return params;
  };

  const fetchCandidates = async ({
    activeFilters,
    page,
    limit,
    isRecent = false,
  }) => {
    const requestId = Date.now();
    if (isRecent) {
      latestRecentRef.current = requestId;
    } else {
      latestSearchRef.current = requestId;
    }

    if (isRecent) {
      setIsLoadingRecent(true);
    } else {
      setIsSearching(true);
    }
    setErrorMessage("");

    try {
      const params = buildQueryParams(activeFilters, page, limit);
      const response = await axios.get(`${API_URL}api/candidates/search`, {
        params,
      });
      if (
        (isRecent && latestRecentRef.current !== requestId) ||
        (!isRecent && latestSearchRef.current !== requestId)
      )
        return;

      const data = response?.data?.data || [];
      const total = response?.data?.totalCount || 0;

      if (isRecent) {
        setRecentCandidates(data);
        setRecentTotalCount(total);
      } else {
        setSearchResults(data);
        setTotalCount(total);
      }
    } catch (error) {
      if (
        (isRecent && latestRecentRef.current !== requestId) ||
        (!isRecent && latestSearchRef.current !== requestId)
      )
        return;
      setErrorMessage("Unable to fetch candidates right now.");
      if (isRecent) {
        setRecentCandidates([]);
        setRecentTotalCount(0);
      } else {
        setSearchResults([]);
        setTotalCount(0);
      }
    } finally {
      if (
        (isRecent && latestRecentRef.current !== requestId) ||
        (!isRecent && latestSearchRef.current !== requestId)
      )
        return;
      if (isRecent) {
        setIsLoadingRecent(false);
      } else {
        setIsSearching(false);
      }
    }
  };

  useEffect(() => {
    fetchCandidates({
      activeFilters: {},
      page: recentPage,
      limit: RECENT_LIMIT,
      isRecent: true,
    });
  }, [recentPage]);

  const fetchShortlistedCandidates = async () => {
    setIsLoadingShortlist(true);
    setShortlistError("");
    try {
      const response = await axios.get(`${API_URL}api/candidates/shortlist`);
      const data = response?.data?.data || [];
      const mapped = data
        .map((item) => item.candidate)
        .filter(Boolean);
      setShortlistedCandidates(mapped);
    } catch (error) {
      setShortlistError("Unable to load shortlisted candidates.");
      setShortlistedCandidates([]);
    } finally {
      setIsLoadingShortlist(false);
    }
  };

  useEffect(() => {
    fetchShortlistedCandidates();
  }, []);

  useEffect(() => {
    if (!hasActiveFilters) {
      if (hasSearched) {
        setHasSearched(false);
        setSearchResults([]);
        setTotalCount(0);
        setSearchPage(1);
      }
      return;
    }

    fetchCandidates({
      activeFilters: debouncedFilters,
      page: 1,
      limit: DEFAULT_LIMIT,
    });
    setSearchPage(1);
    setHasSearched(true);
  }, [debouncedFilters, hasActiveFilters, hasSearched]);

  useEffect(() => {
    if (!hasActiveFilters && !hasSearched) return;
    fetchCandidates({
      activeFilters: filters,
      page: searchPage,
      limit: DEFAULT_LIMIT,
    });
  }, [searchPage]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    if (!hasActiveFilters) return;
    fetchCandidates({
      activeFilters: filters,
      page: 1,
      limit: DEFAULT_LIMIT,
    });
    setSearchPage(1);
    setHasSearched(true);
  };

  const handleReset = () => {
    setFilters({
      skills: "",
      college: "",
      name: "",
      experience: "",
    });
    setHasSearched(false);
    setSearchResults([]);
    setTotalCount(0);
    setSearchPage(1);
  };

  const handleToggleShortlist = async (candidateId) => {
    if (!candidateId) return;
    const isAlreadyShortlisted = shortlistedIds.has(candidateId);
    try {
      if (isAlreadyShortlisted) {
        await axios.delete(
          `${API_URL}api/candidates/shortlist/${candidateId}`
        );
        setShortlistedCandidates((prev) =>
          prev.filter((candidate) => candidate._id !== candidateId)
        );
      } else {
        const response = await axios.post(`${API_URL}api/candidates/shortlist`, {
          candidateId,
        });
        const candidate = response?.data?.data?.candidate;
        if (candidate) {
          setShortlistedCandidates((prev) => [candidate, ...prev]);
        }
      }
    } catch (error) {
      setShortlistError("Unable to update shortlist.");
    }
  };

  const searchTotalPages = Math.max(
    1,
    Math.ceil(totalCount / DEFAULT_LIMIT)
  );
  const recentTotalPages = Math.max(
    1,
    Math.ceil(recentTotalCount / RECENT_LIMIT)
  );

  return (
    <main className="candidates-data-page">
      <section className="candidates-search-section">
        <h1 className="candidates-search-title">Search for Skills, College, Name, Experience etc</h1>
        <CandidatesSearchFilters
          filters={filters}
          onChange={handleFilterChange}
          onSearch={handleSearch}
          onReset={handleReset}
          isSearching={isSearching}
          hasActiveFilters={hasActiveFilters}
        />
      </section>

      <ShortlistedCandidatesPanel
        shortlistedCandidates={normalizedShortlistedCandidates}
        onRemove={handleToggleShortlist}
        isLoading={isLoadingShortlist}
      />

      {!hasSearched && !hasActiveFilters && (
        <CandidatesResultsSection
          title="Recently signed up students"
          candidates={normalizedRecentCandidates}
          isLoading={isLoadingRecent}
          errorMessage={errorMessage}
          totalCount={recentTotalCount}
          page={recentPage}
          totalPages={recentTotalPages}
          onPageChange={setRecentPage}
          layout="recent"
          showTotalCount={false}
          shortlistedIds={shortlistedIds}
          onToggleShortlist={handleToggleShortlist}
        />
      )}

      {(hasSearched || hasActiveFilters) && (
        <CandidatesResultsSection
          title="Result on basis of search"
          candidates={normalizedSearchResults}
          isLoading={isSearching}
          errorMessage={errorMessage}
          totalCount={totalCount}
          page={searchPage}
          totalPages={searchTotalPages}
          onPageChange={setSearchPage}
          layout="search"
          showTotalCount={true}
          shortlistedIds={shortlistedIds}
          onToggleShortlist={handleToggleShortlist}
        />
      )}
    </main>
  );
}
