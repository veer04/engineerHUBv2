import "./JobBoard.css";
import { FiDownload, FiUserPlus, FiUserX } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { RiInboxArchiveLine } from "react-icons/ri";

export default function JobBoard() {
  const rows = [
    {
      name: "Amit Kumar",
      skills: "React, Node, Express",
      batch: "2023",
      experience: "2 years",
      resume: "https://www.google.com",
    },
    {
      name: "Amit Kumar",
      skills: "React, Node, Express",
      batch: "2023",
      experience: "2 years",
      resume: "https://www.google.com",
    },
  ];

  return (
    <main className="crm-board">
      <div
        style={{
          color: "#00643A",
          backgroundColor: "rgba(0, 213, 136, 0.1)",
        }}
        className="opportunity-status-container"
      >
        <p className="body-sm-regular">This job is still accepting responses</p>
      </div>
      <section className="main-container">
        <div className="status-toggle-container">
          <input type="checkbox" name="jobStatus" id="jobStatus" />
          <label htmlFor="jobStatus" className="body-sm-regular">
            Do not accept response on this job
          </label>
        </div>
        <div className="heading heading-sm">
          <p>Product Designer</p>
          <span>|</span>
          <p>ID : 1234567</p>
          <span>|</span>
          <p>Part-time</p>
          <span>|</span>
          <p>Delhi</p>
        </div>
        <div className="posted-on body-md-semibold">
          Posted on : 06/07/24/Sunday/06:00 PM
        </div>
        <div className="categories-container">
          <div className="categories body-sm-regular">
            <button className="--selected">
              <p className="body-sm-regular">Uncategorized</p>
              <span className="body-sm-regular">3</span>
            </button>
            <button>
              <p className="body-sm-regular">Uncategorized</p>
              <span className="body-sm-regular">3</span>
            </button>
            <button>
              <p className="body-sm-regular">Uncategorized</p>
              <span className="body-sm-regular">3</span>
            </button>
            <button>
              <p className="body-sm-regular">Uncategorized</p>
              <span className="body-sm-regular">3</span>
            </button>
          </div>
          <div className="download-container">
            <button className="download-btn body-sm-semibold">
              <FiDownload /> Download
            </button>
          </div>
        </div>
        <hr
          style={{
            margin: ".75rem 0",
            width: "100%",
          }}
        />
        <div className="action-container">
          <div className="select-container">
            <div className="select-all">
              <input type="checkbox" name="selectAll" id="selectAll" />
              <label htmlFor="selectAll body-sm-regular">
                Select All {`(${0}/${7})`}
              </label>
            </div>
            <div className="action-buttons">
              <button>
                <FiUserPlus />
              </button>
              <button>
                <FiUserX />
              </button>
              <button>
                <RiInboxArchiveLine />
              </button>
              <button>
                <FiDownload />
              </button>
              <button>
                <MdDeleteOutline />
              </button>
            </div>
          </div>
          <div className="search-container">
            <input
              aria-required="false"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              // name={param}
              tabIndex="0"
              type="text"
              spellCheck="false"
              role="combobox"
              aria-haspopup="false"
              aria-autocomplete="list"
              dir="ltr"
              // id={id}
              className={`body-sm-regular
              
                `}
              // placeholder={placeholder}
              // aria-label={ariaLabel}
              // aria-describedby={ariaDescribedby}
              // value={value}
              // onChange={(e) => setValue(e.target.value)}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     setSearchParams(
              //       (prev) => {
              //         prev.set(param, value);
              //         return prev;
              //       },
              //       { replace: true }
              //     );
              //   }
              // }}
              // {...rest}
            />
          </div>
        </div>
        <div>
          {/* 1st column will be empty header and its values will be checkboxes only */}
          {/* 2nd column header will be name and its values will be string */}
          {/* 3rd column header will be skills and its values will be string */}
          {/* 4th column header will be batch and its values will be string */}
          {/* 5th column header will be experience and its values will be string */}
          {/* 6th column header will be resume and its values will be link */}
          {/* 7th column header will be empty and its values will be the action buttons */}
          {/* all columns should have dynamic width */}
          <div className="table">
            <div className="table-header">
              <div className="column">
                <input type="checkbox" name="selectAll" id="selectAll" />
              </div>
              <div className="column">Name</div>
              <div className="column">Skills</div>
              <div className="column">Batch</div>
              <div className="column">Experience</div>
              <div className="column">Resume</div>
              <div className="column"></div>
            </div>
            <div className="table-body">
              {rows.map((row, index) => (
                <div className="row" key={index}>
                  <div className="column">
                    <input
                      type="checkbox"
                      name="selectRow"
                      id={`selectRow-${index}`}
                    />
                  </div>
                  <div className="column">{row.name}</div>
                  <div className="column">{row.skills}</div>
                  <div className="column">{row.batch}</div>
                  <div className="column">{row.experience}</div>
                  <div className="column">
                    <a
                      href={row.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resume
                    </a>
                  </div>
                  <div className="column">
                    <button>
                      <FiUserPlus />
                    </button>
                    <button>
                      <FiUserX />
                    </button>
                    <button>
                      <RiInboxArchiveLine />
                    </button>
                    <button>
                      <FiDownload />
                    </button>
                    <button>
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
