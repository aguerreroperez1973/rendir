import { createContext, useState, useEffect } from "react";
import { ENDPOINT } from "../config/constans.js";

export const Context = createContext({});

const ContextProvider = ({ children }) => {
  //let token = sessionStorage.getItem('token')
  
    const [data, setData] = useState([]);
    const [rendiciones, setRendiciones] = useState([]);
    const [userdata, setUserdata] = useState([]);
    const [user, setUser] = useState('');
    //console.log('cont:'+user)
  
  const consultarApiAbono = async () => {  
      const response = await fetch(ENDPOINT.abonos);
      const abonodata = await response.json();
      //console.log(data)
      setData(abonodata)
  };

  const consultarApiUser = async () => {  
    const res = await fetch(ENDPOINT.users);
    const userdata = await res.json();
    //console.log(userdata)
    setUserdata(userdata)
  };

  const consultarApiRendicion = async () => {  
    const respuesta = await fetch(ENDPOINT.rendiciones);
    const rendidata = await respuesta.json();
    //console.log(rendidata)
    setRendiciones(rendidata)
  };

useEffect(() => {
  consultarApiAbono();
  consultarApiUser();
  consultarApiRendicion();
}, []);

    return (
            <Context.Provider value={{data, setData, rendiciones, setRendiciones, userdata, setUserdata, user, setUser}} >{children}</Context.Provider>
    )
};

export default ContextProvider;