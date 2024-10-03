import { useState } from "react";
import { Chip } from "@mui/material";
import "./JobCards.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ViewApplicantsModal from "../../../components/Dashboard/ViewApplicantsModal";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const JobCards = ({
  details,
  color,
  className,
  adminView = false,
  filterByCompany,
  filterName,
}) => {
  const { hiringId } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [toggleModal, setToggleModal] = useState(false);
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
  const formattedSalary = formatter.format(details?.amount);

  return (
    <div
      className={`JobCard ${!!hiringId ? "" : `on-hover-scale`} ${className}`}
    >
      <div className="cardContent">
        <div className="job-ctc-views">
          <h6>
            Package:{" "}
            <b>
              {details?.showSalary
                ? !!details?.amount && details?.amount !== "N/A"
                  ? details?.amount
                  : details?.salaryType === "Fixed"
                  ? `${formatter.format(details?.salaryAmount)} ${
                      details?.salaryUnit
                    }`
                  : details.salaryType === "Range"
                  ? `${
                      details?.salaryUnit === "LPA"
                        ? details?.minRange
                        : formatter.format(details?.minRange)
                    } - ${
                      details?.salaryUnit === "LPA"
                        ? details?.maxRange
                        : formatter.format(details?.maxRange)
                    } ${details?.salaryUnit}`
                  : "N/A"
                : !!details?.amount && details?.amount !== "N/A"
                ? details?.amount
                : !!details?.salaryDisclosure
                ? details?.salaryDisclosure
                : "N/A"}
            </b>
          </h6>
          {details?.views > 0 ? (
            <span>
              <MdOutlineRemoveRedEye /> {details?.views}
            </span>
          ) : (
            ""
          )}
        </div>
        <h6 className="text-crop-1 overflow-hidden">
          Job Location :{" "}
          <b>
            {details?.opportunityLocation === "WFH"
              ? "Work From Home"
              : details?.opportunityLocation === "Hybrid"
              ? `Hybrid${
                  !!details?.city && details?.city !== "undefined"
                    ? ` - ${details?.city}`
                    : ""
                }`
              : details?.opportunityLocation === "On-Site"
              ? !!details?.city && details?.city !== "undefined"
                ? details?.city
                : "On-Site"
              : !!details?.opportunityLocation
              ? details?.opportunityLocation
              : "N/A"}
          </b>
        </h6>
        <h3 className="text-crop-3 overflow-hidden p-0">
          {details?.opportunityName}
        </h3>
        <span className="Tags">
          {details?.skillsRequired?.map((skillsRequired, _id) => (
            <Chip
              key={_id}
              variant="outlined"
              size="small"
              label={`#${skillsRequired}`}
              style={{
                fontWeight: "500",
                fontSize: "10px",
                marginRight: "15px",
                border: "1px solid #f3f3f3",
              }}
            />
          ))}
        </span>
      </div>
      <div
        className="cardFooter"
        style={{
          backgroundColor: color,
        }}
      >
        {!adminView && (
          <>
            <div
              style={{
                backgroundImage: `url(${details?.organisationLogo})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
            <h5 className="text-crop-2 overflow-hidden">
              {details?.organisationName}
            </h5>
            <Link to={`/company/jobs/${details?._id}${!!search ? search : ""}`}>
              <div className="btn">View</div>
            </Link>
          </>
        )}
        {adminView && (
          <>
            <span
              style={{
                fontWeight: "600",
              }}
            >
              {details?.views} Views
            </span>
            <Link to={`/company/jobs/board/${details?._id}`}>
              <button
                style={{
                  backgroundColor: "#014051",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px",
                  color: "#fff",
                  fontWeight: "500",
                  fontSize: "14px",
                  cursor: "pointer",
                  outline: "none",
                  boxShadow: "0px 0px 3.5px 0px rgba(0,0,0,0.75)",
                }}
              >
                View Applicants
              </button>
            </Link>
          </>
        )}
      </div>
      {toggleModal && (
        <ViewApplicantsModal
          jobId={details?._id}
          applicantsCount={details?.totalAppliedUsers}
          setToggleModal={setToggleModal}
          applicationType="job"
        />
      )}
    </div>
  );
};

export default JobCards;
