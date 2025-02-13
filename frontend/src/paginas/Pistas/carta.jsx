import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pistas.css';
import { fetchCircuitos } from '../Funciones.js';

function Cartita({ nombre, imagen, kilometros, pais, ciudad }) {
  return (
    <div className='class'>
      <Card className="card">
        <Card.Body>
          <Card.Title>{nombre}</Card.Title>
          <Card.Img variant="top" src={imagen} />
          <Card.Text className="CartaTextoPist">
            País: {pais}
          </Card.Text>
          <Button className='boton' variant='warning'>+ INFO</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

function ListaDeCircuitos() {
  const [circuitos, setCircuitos] = useState([]); // Estado para almacenar los circuitos
  const [loading, setLoading] = useState(true); // Estado para saber si estamos cargando los datos

  useEffect(() => {
    fetchCircuitos(setCircuitos, setLoading);
  }, []); // El efecto solo se ejecuta una vez cuando el componente se monta

  if (loading) {
    return <div>Cargando...</div>; // Puedes poner un loader aquí
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
          />
        ))
      ) : (
        <div>No se encontraron circuitos.</div>
      )}
    </div>
  );
}

export default ListaDeCircuitos;
