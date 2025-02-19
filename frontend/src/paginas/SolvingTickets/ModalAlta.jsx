import React, { useState } from "react";
import "./Solving.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Soporte({ show, handleClose, onCreate }) {
  const [asunto, setAsunto] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = () => {
    if (!asunto || !prioridad || !mensaje) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const prioridadFormateada = prioridad.charAt(0).toUpperCase();

    const nuevoTicket = {
      Asunto: asunto,
      Estado: "P",
      Prioridad: prioridadFormateada,
      Categoria: "Mclaren",
      Usuario_DNI: JSON.parse(localStorage.getItem("usuario")).dni,
      Usuario_Nombre: JSON.parse(localStorage.getItem("usuario")).nombre,
      Mensaje: mensaje,
      Respuesta: [],
    };

    onCreate(nuevoTicket);
    handleCloseAndClear();
  };

  // 🔹 Limpia los estados y cierra el modal
  const handleCloseAndClear = () => {
    setAsunto("");
    setPrioridad("");
    setMensaje("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseAndClear} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Escribir un nuevo ticket</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Asunto</Form.Label>
            <Form.Control
              type="text"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              placeholder="Ingresa el asunto del ticket"
              className="custom-inputTicket"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Prioridad</Form.Label>
            <Form.Control
              as="select"
              value={prioridad}
              className="inputTicket"
              onChange={(e) => setPrioridad(e.target.value)}
            >
              <option value="" disabled>Seleccione una prioridad</option>
              <option>Crítica</option>
              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              as="textarea"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="Prioridad"
              placeholder="Escribe tu mensaje aquí..."
              
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button className="Cerrar" onClick={handleCloseAndClear}>Cerrar</Button>
        <Button className="Guardar" onClick={handleSubmit}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Soporte;
