import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pistas.css'
import Monza from '../Imagenes/Empleados1.png'



function Cartita({nombre, imagen, kilometros, pais, ciudad}) {
  return (
    <div className='class'>
    <Card class="card">
      <Card.Img variant="top" src={imagen}/>
      <Card.Body>
        <Card.Title>{nombre}</Card.Title>
        <Card.Text>
          Kilometros: {kilometros}
        </Card.Text>
        <Card.Text>
          Pais: {pais}
        </Card.Text>
        <Card.Text>
          Ciudad: {ciudad}
        </Card.Text>
        <div className='boton'>
        <Button variant='warning'>Editar</Button>
        <Button variant='danger'>Eliminar</Button>
        </div>
      </Card.Body>
    </Card>

    </div>
  );
}

function ListaDeCircuitos() {
 
  const circuitos = [
    
    {
      nombre: "Circuito de Suzuka",
      imagen: "ruta/a/imagen_suzuka.jpg",
      kilometros: "5.807 km",
      pais: "Japón",
      ciudad: "Suzuka"
    },
    {
      nombre: "Circuito de Le Mans",
      imagen: "ruta/a/imagen_le_mans.jpg",
      kilometros: "13.626 km",
      pais: "Francia",
      ciudad: "Le Mans"
    },
    {
      nombre: "Circuito de Interlagos",
      imagen: "ruta/a/imagen_interlagos.jpg",
      kilometros: "4.309 km",
      pais: "Brasil",
      ciudad: "Interlagos"
    },
    {
      nombre: "Circuito de Hockenheimring",
      imagen: "ruta/a/imagen_hockenheim.jpg",
      kilometros: "4.574 km",
      pais: "Alemania",
      ciudad: "Hockenheim"
    },
    {
      nombre: "Circuito de Monza",
      imagen: Monza,
      kilometros: "5.793 km",
      pais: "Italia",
      ciudad: "Monza"
    }
  ];

  return (
    <div>
      {circuitos.map((circuito, index) => (
        <Cartita
          key={index} 
          nombre={circuito.nombre} 
          imagen={circuito.imagen} 
          kilometros={circuito.kilometros} 
          pais={circuito.pais} 
          ciudad={circuito.ciudad} 
        />
      ))}
    </div>
  );
}


export default ListaDeCircuitos;


