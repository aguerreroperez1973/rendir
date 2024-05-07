//import { useParams } from "react-router-dom";
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { tareasIniciales } from '../../database/tareasIniciales';
import { useParams } from 'react-router-dom';

export default function Rendicion() {
//const { id } = useParams();

//////////////////////////////////////////////////////////

const [nombreTarea,setNombreTarea] = useState("");
    //const listaTareas = ["Tarea 1", "Tarea 2", "Tarea 3", "Tarea 4"];
    //const [listaTareas,setListaTareas] = useState(["Tarea 1", "Tarea 2", "Tarea 3", "Tarea 4"]);
    const [listaTareas,setListaTareas] = useState(tareasIniciales);

    const capturaInput = (e) => {
        setNombreTarea(e.target.value)
    }

    const enviarFormulario = (e) => {
       e.preventDefault();
       setListaTareas([...listaTareas, {nombre: nombreTarea, completada: false}]);
       setNombreTarea("");
    }

    const completarTarea = (tarea) => {
        const nuevasTareas = [...listaTareas]
        const index = nuevasTareas.findIndex(el => el.nombre === tarea.nombre)
        nuevasTareas[index].completada = true
        setListaTareas(nuevasTareas)
     }
    
     const eliminarTarea = (tarea) => {
        const nuevaLista = listaTareas.filter(el => el.nombre !== tarea.nombre)
        setListaTareas(nuevaLista)
     }

     const { id } = useParams();
//////////////////////////////////////////////////////////

return (
    <div className="mt-5">


    <h2>El codigo es: </h2>
    <h1>{ id }</h1>


        <div><h2>Completar tu rendición: {abono}</h2></div>

            <div>
                <form onSubmit={enviarFormulario}>
                    <input className="from-control"  name="nombreTarea" onChange={capturaInput}  value={nombreTarea}/>
                    <button className="btn btn-dark mt-3" type="submit" > Agregar Tarea </button>
                </form>
                
                <ul>
                    {listaTareas.map(tarea => <li key={tarea.nombre} 
                                                style={tarea.completada === true ? { textDecoration:'line-through' } : {}}>
                                                      {tarea.nombre} 
                                                      {tarea.completada === false? <button onClick={()=> completarTarea(tarea)}> Completar </button> : ''}
                                                      <button onClick={() => eliminarTarea(tarea)}> Borrar </button>
                                              </li>)}
                </ul>
            </div>

            <div >
                <Card>
                <Card.Header>Featured</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
                </Card>
            </div>
    </div>
);
}