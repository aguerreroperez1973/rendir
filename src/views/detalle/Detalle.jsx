//import React from 'react'
import { useParams } from "react-router-dom";

export default function Personajes() {
const { id } = useParams();
  return (
    <div className="mt-5"> el codigo es: 
      <h1>{ id }</h1>
    </div>
  );
}