import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import './Card.css';
import Lluvia from "../Imagenes/lluvia.jfif";
import Sol from "../Imagenes/soleado.webp";
import Viento from "../Imagenes/ventoso.jpg";

function Cartita({ nombre, imagen, onClick }) {
  return (
    <div className="card-container" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div
        className="card-image"
        style={{ backgroundImage: `url(${imagen || 'https://via.placeholder.com/300'})` }}
      >
        <div className="card-overlay">
          <h2 className="card-title-hover">{nombre}</h2>
        </div>
      </div>
    </div>
  );
}

function ListaDeEstrategias({ onEdit, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedEstrategia, setSelectedEstrategia] = useState(null);
  const [estrategias, setEstrategias] = useState([]);
  const [piezas, setPiezas] = useState([]);
  const [loadingPiezas, setLoadingPiezas] = useState(false);
  const [errorPiezas, setErrorPiezas] = useState(null);

  // Obtener estrategias con su pista
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/estrategias/")
      .then(response => response.json())
      .then(data => {
        setEstrategias(data);
      })
      .catch(error => console.error("Error fetching strategies:", error));
  }, []);

  // Obtener todas las piezas disponibles
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/estrategiapiezas/")
      .then(response => response.json())
      .then(data => setPiezas(data))
      .catch(error => console.error("Error fetching piezas:", error));
  }, []);

  const handleCardClick = (estrategia) => {
    setSelectedEstrategia(estrategia);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEstrategia(null);
  };

  // Agrupar estrategias por pista
  const groupedEstrategias = estrategias.reduce((acc, estrategia) => {
    if (!acc[estrategia.pista_nombre]) acc[estrategia.pista_nombre] = [];
    acc[estrategia.pista_nombre].push(estrategia);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedEstrategias).map((pista) => (
        <div key={pista} className="circuit-group">
          <h4 className="circuit-title">{pista}</h4>
          <div className="card-list">
            {groupedEstrategias[pista].map((estrategia) => (
              <Cartita
                key={estrategia.id}
                nombre={estrategia.nombre}
                imagen={
                  estrategia.nombre.includes("Seco") ? Sol :
                  estrategia.nombre.includes("Lluvia") ? Lluvia :
                  estrategia.nombre.includes("Viento") ? Viento :
                  'https://via.placeholder.com/300'
                }
                onClick={() => handleCardClick(estrategia)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEstrategia?.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEstrategia ? (
            <p>
              <strong>Piezas:</strong> {piezas
                .filter(pieza => pieza.estrategia === selectedEstrategia.id)
                .map(pieza => pieza.pieza_nombre)
                .join(', ') || 'Sin piezas'}
            </p>
          ) : (
            <p>Cargando...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={() => onDelete(selectedEstrategia.id)}>
            Eliminar
          </Button>
          <Button variant="primary" onClick={() => onEdit(selectedEstrategia)}>
            Modificar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListaDeEstrategias;
