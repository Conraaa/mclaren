import Carta from "./carta.jsx";
import './carreras.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Bar from "../Bar/Bar.jsx";
import PagePista from '../Imagenes/Empleados1.png';


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
            const response = await fetch("https://api.example.com/telemetria", {
                method: "GET",
            });
            if (response.ok) {
                setTelemetriaStatus("✔");
            } else {
                setTelemetriaStatus("✘");
            }
        } catch (error) {
            setTelemetriaStatus("✘");
        }
    };

    return (
        <div className="todo">
            <div className="contenido">
                <img className="pagePista" src={PagePista} alt="Fondo de Pista" />
                <Bar />
                <div className="botonAnadir">
                    <Button variant="primary" size="lg" onClick={handleShow}>Añadir +</Button>
                    <Modal 
                        show={show} 
                        onHide={handleClose} 
                        animation={false} 
                        className="custom-modal"
                        backdrop="static"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Añadir una nueva Carrera</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="container">
                                {/* Fecha */}
                                <div className="field-container">
                                    <label>Fecha</label>
                                    <input
                                        type="date"
                                        value={fecha}
                                        onChange={(e) => setFecha(e.target.value)}
                                        className="input"
                                    />
                                </div>

                                {/* Pista */}
                                <div className="field-container">
                                    <label>Pista</label>
                                    <input
                                        type="text"
                                        value={pista}
                                        onChange={(e) => setPista(e.target.value)}
                                        className="input"
                                    />
                                </div>

                                {/* Vueltas */}
                                <div className="field-container">
                                    <label>Vueltas</label>
                                    <input
                                        type="number"
                                        value={vueltas}
                                        onChange={(e) => setVueltas(e.target.value)}
                                        className="input"
                                        style={{ marginRight: "10px" }}
                                    />
                                </div>

                                {/* Telemetria Status */}
                                <div className="field-container">
                                    <label>Telemetria</label>
                                    <Button onClick={checkTelemetria} className="button">Verificar Telemetria</Button>
                                    <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                                        {telemetriaStatus}
                                    </span>
                                </div>

                                {/* Estrategia */}
                                <div className="field-container">
                                    <label>Estrategia</label>
                                    <select
                                        value={estrategia}
                                        onChange={(e) => setEstrategia(e.target.value)}
                                        className="input"
                                    >
                                        <option value="">Selecciona una estrategia</option>
                                        <option value="agresiva">Agresiva</option>
                                        <option value="defensiva">Defensiva</option>
                                        <option value="neutral">Neutral</option>
                                    </select>
                                </div>

                                {/* Botones */}
                                <div className="button-container">
                                    <button onClick={handleSubmit} className="button">
                                        Guardar
                                    </button>
                                    <button onClick={handleClose} className="button">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
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
