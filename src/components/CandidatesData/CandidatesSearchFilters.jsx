export default function CandidatesSearchFilters({
  filters,
  onChange,
  onSearch,
  onReset,
  isSearching,
  hasActiveFilters,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  return (
    <div className="candidates-search-card">
      <div className="candidates-search-grid">
        <div className="candidates-search-field">
          <label htmlFor="skills">Skills</label>
          <input
            id="skills"
            name="skills"
            type="text"
            className="candidates-search-input"
            placeholder="HTML, CSS, React"
            value={filters.skills}
            onChange={handleChange}
          />
        </div>

        <div className="candidates-search-field">
          <label htmlFor="college">College name</label>
          <input
            id="college"
            name="college"
            type="text"
            className="candidates-search-input"
            placeholder="College name"
            value={filters.college}
            onChange={handleChange}
          />
        </div>

        <div className="candidates-search-field">
          <label htmlFor="name">Candidate name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="candidates-search-input"
            placeholder="Candidate name"
            value={filters.name}
            onChange={handleChange}
          />
        </div>

        <div className="candidates-search-field">
          <label htmlFor="experience">Experience (yrs)</label>
          <input
            id="experience"
            name="experience"
            type="number"
            min="0"
            className="candidates-search-input"
            placeholder="0"
            value={filters.experience}
            onChange={handleChange}
          />
        </div>

        <div className="candidates-search-actions">
          <button
            type="button"
            className="candidates-search-button"
            onClick={onSearch}
            disabled={!hasActiveFilters || isSearching}
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
          <button
            type="button"
            className="candidates-reset-button"
            onClick={onReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
