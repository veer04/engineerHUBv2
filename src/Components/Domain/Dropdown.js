import React from "react";
// import cp from "../pdf/cp.pdf";
import { Link } from "react-router-dom";

const Dropdown = ({ domainArr }) => {
  return (
    <>
      <div className="accordion domainrow" id="accordionExample">
        {domainArr.map((domains, i) => {
          return (
            <div className="accordion-item mb-3" id={`${domains.seqNum}*${i}`}>
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button collapsed "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${domains.seqNum}`}
                  aria-expanded="true"
                  aria-controls={`collapse${domains.seqNum}`}
                >
                  {domains.domain}
                </button>
              </h2>
              <div
                id={`collapse${domains.seqNum}`}
                className="accordion-collapse collapse "
                aria-labelledby={`heading${domains.seqNum}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body domain-drp-item">
                  <Link to="/pdf" className="a-item-domain">
                    {/* <a
                target="_blank"
                
                className="a-item-domain"
                rel="noreferrer"
              > */}
                    Handbook
                    {/* </a> */}
                  </Link>
                  <hr className="drp-hr" />
                </div>
                <div className="accordion-body domain-body">
                  <a
                    href="/resources"
                    className="a-item-domain"
                    rel="noreferrer"
                  >
                    Resources
                  </a>
                  <hr />
                </div>
                <div className="accordion-body">
                  <a href="/mentor" className="a-item-domain" rel="noreferrer">
                    Contact Mentor
                  </a>
                  <hr />
                </div>
                <div className="accordion-body">
                  <a
                    href="https://discord.gg/ZMZAEZ5NfA"
                    target="_blank"
                    className="a-item-domain"
                    rel="noreferrer"
                  >
                    Ask your query
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dropdown;
