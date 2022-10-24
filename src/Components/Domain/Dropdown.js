import React from "react";
// import cp from "../pdf/cp.pdf";
import { Link } from "react-router-dom";

const Dropdown = () => {
  return (
    <>
      <div class="accordion domainrow" id="accordionExample">
        <div class="accordion-item mb-3">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Data Structures And Algorithms
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body domain-drp-item">
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
            <div class="accordion-body domain-body">
              <a href="/resources" className="a-item-domain" rel="noreferrer">
                Resources
              </a>
              <hr />
            </div>
            <div class="accordion-body">
              <a href="/mentor" className="a-item-domain" rel="noreferrer">
                Contact Mentor
              </a>
              <hr />
            </div>
            <div class="accordion-body" >
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
        <div class="accordion-item mb-3">
          <h2 class="accordion-header" id="headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Web Development
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse "
            aria-labelledby="headingTwo"
          >
            <div class="accordion-body domain-drp-item">
            <Link to="/pdf" className="a-item-domain">
              {/* <a
                target="_blank"
                href={cp}
                className="a-item-domain"
                rel="noreferrer"
              > */}
                Handbook
              {/* </a> */}
            </Link>  
              <hr />
            </div>
            <div class="accordion-body">
              <a href="/resources" className="a-item-domain" rel="noreferrer">
                Resources
              </a>
              <hr />
            </div>
            <div class="accordion-body">
              <a href="/mentor" className="a-item-domain" rel="noreferrer">
                Contact Mentor
              </a>
              <hr />
            </div>
            <div class="accordion-body">
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
        <div class="accordion-item mb-3">
          <h2 class="accordion-header" id="headingThree">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              App Development
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse "
            aria-labelledby="headingThree"
          >
            <div class="accordion-body domain-drp-item">
            <Link to="/pdf" className="a-item-domain">
              {/* <a
                target="_blank"
                href={cp}
                className="a-item-domain"
                rel="noreferrer"
              > */}
                Handbook
              {/* </a> */}
            </Link>  
              <hr />
            </div>
            <div class="accordion-body">
              <a href="/resources" className="a-item-domain" rel="noreferrer">
                Resources
              </a>
              <hr />
            </div>
            <div class="accordion-body">
              <a href="/mentor" className="a-item-domain" rel="noreferrer">
                Contact Mentor
              </a>
              <hr />
            </div>
            <div class="accordion-body">
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
        <div class="accordion-item mb-3">
          <h2 class="accordion-header" id="headingFour">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Machine Learning & AI
            </button>
          </h2>
          <div
            id="collapseFour"
            class="accordion-collapse collapse "
            aria-labelledby="headingFour"
          >
            <div class="accordion-body domain-drp-item">
            <Link to="/pdf" className="a-item-domain">
              {/* <a
                target="_blank"
                href={cp}
                className="a-item-domain"
                rel="noreferrer"
              > */}
                Handbook
              {/* </a> */}
            </Link>  
              <hr />
            </div>
            <div class="accordion-body">
              <a href="/resources" className="a-item-domain" rel="noreferrer">
                Resources
              </a>
              <hr />
            </div>
            <div class="accordion-body">
              <a href="/mentor" className="a-item-domain" rel="noreferrer">
                Contact Mentor
              </a>
              <hr />
            </div>
            <div class="accordion-body">
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
        <div class="accordion-item mb-3">
          <h2 class="accordion-header" id="headingFive">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              Cyber Security
            </button>
          </h2>
          <div
            id="collapseFive"
            class="accordion-collapse collapse "
            aria-labelledby="headingFive"
          >
            <div class="accordion-body domain-drp-item">
            <Link to="/pdf" className="a-item-domain">
              {/* <a
                target="_blank"
                href={cp}
                className="a-item-domain"
                rel="noreferrer"
              > */}
                Handbook
              {/* </a> */}
            </Link>  
              <hr />
            </div>
            <div class="accordion-body">
              <a href="/resources" className="a-item-domain" rel="noreferrer">
                Resources
              </a>
              <hr />
            </div>
            <div class="accordion-body">
              <a href="/mentor" className="a-item-domain" rel="noreferrer">
                Contact Mentor
              </a>
              <hr />
            </div>
            <div class="accordion-body">
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
        <div class="accordion-item mb-3">
          <h2 class="accordion-header" id="headingSix">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              UI/UX Design
            </button>
          </h2>
          <div
            id="collapseSix"
            class="accordion-collapse collapse "
            aria-labelledby="headingSix"
          >
            <div class="accordion-body domain-drp-item">
            <Link to="/pdf" className="a-item-domain">
              {/* <a
                target="_blank"
                href={cp}
                className="a-item-domain align-content-center"
                rel="noreferrer"
              > */}
                Handbook
              {/* </a> */}
            </Link>  
              <hr />
            </div>
            <div class="accordion-body">
              <a href="/resources" className="a-item-domain" rel="noreferrer">
                Resources
              </a>
              <hr />
            </div>
            <div class="accordion-body">
              <a href="/mentor" className="a-item-domain" rel="noreferrer">
                Contact Mentor
              </a>
              <hr />
            </div>
            <div class="accordion-body">
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
        <div class="accordion-item ">
          <h2 class="accordion-header" id="headingSeven">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSeven"
              aria-expanded="false"
              aria-controls="collapseSeven"
            >
              Block Chain
            </button>
          </h2>
          <div
            id="collapseSeven"
            class="accordion-collapse collapse "
            aria-labelledby="headingSeven"
          >
            <div class="accordion-body domain-drp-item">
            <Link to="/pdf" className="a-item-domain">
              {/* <a
                target="_blank"
                href={cp}
                className="a-item-domain"
                rel="noreferrer"
              > */}
                Handbook
              {/* </a> */}
            </Link>
              <hr />
            </div>
            <div class="accordion-body">
              <a href="/resources" className="a-item-domain" rel="noreferrer">
                Resources
              </a>
              <hr />
            </div>
            <div class="accordion-body">
              <a href="/mentor" className="a-item-domain">
                Contact Mentor
              </a>
              <hr />
            </div>
            <div class="accordion-body">
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
      </div>
    </>
  );
};

export default Dropdown;
