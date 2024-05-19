import { useContext, useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import MiProfile from '../../components/profile/MiProfile'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../contexts/Context';

function Profile() {
  const { setUser } = useContext(Context);
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("user");

  useEffect(()=> { if(!token){ navigate(`/login/`) } 
                        else { setUser(username) } }, [])

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