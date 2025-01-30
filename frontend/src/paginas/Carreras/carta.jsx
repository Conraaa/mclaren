import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./carreras.css";
import Suzuka from '../Imagenes/Carreras/Japan.png';
import Australia from '../Imagenes/Carreras/Australia.png';
import Monza from '../Imagenes/Carreras/Monza.png';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Cartita({ nombre, imagen, kilometros, Piloto2: Piloto1, Piloto1: Piloto2, onShowDetails }) {
  return (
    <div className="class">
      <Card className="card">
        <Card.Img className="imagenCarrera"variant="top" src={imagen} />
        <Card.Body>
          <Card.Title ClassName="CartaTitulo">{nombre}</Card.Title>
          <p className="Pilotos">Lando Norris</p>  
          <p className="Pilotos">Oscar Piastri</p>
          <Card.Text className="CartaTexto">{Piloto1}</Card.Text>
          <Card.Text className="CartaTexto">{Piloto2}</Card.Text>

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

function ListaDeCircuitos() {
  const [selectedCircuito, setSelectedCircuito] = useState(null);

  const circuitos = [
    {
      nombre: "Suzuka GP",
      imagen: Suzuka,
      kilometros: "5.807 km",
      Piloto1: "1ro",
      Piloto2: "3ero",
      telemetria: [
        { vuelta: 1, tiempo: 85.4, velocidad: 190 },
        { vuelta: 2, tiempo: 86.2, velocidad: 192 },
        { vuelta: 3, tiempo: 84.9, velocidad: 189 },
        { vuelta: 4, tiempo: 87.1, velocidad: 191 },
        { vuelta: 5, tiempo: 85.3, velocidad: 193 },
      ],
    },
    {
      nombre: "Monza GP",
      imagen: Monza,
      kilometros: "13.626 km",
      Piloto1: "10mo",
      Piloto2: "5to",
      telemetria: [
        { vuelta: 1, tiempo: 94.494 },
        { vuelta: 2, tiempo: 90.812 },
        { vuelta: 3, tiempo: 90.606 },
        { vuelta: 4, tiempo: 90.012 },
        { vuelta: 5, tiempo: 90.318 },
        { vuelta: 6, tiempo: 90.039 },
        { vuelta: 7, tiempo: 90.007 },
        { vuelta: 8, tiempo: 90.164 },
        { vuelta: 9, tiempo: 90.303 },
        { vuelta: 10, tiempo: 92.825 },
        { vuelta: 11, tiempo: 108.222 },
        { vuelta: 12, tiempo: 89.323 },
        { vuelta: 13, tiempo: 89.809 },
        { vuelta: 14, tiempo: 89.778 },
        { vuelta: 15, tiempo: 89.856 },
        { vuelta: 16, tiempo: 89.898 },
        { vuelta: 17, tiempo: 90.316 },
        { vuelta: 18, tiempo: 90.475 },
        { vuelta: 19, tiempo: 92.615 },
        { vuelta: 20, tiempo: 105.987 },
        { vuelta: 21, tiempo: 88.878 },
        { vuelta: 22, tiempo: 88.737 },
        { vuelta: 23, tiempo: 89.003 },
        { vuelta: 24, tiempo: 89.670 },
        { vuelta: 25, tiempo: 89.332 },
        { vuelta: 26, tiempo: 89.538 },
        { vuelta: 27, tiempo: 89.543 },
        { vuelta: 28, tiempo: 89.828 },
        { vuelta: 29, tiempo: 92.309 },
        { vuelta: 30, tiempo: 108.274 }
    ],
    
    },
    {
      nombre: "Albert Park GP",
      imagen: Australia,
      kilometros: "5.793 km",
      Piloto1: "1ro",
      Piloto2: "2do",
      telemetria : [
        { vuelta: 1, tiempo: 78.1, velocidad: 210 },
        { vuelta: 2, tiempo: 79.5, velocidad: 212 },
        { vuelta: 3, tiempo: 77.8, velocidad: 209 },
        { vuelta: 4, tiempo: 80.2, velocidad: 211 },
        { vuelta: 5, tiempo: 78.9, velocidad: 213 },
        { vuelta: 6, tiempo: 78.4, velocidad: 211 },
        { vuelta: 7, tiempo: 79.0, velocidad: 212 },
        { vuelta: 8, tiempo: 78.3, velocidad: 210 },
        { vuelta: 9, tiempo: 79.1, velocidad: 213 },
        { vuelta: 10, tiempo: 77.9, velocidad: 209 },
        { vuelta: 11, tiempo: 78.6, velocidad: 212 },
        { vuelta: 12, tiempo: 80.0, velocidad: 210 },
        { vuelta: 13, tiempo: 78.2, velocidad: 213 },
        { vuelta: 14, tiempo: 79.3, velocidad: 211 },
        { vuelta: 15, tiempo: 78.7, velocidad: 209 },
        { vuelta: 16, tiempo: 79.6, velocidad: 212 },
        { vuelta: 17, tiempo: 77.7, velocidad: 210 },
        { vuelta: 18, tiempo: 79.4, velocidad: 211 },
        { vuelta: 19, tiempo: 78.0, velocidad: 209 },
        { vuelta: 20, tiempo: 78.8, velocidad: 213 },
        { vuelta: 21, tiempo: 80.1, velocidad: 210 },
        { vuelta: 22, tiempo: 79.2, velocidad: 212 },
        { vuelta: 23, tiempo: 78.3, velocidad: 210 },
        { vuelta: 24, tiempo: 77.8, velocidad: 209 },
        { vuelta: 25, tiempo: 79.0, velocidad: 211 },
        { vuelta: 26, tiempo: 78.6, velocidad: 212 },
        { vuelta: 27, tiempo: 80.4, velocidad: 210 },
        { vuelta: 28, tiempo: 79.1, velocidad: 213 },
        { vuelta: 29, tiempo: 77.9, velocidad: 209 },
        { vuelta: 30, tiempo: 79.3, velocidad: 211 },
        { vuelta: 31, tiempo: 78.2, velocidad: 212 },
        { vuelta: 32, tiempo: 78.4, velocidad: 210 },
        { vuelta: 33, tiempo: 80.3, velocidad: 213 },
        { vuelta: 34, tiempo: 79.0, velocidad: 209 },
        { vuelta: 35, tiempo: 77.7, velocidad: 210 },
        { vuelta: 36, tiempo: 78.5, velocidad: 212 },
        { vuelta: 37, tiempo: 79.0, velocidad: 211 },
        { vuelta: 38, tiempo: 78.2, velocidad: 213 },
        { vuelta: 39, tiempo: 78.6, velocidad: 210 },
        { vuelta: 40, tiempo: 79.4, velocidad: 211 },
        { vuelta: 41, tiempo: 78.9, velocidad: 212 },
        { vuelta: 42, tiempo: 77.8, velocidad: 209 },
        { vuelta: 43, tiempo: 80.1, velocidad: 213 },
        { vuelta: 44, tiempo: 78.3, velocidad: 210 },
        { vuelta: 45, tiempo: 79.2, velocidad: 211 },
        { vuelta: 46, tiempo: 78.0, velocidad: 209 },
        { vuelta: 47, tiempo: 78.8, velocidad: 212 },
        { vuelta: 48, tiempo: 79.3, velocidad: 210 },
        { vuelta: 49, tiempo: 77.9, velocidad: 213 },
        { vuelta: 50, tiempo: 78.1, velocidad: 209 },
        { vuelta: 51, tiempo: 80.0, velocidad: 210 },
        { vuelta: 52, tiempo: 79.4, velocidad: 212 },
        { vuelta: 53, tiempo: 77.7, velocidad: 210 },
        { vuelta: 54, tiempo: 79.6, velocidad: 211 },
        { vuelta: 55, tiempo: 78.5, velocidad: 213 },
        { vuelta: 56, tiempo: 80.4, velocidad: 210 },
        { vuelta: 57, tiempo: 79.0, velocidad: 212 },
        { vuelta: 58, tiempo: 78.3, velocidad: 209 },
        { vuelta: 59, tiempo: 78.9, velocidad: 211 },
        { vuelta: 60, tiempo: 77.8, velocidad: 210 },
        { vuelta: 61, tiempo: 79.5, velocidad: 213 },
        { vuelta: 62, tiempo: 78.1, velocidad: 209 },
        { vuelta: 63, tiempo: 80.0, velocidad: 212 },
        { vuelta: 64, tiempo: 79.2, velocidad: 210 },
        { vuelta: 65, tiempo: 77.9, velocidad: 211 },
        { vuelta: 66, tiempo: 78.3, velocidad: 213 },
        { vuelta: 67, tiempo: 79.7, velocidad: 209 },
        { vuelta: 68, tiempo: 78.2, velocidad: 210 },
        { vuelta: 69, tiempo: 78.6, velocidad: 211 },
        { vuelta: 70, tiempo: 79.1, velocidad: 213 },
        // Pitstops
        { vuelta: 71, tiempo: 108.2, velocidad: 0 }, // Pitstop
        { vuelta: 72, tiempo: 108.3, velocidad: 0 }, // Pitstop
        { vuelta: 73, tiempo: 108.5, velocidad: 0 }, // Pitstop
        { vuelta: 74, tiempo: 108.7, velocidad: 0 }, // Pitstop
        { vuelta: 75, tiempo: 109.0, velocidad: 0 }, // Pitstop
        { vuelta: 76, tiempo: 108.6, velocidad: 0 }, // Pitstop
        { vuelta: 77, tiempo: 108.9, velocidad: 0 }, // Pitstop
      ],
      
    },{
      nombre: "Suzuka GP",
      imagen: Suzuka,
      kilometros: "5.807 km",
      Piloto1: "1ro",
      Piloto2: "3ero",
      telemetria: [
        { vuelta: 1, tiempo: 85.4, velocidad: 190 },
        { vuelta: 2, tiempo: 86.2, velocidad: 192 },
        { vuelta: 3, tiempo: 84.9, velocidad: 189 },
        { vuelta: 4, tiempo: 87.1, velocidad: 191 },
        { vuelta: 5, tiempo: 85.3, velocidad: 193 },
      ],
    },
    {
      nombre: "Monza GP",
      imagen: Monza,
      kilometros: "13.626 km",
      Piloto1: "10mo",
      Piloto2: "5to",
      telemetria: [
        { vuelta: 1, tiempo: 94.494 },
        { vuelta: 2, tiempo: 90.812 },
        { vuelta: 3, tiempo: 90.606 },
        { vuelta: 4, tiempo: 90.012 },
        { vuelta: 5, tiempo: 90.318 },
        { vuelta: 6, tiempo: 90.039 },
        { vuelta: 7, tiempo: 90.007 },
        { vuelta: 8, tiempo: 90.164 },
        { vuelta: 9, tiempo: 90.303 },
        { vuelta: 10, tiempo: 92.825 },
        { vuelta: 11, tiempo: 108.222 },
        { vuelta: 12, tiempo: 89.323 },
        { vuelta: 13, tiempo: 89.809 },
        { vuelta: 14, tiempo: 89.778 },
        { vuelta: 15, tiempo: 89.856 },
        { vuelta: 16, tiempo: 89.898 },
        { vuelta: 17, tiempo: 90.316 },
        { vuelta: 18, tiempo: 90.475 },
        { vuelta: 19, tiempo: 92.615 },
        { vuelta: 20, tiempo: 105.987 },
        { vuelta: 21, tiempo: 88.878 },
        { vuelta: 22, tiempo: 88.737 },
        { vuelta: 23, tiempo: 89.003 },
        { vuelta: 24, tiempo: 89.670 },
        { vuelta: 25, tiempo: 89.332 },
        { vuelta: 26, tiempo: 89.538 },
        { vuelta: 27, tiempo: 89.543 },
        { vuelta: 28, tiempo: 89.828 },
        { vuelta: 29, tiempo: 92.309 },
        { vuelta: 30, tiempo: 108.274 }
    ],
    
    },
    {
      nombre: "Albert Park GP",
      imagen: Australia,
      kilometros: "5.793 km",
      Piloto1: "1ro",
      Piloto2: "2do",
      telemetria : [
        { vuelta: 1, tiempo: 78.1, velocidad: 210 },
        { vuelta: 2, tiempo: 79.5, velocidad: 212 },
        { vuelta: 3, tiempo: 77.8, velocidad: 209 },
        { vuelta: 4, tiempo: 80.2, velocidad: 211 },
        { vuelta: 5, tiempo: 78.9, velocidad: 213 },
        { vuelta: 6, tiempo: 78.4, velocidad: 211 },
        { vuelta: 7, tiempo: 79.0, velocidad: 212 },
        { vuelta: 8, tiempo: 78.3, velocidad: 210 },
        { vuelta: 9, tiempo: 79.1, velocidad: 213 },
        { vuelta: 10, tiempo: 77.9, velocidad: 209 },
        { vuelta: 11, tiempo: 78.6, velocidad: 212 },
        { vuelta: 12, tiempo: 80.0, velocidad: 210 },
        { vuelta: 13, tiempo: 78.2, velocidad: 213 },
        { vuelta: 14, tiempo: 79.3, velocidad: 211 },
        { vuelta: 15, tiempo: 78.7, velocidad: 209 },
        { vuelta: 16, tiempo: 79.6, velocidad: 212 },
        { vuelta: 17, tiempo: 77.7, velocidad: 210 },
        { vuelta: 18, tiempo: 79.4, velocidad: 211 },
        { vuelta: 19, tiempo: 78.0, velocidad: 209 },
        { vuelta: 20, tiempo: 78.8, velocidad: 213 },
        { vuelta: 21, tiempo: 80.1, velocidad: 210 },
        { vuelta: 22, tiempo: 79.2, velocidad: 212 },
        { vuelta: 23, tiempo: 78.3, velocidad: 210 },
        { vuelta: 24, tiempo: 77.8, velocidad: 209 },
        { vuelta: 25, tiempo: 79.0, velocidad: 211 },
        { vuelta: 26, tiempo: 78.6, velocidad: 212 },
        { vuelta: 27, tiempo: 80.4, velocidad: 210 },
        { vuelta: 28, tiempo: 79.1, velocidad: 213 },
        { vuelta: 29, tiempo: 77.9, velocidad: 209 },
        { vuelta: 30, tiempo: 79.3, velocidad: 211 },
        { vuelta: 31, tiempo: 78.2, velocidad: 212 },
        { vuelta: 32, tiempo: 78.4, velocidad: 210 },
        { vuelta: 33, tiempo: 80.3, velocidad: 213 },
        { vuelta: 34, tiempo: 79.0, velocidad: 209 },
        { vuelta: 35, tiempo: 77.7, velocidad: 210 },
        { vuelta: 36, tiempo: 78.5, velocidad: 212 },
        { vuelta: 37, tiempo: 79.0, velocidad: 211 },
        { vuelta: 38, tiempo: 78.2, velocidad: 213 },
        { vuelta: 39, tiempo: 78.6, velocidad: 210 },
        { vuelta: 40, tiempo: 79.4, velocidad: 211 },
        { vuelta: 41, tiempo: 78.9, velocidad: 212 },
        { vuelta: 42, tiempo: 77.8, velocidad: 209 },
        { vuelta: 43, tiempo: 80.1, velocidad: 213 },
        { vuelta: 44, tiempo: 78.3, velocidad: 210 },
        { vuelta: 45, tiempo: 79.2, velocidad: 211 },
        { vuelta: 46, tiempo: 78.0, velocidad: 209 },
        { vuelta: 47, tiempo: 78.8, velocidad: 212 },
        { vuelta: 48, tiempo: 79.3, velocidad: 210 },
        { vuelta: 49, tiempo: 77.9, velocidad: 213 },
        { vuelta: 50, tiempo: 78.1, velocidad: 209 },
        { vuelta: 51, tiempo: 80.0, velocidad: 210 },
        { vuelta: 52, tiempo: 79.4, velocidad: 212 },
        { vuelta: 53, tiempo: 77.7, velocidad: 210 },
        { vuelta: 54, tiempo: 79.6, velocidad: 211 },
        { vuelta: 55, tiempo: 78.5, velocidad: 213 },
        { vuelta: 56, tiempo: 80.4, velocidad: 210 },
        { vuelta: 57, tiempo: 79.0, velocidad: 212 },
        { vuelta: 58, tiempo: 78.3, velocidad: 209 },
        { vuelta: 59, tiempo: 78.9, velocidad: 211 },
        { vuelta: 60, tiempo: 77.8, velocidad: 210 },
        { vuelta: 61, tiempo: 79.5, velocidad: 213 },
        { vuelta: 62, tiempo: 78.1, velocidad: 209 },
        { vuelta: 63, tiempo: 80.0, velocidad: 212 },
        { vuelta: 64, tiempo: 79.2, velocidad: 210 },
        { vuelta: 65, tiempo: 77.9, velocidad: 211 },
        { vuelta: 66, tiempo: 78.3, velocidad: 213 },
        { vuelta: 67, tiempo: 79.7, velocidad: 209 },
        { vuelta: 68, tiempo: 78.2, velocidad: 210 },
        { vuelta: 69, tiempo: 78.6, velocidad: 211 },
        { vuelta: 70, tiempo: 79.1, velocidad: 213 },
        // Pitstops
        { vuelta: 71, tiempo: 108.2, velocidad: 0 }, // Pitstop
        { vuelta: 72, tiempo: 108.3, velocidad: 0 }, // Pitstop
        { vuelta: 73, tiempo: 108.5, velocidad: 0 }, // Pitstop
        { vuelta: 74, tiempo: 108.7, velocidad: 0 }, // Pitstop
        { vuelta: 75, tiempo: 109.0, velocidad: 0 }, // Pitstop
        { vuelta: 76, tiempo: 108.6, velocidad: 0 }, // Pitstop
        { vuelta: 77, tiempo: 108.9, velocidad: 0 }, // Pitstop
      ],
      
    },{
      nombre: "Suzuka GP",
      imagen: Suzuka,
      kilometros: "5.807 km",
      Piloto1: "1ro",
      Piloto2: "3ero",
      telemetria: [
        { vuelta: 1, tiempo: 85.4, velocidad: 190 },
        { vuelta: 2, tiempo: 86.2, velocidad: 192 },
        { vuelta: 3, tiempo: 84.9, velocidad: 189 },
        { vuelta: 4, tiempo: 87.1, velocidad: 191 },
        { vuelta: 5, tiempo: 85.3, velocidad: 193 },
      ],
    },
    {
      nombre: "Monza GP",
      imagen: Monza,
      kilometros: "13.626 km",
      Piloto1: "10mo",
      Piloto2: "5to",
      telemetria: [
        { vuelta: 1, tiempo: 94.494 },
        { vuelta: 2, tiempo: 90.812 },
        { vuelta: 3, tiempo: 90.606 },
        { vuelta: 4, tiempo: 90.012 },
        { vuelta: 5, tiempo: 90.318 },
        { vuelta: 6, tiempo: 90.039 },
        { vuelta: 7, tiempo: 90.007 },
        { vuelta: 8, tiempo: 90.164 },
        { vuelta: 9, tiempo: 90.303 },
        { vuelta: 10, tiempo: 92.825 },
        { vuelta: 11, tiempo: 108.222 },
        { vuelta: 12, tiempo: 89.323 },
        { vuelta: 13, tiempo: 89.809 },
        { vuelta: 14, tiempo: 89.778 },
        { vuelta: 15, tiempo: 89.856 },
        { vuelta: 16, tiempo: 89.898 },
        { vuelta: 17, tiempo: 90.316 },
        { vuelta: 18, tiempo: 90.475 },
        { vuelta: 19, tiempo: 92.615 },
        { vuelta: 20, tiempo: 105.987 },
        { vuelta: 21, tiempo: 88.878 },
        { vuelta: 22, tiempo: 88.737 },
        { vuelta: 23, tiempo: 89.003 },
        { vuelta: 24, tiempo: 89.670 },
        { vuelta: 25, tiempo: 89.332 },
        { vuelta: 26, tiempo: 89.538 },
        { vuelta: 27, tiempo: 89.543 },
        { vuelta: 28, tiempo: 89.828 },
        { vuelta: 29, tiempo: 92.309 },
        { vuelta: 30, tiempo: 108.274 }
    ],
    
    },
    {
      nombre: "Albert Park GP",
      imagen: Australia,
      kilometros: "5.793 km",
      Piloto1: "1ro",
      Piloto2: "2do",
      telemetria : [
        { vuelta: 1, tiempo: 78.1, velocidad: 210 },
        { vuelta: 2, tiempo: 79.5, velocidad: 212 },
        { vuelta: 3, tiempo: 77.8, velocidad: 209 },
        { vuelta: 4, tiempo: 80.2, velocidad: 211 },
        { vuelta: 5, tiempo: 78.9, velocidad: 213 },
        { vuelta: 6, tiempo: 78.4, velocidad: 211 },
        { vuelta: 7, tiempo: 79.0, velocidad: 212 },
        { vuelta: 8, tiempo: 78.3, velocidad: 210 },
        { vuelta: 9, tiempo: 79.1, velocidad: 213 },
        { vuelta: 10, tiempo: 77.9, velocidad: 209 },
        { vuelta: 11, tiempo: 78.6, velocidad: 212 },
        { vuelta: 12, tiempo: 80.0, velocidad: 210 },
        { vuelta: 13, tiempo: 78.2, velocidad: 213 },
        { vuelta: 14, tiempo: 79.3, velocidad: 211 },
        { vuelta: 15, tiempo: 78.7, velocidad: 209 },
        { vuelta: 16, tiempo: 79.6, velocidad: 212 },
        { vuelta: 17, tiempo: 77.7, velocidad: 210 },
        { vuelta: 18, tiempo: 79.4, velocidad: 211 },
        { vuelta: 19, tiempo: 78.0, velocidad: 209 },
        { vuelta: 20, tiempo: 78.8, velocidad: 213 },
        { vuelta: 21, tiempo: 80.1, velocidad: 210 },
        { vuelta: 22, tiempo: 79.2, velocidad: 212 },
        { vuelta: 23, tiempo: 78.3, velocidad: 210 },
        { vuelta: 24, tiempo: 77.8, velocidad: 209 },
        { vuelta: 25, tiempo: 79.0, velocidad: 211 },
        { vuelta: 26, tiempo: 78.6, velocidad: 212 },
        { vuelta: 27, tiempo: 80.4, velocidad: 210 },
        { vuelta: 28, tiempo: 79.1, velocidad: 213 },
        { vuelta: 29, tiempo: 77.9, velocidad: 209 },
        { vuelta: 30, tiempo: 79.3, velocidad: 211 },
        { vuelta: 31, tiempo: 78.2, velocidad: 212 },
        { vuelta: 32, tiempo: 78.4, velocidad: 210 },
        { vuelta: 33, tiempo: 80.3, velocidad: 213 },
        { vuelta: 34, tiempo: 79.0, velocidad: 209 },
        { vuelta: 35, tiempo: 77.7, velocidad: 210 },
        { vuelta: 36, tiempo: 78.5, velocidad: 212 },
        { vuelta: 37, tiempo: 79.0, velocidad: 211 },
        { vuelta: 38, tiempo: 78.2, velocidad: 213 },
        { vuelta: 39, tiempo: 78.6, velocidad: 210 },
        { vuelta: 40, tiempo: 79.4, velocidad: 211 },
        { vuelta: 41, tiempo: 78.9, velocidad: 212 },
        { vuelta: 42, tiempo: 77.8, velocidad: 209 },
        { vuelta: 43, tiempo: 80.1, velocidad: 213 },
        { vuelta: 44, tiempo: 78.3, velocidad: 210 },
        { vuelta: 45, tiempo: 79.2, velocidad: 211 },
        { vuelta: 46, tiempo: 78.0, velocidad: 209 },
        { vuelta: 47, tiempo: 78.8, velocidad: 212 },
        { vuelta: 48, tiempo: 79.3, velocidad: 210 },
        { vuelta: 49, tiempo: 77.9, velocidad: 213 },
        { vuelta: 50, tiempo: 78.1, velocidad: 209 },
        { vuelta: 51, tiempo: 80.0, velocidad: 210 },
        { vuelta: 52, tiempo: 79.4, velocidad: 212 },
        { vuelta: 53, tiempo: 77.7, velocidad: 210 },
        { vuelta: 54, tiempo: 79.6, velocidad: 211 },
        { vuelta: 55, tiempo: 78.5, velocidad: 213 },
        { vuelta: 56, tiempo: 80.4, velocidad: 210 },
        { vuelta: 57, tiempo: 79.0, velocidad: 212 },
        { vuelta: 58, tiempo: 78.3, velocidad: 209 },
        { vuelta: 59, tiempo: 78.9, velocidad: 211 },
        { vuelta: 60, tiempo: 77.8, velocidad: 210 },
        { vuelta: 61, tiempo: 79.5, velocidad: 213 },
        { vuelta: 62, tiempo: 78.1, velocidad: 209 },
        { vuelta: 63, tiempo: 80.0, velocidad: 212 },
        { vuelta: 64, tiempo: 79.2, velocidad: 210 },
        { vuelta: 65, tiempo: 77.9, velocidad: 211 },
        { vuelta: 66, tiempo: 78.3, velocidad: 213 },
        { vuelta: 67, tiempo: 79.7, velocidad: 209 },
        { vuelta: 68, tiempo: 78.2, velocidad: 210 },
        { vuelta: 69, tiempo: 78.6, velocidad: 211 },
        { vuelta: 70, tiempo: 79.1, velocidad: 213 },
        // Pitstops
        { vuelta: 71, tiempo: 108.2, velocidad: 0 }, // Pitstop
        { vuelta: 72, tiempo: 108.3, velocidad: 0 }, // Pitstop
        { vuelta: 73, tiempo: 108.5, velocidad: 0 }, // Pitstop
        { vuelta: 74, tiempo: 108.7, velocidad: 0 }, // Pitstop
        { vuelta: 75, tiempo: 109.0, velocidad: 0 }, // Pitstop
        { vuelta: 76, tiempo: 108.6, velocidad: 0 }, // Pitstop
        { vuelta: 77, tiempo: 108.9, velocidad: 0 }, // Pitstop
      ],
      
    },
  ];

  const handleShowDetails = (circuito) => {
    setSelectedCircuito(circuito);
  };

  const handleCloseDetails = () => {
    setSelectedCircuito(null);
  };

  return (
    <div>
      {circuitos.map((circuito, index) => (
        <Cartita
          key={index}
          nombre={circuito.nombre}
          imagen={circuito.imagen}
          kilometros={circuito.kilometros}
          Piloto1={circuito.Piloto1}
          Piloto2={circuito.Piloto2}
          onShowDetails={() => handleShowDetails(circuito)}
        />
      ))}

      {/* Modal para mostrar detalles */}
      {selectedCircuito && (
        <Modal
          show={true}
          onHide={handleCloseDetails}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedCircuito.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  <p>
    <strong>Kilómetros:</strong> {selectedCircuito.kilometros}
  </p>
  <p>
    <strong>País:</strong> {selectedCircuito.Piloto1}
  </p>
  <p>
    <strong>Piloto2:</strong> {selectedCircuito.Piloto2}
  </p>
  <img
    src={selectedCircuito.imagen}
    alt={selectedCircuito.nombre}
    style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
  />
  {/* Contenedor de los gráficos (apilados verticalmente) */}
  <div className="Telemetrias">
    {/* Gráfico 1: Tiempo por vuelta */}
    <div style={{ marginBottom: "20px" }}>
      <p><strong>Piloto 1: Lando Norris</strong></p>
      <p>Tiempo por vuelta del piloto 1 en el circuito</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={selectedCircuito.telemetria}>
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey="vuelta"
            label={{ value: "Vuelta", position: "insideBottomRight", offset: -10 }}
          />
          <YAxis
            label={{ value: "Tiempo (s)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line type="monotone" dataKey="tiempo" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* Gráfico 2: Tiempo por vuelta (Piloto 2) */}
    <div>
      <p><strong>Piloto 2: Oscar Piastri</strong></p>
      <p>Tiempo por vuelta del piloto 2 en el circuito</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={selectedCircuito.telemetria}>
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey="vuelta"
            label={{ value: "Vuelta", position: "insideBottomRight", offset: -10 }}
          />
          <YAxis
            label={{ value: "Tiempo (s)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line type="monotone" dataKey="tiempo" stroke="#82ca9d" />
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
