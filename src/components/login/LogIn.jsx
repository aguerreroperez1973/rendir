import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { user } from '../../database/user.js';

function LogIn () {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  //const [datauser, setDataUser] = useState(user);

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
       
         setAlert("success")
         setMessage("datos ingresados: " + email +"-"+ password)
         console.log("datos ingresados: " + email +"-"+ password)

    autenticacion(email,password);
  
    setEmail('');
    setPassword('');
 }

 const autenticacion = (email, password) => {
  //console.log('autenticacion')
  const autenticado = user.filter(el => el.email === email && el.password === password)
  if (autenticado == ''){  setAlert("danger")
                            setMessage("Error: email o Password incorrectos !!!") }
     else{ navigate(`/home`); }
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