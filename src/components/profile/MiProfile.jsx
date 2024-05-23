import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './miprofile.css';
import { useContext, useEffect, useState } from 'react';
import { ENDPOINT } from '../../config/constans.js';
import { Context } from '../../contexts/Context';
import { useNavigate } from 'react-router-dom';

function MiProfile( ) {
  const navigate = useNavigate();
  const { userdata, user } = useContext(Context);

  useEffect(()=> { if(!user){ navigate(`/login/`) }  }, [])

  const {userdata} = useContext(Context);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [nameuser] = userdata.filter( (p) => p.email == user ).map((n)=> (n.nombre))
  const [lastnameuser] = userdata.filter( (p) => p.email == user ).map((l)=> (l.apellido))
//Estado para los errores
const [alert, setAlert] = useState('');
const [message, setMessage] = useState('');

//Función antes de enviar el formulario
const validarInput = (e) => {
     
  // Prevenimos el comportamiento por defecto
  e.preventDefault();

  // Validación input
   if(nombre==='' || apellido==='' || email ==='' || password ==='' || password2 ===''){
         setAlert("danger")
         setMessage("Error:Debe completar todos los datos")
         return
       } 
     
       setAlert("success")
       setMessage("datos ingresados: " + email +"-"+ password)
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
    setAlert("danger")
    setMessage("Error: Las contraseñas no coinciden!!")
    return
   } 
  if(password.length < 8) {
    setAlert("danger")
    setMessage("Error: Las contraseñas de contener más de 8 caracteres!!")
    return
  }
  registrarUsuario(nombre,apellido,email, password)
}

const registrarUsuario = async (nombre, apellido, email, password) => {
  
  const newUser = { nombre:nombre, apellido:apellido, email:email, password:password, activo:true };

  fetch(ENDPOINT.user, {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(newUser)},)
    .then(response => {
      if(!response.ok){
        //console.log(response.message);
        setAlert("danger")
        setMessage("Error: No fué posible ingresar el usuario")
      }
      else{
        //console.log(response.message);
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
      <div className="row mx-auto" >
        <div><h3>Mis tus datos</h3></div>
        <hr />
        <div>
            <Form onSubmit={validarInput}>
            <Alert variant={alert}>{message}</Alert>
              <Form.Group className="mb-3" >
                  <Form.Label><strong>Nombre</strong></Form.Label>
                  <Form.Control type="text" name="nombre"  placeholder={nameuser}
                  onChange={(e) => setNombre(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label><strong>Apellido</strong></Form.Label>
                  <Form.Control type="text" name="apellido" placeholder={lastnameuser}
                  onChange={(e) => setApellido(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label><strong>Correo Electrónico</strong></Form.Label>
                  <Form.Control type="email" name="email" placeholder={user}
                  onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label><strong>Password</strong></Form.Label>
                  <Form.Control type="password" name="password" placeholder="" 
                  onChange={(e) => setPassword(e.target.value)} value='2'/>
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label><strong> confirmar Password</strong></Form.Label>
                  <Form.Control type="password" name="password2" placeholder="********" 
                  onChange={(e) => setPassword2(e.target.value)} value='2'/>
                </Form.Group>
                <div> <Button variant="primary" type="submit"> Guardar </Button> </div>
                
            </Form>
              <br />
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

export default MiProfile;