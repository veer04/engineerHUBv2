import React from "react";
import "./NavBar.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom"
import Nav from "react-bootstrap/Nav";
import Logo from "./logo.svg";
import User from "./user.svg";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBar = () => {
  const styles = {
    container: {
      display: "flex",
      height: "100%",
    
    },
    containment: {
      display: "flex",
      height: "100%",
      flexWrap: "wrap",
    },
  };
  return (
    <>
      <div className="">
        <Navbar
          className="NAvbarBackground navbar-dark"
          style={styles.container}
        >
          <div className=" NAvbarBackground nav-cont">
            <Link to="/" className="company-logo">
              <img alt="" src={Logo} />
            </Link >
            {/* <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle nsvigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button> */}
            <div className="collapse navbar-collapse " id="navbarTogglerDemo02">
              <div className="row navelements">
                <Nav className="me-auto navelements" style={styles.containment}>
                  <NavDropdown
                    title="Domains"
                    className="navelements"
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown
                      title="DSA (C/C++)"
                      className="dropdownNav dropend "
                    >
                      <NavDropdown.Item href="">HandBook</NavDropdown.Item>
                      <NavDropdown.Item href="/resources">
                        Resources
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/mentor">
                        Contact Mentor
                      </NavDropdown.Item>
                      <NavDropdown.Item href="">
                        Ask your query
                      </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown
                      title="Web developement"
                      className="dropdownNav dropend "
                    >
                      <NavDropdown.Item href="">HandBook</NavDropdown.Item>
                      <NavDropdown.Item href="/resources">
                        Resources
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/mentor">
                        Contact Mentor
                      </NavDropdown.Item>
                      <NavDropdown.Item href="">
                        Ask your query
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                      title="App Development"
                      className="dropdownNav dropend "
                    >
                      <NavDropdown.Item href="">HandBook</NavDropdown.Item>
                      <NavDropdown.Item href="/resources">
                        Resources
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/mentor">
                        Contact Mentor
                      </NavDropdown.Item>
                      <NavDropdown.Item href="">
                        Ask your query
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                      title="ML&AI (PYTHON)"
                      className="dropdownNav dropend "
                    >
                      <NavDropdown.Item href="">HandBook</NavDropdown.Item>
                      <NavDropdown.Item href="/resources">
                        Resources
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/mentor">
                        Contact Mentor
                      </NavDropdown.Item>
                      <NavDropdown.Item href="">
                        Ask your query
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                      title="Cyber Security"
                      className="dropdownNav dropend "
                    >
                      <div className="dropdownNav dropend ">
                        <NavDropdown.Item
                          href=""
                          className="dropdownNav dropend"
                        >
                          HandBook
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/resources">
                          Resources
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/mentor">
                          Contact Mentor
                        </NavDropdown.Item>
                        <NavDropdown.Item href="">
                          Ask your query
                        </NavDropdown.Item>
                      </div>
                    </NavDropdown>
                    <NavDropdown
                      title="Dev Ops"
                      className="dropdownNav dropend"
                    >
                      <NavDropdown.Item href="">HandBook</NavDropdown.Item>
                      <NavDropdown.Item href="/resources">
                        Resources
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/mentor">
                        Contact Mentor
                      </NavDropdown.Item>
                      <NavDropdown.Item href="">
                        Ask your query
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                      title="UI/UX Design"
                      className="dropdownNav dropend"
                    >
                      <NavDropdown.Item href="">HandBook</NavDropdown.Item>
                      <NavDropdown.Item href="/resources">
                        Resources
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/mentor">
                        Contact Mentor
                      </NavDropdown.Item>
                      <NavDropdown.Item href="">
                        Ask your query
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                      title="BlockChain"
                      className="dropdownNav dropend"
                    >
                      <NavDropdown.Item href="">HandBook</NavDropdown.Item>
                      <NavDropdown.Item href="/resources">
                        Resources
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/mentor">
                        Contact Mentor
                      </NavDropdown.Item>
                      <NavDropdown.Item href="">
                        Ask your query
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                      title="Open Source"
                      className="dropdownNav dropend"
                    >
                      <NavDropdown.Item href="/resources">
                        Resources
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/mentor">
                        Contact Mentor
                      </NavDropdown.Item>
                      ``
                      <NavDropdown.Item href="">
                        Ask your query
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                      title="SEO/Graphic Design"
                      className="dropdownNav dropend"
                    >
                      <NavDropdown.Item href="">HandBook</NavDropdown.Item>
                      <NavDropdown.Item href="/resources">
                        Resources
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/mentor">
                        Contact Mentor
                      </NavDropdown.Item>
                      <NavDropdown.Item href="">
                        Ask your query
                      </NavDropdown.Item>
                    </NavDropdown>
                  </NavDropdown>
                  <Nav.Link href="/courses" className="navelements">
                    Courses
                  </Nav.Link>
                  <Nav.Link href="/internship" className="navelements">
                    Internships
                  </Nav.Link>
                  <Nav.Link href="/magazine" className="navelements">
                    Magazine
                  </Nav.Link>
                  <Nav.Link href="/campus" className="navelements">
                    Campus
                  </Nav.Link>
                  <Nav.Link href="/hiring" className="navelements">
                    Hiring
                  </Nav.Link>
                  <Nav.Link href="/industry" className="navelements">
                    Industry
                  </Nav.Link>
                  <Nav.Link href="/Team" className="navelements">
                    Team
                  </Nav.Link>
                  <Nav.Link href="/login">
                    <img src={User} alt="" height={40} width={40} />
                  </Nav.Link>
                </Nav>
              </div>
            </div>
          </div>
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;
