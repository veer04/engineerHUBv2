import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import "./NavBar.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo1 from "./Images/logo1.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Bucket_URL } from "../../services/APIUtils";
import Cookies from 'js-cookie';
import { cancelToken, getDomains} from "../../services/APIConfig";
import { Avatar } from "@mui/material";
import {useSignOut} from 'react-auth-kit';
import {useIsAuthenticated} from 'react-auth-kit';
const NavBar = () => {
  const [domainData, setDomainData] = useState([]);
  const [userName, setUserName] = useState('');
  const isAuthenticated=useIsAuthenticated();
  const singOut = useSignOut();
  useEffect(() => {
    getDomains(setDomainData);
    const cookieUserName = Cookies.get('_auth_state');
  
    if (cookieUserName) {
      setUserName(cookieUserName.slice(6,-12));
    }

      return () => {
      cancelToken.cancel();
    };
  }, []);
  
  const routeCourse=()=>{
    navigate("/udaan");
  }
 
  const routeIntership=()=>{
    navigate("/internship")
  }
  const routeMagazine=()=>{
    navigate("/magazine");
  }
  const routeCampus=()=>{
    navigate("/campus");
  }
  const routeHiring=()=>{
    navigate("/hiring");
  }
  const routeIndustry=()=>{
    navigate("/industry");
  }
  const routeTeam=()=>{
    navigate("/teams")
  }

const avatarChange=()=>{
 
  if (isAuthenticated)
  {
    Cookies.remove('_auth_state');
    setUserName('');
    singOut();
  }
  
}

  const navigate = useNavigate();
  const home = () => {
    navigate("/");
  };
  const domain = () => {
    navigate("/domain");
  };
  const courses = () => {
    navigate("/udaan");
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
        <Container className="nav-cont">
          <Navbar.Brand href="/">
            {" "}
            <img
              alt="logo"
              src={logo1}
              width="100"
              height="50"
              position="relative"
              left="-50px"
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
                {domainData.map((domain, i) => {
                  return (
                    <NavDropdown
                      title={domain}
                      className="dropdownNav dropend"
                      key={`${i}domain`}
                    >
                      <NavDropdown.Item href={`${Bucket_URL}image/handbooks/pdf/${domain}.pdf`} target="_blank">
                        HandBook
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`/mentors/${domain}`}>
                        Contact Mentor
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`/resources/${domain}`}>
                        Resources
                      </NavDropdown.Item>
                     
                      <NavDropdown.Item
                        target="_blank"
                        href="https://discord.gg/ZMZAEZ5NfA"
                      >
                        Ask your query
                      </NavDropdown.Item>
                    </NavDropdown>
                  );
                })}
              </NavDropdown>

              <Nav.Link  onClick={()=>routeCourse() }>Courses</Nav.Link>
              <Nav.Link onClick={()=>routeIntership()}>Internship</Nav.Link>
              <Nav.Link onClick={()=>routeMagazine()} >Magazine</Nav.Link>
              <Nav.Link onClick={()=>routeCampus()} >Campus</Nav.Link>
              <Nav.Link onClick={()=>routeHiring()} >Hiring</Nav.Link>
              <Nav.Link  onClick={()=>routeIndustry()} >Industry</Nav.Link>
              <Nav.Link  onClick={()=>routeTeam()} >Team</Nav.Link>
              {/* <Nav.Link href="/login">
            <Avatar></Avatar>
            </Nav.Link> */}
                <Nav.Link href="/login">
                {userName ? (
        <>
          <span  className="userlginamtxt">Welcome, {userName}!</span>
          <button className="btnlgout" onClick={avatarChange}>Logout</button>
        </>
      ) : (
        <Avatar></Avatar>
      )}
                </Nav.Link>  
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="row subNavbar">
        <div className="col-2">
          <div className="homesbn subn">
            <img
              src={`${Bucket_URL}image/SubNavbarIcons/HomeOutlinedIcon.svg`}
              alt=""
              style={{ width: "23px" }}
              onClick={() => home()}
            />
            <div className="row">{/* home */}</div>
          </div>
        </div>
        <div className="col-2">
          <div className="domainssbn subn">
            <img
              src={`${Bucket_URL}image/SubNavbarIcons/WindowOutlinedIcon.svg`}
              alt=""
              style={{ width: "23px" }}
              onClick={() => domain()}
            />
            <div className="row">{/* Domains */}</div>
          </div>
        </div>
        <div className="col-2">
          <div className="coursessbn subn">
            <img
              src={`${Bucket_URL}image/SubNavbarIcons/PlayCircleOutlineIcon.svg`}
              alt=""
              style={{ width: "23px" }}
              onClick={() => courses()}
            />
            <div className="row">{/* Courses */}</div>
          </div>
        </div>
        <div className="col-2">
          <div className="eventssbn subn">
            <img
              src={`${Bucket_URL}image/SubNavbarIcons/CalendarTodayOutlinedIcon.png`}
              style={{ width: "25px" }}
              alt=""
              onClick={() => events()}
            />
            <div className="row">{/* Events */}</div>
          </div>
        </div>
        <div className="col-2">
          <div className="internshipssbn subn">
            <img
              src={`${Bucket_URL}image/SubNavbarIcons/WorkOutlineOutlinedIcon.svg`}
              alt=""
              style={{ width: "23px" }}
              onClick={() => internships()}
            />
            <div className="row">{/* Internships */}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
