import "./paginationnewcompsaif.css";

export default function PaginationCompNewSaif({
  className = "",
  pages = 1,
  currentPage = 1,
  setCurrentPage,
}) {
  console.log(pages, "hjgfg");
  const handlePageChange = (page) => {
    console.log("hgfdff");
    if (page >= 1 && page <= pages) {
      setCurrentPage(page);
    }
  };

  if (pages <= 1) return null;

  return (
    <div className={`pagination-container-saif ${className}`}>
      <div className="pagination-content-saif">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>

        {[...Array(pages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`pagination-number ${
                currentPage === pageNumber ? "active" : ""
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          //   disabled={currentPage === pages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
