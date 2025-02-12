import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Bar from "../BarIntro/BarIntro";
import Footer from "../Footer/Footer.jsx";
import empleados from "../Imagenes/Carrusel/empleados.jpg";
import carreras from "../Imagenes/Carrusel/carreras.jpg";
import pistas from "../Imagenes/Carrusel/pistas.jpg";
import estrategias from "../Imagenes/Carrusel/estrategias.jpg";
import departamentos from "../Imagenes/Carrusel/departamentos.jpg";
import soporte from "../Imagenes/Carrusel/soporte.jpg";

const HomeCarousel = () => {
  const [items] = useState([
    { id: 1, background: empleados, name: "Empleados", route: "/empleados" },
    { id: 2, background: carreras, name: "Carreras", route: "/carreras" },
    { id: 3, background: pistas, name: "Pistas", route: "/pistas" },
    { id: 4, background: estrategias, name: "Estrategias", route: "/ListadoEstrategia" },
    { id: 5, background: departamentos, name: "Departamentos", route: "/Departamentos" },
    { id: 6, background: soporte, name: "Soporte", route: "/Soporte" },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const autoScrollInterval = 10000;

  useEffect(() => {
    const timer = setInterval(handleNext, autoScrollInterval);

    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, autoScrollInterval / 100);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    setProgress(0);
  };

  return (
    <div className="carousel-container">
      <Bar />
      <div className="carousel-slide">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
          >
            <img
              src={item.background}
              alt={item.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div className="carousel-content">
              <h2>{item.name}</h2>
              <Link to={item.route} className="carousel-link">
                Explorar
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-navigation">
        <button onClick={handlePrev} className="nav-button left">&#x276E;</button>
        <button onClick={handleNext} className="nav-button right">&#x276F;</button>
      </div>

      <div className="progress-bar-group">
        {items.map((_, index) => {
          const isActive = index === activeIndex;
          const barWidth = isActive ? `${progress}%` : index < activeIndex ? "100%" : "0%";
          return (
            <div key={index} className={`progress-bar ${isActive ? "active" : ""}`}>
              <div
                className="progress"
                style={{ width: barWidth }}
              ></div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default HomeCarousel;