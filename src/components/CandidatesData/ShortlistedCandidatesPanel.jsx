export default function ShortlistedCandidatesPanel({
  shortlistedCandidates,
  onRemove,
  isLoading,
}) {
  return (
    <aside className="shortlisted-panel">
      <div className="shortlisted-panel-header">
        <h3>Shortlisted</h3>
        <span>{shortlistedCandidates.length}</span>
      </div>

      {isLoading && <div className="shortlisted-panel-empty">Loading...</div>}

      {!isLoading && shortlistedCandidates.length === 0 && (
        <div className="shortlisted-panel-empty">No candidates shortlisted.</div>
      )}

      {!isLoading && shortlistedCandidates.length > 0 && (
        <ul className="shortlisted-list">
          {shortlistedCandidates.map((candidate) => (
            <li key={candidate._id} className="shortlisted-item">
              <div>
                <div className="shortlisted-name">{candidate.displayName}</div>
                <div className="shortlisted-email">
                  {candidate.email || "Email not available"}
                </div>
              </div>
              <button
                type="button"
                className="shortlisted-remove"
                onClick={() => onRemove(candidate._id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
