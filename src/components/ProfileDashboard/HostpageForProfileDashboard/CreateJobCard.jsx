import React, { useEffect, useState } from "react";
import { FaArrowRight, FaBriefcase, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { hasActivePaidPlan, checkJobPostingAccess } from "../../../utils/checkJobPostingAccess";
import "./hostcard.css";

const CreateJobCard = () => {
  const navigate = useNavigate();
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const checkSub = async () => {
      const active = await hasActivePaidPlan();
      setIsPaid(active);
    };
    checkSub();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (!isPaid) {
      checkJobPostingAccess(navigate);
    } else {
      navigate("/host/job");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="host-card host-card--jobs"
      style={{ cursor: "pointer", position: "relative" }}
    >
      {!isPaid && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "12px",
            background: "#fff3cd",
            color: "#856404",
            padding: "3px 8px",
            borderRadius: "12px",
            fontSize: "10px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "4px",
            border: "1px solid #ffeeba",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            zIndex: 2,
          }}
        >
          <FaLock size={9} /> PRO PLAN
        </div>
      )}
      <div className="host-card__icon-wrap">
        <FaBriefcase size={20} />
      </div>
      <div className="host-card__body">
        <h3 className="host-card__title">Jobs</h3>
        <p className="host-card__link">
          Create Jobs <FaArrowRight size={11} />
        </p>
        <p className="host-card__desc">
          Unlock career opportunities! Connect young talent with exciting professionals.
        </p>
      </div>
    </div>
  );
};

export default CreateJobCard;
