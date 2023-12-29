import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./PaginationBar.css";

export default function PaginationBar({
  className,
  pages = 1,
  currentPage = 1,
  setCurrentPage,
}) {
  // if there is only one page then pagination bar will not be shown
  if (pages === 1) return null;

  return (
    // if there are more than 9 pages then pagination bar will adjust to show 4 pages before and after the current page
    <div className={`pagination-bar ${className}`}>
      <button
        className="item navigation"
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
          }
        }}
        disabled={currentPage === 1}
      >
        <IoIosArrowBack />
      </button>
      {pages > 9 ? (
        <>
          {currentPage < 5 &&
            [...Array(5)].map((_, index) => (
              <button
                key={index}
                className={`item ${
                  currentPage === index + 1 ? "--is-active" : ""
                }`}
                onClick={() => {
                  setCurrentPage(index + 1);
                }}
              >
                {index + 1}
              </button>
            ))}
          {currentPage > 4 && (
            <button
              className="item"
              onClick={() => {
                setCurrentPage(1);
              }}
            >
              1
            </button>
          )}
          {currentPage > 4 && <div className="dots">•••</div>}
          {currentPage >= 5 &&
            currentPage <= pages - 4 &&
            [...Array(5)].map((_, index) => (
              <button
                key={index}
                className={`item ${
                  currentPage === index - 2 + currentPage ? "--is-active" : ""
                }`}
                onClick={() => {
                  setCurrentPage(index - 2 + currentPage);
                }}
              >
                {index - 2 + currentPage}
              </button>
            ))}
          {currentPage <= pages - 4 && <div className="dots">•••</div>}
          {currentPage > pages - 4 &&
            [pages - 4, pages - 3, pages - 2, pages - 1, pages].map(
              (value, index) => (
                <button
                  key={index}
                  className={`item ${
                    currentPage === value ? "--is-active" : ""
                  }`}
                  onClick={() => {
                    setCurrentPage(value);
                  }}
                >
                  {value}
                </button>
              )
            )}
          {currentPage <= pages - 4 && (
            <button
              className="item"
              onClick={() => {
                setCurrentPage(pages);
              }}
            >
              {pages}
            </button>
          )}
        </>
      ) : (
        [...Array(pages)].map((_, index) => (
          <button
            key={index}
            className={`item ${currentPage === index + 1 ? "--is-active" : ""}`}
            onClick={() => {
              setCurrentPage(index + 1);
            }}
          >
            {index + 1}
          </button>
        ))
      )}
      <button
        className="item navigation"
        onClick={() => {
          if (currentPage < pages) {
            setCurrentPage((prev) => prev + 1);
          }
        }}
        disabled={currentPage === pages}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
}
