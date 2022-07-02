import React from 'react'
import './NavBar.css'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Logo from './logo.svg';
import User from './user.svg';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {
 
  return (
    <>
       <div className="row">
  <Navbar className="NAvbarBackground navbar-dark">
    <Container className='mw-100'>
   <div className="col-lg-5 ms-5">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={Logo}
          width="90"
          height="50"
          className="d-inline-block align-top"
        />{' '}
      </Navbar.Brand>
      </div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle nsvigation">
           <span className="navbar-toggler-icon"></span>    
           </button>
           <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <div className="row navelements">
      <Nav className="me-auto  navelements">
      
    
      <NavDropdown title="Domains" id="basic-nav-dropdown">

          <NavDropdown title="DSA(C/C++/JAVA" className='dropdownNav mw-100'>
            <div className="drop">
          <Nav.Item href="">HandBook</Nav.Item>
          <Nav.Item href="">Resources</Nav.Item>
          <Nav.Item href="">Contact Mentor</Nav.Item>
          <Nav.Item href="">Ask your query</Nav.Item>
          </div>
          </NavDropdown>
          
          <NavDropdown   title="Web developement" className='dropdownNav ml-10'>
          
          <NavDropdown.Item href="">HandBook</NavDropdown.Item>
          <NavDropdown.Item href="">Resources</NavDropdown.Item>
          <NavDropdown.Item href="">Contact Mentor</NavDropdown.Item>
          <NavDropdown.Item href="">Ask your query</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="App Development" className='dropdownNav'>
          
          <NavDropdown.Item href="">HandBook</NavDropdown.Item>
          <NavDropdown.Item href="">Resources</NavDropdown.Item>
          <NavDropdown.Item href="">Contact Mentor</NavDropdown.Item>
          <NavDropdown.Item href="">Ask your query</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="ML&AI (PYTHON)" className='dropdownNav'>
          
          <NavDropdown.Item href="">HandBook</NavDropdown.Item>
          <NavDropdown.Item href="">Resources</NavDropdown.Item>
          <NavDropdown.Item href="">Contact Mentor</NavDropdown.Item>
          <NavDropdown.Item href="">Ask your query</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Cyber Security" className='dropdownNav'>
        <div className="dropdownNavv">
          <NavDropdown.Item href="" className='dropdownNav'>HandBook</NavDropdown.Item>
          <NavDropdown.Item href="">Resources</NavDropdown.Item>
          <NavDropdown.Item href="">Contact Mentor</NavDropdown.Item>
          <NavDropdown.Item href="">Ask your query</NavDropdown.Item>
          </div>
          </NavDropdown>
          <NavDropdown title="Dev Ops" className='dropdownNav'>
          
          <NavDropdown.Item href="">HandBook</NavDropdown.Item>
          <NavDropdown.Item href="">Resources</NavDropdown.Item>
          <NavDropdown.Item href="">Contact Mentor</NavDropdown.Item>
          <NavDropdown.Item href="">Ask your query</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="UI/UX Design" className='dropdownNav'>
          
          <NavDropdown.Item href="">HandBook</NavDropdown.Item>
          <NavDropdown.Item href="">Resources</NavDropdown.Item>
          <NavDropdown.Item href="">Contact Mentor</NavDropdown.Item>
          <NavDropdown.Item href="">Ask your query</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="BlockChain" className='dropdownNav'>
          
          <NavDropdown.Item href="">HandBook</NavDropdown.Item>
          <NavDropdown.Item href="">Resources</NavDropdown.Item>
          <NavDropdown.Item href="">Contact Mentor</NavDropdown.Item>
          <NavDropdown.Item href="">Ask your query</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Open Source" className='dropdownNav'>
          <NavDropdown.Item href="">Resources</NavDropdown.Item>
          <NavDropdown.Item href="">Contact Mentor</NavDropdown.Item>``
          <NavDropdown.Item href="">Ask your query</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="SEO/Graphic Design" className='dropdownNav'>
          
          <NavDropdown.Item href="">HandBook</NavDropdown.Item>
          <NavDropdown.Item href="">Resources</NavDropdown.Item>
          <NavDropdown.Item href="">Contact Mentor</NavDropdown.Item>
          <NavDropdown.Item href="">Ask your query</NavDropdown.Item>
          </NavDropdown>
          </NavDropdown>
          <Nav.Link href="" className='navelements'>Courses</Nav.Link>
      <Nav.Link href="" className='navelements'>Internships</Nav.Link>
      <Nav.Link href="" className='navelements'>Magzine</Nav.Link>
      <Nav.Link href="" className='navelements'>Campus</Nav.Link>
      <Nav.Link href="" className='navelements'>Hiring</Nav.Link>
      <Nav.Link href="" className='navelements'>Industry Personalities</Nav.Link>
      <Nav.Link href="" className='navelements'>Team</Nav.Link>
      <Nav.Link href="" ><img src={User} alt="" height={40} width={40} /></Nav.Link>
        </Nav>
        </div>
        </div>
    </Container>
  </Navbar>
  </div>
</>
  )
}

export default NavBar