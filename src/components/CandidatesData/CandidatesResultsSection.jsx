import CandidateCard from "./CandidateCard.jsx";
import CandidateCardSkeleton from "./CandidateCardSkeleton.jsx";
import CandidatesPagination from "./CandidatesPagination.jsx";

const SKELETON_COUNT = 4;

export default function CandidatesResultsSection({
  title,
  candidates,
  isLoading,
  errorMessage,
  totalCount,
  page,
  totalPages,
  onPageChange,
  layout,
  showTotalCount,
  shortlistedIds,
  onToggleShortlist,
}) {
  const hasResults = candidates?.length > 0;

  return (
    <section className="candidates-results-section">
      <div className="candidates-results-header">
        <h2 className="candidates-results-title">{title}</h2>
        {showTotalCount && (
          <div className="candidates-results-count">
            Total: {totalCount} candidates
          </div>
        )}
      </div>

      <div className={`candidates-grid ${layout}`}>
        {isLoading &&
          Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <CandidateCardSkeleton key={`skeleton-${index}`} />
          ))}

        {!isLoading && hasResults &&
          candidates.map((candidate) => (
            <CandidateCard
              key={candidate?._id || candidate?.id || candidate?.email || candidate?.displayName}
              candidate={candidate}
              isShortlisted={shortlistedIds?.has(candidate._id)}
              onToggleShortlist={onToggleShortlist}
            />
          ))}

        {!isLoading && !hasResults && !errorMessage && (
          <div className="candidates-empty-state">
            <h3>No candidates found</h3>
            <p>Try adjusting the filters to see more results.</p>
          </div>
        )}
      </div>

      {!isLoading && hasResults && (
        <CandidatesPagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          variant={layout}
        />
      )}

      {!isLoading && errorMessage && (
        <div className="candidates-empty-state">
          <h3>Something went wrong</h3>
          <p>{errorMessage}</p>
        </div>
      )}
    </section>
  );
}
