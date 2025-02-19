import Carta from "./carta.jsx";
import './pistas.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Bar from "../Bar/Bar.jsx";
import PagePista from '../Imagenes/Pistas.png'; // Asegúrate de que la ruta sea correcta
import Footer from '../Footer/Footer.jsx';
import { handleSubmit } from '../Funciones.js';

function Pistas() {
    const [show, setShow] = useState(false);
    const [nombre, setNombre] = useState('');
    const [kilometros, setKilometros] = useState('');
    const [pais, setPais] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [foto, setFoto] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="todoPistas">
            <img className="pagePista" src={PagePista} alt="Fondo de Pista" />
            <Bar />
            <div className="botonAnadir">
                <Button className="Añadir" variant="primary" size="lg" onClick={handleShow}>Añadir </Button>
                <Modal
                        show={show}
                        onHide={handleClose}
                        className="custom-modal"
                    >

                    <Modal.Header closeButton>
                        <Modal.Title>Añadir una nueva pista</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nombre de la pista</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>Cantidad de Kilómetros</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={kilometros}
                                    onChange={(e) => setKilometros(e.target.value)}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Label>País</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={pais}
                                    onChange={(e) => setPais(e.target.value)}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                <Form.Label>Ciudad</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={ciudad}
                                    onChange={(e) => setCiudad(e.target.value)}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Agregar una foto</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(e) => setFoto(e.target.files[0])}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="Cerrar" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button className="Guardar" onClick={() => handleSubmit(nombre, kilometros, pais, ciudad, foto, handleClose)}>
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <Carta />
            <Footer />
        </div>
    );
}

export default Pistas;
