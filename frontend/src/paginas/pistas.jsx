import Carta from "./carta.jsx"
import './pistas.css'
import Logocentral from '../Imagenes/Logo_Central.png'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Pistas(){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  


    return(

        <>
            <div Class="Todo">
                <div class="bar">
                    <a href="./home" className="">
                <img class="Logo_central" src= { Logocentral } alt ="Logo de en medio"/>
                </a>
                </div>
            </div>
            
            <div className="botonAnadir">
                <Button variant="primary" size="lg"onClick={handleShow}>Añadir + </Button>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Añadir una nueva pista</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre de la pista</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej: Circuito nacional de Monza"
                                autoFocus
                            />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Cantidad de Kilómetros</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej: 10"
                                autoFocus
                            />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>País</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej: Argentina"
                                autoFocus
                            />
                            </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Ciudad</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ej: Buenos Aires"
                                    autoFocus
                            />
                            </Form.Group>
                                <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Agregar una foto</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                            
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Guardar
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <Carta />
            
        </>
    )
}

export default Pistas;