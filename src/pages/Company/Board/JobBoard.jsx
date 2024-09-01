import { Fragment, useState } from "react";
import "./JobBoard.css";
import { FiDownload, FiUserPlus, FiUserX } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { RiInboxArchiveLine } from "react-icons/ri";
import Loading from "../../../components/Loader/Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../../services/APIUtils";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

export default function JobBoard() {
  const rows = [
    {
      _id: 1,
      name: "Roanne Mcwhinney",
      skills: "Air Quality",
      college: "Nagoya University of Arts",
      batch: "6473 - 5570",
      experience: "1 year",
      resume: "https://www.example2.com",
    },
    {
      _id: 2,
      name: "Othelia Judkin",
      skills: "TV News Production",
      college: "University of Iowa",
      batch: "6537 - 4835",
      experience: "No experience",
      resume: "https://www.example3.com",
    },
    {
      _id: 3,
      name: "Fabian Soper",
      skills: "NCSim",
      college: "Embry-Riddle Aeronautical University",
      batch: "2068 - 6741",
      experience: "2 years",
      resume: "https://www.example1.com",
    },
    {
      _id: 4,
      name: "Dana Slidders",
      skills: "Security Awareness",
      college: "University of Connecticut Health Center",
      batch: "9213 - 8618",
      experience: "1 year",
      resume: "https://www.example3.com",
    },
    {
      _id: 5,
      name: "Theresita Eykelbosch",
      skills: "EIFS",
      college: "Centro de Estudios Avanzados de Puerto Rico y el Caribe",
      batch: "0691 - 8251",
      experience: "3 years",
      resume: "https://www.example3.com",
    },
    {
      _id: 6,
      name: "Muhammad Haversham",
      skills: "Occupational Therapists",
      college: "Kanda University of International Studies",
      batch: "4205 - 9367",
      experience: "1 year",
      resume: "https://www.example3.com",
    },
    {
      _id: 7,
      name: "Alberto Lelliott",
      skills: "Real Estate Transactions",
      college: "Universidad México Americana del Norte",
      batch: "1918 - 7912",
      experience: "2 years",
      resume: "https://www.example2.com",
    },
    {
      _id: 8,
      name: "Elia Cummings",
      skills: "IGOR Pro",
      college: "Kansas City Art Institute",
      batch: "1058 - 5388",
      experience: "2 years",
      resume: "https://www.example2.com",
    },
    {
      _id: 9,
      name: "Ailsun Reay",
      skills: "Yahoo Search Marketing",
      college: "Lambuth University",
      batch: "6895 - 4747",
      experience: "1 year",
      resume: "https://www.example2.com",
    },
    {
      _id: 10,
      name: "Karoly Offen",
      skills: "Training",
      college: "Colby-Sawyer College",
      batch: "8800 - 2459",
      experience: "No experience",
      resume: "https://www.example3.com",
    },
    {
      _id: 11,
      name: "Norine Breedy",
      skills: "IoC",
      college: "Kent State University - Ashtabula",
      batch: "6315 - 5510",
      experience: "2 years",
      resume: "https://www.example2.com",
    },
    {
      _id: 12,
      name: "Sallie Liepina",
      skills: "XML Gateway",
      college: "Indira Gandhi Agricultural University",
      batch: "7113 - 8827",
      experience: "2 years",
      resume: "https://www.example1.com",
    },
    {
      _id: 13,
      name: "Elsa McIvor",
      skills: "DMF",
      college: "Nile Valley University",
      batch: "3100 - 3724",
      experience: "2 years",
      resume: "https://www.example1.com",
    },
    {
      _id: 14,
      name: "Cletus Westmancoat",
      skills: "PDH",
      college: "Bunkyo University",
      batch: "8448 - 2657",
      experience: "No experience",
      resume: "https://www.example2.com",
    },
    {
      _id: 15,
      name: "Harris Ridsdell",
      skills: "Merchandising",
      college: "Universidad Dr. Jose Matias Delgado",
      batch: "2254 - 1041",
      experience: "No experience",
      resume: "https://www.example2.com",
    },
  ];

  const [rowValues, setRowValues] = useState([]);
  const { id } = useParams();

  const boardData = useQuery({
    queryKey: ["Jobs", "board", id],
    queryFn: () =>
      axios
        .get(`${API_URL}api/v1/hiringDashboard/applicant?page=1&limit=30/`)
        .then((res) => {
          return res;
        }),
    staleTime: 1000 * 60 * 1, // 1 minutes
  });

  return (
    <main className="crm-board">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Job Board{false ? ` | Job Name` : ""}</title>
      </Helmet>
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
        <div className="board-table">
          <div className="table-item table-headers table-header-1 body-sm-regular"></div>
          <div className="table-item table-headers table-header-2 body-sm-regular">
            Name
          </div>
          <div className="table-item table-headers table-header-3 body-sm-regular">
            Skills
          </div>
          <div className="table-item table-headers table-header-4 body-sm-regular">
            College / University
          </div>
          <div className="table-item table-headers table-header-5 body-sm-regular">
            Batch
          </div>
          <div className="table-item table-headers table-header-6 body-sm-regular">
            Experience
          </div>
          <div className="table-item table-headers table-header-7 body-sm-regular">
            Resume
          </div>
          <div className="table-item table-headers table-header-8 body-sm-regular"></div>
          {/* {referralQuery.isPending && (
            <>
              <div
                style={{
                  marginTop: "5dvh",
                  marginBottom: "10dvh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gridColumn: "1/8",
                  gridRow: "7/7",
                }}
              >
                <Loading />
              </div>
            </>
          )} */}
          {rowValues.map(
            ({ _id, name, skills, college, batch, experience, resume }) => (
              <Fragment key={_id}>
                <div className="table-item table-content table-content-1">
                  <input
                    type="checkbox"
                    name={`data-name-${_id}`}
                    id={`data-id-${_id}`}
                  />
                </div>
                <div className="table-item table-content table-content-2">
                  <p title={name} className="body-sm-regular text-crop-2">
                    {name}
                  </p>
                </div>
                <div className="table-item table-content table-content-3">
                  <p title={skills} className="body-sm-regular text-crop-2 ">
                    {skills}
                  </p>
                </div>
                <div className="table-item table-content table-content-4">
                  <p title={college} className="body-sm-regular text-crop-2">
                    {college}
                  </p>
                </div>
                <div className="table-item table-content table-content-5">
                  <p title={batch} className="body-sm-regular text-crop-2">
                    {batch}
                  </p>
                </div>
                <div className="table-item table-content table-content-6">
                  <p title={experience} className="body-sm-regular text-crop-2">
                    {experience}
                  </p>
                </div>
                <div className="table-item table-content table-content-7">
                  <a
                    title={resume}
                    className="body-sm-regular text-crop-2"
                    href={resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link to view
                  </a>
                </div>
                <div className="table-item table-content table-content-8">
                  <button>
                    <FiUserPlus />
                  </button>
                  <button>
                    <FiUserX />
                  </button>
                  <button>
                    <MdDeleteOutline />
                  </button>
                </div>
              </Fragment>
            )
          )}
          {/* <Fragment>
            <div className="table-item table-content table-content-1">
              <input
                type="checkbox"
                name={`data-name-${""}`}
                id={`data-id-${""}`}
              />
            </div>
            <div className="table-item table-content table-content-2">
              <p
                title={"Girish Shedge"}
                className="body-sm-regular text-crop-2"
              >
                Girish Shedge
              </p>
            </div>
            <div className="table-item table-content table-content-3">
              <p
                title={"Figma, Adobe Photoshop, Illustrator"}
                className="body-sm-regular text-crop-2 "
              >
                Figma, Adobe Photoshop, Illustrator
              </p>
            </div>
            <div className="table-item table-content table-content-4">
              <p
                title={
                  "Bharati Vidyapeeth College of Engineering and Technology, Navi Mumbai"
                }
                className="body-sm-regular text-crop-2"
              >
                Bharati Vidyapeeth College of Engineering and Technology, Navi
                Mumbai
              </p>
            </div>
            <div className="table-item table-content table-content-5">
              <p title={"2024-2028"} className="body-sm-regular text-crop-2">
                2024 - 2028
              </p>
            </div>
            <div className="table-item table-content table-content-6">
              <p
                title={"Product Designer @engineerHUB"}
                className="body-sm-regular text-crop-2"
              >
                Product Designer @engineerHUB
              </p>
            </div>
            <div className="table-item table-content table-content-7">
              <a
                title={"Product Designer @engineerHUB"}
                className="body-sm-regular text-crop-2"
              >
                Link to view
              </a>
            </div>
            <div className="table-item table-content table-content-8">
              <button>
                <FiUserPlus />
              </button>
              <button>
                <FiUserX />
              </button>
              <button>
                <MdDeleteOutline />
              </button>
            </div>
          </Fragment> */}
        </div>
      </section>
    </main>
  );
}
