import React from 'react'
import './Solving.css';
import Bar from "../Bar/Bar";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function Soporte() {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <div className="todo">
      <Bar />
      <div className="botonAnadir">
        <Button className="Ticket" variant="primary" size="lg" onClick={handleShow}>
          Escribir Ticket
        </Button>
        <Modal show={show} onHide={handleClose} className="custom-modal">

          <Modal.Header closeButton>
            <Modal.Title>Escribir un nuevo ticket</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Asunto</Form.Label>
                <Form.Control type="text" autoFocus/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Prioridad</Form.Label>
                <Form.Control as="select" autoFocus className="inputTicket">
                  <option value="" disabled selected>Seleccione una prioridad</option>
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as="textarea" autoFocus className="Prioridad"/>
              </Form.Group>

            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button className="Cerrar" onClick={handleClose}>
              Cerrar
            </Button>
            <Button className="Guardar" onClick={handleClose}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default Soporte;