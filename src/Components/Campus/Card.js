import React from "react";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

function Card() {
  return (
    <div>
      <div class="row row-cols-1 row-cols-md-3 g-4 p-4">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h5
                class="card-title"
                style={{
                  font: "poppins",
                  fontWeight: 500,
                  fontSize: "20px",
                  lineHeight: "32px",
                  paddingTop: "0",
                }}
              >
                Hackathons for Developers
                <a href="#">
                  <ShareOutlinedIcon
                    className="share-icon"
                    style={{ fontSize: "25px" }}
                  />
                </a>
              </h5>
              <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu,
                eget suspendisse nunc duis non eget est.Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Arcu, eget suspendisse nunc
                duis non eget est.
              </p>
              <h6 style={{ fontWeight: 700 }}>Organizer: IIT Delhi</h6>
              <div className="btn-container">
                <a
                  href="#"
                  className="btn"
                  style={{ backgroundColor: "#0094FF" }}
                >
                  <span style={{ color: "white" }}>Apply Now !</span>
                </a>
                <p
                  className="d-inline fst-normal"
                  style={{ marginLeft: "4.4rem" }}
                >
                  Last date: dd/mm/yy
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h5
                class="card-title"
                style={{
                  font: "poppins",
                  fontWeight: 500,
                  fontSize: "20px",
                  lineHeight: "32px",
                  paddingTop: "0",
                }}
              >
                Hackathons for Developers
                <a href="#">
                  <ShareOutlinedIcon
                    className="share-icon"
                    style={{ fontSize: "25px"}}
                  />
                </a>
              </h5>
              <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu,
                eget suspendisse nunc duis non eget est.Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Arcu, eget suspendisse nunc
                duis non eget est.
              </p>
              <h6 style={{ fontWeight: 700 }}>Organizer: IIT Delhi</h6>
              <div className="btn-container">
                <a
                  href="#"
                  className="btn"
                  style={{ backgroundColor: "#0094FF" }}
                >
                  <span style={{ color: "white" }}>Apply Now !</span>
                </a>
                <p
                  className="d-inline fst-normal"
                  style={{ marginLeft: "4.4rem" }}
                >
                  Last date: dd/mm/yy
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h5
                class="card-title"
                style={{
                  font: "poppins",
                  fontWeight: 500,
                  fontSize: "20px",
                  lineHeight: "32px",
                  paddingTop: "0",
                }}
              >
                Hackathons for Developers
                <a href="#">
                  <ShareOutlinedIcon
                    className="share-icon"
                    style={{ fontSize: "25px" }}
                  />
                </a>
              </h5>
              <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu,
                eget suspendisse nunc duis non eget est.Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Arcu, eget suspendisse nunc
                duis non eget est.
              </p>
              <h6 style={{ fontWeight: 700 }}>Organizer: IIT Delhi</h6>
              <div className="btn-container">
                <a
                  href="#"
                  className="btn"
                  style={{ backgroundColor: "#0094FF" }}
                >
                  <span style={{ color: "white" }}>Apply Now !</span>
                </a>
                <p
                  className="d-inline fst-normal"
                  style={{ marginLeft: "4.4rem" }}
                >
                  Last date: dd/mm/yy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
