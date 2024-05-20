//import { user } from '../../database/user.js';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ENDPOINT } from '../../config/constans.js';
import { Context } from '../../contexts/Context.jsx';

function LogIn () {
  const { setUser } = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  //Estado para los errores
  const [alert, setAlert] = useState('');
  const [message, setMessage] = useState('');
 
  //Función antes de enviar el formulario
  const validarInput = (e) => {
       
    // Prevenimos el comportamiento por defecto
    e.preventDefault();

    // Validación input
     if(email ==='' || password ==='' ){
         
           setAlert("danger")
           setMessage("Error:Debe completar todos los datos")
           console.log("Error:Debe completar todos los datos")
           return
         } 

    autenticacion(email,password);
  
    setEmail('');
    setPassword('');
 }

 const autenticacion = async (email, password) => {
  const userlogin = { email: email,  password: password };

  fetch(ENDPOINT.login , {
  method: "POST",
  headers: { "Content-Type": "application/json",},
  body: JSON.stringify(userlogin)},)
  .then(response => response.json())
  .then(result => {
    if(!result.token){
      //console.log(result.message);
      setAlert("danger")
      setMessage(result.message)
     } else {
     console.log(result)
            sessionStorage.setItem("token", result.token)
            sessionStorage.setItem("user", result.email)
            console.log(sessionStorage.getItem("token"))
            setUser(result.email)
            navigate(`/home/`) }})
  .catch((err) => {console.log(err);});
 }
    const irARegistrarse = () => {
    navigate(`/register`);
    };

  return (
    <div  className="loginbox" >
            <Form action="" onSubmit={validarInput} >

            <Alert variant={alert}>{message}</Alert>
            
                <Form.Group className="mb-3" >
                    <Form.Label>Email </Form.Label>
                    <Form.Control type="email" placeholder="Ingresar email"
                     name="email" 
                     onChange={(e) => setEmail(e.target.value)} value={email} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Ingresar contraseña"
                     name="email" 
                     onChange={(e) => setPassword(e.target.value)} value={password} />
                </Form.Group>
               
                <Button variant="primary" type="submit"> Guardar  </Button>
            </Form>
                <br /> 
                <Form.Text className="text-muted">
                    <p onClick={ irARegistrarse } >Resgistrate aqui</p>
                </Form.Text>
    </div>
  );
}

export default LogIn;