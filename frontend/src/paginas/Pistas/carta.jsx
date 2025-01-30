import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pistas.css'
import Monza from '../Imagenes/Albert_park.png'
import Suzuka from '../Imagenes/Suzuka.png'
import Jeddah from '../Imagenes/Jeddah.png'
import Sakhir from '../Imagenes/sakhir.png'
function Cartita({nombre, imagen, kilometros, pais, ciudad}) {
  return (
    <div className='class'>
    <Card className="card">
      <Card.Body>
        <Card.Title>{nombre}</Card.Title>
      <Card.Img variant="top" src={imagen}/>
        <Card.Text className="CartaTextoPist">
          Pais: {pais}
        </Card.Text>
        <Button className='boton'variant='warning'>+ INFO</Button>
      </Card.Body>
    </Card>

    </div>
  );
}

function ListaDeCircuitos() {
 
  const circuitos = [
    
    {
      nombre: "Suzuka GP",
      imagen: Suzuka,
      kilometros: "5.807 km",
      pais: "Japón",
      ciudad: "Suzuka"
    },
    {
      nombre: "Sakhir GP",
      imagen: Sakhir,
      kilometros: "13.626 km",
      pais: "Barein",
      ciudad: "Le Mans"
    },
    {
      nombre: "Jeddah GP",
      imagen: Jeddah,
      kilometros: "4.574 km",
      pais: "Arabia Saudita",
      ciudad: ""
    },
    {
      nombre: "Albert Park GP",
      imagen: Monza,
      kilometros: "5.793 km",
      pais:"Australia",
      ciudad: ""
    },{
      nombre: "Suzuka GP",
      imagen: Suzuka,
      kilometros: "5.807 km",
      pais: "Japón",
      ciudad: "Suzuka"
    },
    {
      nombre: "Sakhir GP",
      imagen: Sakhir,
      kilometros: "13.626 km",
      pais: "Barein",
      ciudad: "Le Mans"
    },
    {
      nombre: "Jeddah GP",
      imagen: Jeddah,
      kilometros: "4.574 km",
      pais: "Arabia Saudita",
      ciudad: ""
    },
    {
      nombre: "Albert Park GP",
      imagen: Monza,
      kilometros: "5.793 km",
      pais:"Australia",
      ciudad: ""
    },{
      nombre: "Suzuka GP",
      imagen: Suzuka,
      kilometros: "5.807 km",
      pais: "Japón",
      ciudad: "Suzuka"
    },
    {
      nombre: "Sakhir GP",
      imagen: Sakhir,
      kilometros: "13.626 km",
      pais: "Barein",
      ciudad: "Le Mans"
    },
    {
      nombre: "Jeddah GP",
      imagen: Jeddah,
      kilometros: "4.574 km",
      pais: "Arabia Saudita",
      ciudad: ""
    },
    {
      nombre: "Albert Park GP",
      imagen: Monza,
      kilometros: "5.793 km",
      pais:"Australia",
      ciudad: ""
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


