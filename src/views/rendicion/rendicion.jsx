//import { useParams } from "react-router-dom";
//import { useState } from 'react';
//import Card from 'react-bootstrap/Card';
//import ListGroup from 'react-bootstrap/ListGroup';
//import { tareasIniciales } from '../../database/tareasIniciales';
//import { useParams } from 'react-router-dom';
import RendicionForm from '../../components/rendicion/RendicionForm';
//import UploadFile from '../../components/upImage/uploadFile';
//import RendicionTable from '../../components/rendicion/RendicionTable';

const Rendicion = () => {
    return (
      <div>
       <RendicionForm />
       {/*} <UploadFile />*/}
      {/*  <RendicionTable /> //////////SE traslado a componente rendicionForm*/} 
      </div>
    );
  };
  export default Rendicion;