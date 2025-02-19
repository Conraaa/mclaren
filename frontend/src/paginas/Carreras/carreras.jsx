import Carta from "./carta.jsx";
import './carreras.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Bar from "../Bar/Bar.jsx";
import Fondo from '../Imagenes/Carreras.jpg';
import Footer from '../Footer/Footer.jsx';
import { fetchPistasYEstrategias, handleSubmitCarrera } from '../Funciones.js';
import { useAuth } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

function Carrera() {
    const [show, setShow] = useState(false);
    const [anio, setFecha] = useState("");
    const [pista, setPista] = useState("");
    const [cantVueltas, setVueltas] = useState("");
    const [estrategia, setEstrategia] = useState("");
    const [carreras, setCarreras] = useState([]);
    const [pistas, setPistas] = useState([]);
    const [estrategias, setEstrategias] = useState([]);
    const [estrategiasFiltradas, setEstrategiasFiltradas] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const savedCarreras = JSON.parse(localStorage.getItem("carreras")) || [];
        setCarreras(savedCarreras);

        fetchPistasYEstrategias(setPistas, setEstrategias);
    }, []);

    useEffect(() => {
        if (pista) {
            const pistaSeleccionada = pistas.find(p => p.nombre === pista);
            if (pistaSeleccionada) {
                setVueltas(Math.round(305 / pistaSeleccionada.kilometros));
                const estrategiasFiltradas = estrategias.filter(e => e.pista === pistaSeleccionada.id);
                setEstrategiasFiltradas(estrategiasFiltradas);
            } else {
                setEstrategiasFiltradas([]);
            }
        } else {
            setEstrategiasFiltradas([]);
        }
    }, [pista, pistas, estrategias]);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (!user) {
            Swal.fire({
                title: "Acceso restringido",
                text: "No puedes añadir carreras porque no estás logueado.",
                icon: "warning",
                confirmButtonText: "Iniciar sesión",
                allowOutsideClick: false,
                customClass: {
                    popup: "swal-dark",
                    confirmButton: "swal-button-orange",
                    backdrop: "swal-overlay",
                },
            }).then(() => {
                navigate("/Login");
            });
        } else {
            setShow(true);
        }
    };

    return (
        <div className="todoCarrera">
            <div className="contenidoCarrera">
                <img className="pageCarrera" src={Fondo} alt="Fondo de Pista" />
                <Bar />
                <div className="botonAnadir">
                    <Button className="Añadir" variant="primary" size="lg" onClick={handleShow}>Añadir</Button>
                    <Modal show={show} onHide={handleClose} animation={false} className="custom-modalCarreras" backdrop="static">
                        <Modal.Header closeButton>
                            <Modal.Title>Añadir una nueva Carrera</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="containerCarrera">
                                <div className="field-container1">
                                    <label>Año</label>
                                    <input type="int" value={anio} onChange={(e) => setFecha(e.target.value)} className="inputCarrera" />
                                </div>
                                <div className="field-container2">
                                    <label>Pista</label>
                                    <select value={pista} onChange={(e) => setPista(e.target.value)} className="inputCarrera">
                                        <option value="">Seleccionar una pista</option>
                                        {pistas.map((p, index) => (
                                            <option key={index} value={p.nombre}>{p.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="field-container3">
                                    <label>Vueltas</label>
                                    <input type="number" value={cantVueltas} readOnly className="inputCarrera" />
                                </div>
                                <div className="field-container4">
                                    <label>Estrategia</label>
                                    <select value={estrategia} onChange={(e) => setEstrategia(e.target.value)} className="inputCarrera">
                                        <option value="">Seleccionar una estrategia</option>
                                        {estrategiasFiltradas.map((estrategia, index) => (
                                            <option key={index} value={estrategia.nombre}>{estrategia.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="Cerrar" onClick={handleClose}>Cerrar</Button>
                            <Button className="Guardar" onClick={() => {
                                handleSubmitCarrera(anio, pista, cantVueltas, estrategia, setCarreras, carreras, handleClose, pistas, estrategias)
                            }}>Guardar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <Carta carreras={carreras} />
            <Footer />
        </div>
    );
}

export default Carrera;
