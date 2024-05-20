//import { abonos } from '../../database/abonos.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './addabono.css';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../contexts/Context.jsx';
import { ENDPOINT } from '../../config/constans.js';
import { useNavigate } from 'react-router-dom';

const AddAbono = () => {
  
  const { data, setUser } = useContext(Context);
  
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("user");

  useEffect(()=> { if(!token){ navigate(`/login/`) } 
                        else { setUser(username) } }, [])

  //// preparar fecha el dia ////////////////////////////////
  let date = new Date();
  let day = `${(date.getDate())}`.padStart(2,'0');
  let month = `${(date.getMonth()+1)}`.padStart(2,'0');
  let year = date.getFullYear();
  const fecha_in =`${year}-${month}-${day}`;

  //const [dataAbonos, setDataAbonos] = useState(abonos);
  const [proyecto, setProyecto] = useState('');
  const [user_id, setUser_id] = useState('');
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

  // Validación input
   if(proyecto === '' || user_id ==='' || descripcion ==='' || monto ==='' || fecha_out ===''){
         setAlert("danger")
         setMessage("Error:Debe completar todos los datos")
         return
       } 

  validarDatos(proyecto, user_id, descripcion, monto, fecha_out)
}

const validarDatos = (proyecto, user_id, descripcion, monto, fecha_out) => {

  const autenticado = data.filter(el => el.proyecto === proyecto && el.user_id === user_id)
  if (autenticado != ""){  setAlert("danger")
                           setMessage("Error: El abono ya existe para ese trabajador!!!") 
                          return
                        }
    registrarAbono(proyecto, user_id, descripcion, monto, fecha_out)        
  }

const registrarAbono = (proyecto, user_id, descripcion, monto, fecha_out) => {

  const newAbono = {  
              proyecto: proyecto, 
              descripcion: descripcion,
              monto: monto,
              fecha_in: fecha_in,
              fecha_out: fecha_out,
              activo: true,
              user_id: user_id, 
             // rendicion_id: 999
            };
  
  fetch(ENDPOINT.abono , {
    method: "POST",
    headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
    body: JSON.stringify(newAbono)},) 
    .then(response => {
      if(!response.ok){
        console.log(response.ok);
        setAlert("danger")
        setMessage("Error: No fué posible ingresar el abono")
      }
      else{console.log(response.ok);
        setAlert("success")
        setMessage("Abono ingresado con exito")}
      })
    .catch((err) => {console.log(err)})
 
  setProyecto('');
  setUser_id('');
  setDescripcion('');
  setMonto('');
  setFecha_out('');
  return
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
        <div className="row col-10 col-sm-9 col-md-8 col-lg-6 mx-auto mt-5 border border-light rounded p-4" >
        <div><h3>Ingresar abono:</h3></div>
        <hr />
        <div>
            <Form onSubmit={validarInput} > <Alert variant={alert}>{message}</Alert>
                <Form.Group className="mb-3">
                      <Form.Label><strong>Nombre del proyecto</strong></Form.Label>
                      <Form.Control type="text" name="proyecto" placeholder="Ingresar nombre del proyecto"
                      onChange={(e) => setProyecto(e.target.value)} value={proyecto} />
                    </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Label><strong>Nombre del Trabajador</strong></Form.Label>
                    <Form.Select aria-label="Default select example" name="trabajador" 
                    onChange={(e) => setUser_id(e.target.value)} value={user_id} >
                    <option>Seleccionar... </option>
                    <option value="1">Ulises Reyes</option>
                    <option value="2">José Fuentes</option>
                    <option value="3">Luis Chamorro</option>
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
              {/*}  <ul>
                    {data.map(abonos => <li key={abonos.id} > {abonos.proyecto} - 
                    {abonos.trabajador} - {abonos.descripcion} - {abonos.monto} - 
                    {abonos.fecha_in} - {abonos.fecha_out} - {abonos.activo} </li>)}
                    </ul> */}
      </div>
      </>
  )

}

export default AddAbono