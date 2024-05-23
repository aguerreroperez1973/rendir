import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './register.css';
import { useContext, useState } from 'react';
//import { user } from '../../database/user.js';
import { ENDPOINT } from '../../config/constans.js';
import { Context } from '../../contexts/Context';
import { useNavigate } from 'react-router-dom';

function Register() {
  
  const navigate = useNavigate();

  const {userdata} = useContext(Context);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

//Estado para los errores
const [alert, setAlert] = useState('');
const [message, setMessage] = useState('');
const [show, setShow] = useState(false);

const cerrarAlerta = () => {
  setShow(false)
  navigate(`/login/`);
}

//Función antes de enviar el formulario
const validarInput = (e) => {
     
  // Prevenimos el comportamiento por defecto
  e.preventDefault();

  // Validación input
   if(nombre==='' || apellido==='' || email ==='' || password ==='' || password2 ===''){
         setShow(true)
         setAlert("danger")
         setMessage("Error:Debe completar todos los datos")
         return
       } 
     
      // setAlert("success")
      // setMessage("datos ingresados: " + email +"-"+ password)
  validarDatos(nombre,apellido,email,password, password2)
}

const validarDatos = (nombre,apellido,email) => {
  
  const autenticado = userdata.filter(el => el.email === email || el.nombre === nombre || el.apellido === apellido)
  if (autenticado != ""){  setAlert("danger")
                            setMessage("Error: El usuario ya existe !!!") 
                          return
                        }
      validarPassword(password,password2)                
  }

const validarPassword = (password, password2)=>{
  console.log("validar pass")
  if(password != password2) { 
    setShow(true)
    setAlert("danger")
    setMessage("Error: Las contraseñas no coinciden!!")
    return
   } 
  if(password.length < 8) {
    setShow(true)
    setAlert("danger")
    setMessage("Error: Las contraseñas de contener más de 8 caracteres!!")
    return
  }
  registrarUsuario(nombre, apellido, email, password)
}

const registrarUsuario = async (nombre, apellido, email, password) => {
  
  const newUser = { nombre:nombre, apellido:apellido, email:email, password:password, activo:true };

  fetch(ENDPOINT.user, {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(newUser)},)
    .then(response => {
      if(!response.ok){
        console.log(response.message);
        setShow(true)
        setAlert("danger")
        setMessage("Error: No fué posible ingresar el usuario")
      }
      else{console.log(response.message);
        setShow(true)
        setAlert("success")
        setMessage("Usuario ingresado con exito")}
      })
    .catch((err) => {console.log(err)})

   

  setNombre('');
  setApellido('');
  setEmail('');
  setPassword('');
  setPassword2('');
  return
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="row col-10 col-sm-9 col-md-8 col-lg-6 mx-auto mt-5 border border-light rounded p-4" >
        <div><h3>Ingresar tus datos</h3></div>
        <hr />
        <div>
            <Form onSubmit={validarInput}>
            <Alert variant={alert} show={show}  onClose={cerrarAlerta } dismissible> {message} </Alert>
              <Form.Group className="mb-3" >
                  <Form.Label><strong>Nombre</strong></Form.Label>
                  <Form.Control type="text" name="nombre" placeholder="Ingresar nombre"
                  onChange={(e) => setNombre(e.target.value)} value={nombre} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label><strong>Apellido</strong></Form.Label>
                  <Form.Control type="text" name="apellido" placeholder="Ingresar tu apellido"
                  onChange={(e) => setApellido(e.target.value)} value={apellido} />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label><strong>Correo Electrónico</strong></Form.Label>
                  <Form.Control type="email" name="email" placeholder="Ingresar email"
                  onChange={(e) => setEmail(e.target.value)} value={email} />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label><strong>Password</strong></Form.Label>
                  <Form.Control type="password" name="password" placeholder="Password" 
                  onChange={(e) => setPassword(e.target.value)} value={password}/>
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label><strong> confirmar Password</strong></Form.Label>
                  <Form.Control type="password" name="password2" placeholder="Password" 
                  onChange={(e) => setPassword2(e.target.value)} value={password2}/>
                </Form.Group>
                <div> <Button variant="primary" type="submit"> Guardar </Button> </div>
                
            </Form>
              <br />
              <div className="alert alert-primary d-flex align-items-center" role="alert">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                  </svg>      
                          
                  <div>
                      An example alert with an icon
                  </div>
              </div>
              
              {/* <ul>
                    {userdata.map(user => <li key={user.nombre} >
                                            {user.nombre}-{user.apellido}-{user.email}
                                          </li>)}
                    </ul>*/}
        </div>
      </div>
    </>
  );
}

export default Register;