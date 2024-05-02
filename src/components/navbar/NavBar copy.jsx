import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import './navbar.css'

function NavBar () {

  return (
      <div style={{ width: '100%', height:'100%', minWidth:"417px"}}>

        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary"  bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="http://www.incotel.cl">Incotel</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                <Link href="" className="text-white ms-3 text-decoration-none"> Home </Link>
                </Nav.Link>
                <Nav.Link >
                  <Link href="/register" className="text-white ms-3 text-decoration-none"> Registrarse </Link>
                  </Nav.Link>
                <Nav.Link >Salir</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </div>
  );
}

export default NavBar;