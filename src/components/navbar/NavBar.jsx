import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'

function NavBar () {

  return (
      <div style={{ width: '100%', height:'100%', minWidth:"395px"}}>

    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="http://www.incotel.cl"> Incotel </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll>
              
            <Nav.Link href="/home" >Home</Nav.Link>
            <Nav.Link href="/abono" >Ingresar abono</Nav.Link>
            <Nav.Link href="/register">Registrar</Nav.Link>
            <Nav.Link href="/rendiciones">Rendicion</Nav.Link>

          </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
       
      </div>
  );
}

export default NavBar;