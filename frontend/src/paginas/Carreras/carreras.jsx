import Carta from "./carta.jsx";
import './carreras.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Bar from "../Bar/Bar.jsx";
import Fondo from '../Imagenes/Carreras.jpg';


function Carrera() {
    const [show, setShow] = useState(false);
    const [fecha, setFecha] = useState("");
    const [pista, setPista] = useState("");
    const [vueltas, setVueltas] = useState("");
    const [estrategia, setEstrategia] = useState("");
    const [telemetriaStatus, setTelemetriaStatus] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        console.log({ fecha, pista, vueltas, estrategia });
        handleClose();
    };

    const checkTelemetria = async () => {
        try {
          // Realiza una solicitud a la API de telemetría
          const response = await fetch("https://api.example.com/telemetria", {
            method: "GET",
          });
      
          // Si la respuesta es correcta, establece el estado de telemetría en "✔"
          if (response.ok) {
            setTelemetriaStatus("✔");
          } else {
            // Si la respuesta no es correcta, establece el estado en "✘"
            setTelemetriaStatus("✘");
          }
        } catch (error) {
          // Si ocurre un error en la solicitud, establece el estado en "✘"
          setTelemetriaStatus("✘");
        }
      };
      
    return (
        <div className="todo">
            <div className="contenido">
                <img className="pagePista" src={ Fondo } alt="Fondo de Pista" />
                <Bar />
                <div className="botonAnadir">
                    <Button className="Añadir"variant="primary" size="lg" onClick={handleShow}>Añadir +</Button>
                    <Modal 
                        show={show} 
                        onHide={handleClose} 
                        animation={false} 
                        className="custom-modalCarreras"
                        backdrop="static"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Añadir una nueva Carrera</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
  <div className="containerCarrera">
    {/* Fecha */}
    <div className="field-container1">
      <label>Fecha</label>
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="inputCarrera"
      />
    </div>

    {/* Pista */}
    <div className="field-container2">
      <label>Pista</label>
      <input
        type="text"
        value={pista}
        onChange={(e) => setPista(e.target.value)}
        className="inputCarrera"
      />
    </div>

    {/* Vueltas y Botón Verificar Telemetría */}
    <div className="field-container3">
      <div>
        <label>Vueltas</label>
        <input
          type="number"
          value={vueltas}
          onChange={(e) => setVueltas(e.target.value)}
          className="inputCarrera"
        />
      </div>
      <Button onClick={checkTelemetria} className="buttonTele">
        {telemetriaStatus === null ? "Verificar Telemetría" : telemetriaStatus === "✔" ? "✔ Telemetría OK" : "✘ Telemetría Fallida"}
      </Button>
    </div>

    {/* Estrategia */}
    <div className="field-container4">
      <label>Estrategia</label>
      <select
        value={estrategia}
        onChange={(e) => setEstrategia(e.target.value)}
        className="inputCarrera"
      >
        <option value="">Selecciona una estrategia</option>
        <option value="agresiva">Agresiva</option>
        <option value="defensiva">Defensiva</option>
        <option value="neutral">Neutral</option>
      </select>
    </div>
  </div>
</Modal.Body>

                        <Modal.Footer>
                            <Button  className="Cerrar" onClick={handleClose}>
                                Cerrar
                            </Button>
                                <Button className="Guardar"onClick={handleSubmit}>
                                Guardar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Carta />
            </div>
        </div>
    );
}

export default Carrera;
