import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import './card.css';
import Lluvia from "../../Imagenes/lluvia.jfif";
import Sol from "../../Imagenes/soleado.webp";
import Viento from "../../Imagenes/ventoso.jpg";

function Cartita({ nombre, imagen, piezas, onClick }) {
  return (
    <div className="card-container" onClick={onClick}>
      <div
        className="card-image"
        style={{
          backgroundImage: `url(${imagen || 'https://via.placeholder.com/300'})`,
        }}
      >
        <div className="card-overlay">
          <h2 className="card-title-hover">{nombre}</h2>
        </div>
      </div>
    </div>
  );
}

function ListaDeEstrategias() {
  const [showModal, setShowModal] = useState(false);
  const [selectedEstrategia, setSelectedEstrategia] = useState(null);
  const [estrategias, setEstrategia] = useState([
    {
      id: 1,
      nombre: "Monza Soleado",
      imagen: Sol,
      piezas: ["Motor", "Neumáticos", "Chasis"],
    },
    {
      id: 1,
      nombre: "Monza Lluvioso",
      imagen: Lluvia,
      piezas: ["Aerodinámica", "Suspensión"],
    },
    {
      id: 2,
      nombre: "SPA Soleado",
      imagen: Sol,
      piezas: ["Motor", "Transmisión"],
    },
    {
      id: 2,
      nombre: "SPA Ventoso",
      imagen: Viento,
      piezas: ["Motor", "Chasis", "Frenos"],
    },
    {
      id: 3,
      nombre: "Silverstone",
      imagen: "https://via.placeholder.com/300/00FF00/FFFFFF",
      piezas: ["Frenos", "Neumáticos"],
    },
  ]);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ nombre: '', piezas: '' });

  const handleCardClick = (estrategias) => {
    setSelectedEstrategia(estrategias);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditing(false);
    setSelectedEstrategia(null);
  };

  const handleDelete = () => {
    setEstrategia(estrategias.filter((c) => c !== selectedEstrategia));
    handleCloseModal();
  };

  const handleEdit = () => {
    setEditing(true);
    setEditData({
      nombre: selectedEstrategia.nombre,
      piezas: selectedEstrategia.piezas.join(', '),
    });
  };

  const handleSaveEdit = () => {
    setEstrategia(
      estrategias.map((estrategias) =>
        estrategias === selectedEstrategia
          ? { ...estrategias, nombre: editData.nombre, piezas: editData.piezas.split(', ') }
          : estrategias
      )
    );
    setEditing(false);
    handleCloseModal();
  };

  const groupedEstrategias = estrategias.reduce((acc, estrategias) => {
    if (!acc[estrategias.id]) acc[estrategias.id] = [];
    acc[estrategias.id].push(estrategias);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedEstrategias).map((id) => (
        <div key={id} className="circuit-group">
          <h4 className="circuit-title">Pista {id}</h4>
          <div className="card-list">
            {groupedEstrategias[id].map((estrategias, index) => (
              <Cartita
                key={index}
                nombre={estrategias.nombre}
                imagen={estrategias.imagen}
                piezas={estrategias.piezas}
                onClick={() => handleCardClick(estrategias)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editing ? 'Editar Estrategia' : selectedEstrategia?.nombre}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editing ? (
            <Form>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.nombre}
                  onChange={(e) => setEditData({ ...editData, nombre: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formPiezas" className="mt-3">
                <Form.Label>Piezas</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.piezas}
                  onChange={(e) => setEditData({ ...editData, piezas: e.target.value })}
                  placeholder="Separar por comas"
                />
              </Form.Group>
            </Form>
          ) : (
            <p>
              <strong>Piezas:</strong> {selectedEstrategia?.piezas.join(', ')}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {editing ? (
            <>
              <Button variant="primary" onClick={handleSaveEdit}>
                Guardar
              </Button>
              <Button variant="secondary" onClick={() => setEditing(false)}>
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <Button variant="warning" onClick={handleEdit}>
                Editar
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Eliminar
              </Button>
            </>
          )}
          {!editing && (
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListaDeEstrategias;
