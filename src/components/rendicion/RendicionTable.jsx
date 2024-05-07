import { useContext } from "react";
import { Table } from "react-bootstrap";
import { Context } from "../../contexts/Context";

const RendicionTable = () => {
  const { rendicion, setRendicion } = useContext(Context);

  //const saldo = total-rendicion.monto;

  const removeItem = (index) => {
    const newRendicion = [...rendicion];
    newRendicion.splice(index, 1);
    setRendicion(newRendicion);
  };

  return (
    <div className="row col-10 col-sm-9 col-md-8 col-lg-6 mx-auto mt-1 border border-light rounded p-4" >
        <Table
          responsive="sm"
          striped
          bordered
          hover
          variant="light"
        >
          <thead>
            <tr>
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
            {rendicion.map(({ detalle, tipo_gasto, tipo_doc, number_doc, monto, saldo }, i) => (
              <tr
                key={i}
                className="align-middle"
              >
                <td> {detalle} </td>
                <td> {tipo_gasto}</td>
                <td> {tipo_doc} </td>
                <td> {number_doc} </td>
                <td> {monto} </td>
                <td> {saldo}</td>
                <td>
                  <span
                    onClick={() => removeItem(i)}
                    role="button"
                  >
                    ❌
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </div>
  );
};
export default RendicionTable;