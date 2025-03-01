import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal'; // Importa Modal
import 'bootstrap/dist/css/bootstrap.min.css';
import './pistas.css';
import { fetchCircuitos } from '../Funciones.js';
import { message } from 'antd';

function Cartita({ nombre, imagen, kilometros, pais, ciudad, onInfoClick }) {
  return (
    <div className='classPista'>
      <Card className="cardPista">
        <Card.Body>
          <Card.Title>{nombre}</Card.Title>
          <Card.Img variant="topPista" className='Pista' src={imagen} />
          <Card.Text className="CartaTextoPist">
            País: {pais}
          </Card.Text>
          <Button className='botonPista' variant='warning' onClick={onInfoClick}>
            INFO
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

function ListaDeCircuitos() {
  const [circuitos, setCircuitos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [infoCircuito, setInfoCircuito] = useState(null); // Estado para la información del circuito seleccionado
  const [showModal, setShowModal] = useState(false); // Estado del modal

  useEffect(() => {
    fetchCircuitos(setCircuitos, setLoading);
    console.log("fetchCircuitos");
  }, []);

  const handleShowModal = (circuito) => {
    setInfoCircuito(circuito);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setInfoCircuito(null);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {circuitos.length > 0 ? (
        circuitos.map((circuito, index) => (
          <Cartita
            key={index}
            nombre={circuito.nombre}
            imagen={circuito.imagen}
            kilometros={circuito.kilometros}
            pais={circuito.pais}
            ciudad={circuito.ciudad}
            onInfoClick={() => handleShowModal(circuito)}
          />
        ))
      ) : (
        message.error('No se encontraron pistas.')
      )}

      {/* Modal de información */}
      <Modal className='modal-customdetallesPistas' show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Circuito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {infoCircuito && (
            <>
              <p><strong>Nombre:</strong> {infoCircuito.nombre}</p>
              <p><strong>País:</strong> {infoCircuito.pais}</p>
              <p><strong>Ciudad:</strong> {infoCircuito.ciudad}</p>
              <p><strong>Kilómetros:</strong> {infoCircuito.kilometros}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListaDeCircuitos;
