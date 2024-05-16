import { useContext, useState } from "react";
import Alert from 'react-bootstrap/Alert';
import { Table } from "react-bootstrap";
import { Context } from "../../contexts/Context";
import { ENDPOINT } from "../../config/constans";

const RendicionTable = ( { abono_id } ) => {

  const { rendiciones, setRendiciones } = useContext( Context );

//Estado para los errores ///////////////////////////////////////////
const [alert, setAlert] = useState('');
const [message, setMessage] = useState('');
const [activeMsg, setActiveMsg] = useState(false);

  const rendixabono = rendiciones.filter((el) => el.abono_id == abono_id).slice();
  
////////////// eliminar Item en arreglo ///////////////////////////////////////  
  const removeItem = (index) => {
    let token = localStorage.getItem('token')
    const newRendicion = [...rendiciones];
    newRendicion.splice(index, 1);
    setRendiciones(newRendicion);
////////////// buscar ID del item elimnado a través del index ////////////////////////////////
const findId = rendixabono[index].id
////////eliminar item desde BD /////////////////////////////////////
    fetch( ENDPOINT.delrendicion + findId, {
      method: 'DELETE',
      headers: {Authorization: `Bearer ${token}`}
      }).then(response => {
        if(!response.ok){
          setActiveMsg(true)
          setAlert("danger")
          setMessage("Error: No fué posible ingresar el abono")
        }
        else{
          setActiveMsg(true)
          setAlert("success")
          setMessage("Item eliminado con exito")}
        })
      .catch((err) => {console.log(err)})
  };
///////////////////////////////////////////////////////////////////
  return (
        <div className="row col-10 col-sm-9 col-md-8 col-lg-6 mx-auto mt-5 border border-light rounded" >
            { activeMsg ? <Alert variant={alert}> {message} </Alert> : null }
            <div><Table responsive="sm" striped bordered hover variant="light" >
              <thead >
                <tr>
                <th>N° item</th>
                  <th>Detalle</th>
                  <th>Gasto</th>
                  <th>Tipo</th>
                  <th>N°</th>
                  <th>Monto</th>
                  <th>Saldo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rendixabono.map(({ id, detalle, tipo_gasto, tipo_doc, number_doc, monto, saldo }, i) => (
                  <tr
                    key={i}
                    className="align-middle" >
                    <td> {id}</td>
                    <td> {detalle} </td>
                    <td> {tipo_gasto}</td>
                    <td> {tipo_doc} </td>
                    <td> {number_doc} </td>
                    <td> {monto} </td>
                    <td> {saldo}</td>
                    <td>
                      <span
                        onClick={() => removeItem(i)}
                        role="button" title="Eliminar Item">
                        ❌
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table></div>
        </div>
  );
};
export default RendicionTable;

//