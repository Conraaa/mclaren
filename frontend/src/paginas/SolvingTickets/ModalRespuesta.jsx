import React, { useState, useEffect, useRef } from "react";
import { Accordion, Card, Modal, Button, Form } from "react-bootstrap";
import { message } from "antd";  
import "./Solving.css";

function SoporteRespuesta({ show, handleClose, asunto, prioridad, mensaje, respuestas, onAddResponse }) {
  const historial = respuestas || [];
  const [isReplying, setIsReplying] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [activeKey, setActiveKey] = useState("0"); 
  const textareaRef = useRef(null);

  useEffect(() => {
    if (show) {
      setActiveKey("0"); 
    }
  }, [show]);

  const handleResponseChange = (event) => {
    setResponseMessage(event.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleResponderClick = () => {
    setIsReplying(true);
  };

  const handleSendResponse = async () => {
    if (!responseMessage.trim()) {
      message.error("Todos los campos son obligatorios");  
      return;
    }

    await onAddResponse(responseMessage);
    message.success("Respuesta enviada con éxito");  
    setIsReplying(false);
    setResponseMessage("");
    setActiveKey("0");
    handleClose();
  };

  const handleAccordionChange = (key) => {
    setActiveKey(key);
  };

  const handleCloseAndClear = () => {
    setResponseMessage("");
    setIsReplying(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseAndClear} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>{`${asunto || "Asunto no disponible"} - Prioridad: ${prioridad || "Prioridad no especificada"}`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Conversación</Form.Label>
          <Accordion className="acordeon" activeKey={activeKey} onSelect={handleAccordionChange}>
            <Card>
              <Accordion.Item eventKey="0">
                <Accordion.Header> Mensaje </Accordion.Header>
                <Accordion.Body>{mensaje || "No hay mensaje disponible"}</Accordion.Body>
              </Accordion.Item>
            </Card>
            
            {historial.length > 0 ? (
              historial.map((response, index) => (
                <Card key={index + 1}>
                  <Accordion.Item eventKey={(index + 1).toString()}>
                    <Accordion.Header> Respuesta - {index + 1}</Accordion.Header>
                    <Accordion.Body>{response}</Accordion.Body>
                  </Accordion.Item>
                </Card>
              ))
            ) : (
              <p>No se encontraron respuestas.</p>
            )}
          </Accordion>
        </Form.Group>

        {isReplying && (
          <Form.Group className="mb-3">
            <Form.Label>Responder</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={responseMessage}
              onChange={handleResponseChange}
              ref={textareaRef}
              placeholder="Escribe tu respuesta aquí"
              style={{ resize: "none", overflow: "hidden" }}
            />
          </Form.Group>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button className="Cerrar" onClick={handleCloseAndClear}>
          Cerrar
        </Button>
        {!isReplying ? (
          <Button className="Guardar" onClick={handleResponderClick}>
            Responder
          </Button>
        ) : (
          <Button className="Guardar" onClick={handleSendResponse}>
            Enviar Respuesta
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default SoporteRespuesta;
