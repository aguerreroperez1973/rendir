import { createContext, useState, useEffect } from "react";

export const Context = createContext({});

const ContextProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const url = '/public/abonos.json';

  const consultarApi = async () => {  
      const response = await fetch(url);
      const data = await response.json();
     // console.log(data)
     
      /*const newdata = data.map((p) => {
        const obj = {cantidad: 0 ,...p}
        return obj;
      })*/
      setData(data)
  };

useEffect(() => {
  consultarApi();
}, []);

    return (
            <Context.Provider value={{data, setData, total, setTotal}} >{children}</Context.Provider>
    )
};

export default ContextProvider;