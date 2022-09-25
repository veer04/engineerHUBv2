import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Logo from "./logo.svg";
import User from "./user.svg";
import NavDropdown from "react-bootstrap/NavDropdown";

import PlayCircleOutlineIcon from "./subNavbarIcon/PlayCircleOutlineIcon.svg";
import WindowOutlinedIcon from "./subNavbarIcon/WindowOutlinedIcon.svg";
import WorkOutlineOutlinedIcon from "./subNavbarIcon/WorkOutlineOutlinedIcon.svg";
import HomeOutlinedIcon from "./subNavbarIcon/HomeOutlinedIcon.svg";
import CalendarTodayOutlinedIcon from "./subNavbarIcon/CalendarTodayOutlinedIcon.png";

const NavBar = () => {
  const [domainData, setDomainData] = useState([]);

  useEffect(() => {
    const getDomainDetails = async () => {
      const response = await axios.get(
        `https://ehubbackend.herokuapp.com/api/v1/domain`
      );

      setDomainData(response.data);
    };
    console.log(domainData);
    getDomainDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();
  const home = () => {
    navigate("/");
  };
  const domain = () => {
    navigate("/hiring");
  };
  const courses = () => {
    navigate("/courses");
  };
  const events = () => {
    navigate("/campus");
  };
  const internships = () => {
    navigate("/internship");
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            {" "}
            <img
              alt=""
              src={Logo}
              width="68"
              height="50"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown
                title="Domains"
                className="navelements"
                id="basic-nav-dropdown"
              >
                <NavDropdown
                  title="DSA (C/C++)"
                  className="dropdownNav dropend"
                >
                  <NavDropdown.Item
                    href="http://www.africau.edu/images/default/sample.pdf"
                    target="_blank"
                  >
                    HandBook
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/resources">
                    Resources
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/mentor">
                    Contact Mentor
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    target="_blank"
                    href="https://discord.gg/ZMZAEZ5NfA"
                  >
                    Ask your query
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title="Web developement"
                  className="dropdownNav dropend "
                >
                  <NavDropdown.Item
                    href="http://www.africau.edu/images/default/sample.pdf"
                    target="_blank"
                  >
                    HandBook
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/resources">
                    Resources
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/mentor">
                    Contact Mentor
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    target="_blank"
                    href="https://discord.gg/ZMZAEZ5NfA"
                  >
                    Ask your query
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="App Development"
                  className="dropdownNav dropend "
                >
                  <NavDropdown.Item
                    href="http://www.africau.edu/images/default/sample.pdf"
                    target="_blank"
                  >
                    HandBook
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/resources">
                    Resources
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/mentor">
                    Contact Mentor
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    target="_blank"
                    href="https://discord.gg/ZMZAEZ5NfA"
                  >
                    Ask your query
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="ML&AI (PYTHON)"
                  className="dropdownNav dropend "
                >
                  <NavDropdown.Item
                    href="http://www.africau.edu/images/default/sample.pdf"
                    target="_blank"
                  >
                    HandBook
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/resources">
                    Resources
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/mentor">
                    Contact Mentor
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    target="_blank"
                    href="https://discord.gg/ZMZAEZ5NfA"
                  >
                    Ask your query
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Cyber Security"
                  className="dropdownNav dropend "
                >
                  <div className="dropdownNav dropend ">
                    <NavDropdown.Item
                      href="http://www.africau.edu/images/default/sample.pdf"
                      className="dropdownNav dropend"
                    >
                      HandBook{" "}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/resources">
                      Resources
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/mentor">
                      Contact Mentor
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      target="_blank"
                      href="https://discord.gg/ZMZAEZ5NfA"
                    >
                      Ask your query
                    </NavDropdown.Item>
                  </div>
                </NavDropdown>
                <NavDropdown title="Dev Ops" className="dropdownNav dropend">
                  <NavDropdown.Item
                    href="http://www.africau.edu/images/default/sample.pdf"
                    target="_blank"
                  >
                    HandBook
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/resources">
                    Resources
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/mentor">
                    Contact Mentor
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    target="_blank"
                    href="https://discord.gg/ZMZAEZ5NfA"
                  >
                    Ask your query
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="UI/UX Design"
                  className="dropdownNav dropend"
                >
                  <NavDropdown.Item
                    href="http://www.africau.edu/images/default/sample.pdf"
                    target="_blank"
                  >
                    HandBook
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/resources">
                    Resources
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/mentor">
                    Contact Mentor
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    target="_blank"
                    href="https://discord.gg/ZMZAEZ5NfA"
                  >
                    Ask your query
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="BlockChain" className="dropdownNav dropend">
                  <NavDropdown.Item
                    href="http://www.africau.edu/images/default/sample.pdf"
                    target="_blank"
                  >
                    HandBook
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/resources">
                    Resources
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/mentor">
                    Contact Mentor
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    target="_blank"
                    href="https://discord.gg/ZMZAEZ5NfA"
                  >
                    Ask your query
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Open Source"
                  className="dropdownNav dropend"
                >
                  /resources
                  <NavDropdown.Item href="">Resources</NavDropdown.Item>
                  <NavDropdown.Item href="/mentor">
                    Contact Mentor
                  </NavDropdown.Item>
                  ``
                  <NavDropdown.Item
                    target="_blank"
                    href="https://discord.gg/ZMZAEZ5NfA"
                  >
                    Ask your query
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="SEO/Graphic Design"
                  className="dropdownNav dropend"
                >
                  <NavDropdown.Item
                    href="http://www.africau.edu/images/default/sample.pdf"
                    target="_blank"
                  >
                    HandBook
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/resources">
                    Resources
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/mentor">
                    Contact Mentor
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    target="_blank"
                    href="https://discord.gg/ZMZAEZ5NfA"
                  >
                    Ask your query
                  </NavDropdown.Item>
                </NavDropdown>
              </NavDropdown>
              <Nav.Link href="/courses">Courses</Nav.Link>
              <Nav.Link href="/internship">Internship</Nav.Link>
              <Nav.Link href="/magazine">Magazine</Nav.Link>
              <Nav.Link href="/campus">Campus</Nav.Link>
              <Nav.Link href="/hiring">Hiring</Nav.Link>
              <Nav.Link href="/industry">Industry</Nav.Link>
              <Nav.Link href="/team">Team</Nav.Link>
              <Nav.Link href="login" className="desk-tab--view">
                <img src={User} alt="" height={40} width={40} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
       
      </Navbar>
      <div className="row subNavbar">
          <div className="col-2">
            <div className="homesbn">
            <img src={HomeOutlinedIcon} alt="" style={{ width:"23px" }} onClick={() => home()}/>
              <div className="row">{/* home */}</div>
            </div>
          </div>
          <div className="col-2">
            <div className="domainssbn">
            <img src={WindowOutlinedIcon} alt="" style={{ width:"23px" }} onClick={() => domain()}/>
              <div className="row">{/* Domains */}</div>
            </div>
          </div>
          <div className="col-2">
            <div className="coursessbn">
            <img src={PlayCircleOutlineIcon} alt="" style={{ width:"23px" }} onClick={() => courses()}/>
              <div className="row">{/* Courses */}</div>
            </div>
          </div>
          <div className="col-2">
            <div className="eventssbn">
            <img src={CalendarTodayOutlinedIcon} style={{width: "25px"}} alt="" onClick={() => events()}/>
              <div className="row">{/* Events */}</div>
            </div>
          </div>
          <div className="col-2">
            <div className="internshipssbn">
              <img src={WorkOutlineOutlinedIcon} alt="" style={{ width:"23px" }} onClick={() => internships()}/>
              <div className="row">{/* Internships */}</div>
            </div>
          </div>
        </div>
    </>
  );
};

export default NavBar;
