import Carta from "./card.jsx";
import './listadoEstrategia.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Bar from "../../Bar/Bar.jsx";
import { Link } from 'react-router-dom';
import Fondo from '../../Imagenes/estrategiafondo.jpg';

function Estrategia() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="todo">
            <Bar />
            <img className="pagePista" src={Fondo} alt="Fondo de Pista" /> 
            <div className="botonAnadir">
              <Link to={"/Estrategia"}> <Button className="Añadir" variant="primary" size="lg" onClick={handleShow}>Añadir +</Button> </Link>    
            </div>
            <Carta />
        </div>
    );
}

export default Estrategia;
