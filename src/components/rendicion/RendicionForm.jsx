import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Context } from "../../contexts/Context";
import Alert from 'react-bootstrap/Alert';
import { useParams } from "react-router-dom";

const RendicionForm = () => {
    const {data, rendicion, setRendicion } = useContext(Context);
    const [monto, setMonto] = useState('');
    const [tipo_gasto, setTipo_gasto] = useState('');
    const [tipo_doc, setTipo_doc] = useState('');
    const [number_doc, setNumber_doc] = useState('');
    const [detalle, setDetalle] = useState('');

    //console.log(data)
  const { id } = useParams();
    
  // traer el monto del abono a rendir
    const valor = data.filter((el) => el.id == id).map( (p) => {return  p.monto})
    
   //Estado para los errores
    const [alert, setAlert] = useState('');
    const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    const dato = valor - monto;
    console.log(dato)
    e.preventDefault(); 
    
    setRendicion([...rendicion, {monto: monto, tipo_gasto: tipo_gasto, tipo_doc: tipo_doc, number_doc: number_doc, detalle: detalle, saldo: dato}])
    setAlert("success");
    setMessage("Item agregado con exito");
   
  };

  return (
    <div className="row col-10 col-sm-9 col-md-8 col-lg-6 mx-auto mt-5 border border-light rounded p-4" >
    <div><h3>Realizar rendición por ${valor} </h3></div>
    <hr />
    <Form onSubmit={handleSubmit} >
      <Form.Group className="mb-3 col-12 col-md">
      <Alert variant={alert}>{message}</Alert>
        <Form.Label>Monto</Form.Label>
        <Form.Control
          type="number"
          name="monto"
          onChange={(e) => setMonto(e.target.value )}
        />
      </Form.Group>

      <Form.Group
        className="mb-3 col-12 col-md"
        controlId="formBasicEmail" >
        <Form.Label>Tipo de Gasto</Form.Label>
        <Form.Control
          type="text"
          name="tipo_gasto"
          onChange={(e) => setTipo_gasto(e.target.value)}
        />
      </Form.Group>

      <Form.Group
        className="mb-3 col-12 col-md"
        controlId="formBasicEmail" >
        <Form.Label>Boleta/Factura</Form.Label>
        <Form.Select
          type="text"
          name="tipo_doc"
          onChange={(e) => setTipo_doc(e.target.value)}>
            <option>Seleccionar..</option>
            <option value="Boleta">Boleta</option>
            <option value="Bactura">Factura</option>
        </Form.Select>
      </Form.Group>

      <Form.Group
        className="mb-3 col-12 col-md"
        controlId="formBasicEmail" >
        <Form.Label>N° Factura/boleta</Form.Label>
        <Form.Control
          type="number"
          name="number_doc"
          onChange={(e) => setNumber_doc( e.target.value)}
        />
      </Form.Group>

      <Form.Group
        className="mb-3 col-12"
        controlId="formBasicEmail">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          type="text"
          name="deralle"
          onChange={(e) => setDetalle(e.target.value)}
        />
      </Form.Group>

      <Button
        variant="primary"
        className="col-5 col-sm-4 col-md-3 mx-auto"
        type="submit" >
        Agregar
      </Button>
    </Form>
    </div>
  );
};
export default RendicionForm;