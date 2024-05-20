import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Context } from "../../contexts/Context";
import Alert from 'react-bootstrap/Alert';
import { useNavigate, useParams } from "react-router-dom";
import { ENDPOINT } from '../../config/constans.js';
import RendicionTable from "./RendicionTable.jsx";

const RendicionForm = () => {
  const { data, rendiciones, setRendiciones, setUser} = useContext(Context);
  
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("user");

  useEffect(()=> { if(!token){ navigate(`/login/`) } 
                        else { setUser(username) } }, [])

    const [monto, setMonto] = useState('');
    const [tipo_gasto, setTipo_gasto] = useState('');
    const [tipo_doc, setTipo_doc] = useState('');
    const [number_doc, setNumber_doc] = useState('');
    const [detalle, setDetalle] = useState('');
    const [show, setShow] = useState(false);

  ///// ID del abono ////////////////////////////////////////////
  const { id } = useParams();
    
  ///// traer el monto del abono a rendir ////////////////////////////
  const datoAbonoMonto = data.filter((el) => el.id == id).map( (a) => { return a.monto } )
  const [datoAbonoUser] = data.filter((el) => el.id == id).map( (a) => { return a.user_id } )

  ///// preparar fecha el dia ////////////////////////////////////////
  let date = new Date();
  let day = `${(date.getDate())}`.padStart(2,'0');
  let month = `${(date.getMonth()+1)}`.padStart(2,'0');
  let year = date.getFullYear();
  const fecha_in =`${year}-${month}-${day}`;
    
  //// Estado para los errores ////////////////////////////////////////
    const [alert, setAlert] = useState('');
    const [message, setMessage] = useState('');

  /////// Procesar formulario //////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleSubmit = (e) => {
    
    const saldo = datoAbonoMonto - monto;
    let token = localStorage.getItem('token')

    // Prevenimos el comportamiento por defecto
    e.preventDefault(); 

    // Validación input
   if(monto === '' || tipo_gasto ==='' || tipo_doc === 'Seleccionar..' || number_doc ==='' || detalle ===''){
    setShow(true)
    setAlert("danger")
    setMessage("Error:Debe completar todos los datos")
    return
  } 

  //////////// crear objeto para cargar ////////////////////////////////
      const newItem = { 
      monto: monto, 
      tipo_gasto: tipo_gasto,
      tipo_doc: tipo_doc,
      number_doc: number_doc,
      fecha_in: fecha_in,
      activo: true,
      abono_id: id,
      detalle: detalle,
      user_id: datoAbonoUser,
      saldo: saldo
    }

  ///////////// enviar datos a la BD ////////////////////////////////
  fetch(ENDPOINT.rendicion, {
    method: "POST",
    headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
    body: JSON.stringify(newItem)},) 
    .then(response => {
          if(!response.ok){
            setShow(true)
            setAlert("danger")
            setMessage("Error: No fué posible ingresar la rendición")
          }
          else{ 
                    setShow(true)
                    setAlert("success")
                    setMessage("Rendición ingresada con exito")
                    setRendiciones([...rendiciones, { monto: monto, 
                      tipo_gasto: tipo_gasto,
                      tipo_doc: tipo_doc,
                      number_doc: number_doc,
                      fecha_in: fecha_in,
                      activo: true,
                      abono_id: id,
                      detalle: detalle,
                      user_id: datoAbonoUser,
                      saldo: saldo }])
              return
      }})
    .catch((err) => {console.log(err)})
    ///////////////////////////////////////////////////////////
   
    setMonto('');
    setTipo_gasto('');
    setTipo_doc('');
    setNumber_doc('');
    setDetalle('');

    /*const ClosedRendi = () => {
     console.log("pendiente")
      };*/
  };

  return (
    <div>
      <div className="row col-10 col-sm-9 col-md-8 col-lg-6 mx-auto mt-5 border border-light rounded p-4" >
      <div><h3>Realizar rendición por $ {datoAbonoMonto} </h3></div>
      <hr />
      <Form onSubmit={handleSubmit} >
        <Form.Group className="mb-3 col-12 col-md">

        <Alert variant={alert} show={show}  onClose={() => setShow(false)}    dismissible> {message} </Alert>

          <Form.Label>Monto</Form.Label>
          <Form.Control
            type="number"
            name="monto"
            onChange={(e) => setMonto(e.target.value )}
            value={monto} />
        </Form.Group>

        <Form.Group
          className="mb-3 col-12 col-md"
          controlId="formBasicEmail" >
          <Form.Label>Tipo de Gasto</Form.Label>
          <Form.Control
            type="text"
            name="tipo_gasto"
            onChange={(e) => setTipo_gasto(e.target.value)}
            value={tipo_gasto} />
        </Form.Group>

        <Form.Group
          className="mb-3 col-12 col-md"
          controlId="formBasicEmail" >
          <Form.Label>Boleta/Factura</Form.Label>
          <Form.Select
            type="text"
            name="tipo_doc"
            onChange={(e) => setTipo_doc(e.target.value)} value={tipo_doc}>
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
            value={number_doc} />
        </Form.Group>

        <Form.Group
          className="mb-3 col-12"
          controlId="formBasicEmail">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            name="detalle"
            onChange={(e) => setDetalle(e.target.value)}
            value={detalle} />
        </Form.Group>
      <div className="flex" >
            <Button
            variant="primary"
            className="col-5 col-sm-4 col-md-3 mx-auto"
            type="submit" >
            Agregar
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <Button
            variant="primary"
            className="col-5 col-sm-4 col-md-3 mx-auto">
            Cerrar
          </Button></div>
    </Form>
    </div>

    <div><RendicionTable abono_id={id} /></div> {/*ID del abono*/}

    </div>
  );
};
export default RendicionForm;