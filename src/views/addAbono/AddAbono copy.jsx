//import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './addabono.css';
import { useState } from 'react';

const AddAbono = () => {

    const [isSelected, setSelection] = useState(false);

  return (
    <div className="registerbox" >
    <div><h3>Ingresar abono:</h3></div>
    <div>
        <Form>
            <Form.Group className="mb-3">
                  <Form.Label><strong>Nombre del proyecto</strong></Form.Label>
                  <Form.Control type="text" name="proyecto" placeholder="Ingresar nombre del proyecto" />
                </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Nombre del trabajador</Form.Label>
                <div >
                    <Form.Check 
                     onValueChange={setSelection}
                    /> ulises
                     <Form.Check 
                     onValueChange={setSelection}
                    /> David
                     <Form.Check 
                     onValueChange={setSelection}
                    /> Alberto
                     <Form.Check 
                     onValueChange={setSelection}
                    />Carlos
                </div>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Descripcion del Abono</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Monto</Form.Label>
              <Form.Control type="number" name="monto" placeholder="Ingresar Valor" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Fecha de cierre</Form.Label>
              <Form.Control type="date" name="date-off" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Guardar
            </Button>
        </Form>
    </div>
  </div>
  )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: 'center',
    },
    label: {
      margin: 8,
    },
  });

export default AddAbono