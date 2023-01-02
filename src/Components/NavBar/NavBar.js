import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import "./NavBar.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo1 from "./Images/logo1.png";
import { signInFormSubmit } from "../../services/APIConfig";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Bucket_URL } from "../../services/APIUtils";

import { cancelToken, getDomains } from "../../services/APIConfig";
import { Avatar } from "@mui/material";

// import CustomDropdown from "./CustomDropdown";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: (props) => props.validate ? 'grey' : 'red'
//   },
// }));
const NavBar = () => {
  // const classes = useStyles(props);
  // var validate=false;
  const [domainData, setDomainData] = useState([]);
  const [validation, setValidation]=useState(false);
  const [values, setValues] = useState("");
  // const [resData, setResData]=useState([]);
  useEffect(() => {
    getDomains(setDomainData);
    return () => {
      cancelToken.cancel();
    };
  }, []);
const newAvatar =()=>
{

}  
const avatarChange=()=>{
signInFormSubmit(values,setValidation);
}
if(validation===true)
{ 
  // validate=true;
newAvatar();
}



  const navigate = useNavigate();
  const home = () => {
    navigate("/");
  };
  const domain = () => {
    navigate("/domain");
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

              <Nav.Link href="/courses">Courses</Nav.Link>
              <Nav.Link href="/internship">Internship</Nav.Link>
              <Nav.Link href="/magazine">Magazine</Nav.Link>
              <Nav.Link href="/campus">Campus</Nav.Link>
              <Nav.Link href="/hiring">Hiring</Nav.Link>
              <Nav.Link href="/industry">Industry</Nav.Link>
              <Nav.Link href="/teams">Team</Nav.Link>
              {/* <Nav.Link href="/login">
              <Avatar 
              // className={classes.root}
               onClick={avatarChange}></Avatar>

              </Nav.Link> */}
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
