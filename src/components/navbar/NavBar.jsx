import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
//import { Link, Navigate } from 'react-router-dom';

function NavBar () {

  /*const handleClick = (e) => {
    //Navigate(`/miperfil/${user_id}`);
    console.log(e.target);
    Navigate(`/perfil/3`);
    };*/

  return (
      <div style={{ width: '100%', height:'100%', minWidth:"395px"}}>


          <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container fluid>
              <Navbar.Brand href="http://www.incotel.cl"> Incotel </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              
              <Navbar.Collapse >
                <Nav
                  className="me-auto my-2 my-lg-0 flex"
                  style={{ maxHeight: '100px' }}
                  navbarScroll> 
                  <Nav.Link href="/home" >Home</Nav.Link>
                  <Nav.Link href="/abono" >Ingresar abono</Nav.Link>
                {/* <Nav.Link href="/register">Registrar</Nav.Link> // solo para implementacion */}
                {/* <Nav.Link href="/rendicion">Rendicion</Nav.Link> // solo para implementacion */}
                </Nav>
              </Navbar.Collapse>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="/perfil"  title="ir a mi Perfil" >User</a>
                </Navbar.Text>
              </Navbar.Collapse>

            </Container>
          </Navbar>
       
      </div>
  );
}

export default NavBar;