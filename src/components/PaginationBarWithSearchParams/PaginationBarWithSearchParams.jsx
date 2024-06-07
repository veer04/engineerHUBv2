import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./PaginationBarWithSearchParams.css";
import { useSearchParams } from "react-router-dom";

export default function PaginationBarWithSearchParams({
  className,
  param = "pageNo",
  pages = 1,
}) {
  // if there is only one page then pagination bar will not be shown
  const [searchParams, setSearchParams] = useSearchParams({ pageNo: "" });
  const pageNo = searchParams.get(param);

  if (pages === 1) return null;

  return (
    // if there are more than 9 pages then pagination bar will adjust to show 4 pages before and after the current page
    <div className={`pagination-bar ${className}`}>
      <button
        className="item navigation"
        onClick={() => {
          if (Number(pageNo) > 1) {
            // setCurrentPage((prev) => prev - 1);
            setSearchParams(
              (prev) => {
                prev.set(param, Number(pageNo) - 1);
                return prev;
              },
              { replace: true }
            );
          }
        }}
        disabled={Number(pageNo) === 1}
      >
        <IoIosArrowBack />
      </button>
      {pages > 9 ? (
        <>
          {Number(pageNo) < 5 &&
            [...Array(5)].map((_, index) => (
              <button
                key={index}
                className={`item ${
                  Number(pageNo) === index + 1 ? "--is-active" : ""
                }`}
                onClick={() => {
                  // setCurrentPage(index + 1);
                  setSearchParams(
                    (prev) => {
                      prev.set(param, index + 1);
                      return prev;
                    },
                    { replace: true }
                  );
                }}
              >
                {index + 1}
              </button>
            ))}
          {Number(pageNo) > 4 && (
            <button
              className="item"
              onClick={() => {
                // setCurrentPage(1);
                setSearchParams(
                  (prev) => {
                    prev.set(param, 1);
                    return prev;
                  },
                  { replace: true }
                );
              }}
            >
              1
            </button>
          )}
          {Number(pageNo) > 4 && <div className="dots">•••</div>}
          {Number(pageNo) >= 5 &&
            Number(pageNo) <= pages - 4 &&
            [...Array(5)].map((_, index) => (
              <button
                key={index}
                className={`item ${
                  Number(pageNo) === index - 2 + Number(pageNo)
                    ? "--is-active"
                    : ""
                }`}
                onClick={() => {
                  // setCurrentPage(index - 2 + pageNo);
                  setSearchParams(
                    (prev) => {
                      prev.set(param, index - 2 + Number(pageNo));
                      return prev;
                    },
                    { replace: true }
                  );
                }}
              >
                {index - 2 + Number(pageNo)}
              </button>
            ))}
          {Number(pageNo) <= pages - 4 && <div className="dots">•••</div>}
          {Number(pageNo) > pages - 4 &&
            [pages - 4, pages - 3, pages - 2, pages - 1, pages].map(
              (value, index) => (
                <button
                  key={index}
                  className={`item ${
                    Number(pageNo) === value ? "--is-active" : ""
                  }`}
                  onClick={() => {
                    // setCurrentPage(value);
                    setSearchParams(
                      (prev) => {
                        prev.set(param, value);
                        return prev;
                      },
                      { replace: true }
                    );
                  }}
                >
                  {value}
                </button>
              )
            )}
          {Number(pageNo) <= pages - 4 && (
            <button
              className="item"
              onClick={() => {
                // setCurrentPage(pages);
                setSearchParams(
                  (prev) => {
                    prev.set(param, pages);
                    return prev;
                  },
                  { replace: true }
                );
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
            className={`item ${
              Number(pageNo) === index + 1 ? "--is-active" : ""
            }`}
            onClick={() => {
              // setCurrentPage(index + 1);
              setSearchParams(
                (prev) => {
                  prev.set(param, index + 1);
                  return prev;
                },
                { replace: true }
              );
            }}
          >
            {index + 1}
          </button>
        ))
      )}
      <button
        className="item navigation"
        onClick={() => {
          if (Number(pageNo) < pages) {
            // setCurrentPage((prev) => prev + 1);
            setSearchParams(
              (prev) => {
                prev.set(param, Number(pageNo) + 1);
                return prev;
              },
              { replace: true }
            );
          }
        }}
        disabled={Number(pageNo) === pages}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
}
