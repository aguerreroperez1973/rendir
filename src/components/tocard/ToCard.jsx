//import { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

const ToCard = ( {abono} ) => {

  const navigate = useNavigate();
   
  const irAPersonajes = () => {
    navigate(`/rendicion/${abono.id}`);
    };
  
  return (
    <>
      <Card
          bg="light"
          style={{ width: "18rem"}}
          className="mb-2"
        >
        <Card.Header>Nombre: {abono.trabajador}</Card.Header>
          <Card.Body>
            <Card.Title>Proyecto: { abono.proyecto} </Card.Title>
            <Card.Text> Descripción:  {abono.descripcion}</Card.Text>
            <hr />
            <Card.Text> Monto: $ {abono.monto} </Card.Text>
            <hr />
            <div><Button variant="primary" onClick={ irAPersonajes }>Ir a Rendición</Button></div> 
          </Card.Body>
        </Card>
    </>
  );
}

export default ToCard;