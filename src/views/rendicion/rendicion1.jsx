import { useParams } from "react-router-dom";

export default function Rendicion() {
const { id } = useParams();

return (
    <div className="mt-5">
    <h2>El codigo es: </h2>
    <h1>{ id }</h1>
    </div>
);
}