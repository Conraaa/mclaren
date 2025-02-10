import React from 'react';
import './Solving.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Soporte({ show, handleClose, asunto, prioridad, isReply }) {

  const modifiedAsunto = isReply ? `Re: ${asunto}` : asunto;

  return (
    <Modal show={show} onHide={handleClose} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>{isReply ? "Responder Ticket" : "Escribir un nuevo ticket"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Asunto</Form.Label>
            <Form.Control
              type="text"
              defaultValue={modifiedAsunto} 
              disabled={isReply}  
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Prioridad</Form.Label>
            <Form.Control as="select" defaultValue={prioridad} disabled={isReply} autoFocus className="inputTicket">
              <option value="" disabled>Seleccione una prioridad</option>
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
          {isReply ? "Responder" : "Guardar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default Soporte;