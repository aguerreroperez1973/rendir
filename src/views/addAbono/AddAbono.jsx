//import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './addabono.css';
import { useContext, useState } from 'react';
//import { abonos } from '../../database/abonos.js';
import Alert from 'react-bootstrap/Alert';
import { Context } from '../../contexts/Context.jsx';

const AddAbono = () => {

  const {data, setData} = useContext(Context);
  let date = new Date();
  let day = `${(date.getDate())}`.padStart(2,'0');
  let month = `${(date.getMonth()+1)}`.padStart(2,'0');
  let year = date.getFullYear();
  const fecha_in =`${day}-${month}-${year}`;

  //const [dataAbonos, setDataAbonos] = useState(abonos);
  const [proyecto, setProyecto] = useState('');
  const [trabajador, setTrabajador] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha_out, setFecha_out] = useState('');

//Estado para los errores
const [alert, setAlert] = useState('');
const [message, setMessage] = useState('');

//Función antes de enviar el formulario
const validarInput = (e) => {
     
  // Prevenimos el comportamiento por defecto
  e.preventDefault();
 // console.log(dataAbonos)
 // console.log("datos ingresados: " + proyecto +"-"+ trabajador +"-"+ descripcion +"-"+ monto +"-"+ fecha_out )

  // Validación input
   if(proyecto === '' || trabajador ==='' || descripcion ==='' || monto ==='' || fecha_out ===''){
         setAlert("danger")
         setMessage("Error:Debe completar todos los datos")
         return
       } 

  validarDatos(proyecto, trabajador, descripcion, monto, fecha_out)
  //registrarAbono(proyecto, trabajador, descripcion, monto, fecha_out)
  //console.log(dataAbonos)
}

const validarDatos = (proyecto, trabajador, descripcion, monto, fecha_out) => {

  const autenticado = data.filter(el => el.proyecto === proyecto && el.trabajador === trabajador)
  if (autenticado != ""){  setAlert("danger")
                           setMessage("Error: El abono ya existe para ese trabajador!!!") 
                          return
                        }
    registrarAbono(proyecto, trabajador, descripcion, monto, fecha_out)        
  }

const registrarAbono = (proyecto, trabajador, descripcion, monto, fecha_out) => {
  console.log("registrar dato")
  //setDataAbonos([...dataAbonos, {proyecto: proyecto, trabajador: trabajador, descripcion: descripcion, monto: monto, fecha_out: fecha_out, activo: "true"} ]);
  setData([...data, {proyecto: proyecto, 
    trabajador: trabajador, 
    descripcion: descripcion,
    monto: monto,
    fecha_in: fecha_in,
    fecha_out: fecha_out,
    activo: "true"} ]);
    
  setAlert("success")
  setMessage("Abono ingresado con exito ")
 
  setProyecto('');
  setTrabajador('');
  setDescripcion('');
  setMonto('');
  setFecha_out('');
  return
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
        <div className="abonobox" >
        <div><h3>Ingresar abono:</h3></div>
        <div>
            <Form onSubmit={validarInput} >

              <Alert variant={alert}>{message}</Alert>
                
                <Form.Group className="mb-3">
                      <Form.Label><strong>Nombre del proyecto</strong></Form.Label>
                      <Form.Control type="text" name="proyecto" placeholder="Ingresar nombre del proyecto"
                      onChange={(e) => setProyecto(e.target.value)} value={proyecto} />
                    </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Label><strong>Nombre Trabajador</strong></Form.Label>
                    <Form.Select aria-label="Default select example" name="trabajador" 
                    onChange={(e) => setTrabajador(e.target.value)} value={trabajador} >
                    <option>Seleccionar... </option>
                    <option value="Ulises Reyes">Ulises Reyes</option>
                    <option value="David Alarcón">David Alarcón</option>
                    <option value="Carlos Guerra">Carlos Guerra</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label><strong>Descripcion del Abono</strong></Form.Label>
                  <Form.Control as="textarea" rows={2} name="descripcion" 
                  onChange={(e) => setDescripcion(e.target.value)} value={descripcion}/>
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label><strong>Monto</strong></Form.Label>
                  <Form.Control type="number" name="monto" placeholder="Ingresar Valor"
                  onChange={(e) => setMonto(e.target.value)} value={monto} />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label><strong>Fecha de cierre</strong></Form.Label>
                  <Form.Control type="date" name="fecha_out" placeholder="Fecha de cierre"
                    onChange={(e) => setFecha_out(e.target.value)} value={fecha_out} />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Guardar
                </Button>
            </Form>
        </div>
       <br />
                <ul>
                    {data.map(abonos => <li key={abonos.id} > {abonos.proyecto} - {abonos.trabajador} - {abonos.descripcion} - {abonos.monto} - {abonos.fecha_in} - {abonos.fecha_out} - {abonos.activo} </li>)}
                </ul>
      </div>
      </>
  )

}

export default AddAbono