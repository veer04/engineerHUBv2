import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import "./NavBar.css";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Logo from "./logo.svg";
import User from "./user.svg";
import NavDropdown from "react-bootstrap/NavDropdown";
import ham from "./ham.svg";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Domain from "../Domain/Domain";


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
  const navigate =useNavigate();
  const home = ()=>{
    navigate("/")
  }
  const Domain = ()=>{
    navigate("/domain")
  }
  const courses = ()=>{
    navigate("/courses")
  }
  const events = ()=>{
    navigate("/events")
  }
  const interships = ()=>{
    navigate("/internship")
  }
  return (
    <>
      <div className="row">
        <Navbar className="NAvbarBackground navbar-dark">
          <Container className="mw-100">
            <div className="">
              <Navbar.Brand href="/">
                <img
                  alt=""
                  src={Logo}
                  width="90"
                  height="50"
                  className="d-inline-block align-top"
                />{" "}
              </Navbar.Brand>
            </div>

            <div
              className="collapse navbar-collapse justify-content-end "
              id="navbarTogglerDemo02"
            >
              <div
              className="navelements"
              >
                <Nav className="me-auto navelements ">
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
                    <NavDropdown
                      title="Dev Ops"
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
                    <NavDropdown
                      title="BlockChain"
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
                  <Nav.Link href="login">
                    <img src={User} alt="" height={40} width={40} />
                  </Nav.Link>
                </Nav>
              </div>
            </div>

            <div className="ham-icon">
              <img src={ham} alt="Ham_icon"  />
            </div>
          </Container>

   
        </Navbar>

        <div className="row subNavbar">
       
          <div className="col-2">
          <div className="homesbn">
          <HomeOutlinedIcon 
          sx={{ fontSize: 40}}
        onClick={home}
          color="success"></HomeOutlinedIcon>
        <div className="row">
          {/* home */}
        </div>
        </div>
          </div>
      <div className="col-2">
    <div className="domainssbn">
        <WindowOutlinedIcon
        sx={{ fontSize: 40 }}
        onClick={Domain}
        color="success"
     ></WindowOutlinedIcon>
      <div className="row">
          {/* Domains */}
        </div>
    </div> 
    </div>
    <div className="col-2">
    <div className="coursessbn">
          
<PlayCircleOutlineIcon
sx={{ fontSize: 40 }}
color="success"
onClick={courses}
></PlayCircleOutlineIcon>
<div className="row">
          {/* Courses */}
        </div>
    </div>
    </div>
    <div className="col-2">
    <div className="eventssbn">
<CalendarTodayOutlinedIcon
sx={{ fontSize: 36 }}
onClick={events}
color="success"
></CalendarTodayOutlinedIcon>
<div className="row">
          {/* Events */}
        </div>
    </div>
    </div>
    <div className="col-2">
    <div className="internshipssbn">

<WorkOutlineOutlinedIcon
sx={{ fontSize: 40 }}
onClick={interships}
color="success"
></WorkOutlineOutlinedIcon>
<div className="row">
          {/* Internships */}
        </div>
    </div>
    </div>
  </div>
</div>
    </>
  );
};

export default NavBar;
