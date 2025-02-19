import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./carreras.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { fetchCarreras, handleShowDetails } from '../Funciones.js';

// Función para formatear tiempos
function formatTiempo(tiempo) {
  const totalMilisegundos = Math.round(tiempo * 1000);
  const minutos = Math.floor(totalMilisegundos / 60000);
  const segundos = Math.floor((totalMilisegundos % 60000) / 1000);
  const milisegundos = totalMilisegundos % 1000;
  return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}:${String(milisegundos).padStart(3, '0')}`;
}

// Componente Cartita (tarjeta de carrera)
function Cartita({ nombre, imagen, vueltas, estrategia_nombre, pista_nombre, pais, onShowDetails }) {
  return (
    <div className="class">
      <Card className="cardCarreras">
        <Card.Img className="imagenCarrera" variant="top" src={imagen} />
        <Card.Body>
          <Card.Title className="CartaTitulo">{pista_nombre || "Nombre no disponible"}</Card.Title>         
          <p><strong>País:</strong> {pais || "País no disponible"}</p>
          <p><strong>Vueltas:</strong> {vueltas || "Vueltas no disponibles"}</p>
          <p><strong>Estrategia:</strong> {estrategia_nombre || "Estrategia no disponible"}</p>
          <div className="botonCar">
            <Button variant="warning" onClick={onShowDetails}>
              Ver detalles
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

// Componente principal
function ListaDeCircuitos() {
  const [carreras, setCarreras] = useState([]);
  const [selectedCircuito, setSelectedCircuito] = useState(null);

  // Fetch carreras al cargar el componente
  useEffect(() => {
    fetchCarreras(setCarreras);
  }, []);

  // Cerrar modal
  const handleCloseDetails = () => {
    setSelectedCircuito(null);
  };

  return (
    <div>
      {/* Renderizar tarjetas de carreras */}
      {carreras.length > 0 ? (
        carreras.map((circuito, index) => (
          <Cartita
            key={index}
            nombre={circuito.nombre}
            imagen={circuito.imagen}
            vueltas={circuito.cantVueltas}
            estrategia_nombre={circuito.estrategia_nombre}
            pista_nombre={circuito.pista_nombre}
            pais={circuito.pais}
            onShowDetails={() => handleShowDetails(circuito, setSelectedCircuito)}
          />
        ))
      ) : (
        <p>No hay carreras disponibles.</p>
      )}

      {/* Modal para mostrar detalles */}
      {selectedCircuito && (
        <Modal
          show={true}
          onHide={handleCloseDetails}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedCircuito.nombre || "Nombre no disponible"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Kilómetros:</strong> {selectedCircuito.kilometros || "Kilómetros no disponibles"}</p>
            <p><strong>Vueltas:</strong> {selectedCircuito.cantVueltas || "Vueltas no disponibles"}</p>
            <p><strong>Estrategia:</strong> {selectedCircuito.estrategia_nombre || "Estrategia no disponible"}</p>
            <p><strong>País:</strong> {selectedCircuito.pais || "País no disponible"}</p>
            <img
              src={selectedCircuito.imagen}
              alt={selectedCircuito.nombre || "Imagen no disponible"}
              style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
            />
            <div className="Telemetrias">
              <div style={{ marginBottom: "20px" }}>
                <p><strong>Piloto 1: Lando Norris</strong></p>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={selectedCircuito.telemetriaPiastri?.sort((a, b) => a.vuelta - b.vuelta) || []}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="vuelta" label={{ value: "Vuelta", position: "insideBottomRight", offset: -10 }} />
                    <YAxis tickFormatter={formatTiempo} label={{ value: "Tiempo (MM:SS:SSS)", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => formatTiempo(value)} />
                    <Line type="basis" dataKey="tiempo" stroke="#82ca9d" dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p><strong>Piloto 2: Oscar Piastri</strong></p>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={selectedCircuito.telemetriaNorris?.sort((a, b) => a.vuelta - b.vuelta) || []}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="vuelta" label={{ value: "Vuelta", position: "insideBottomRight", offset: -10 }} />
                    <YAxis tickFormatter={formatTiempo} label={{ value: "Tiempo (MM:SS:SSS)", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => formatTiempo(value)} />
                    <Line type="basis" dataKey="tiempo" stroke="#8884d8" dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetails}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default ListaDeCircuitos;