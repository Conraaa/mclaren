import React, { useState } from "react";
import "./departamento.css";
import aerodinamica from '../Imagenes/Aerodinamica.png';
import GrupoMotor from '../Imagenes/GrupoMotor.png';
import Bar from "../Bar/Bar";
import { Link } from 'react-router-dom';
import fondo from "../Imagenes/Departamentos.jpg"
import next from "../Imagenes/Next.png"
import prev from "../Imagenes/Prev.png"
import Footer from '../Footer/Footer.jsx';
const Carousel = () => {
  const [items] = useState([
    { id: 1, background: aerodinamica, name: "Aerodinamica", description: "Diseñamos piezas que generan carga, reducen la resistencia al aire, enfrían componentes y aseguran la estabilidad del vehículo" },
    { id: 2, background: GrupoMotor, name: "Grupo Motor", description: "Nos encargamos de desarrollar y optimizar los motores, asegurando su rendimiento máximo, eficiencia de combustible y fiabilidad en la pista." }
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="TodoDepartamento">
      <Bar />
      <img src={ fondo } alt="Fondo de Pagina" className="FondoDepar" />
      <div className="containerDepartamento">
        {/* Contenedor de las imágenes */}
        <div className="slide-containerDepartamento">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`item ${index === activeIndex ? "active" : ""}`}
              style={{ backgroundImage: `url(${item.background})` }}
            ></div>
          ))}
        </div>

        {/* Contenedor de texto */}
        <div className="text-containerDepartamento">
          <div className="nameDepar">{items[activeIndex].name}</div>
          <div className="desDepar">{items[activeIndex].description}</div>
          <nav>
            
            {items[activeIndex].id === 1 && (
             <Link to="Aerodinamica"><button>Entrar</button></Link>
            )}
            {items[activeIndex].id === 2 && (
              <Link to="GrupoMotor"><button>Entrar</button></Link>
            )}
            {(items[activeIndex].id !== 1 && items[activeIndex].id !== 2) && (
              <button disabled>No disponible</button>
            )}
          </nav>
        </div>
      </div>


      {/* Botones de navegación */}
      <div className="buttonDepar">
        <button className="prevDepar" onClick={handlePrev}>
          <img src={ prev } alt="" />
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button className="nextDepar" onClick={handleNext}>
          <img src={ next } alt="" />
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
