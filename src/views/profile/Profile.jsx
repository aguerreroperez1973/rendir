import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import MiProfile from '../../components/profile/MiProfile'

function Profile() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Mi Perfil</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
         <MiProfile />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Profile;