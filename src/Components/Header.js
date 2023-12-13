import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Cart } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function Header(props) {
  const router = useNavigate();
  function handleLogout() {
    router('/');
    toast.success("Logout Successfully")
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => props.handleShow(false)}>
          <big>Precious Purse</big>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">    
          </Nav>
          <Button variant="light" onClick={handleLogout} style={{marginRight: '10px'}}>Logout</Button>
          <Nav>
            <div
              className="nav-link"
              onClick={() => props.handleShow(true)}
            >
             <b><Cart size={20} /><sup>{props.count}</sup></b>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

