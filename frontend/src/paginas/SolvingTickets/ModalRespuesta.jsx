import React, { useState, useEffect, useRef } from "react";
import { Accordion, Card, Modal, Button, Form } from "react-bootstrap";
import "./Solving.css";

function SoporteRespuesta({ show, handleClose, asunto, prioridad, respuestas, onAddResponse }) {
  const historial = respuestas || [];
  const [isReplying, setIsReplying] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [activeKey, setActiveKey] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (show && historial.length > 0) {
      setActiveKey((historial.length - 1).toString());
    }
  }, [show, historial]);

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
      alert("No puedes enviar una respuesta vacía.");
      return;
    }

    await onAddResponse(responseMessage);
    setIsReplying(false);
    setResponseMessage("");
    setActiveKey(null);
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
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Historial de Respuestas</Form.Label>
            <Accordion className="acordeon" activeKey={activeKey} onSelect={handleAccordionChange}>
              {historial.length > 0 ? (
                historial.map((response, index) => (
                  <Card key={index}>
                    <Accordion.Item eventKey={index.toString()}>
                      <Accordion.Header>Respuesta {index + 1}</Accordion.Header>
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
        </Form>
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
