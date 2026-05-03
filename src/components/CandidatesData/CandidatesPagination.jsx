const buildPageList = (currentPage, totalPages, maxButtons = 5) => {
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + maxButtons - 1);

  if (end - start < maxButtons - 1) {
    start = Math.max(1, end - maxButtons + 1);
  }

  const pages = [];
  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }
  return pages;
};

export default function CandidatesPagination({
  page,
  totalPages,
  onPageChange,
  variant = "search",
}) {
  if (totalPages <= 1) return null;

  const pages = buildPageList(page, totalPages);

  return (
    <div className={`candidates-pagination ${variant}`}>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
      >
        {variant === "recent" ? "◀" : "<"}
      </button>

      {variant !== "recent" &&
        pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={pageNumber === page ? "active" : ""}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        {variant === "recent" ? "▶" : ">"}
      </button>
    </div>
  );
}
