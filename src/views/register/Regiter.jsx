import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './register.css';
import { useState } from 'react';
import { user } from '../../database/user.js';

function Register() {

  const [datauser, setDataUser] = useState(user);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

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
         //console.log("Error:Debe completar todos los datos")
         return
       } 
     
       setAlert("success")
       setMessage("datos ingresados: " + email +"-"+ password)
       //console.log("datos ingresados: " + email +"-"+ password)

  validarDatos(nombre,apellido,email,password, password2)
 
  //registrarUsuario(nombre,apellido,email,password)

  /*setNombre('');
  setApellido('');
  setEmail('');
  setPassword('');
  setPassword2('');
  console.log(datauser)*/
  console.log(datauser)
}

const validarDatos = (nombre,apellido,email) => {
  console.log("validar datos")
  const autenticado = user.filter(el => el.email === email || el.nombre === nombre || el.apellido === apellido)
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

const registrarUsuario = (nombre, apellido, email, password) => {
  console.log("registrar usuario ")
  console.log(nombre, apellido, email, password)
  setDataUser([...datauser, {nombre: nombre, apellido: apellido, email: email, password: password, activo: "true"}]);
  setAlert("success")
  setMessage("Usuario ingresado con exito ")
 
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
      <div className="registerbox" >
        <div><h3>Ingresar tus datos</h3></div>
        <div>
            <Form onSubmit={validarInput}>

            <Alert variant={alert}>{message}</Alert>

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

                <Button variant="primary" type="submit">
                  Guardar
                </Button>
            </Form>
              <br />
                <ul>
                    {datauser.map(user => <li key={user.nombre} >
                                            {user.nombre}-{user.apellido}-{user.email}
                                          </li>)}
                </ul>
        </div>
      </div>
    </>
  );
}

export default Register;